"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileChangeTracker = void 0;
const vscode = require("vscode");
const diff_1 = require("diff");
const path = require("path");
class FileChangeTracker {
    constructor() {
        this.fileContents = new Map();
        this.config = vscode.workspace.getConfiguration('ai-docs');
    }
    startTracking(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
        // Initialize file contents cache
        this.initializeFileCache();
        // Watch for file changes
        this.fileSystemWatcher = vscode.workspace.createFileSystemWatcher('**/*', false, // don't ignore creates
        false, // don't ignore changes
        false // don't ignore deletes
        );
        this.fileSystemWatcher.onDidCreate(this.handleFileCreate.bind(this));
        this.fileSystemWatcher.onDidChange(this.handleFileChange.bind(this));
        this.fileSystemWatcher.onDidDelete(this.handleFileDelete.bind(this));
        console.log('File tracking started');
    }
    stopTracking() {
        if (this.fileSystemWatcher) {
            this.fileSystemWatcher.dispose();
            this.fileSystemWatcher = undefined;
        }
        this.fileContents.clear();
        this.onChangeCallback = undefined;
        console.log('File tracking stopped');
    }
    async initializeFileCache() {
        // Cache initial state of files in workspace
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders)
            return;
        for (const folder of workspaceFolders) {
            try {
                await this.cacheDirectoryContents(folder.uri);
            }
            catch (error) {
                console.error('Error caching directory contents:', error);
            }
        }
    }
    async cacheDirectoryContents(uri) {
        try {
            const entries = await vscode.workspace.fs.readDirectory(uri);
            for (const [name, type] of entries) {
                const entryUri = vscode.Uri.joinPath(uri, name);
                if (type === vscode.FileType.File && this.shouldTrackFile(entryUri.fsPath)) {
                    try {
                        const content = await vscode.workspace.fs.readFile(entryUri);
                        this.fileContents.set(entryUri.fsPath, content.toString());
                    }
                    catch (error) {
                        console.error(`Error reading file ${entryUri.fsPath}:`, error);
                    }
                }
                else if (type === vscode.FileType.Directory && !this.shouldIgnoreDirectory(name)) {
                    await this.cacheDirectoryContents(entryUri);
                }
            }
        }
        catch (error) {
            console.error('Error reading directory:', error);
        }
    }
    shouldTrackFile(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        const trackableExtensions = [
            '.js', '.ts', '.jsx', '.tsx', '.vue', '.svelte',
            '.py', '.java', '.c', '.cpp', '.cs', '.go', '.rs',
            '.html', '.css', '.scss', '.sass', '.less',
            '.json', '.yaml', '.yml', '.xml', '.md',
            '.astro', '.php', '.rb', '.sh', '.sql'
        ];
        return trackableExtensions.includes(ext) &&
            !filePath.includes('node_modules') &&
            !filePath.includes('.git') &&
            !filePath.includes('dist') &&
            !filePath.includes('build') &&
            !filePath.includes('.vscode');
    }
    shouldIgnoreDirectory(name) {
        const ignoredDirs = [
            'node_modules', '.git', 'dist', 'build', '.vscode',
            '.next', '.nuxt', '.astro', 'coverage', '.pytest_cache'
        ];
        return ignoredDirs.includes(name);
    }
    async handleFileCreate(uri) {
        if (!this.shouldTrackFile(uri.fsPath) || !this.onChangeCallback)
            return;
        try {
            const content = await vscode.workspace.fs.readFile(uri);
            const contentStr = content.toString();
            this.fileContents.set(uri.fsPath, contentStr);
            const change = {
                timestamp: new Date(),
                filePath: this.getRelativePath(uri.fsPath),
                changeType: 'created',
                afterContent: contentStr,
                diff: this.generateCreationDiff(contentStr)
            };
            this.onChangeCallback(change);
        }
        catch (error) {
            console.error('Error handling file creation:', error);
        }
    }
    async handleFileChange(uri) {
        if (!this.shouldTrackFile(uri.fsPath) || !this.onChangeCallback)
            return;
        try {
            const content = await vscode.workspace.fs.readFile(uri);
            const newContent = content.toString();
            const oldContent = this.fileContents.get(uri.fsPath) || '';
            if (oldContent === newContent)
                return; // No actual change
            this.fileContents.set(uri.fsPath, newContent);
            const change = {
                timestamp: new Date(),
                filePath: this.getRelativePath(uri.fsPath),
                changeType: 'modified',
                beforeContent: oldContent,
                afterContent: newContent,
                diff: this.generateDiff(oldContent, newContent, uri.fsPath)
            };
            this.onChangeCallback(change);
        }
        catch (error) {
            console.error('Error handling file change:', error);
        }
    }
    async handleFileDelete(uri) {
        if (!this.shouldTrackFile(uri.fsPath) || !this.onChangeCallback)
            return;
        const oldContent = this.fileContents.get(uri.fsPath) || '';
        this.fileContents.delete(uri.fsPath);
        const change = {
            timestamp: new Date(),
            filePath: this.getRelativePath(uri.fsPath),
            changeType: 'deleted',
            beforeContent: oldContent,
            diff: this.generateDeletionDiff(oldContent)
        };
        this.onChangeCallback(change);
    }
    generateDiff(oldContent, newContent, filePath) {
        const maxLines = this.config.get('maxDiffLines', 10);
        const patch = (0, diff_1.createTwoFilesPatch)(`a/${this.getRelativePath(filePath)}`, `b/${this.getRelativePath(filePath)}`, oldContent, newContent, '', '', { context: 3 });
        return this.truncateDiff(patch, maxLines);
    }
    generateCreationDiff(content) {
        const maxLines = this.config.get('maxDiffLines', 10);
        const lines = content.split('\n');
        if (lines.length <= maxLines) {
            return `+++ (new file)\n${lines.map(line => `+${line}`).join('\n')}`;
        }
        return `+++ (new file, ${lines.length} lines)\n${lines.slice(0, maxLines).map(line => `+${line}`).join('\n')}\n... (${lines.length - maxLines} more lines)`;
    }
    generateDeletionDiff(content) {
        const maxLines = this.config.get('maxDiffLines', 10);
        const lines = content.split('\n');
        if (lines.length <= maxLines) {
            return `--- (deleted file)\n${lines.map(line => `-${line}`).join('\n')}`;
        }
        return `--- (deleted file, ${lines.length} lines)\n${lines.slice(0, maxLines).map(line => `-${line}`).join('\n')}\n... (${lines.length - maxLines} more lines)`;
    }
    truncateDiff(diff, maxLines) {
        const lines = diff.split('\n');
        const diffLines = lines.filter(line => line.startsWith('+') || line.startsWith('-'));
        if (diffLines.length <= maxLines * 2) {
            return diff;
        }
        // Keep header and first few diff lines, then add truncation notice
        const headerLines = lines.slice(0, 4); // Usually diff headers
        const truncatedDiffLines = diffLines.slice(0, maxLines);
        const remainingCount = diffLines.length - maxLines;
        return [
            ...headerLines,
            ...truncatedDiffLines,
            `... (${remainingCount} more lines changed)`
        ].join('\n');
    }
    getRelativePath(filePath) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders)
            return filePath;
        for (const folder of workspaceFolders) {
            if (filePath.startsWith(folder.uri.fsPath)) {
                return path.relative(folder.uri.fsPath, filePath);
            }
        }
        return filePath;
    }
}
exports.FileChangeTracker = FileChangeTracker;
//# sourceMappingURL=fileChangeTracker.js.map