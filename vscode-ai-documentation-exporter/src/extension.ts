import * as vscode from 'vscode';
import { DocumentationSession } from './documentationSession';
import { MarkdownExporter } from './markdownExporter';

let currentSession: DocumentationSession | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('AI Documentation Exporter is now active!');

    // Register commands
    const startSession = vscode.commands.registerCommand('ai-docs.startSession', () => {
        if (currentSession) {
            vscode.window.showWarningMessage('A documentation session is already active. End it first.');
            return;
        }
        
        currentSession = new DocumentationSession(context);
        currentSession.start();
        vscode.window.showInformationMessage('AI Documentation session started! 🚀');
    });

    const endSession = vscode.commands.registerCommand('ai-docs.endSession', () => {
        if (!currentSession) {
            vscode.window.showWarningMessage('No active documentation session.');
            return;
        }
        
        currentSession.end();
        currentSession = undefined;
        vscode.window.showInformationMessage('AI Documentation session ended.');
    });

    const addPrompt = vscode.commands.registerCommand('ai-docs.addPrompt', async () => {
        if (!currentSession) {
            vscode.window.showWarningMessage('No active documentation session. Start one first.');
            return;
        }

        const prompt = await vscode.window.showInputBox({
            placeHolder: 'Enter your AI prompt or description...',
            prompt: 'Add a prompt to the documentation session'
        });

        if (prompt) {
            currentSession.addPrompt(prompt);
            vscode.window.showInformationMessage('Prompt added to documentation! ✅');
        }
    });

    const exportMarkdown = vscode.commands.registerCommand('ai-docs.exportMarkdown', async () => {
        if (!currentSession) {
            vscode.window.showWarningMessage('No active documentation session. Start one first.');
            return;
        }

        const exporter = new MarkdownExporter(currentSession);
        await exporter.exportToMarkdown();
    });

    const viewSession = vscode.commands.registerCommand('ai-docs.viewSession', () => {
        if (!currentSession) {
            vscode.window.showWarningMessage('No active documentation session.');
            return;
        }

        currentSession.showSessionPanel();
    });

    context.subscriptions.push(startSession, endSession, addPrompt, exportMarkdown, viewSession);
}

export function deactivate() {
    if (currentSession) {
        currentSession.end();
    }
} 