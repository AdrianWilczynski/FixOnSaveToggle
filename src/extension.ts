import * as vscode from 'vscode';
import * as constants from './constants';
import * as state from './state';
import * as statusBarButton from './statusBarButton';

export function activate(context: vscode.ExtensionContext) {
	const command = vscode.commands.registerCommand(constants.command, toggle);

	const button = statusBarButton.create();

	const event = vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration(constants.configurationKeys.formatOnSave) || e.affectsConfiguration(constants.configurationKeys.codeActionsOnSave)) {
			statusBarButton.updateText(button);
		}
	});

	context.subscriptions.push(command, button, event);
}

export function deactivate() { }

async function toggle() {
	const newState = !state.isActive();

	const configuration = vscode.workspace.getConfiguration();

	await configuration.update(constants.configurationKeys.formatOnSave, newState, vscode.ConfigurationTarget.Global);
	await configuration.update(constants.configurationKeys.codeActionsOnSave, {
		[constants.configurationKeys.fixAll]: newState,
		[constants.configurationKeys.organizeImports]: newState
	}, vscode.ConfigurationTarget.Global);
}