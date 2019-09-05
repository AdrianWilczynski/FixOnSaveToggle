import * as vscode from 'vscode';
import * as constants from './constants';

export function isActive() {
    const configuration = vscode.workspace.getConfiguration();

    const formatOnSave = !!configuration.inspect(constants.configurationKeys.formatOnSave)!.globalValue;

    const codeActionsOnSave: any | undefined = configuration.inspect(constants.configurationKeys.codeActionsOnSave)!.globalValue;

    const fixAll = codeActionsOnSave !== undefined ? !!codeActionsOnSave[constants.configurationKeys.fixAll] : false;
    const organizeImports = codeActionsOnSave !== undefined ? !!codeActionsOnSave[constants.configurationKeys.organizeImports] : false;

    return formatOnSave && fixAll && organizeImports;
}