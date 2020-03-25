import * as vscode from 'vscode';

export function seleniumRun(command: string, fsPath: string) {
	if (!vscode.window.terminals || !vscode.window.terminals.length) {
		vscode.window.showInformationMessage("powershellを立ち上げてください。");
		return;
	}
	const terminal = vscode.window.terminals[vscode.window.terminals.length - 1];
	terminal.show();

	let path = fsPath.replace(vscode.workspace.rootPath as string, "").replace(/\\/g, '/');

	terminal.sendText(command + path + "\r\n");
}

export function activate(context: vscode.ExtensionContext) {

	let runcChirome = vscode.commands.registerCommand('extension.runChirome', (event) => {
		seleniumRun("npx protractor ./protractor.conf_chrome.js --specs=.", event.fsPath);
	});
	context.subscriptions.push(runcChirome);

	let runcIE = vscode.commands.registerCommand('extension.runIE', (event) => {
		seleniumRun("npx protractor ./protractor.conf.js --specs=.", event.fsPath);
	});
	context.subscriptions.push(runcIE);

}

export function deactivate() { }
