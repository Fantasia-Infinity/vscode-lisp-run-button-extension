import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "lisp-run-button" is now active!');

    let disposable = vscode.commands.registerCommand('extension.runLispScript', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor && (editor.document.languageId === 'lisp' || editor.document.languageId === 'commonlisp')) {
            const filePath = editor.document.fileName;
            // Ensure the file is saved before running
            editor.document.save().then(success => {
                if (success) {
                    const terminal = vscode.window.createTerminal(`Run Lisp: ${vscode.workspace.asRelativePath(filePath)}`);
                    terminal.sendText(`sbcl --script "${filePath}"`);
                    terminal.show();
                } else {
                    vscode.window.showErrorMessage('Failed to save the file before running.');
                }
            });
        } else {
            vscode.window.showInformationMessage('No active Lisp (.lisp or .cl) editor found, or file is not a Lisp file.');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
