"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
function activate(context) {
    console.log('Congratulations, your extension "cvscode-core" is now active!');
    let disposable = vscode.commands.registerCommand('cvscode-core.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from cvscode-core!');
    });
    // Register the "createProject" command
    let createProjectDisposable = vscode.commands.registerCommand('cvscode-core.createProject', async () => {
        // Prompt the user for project details
        const projectDetails = await vscode.window.showInputBox({
            prompt: 'Enter project name (e.g., my-extension)',
            placeHolder: 'my-extension',
        });
        if (!projectDetails) {
            return; // User canceled the input
        }
        // Get the current workspace folder
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }
        // Create the project directory
        const projectPath = path.join(workspaceFolder.uri.fsPath, projectDetails);
        if (fs.existsSync(projectPath)) {
            vscode.window.showErrorMessage(`The directory "${projectDetails}" already exists.`);
            return;
        }
        fs.mkdirSync(projectPath);
        // Prompt the user for more project details
        const packageJson = {
            name: projectDetails,
            version: await vscode.window.showInputBox({ prompt: 'Enter version', placeHolder: '0.1.0' }),
            description: await vscode.window.showInputBox({ prompt: 'Enter description', placeHolder: 'A new VSCode extension' }),
        };
        // Create package.json with user-defined details
        const packageJsonPath = path.join(projectPath, 'package.json');
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        // Create the "src" directory and a "main.cvs" file
        const srcDirectory = path.join(projectPath, 'src');
        fs.mkdirSync(srcDirectory);
        const mainCvsFilePath = path.join(srcDirectory, 'main.cvs');
        fs.writeFileSync(mainCvsFilePath, '');
        vscode.window.showInformationMessage(`Created a new VSCode extension project at ${projectPath}`);
    });
    context.subscriptions.push(disposable, createProjectDisposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map