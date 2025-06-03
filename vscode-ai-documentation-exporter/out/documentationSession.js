"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentationSession = void 0;
const vscode = require("vscode");
const fileChangeTracker_1 = require("./fileChangeTracker");
class DocumentationSession {
    constructor(context) {
        this.context = context;
        this.prompts = [];
        this.fileChanges = [];
        this.isActive = false;
        this.sessionStartTime = new Date();
        this.fileTracker = new fileChangeTracker_1.FileChangeTracker();
    }
    start() {
        this.isActive = true;
        this.sessionStartTime = new Date();
        // Start tracking file changes
        this.fileTracker.startTracking((change) => {
            this.fileChanges.push(change);
        });
        console.log('Documentation session started at:', this.sessionStartTime);
    }
    end() {
        this.isActive = false;
        this.fileTracker.stopTracking();
        if (this.webviewPanel) {
            this.webviewPanel.dispose();
        }
        console.log('Documentation session ended. Total prompts:', this.prompts.length, 'File changes:', this.fileChanges.length);
    }
    addPrompt(prompt, context) {
        if (!this.isActive) {
            throw new Error('Session is not active');
        }
        const promptEntry = {
            id: this.generateId(),
            timestamp: new Date(),
            prompt: prompt.trim(),
            context
        };
        this.prompts.push(promptEntry);
        console.log('Added prompt:', promptEntry);
    }
    getPrompts() {
        return [...this.prompts];
    }
    getFileChanges() {
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
    showSessionPanel() {
        if (this.webviewPanel) {
            this.webviewPanel.reveal();
            return;
        }
        this.webviewPanel = vscode.window.createWebviewPanel('aiDocsSession', 'AI Documentation Session', vscode.ViewColumn.Two, {
            enableScripts: true,
            retainContextWhenHidden: true
        });
        this.webviewPanel.webview.html = this.getWebviewContent();
        this.webviewPanel.onDidDispose(() => {
            this.webviewPanel = undefined;
        });
    }
    getWebviewContent() {
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
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }
}
exports.DocumentationSession = DocumentationSession;
//# sourceMappingURL=documentationSession.js.map