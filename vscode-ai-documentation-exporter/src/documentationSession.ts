import * as vscode from 'vscode';
import { FileChangeTracker } from './fileChangeTracker';

export interface PromptEntry {
    timestamp: Date;
    prompt: string;
    context?: string;
    id: string;
}

export interface FileChange {
    timestamp: Date;
    filePath: string;
    changeType: 'created' | 'modified' | 'deleted';
    diff?: string;
    beforeContent?: string;
    afterContent?: string;
}

export class DocumentationSession {
    private prompts: PromptEntry[] = [];
    private fileChanges: FileChange[] = [];
    private fileTracker: FileChangeTracker;
    private sessionStartTime: Date;
    private isActive: boolean = false;
    private webviewPanel: vscode.WebviewPanel | undefined;

    constructor(private context: vscode.ExtensionContext) {
        this.sessionStartTime = new Date();
        this.fileTracker = new FileChangeTracker();
    }

    start(): void {
        this.isActive = true;
        this.sessionStartTime = new Date();
        
        // Start tracking file changes
        this.fileTracker.startTracking((change: FileChange) => {
            this.fileChanges.push(change);
        });

        console.log('Documentation session started at:', this.sessionStartTime);
    }

    end(): void {
        this.isActive = false;
        this.fileTracker.stopTracking();
        
        if (this.webviewPanel) {
            this.webviewPanel.dispose();
        }
        
        console.log('Documentation session ended. Total prompts:', this.prompts.length, 'File changes:', this.fileChanges.length);
    }

    addPrompt(prompt: string, context?: string): void {
        if (!this.isActive) {
            throw new Error('Session is not active');
        }

        const promptEntry: PromptEntry = {
            id: this.generateId(),
            timestamp: new Date(),
            prompt: prompt.trim(),
            context
        };

        this.prompts.push(promptEntry);
        console.log('Added prompt:', promptEntry);
    }

    getPrompts(): PromptEntry[] {
        return [...this.prompts];
    }

    getFileChanges(): FileChange[] {
        return [...this.fileChanges];
    }

    getSessionData() {
        return {
            startTime: this.sessionStartTime,
            prompts: this.prompts,
            fileChanges: this.fileChanges,
            isActive: this.isActive,
            duration: this.isActive ? Date.now() - this.sessionStartTime.getTime() : 0
        };
    }

    showSessionPanel(): void {
        if (this.webviewPanel) {
            this.webviewPanel.reveal();
            return;
        }

        this.webviewPanel = vscode.window.createWebviewPanel(
            'aiDocsSession',
            'AI Documentation Session',
            vscode.ViewColumn.Two,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        this.webviewPanel.webview.html = this.getWebviewContent();
        
        this.webviewPanel.onDidDispose(() => {
            this.webviewPanel = undefined;
        });
    }

    private getWebviewContent(): string {
        const sessionData = this.getSessionData();
        
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AI Documentation Session</title>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    padding: 20px; 
                    background-color: var(--vscode-editor-background);
                    color: var(--vscode-editor-foreground);
                }
                .header { 
                    border-bottom: 1px solid var(--vscode-panel-border); 
                    padding-bottom: 20px; 
                    margin-bottom: 20px; 
                }
                .section { 
                    margin-bottom: 30px; 
                }
                .prompt { 
                    background-color: var(--vscode-textBlockQuote-background); 
                    padding: 15px; 
                    border-left: 4px solid var(--vscode-textLink-foreground); 
                    margin-bottom: 15px; 
                    border-radius: 4px;
                }
                .file-change { 
                    background-color: var(--vscode-textCodeBlock-background); 
                    padding: 10px; 
                    margin-bottom: 10px; 
                    border-radius: 4px;
                    font-family: 'Courier New', monospace;
                }
                .timestamp { 
                    color: var(--vscode-descriptionForeground); 
                    font-size: 0.9em; 
                }
                .change-type { 
                    color: var(--vscode-gitDecoration-addedResourceForeground); 
                    font-weight: bold; 
                }
                .change-type.modified { color: var(--vscode-gitDecoration-modifiedResourceForeground); }
                .change-type.deleted { color: var(--vscode-gitDecoration-deletedResourceForeground); }
                h2 { color: var(--vscode-textLink-foreground); }
                .stats { 
                    display: flex; 
                    gap: 20px; 
                    margin-bottom: 20px; 
                }
                .stat { 
                    background-color: var(--vscode-button-background); 
                    padding: 10px 15px; 
                    border-radius: 4px; 
                    color: var(--vscode-button-foreground);
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🤖 AI Documentation Session</h1>
                <div class="stats">
                    <div class="stat">📝 ${sessionData.prompts.length} Prompts</div>
                    <div class="stat">📁 ${sessionData.fileChanges.length} File Changes</div>
                    <div class="stat">⏱️ ${Math.round(sessionData.duration / 1000 / 60)} minutes</div>
                </div>
                <p class="timestamp">Started: ${sessionData.startTime.toLocaleString()}</p>
            </div>

            <div class="section">
                <h2>📝 Prompts</h2>
                ${sessionData.prompts.map(prompt => `
                    <div class="prompt">
                        <div class="timestamp">${prompt.timestamp.toLocaleTimeString()}</div>
                        <div>${prompt.prompt}</div>
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h2>📁 File Changes</h2>
                ${sessionData.fileChanges.map(change => `
                    <div class="file-change">
                        <div class="timestamp">${change.timestamp.toLocaleTimeString()}</div>
                        <div>
                            <span class="change-type ${change.changeType}">${change.changeType.toUpperCase()}</span>
                            ${change.filePath}
                        </div>
                    </div>
                `).join('')}
            </div>
        </body>
        </html>
        `;
    }

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }
} 