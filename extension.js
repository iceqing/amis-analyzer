// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const LANGUAGES = ['json', 'plaintext', 'typescript', 'javascript'];
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "amis-analyzer" is now active!');

	const completionProvider = vscode.languages.registerCompletionItemProvider(LANGUAGES, {
		provideCompletionItems: (document, position) => {
			return [
				{
					label: 'mySuggestion1',
					insertText: 'mySuggestion1'
				}
			]
		}
	}, '.');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('amis-analyzer.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from amis-analyzer!');
	});

	


	context.subscriptions.push(disposable);
	console.log("pushing");
	context.subscriptions.push(completionProvider);
	console.log("completionProvider", completionProvider);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
