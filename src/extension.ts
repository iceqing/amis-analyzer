// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "amis-analyzer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('amis-analyzer.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from amis-analyzer!');
	});


	let mobxAction = vscode.commands.registerCommand('amis-analyzer.mobx-action', () => {
		const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No editor is active');
            return;
        }

		const selection = editor.selection;
        let text = editor.document.getText(selection);
		let upperText = "";
		if(text!=null && text.length>0) {
			upperText = text.charAt(0).toUpperCase() + text.slice(1);
		}

		let generatedCode = `\t@action\n\tset${upperText} = (${text}) => {\n \t\tthis.${text} = ${text};\n\t}\n`;
		const selectedLine = selection.active.line;
		editor.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(selectedLine + 1, 0), `\n${generatedCode}`);
        });
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(mobxAction);
}

// This method is called when your extension is deactivated
export function deactivate() {}
