import * as vscode from 'vscode';
import * as constants from './constants';

export function isActive() {
    const configuration = vscode.workspace.getConfiguration();

    const codeActionsOnSave: any | undefined = configuration.inspect(constants.configurationKeys.codeActionsOnSave)!.globalValue;
    if (!codeActionsOnSave) {
        return false;
    }

    const fixAll = !!codeActionsOnSave[constants.configurationKeys.fixAll];
    const organizeImports = !!codeActionsOnSave[constants.configurationKeys.organizeImports];

    const formatOnSave = !!configuration.inspect(constants.configurationKeys.formatOnSave)!.globalValue;

    return formatOnSave && fixAll && organizeImports;
}