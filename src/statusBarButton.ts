import * as vscode from 'vscode';
import * as constants from './constants';
import * as state from './state';

export function create() {
    const statusBarToggle = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    statusBarToggle.command = constants.command;
    statusBarToggle.tooltip = 'Toggle Fix on Save';
    updateText(statusBarToggle);

    statusBarToggle.show();

    return statusBarToggle;
}

export function updateText(statusBarToggle: vscode.StatusBarItem) {
    statusBarToggle.text = `Fix on Save: ${state.isActive() ? '$(check)' : '$(x)'}`;
}