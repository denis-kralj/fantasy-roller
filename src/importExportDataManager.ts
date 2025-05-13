import type { Action } from './action'
import { v4 as guid } from 'uuid'

type ImportExportAction = {
    Label: string
    Elements: ExportedElement[]
}

type ExportedElement = {
    Label: string
    Value: string
}

type ImportExportDataManager = {
    mapToActions: (actions: ImportExportAction[]) => Action[]
    mapToImportExportActions: (data: Action[]) => ImportExportAction[]
    isImportExportAction: (action: unknown) => action is ImportExportAction
    validateAndParseImportExportActions: (
        stringifiedActions: string | null | undefined,
    ) => ImportExportAction[]
}

function mapToActions(actions: ImportExportAction[]): Action[] {
    return actions.map((action) => {
        return {
            Label: action.Label,
            Id: guid(),
            Elements: action.Elements.map((element) => {
                return {
                    Label: element.Label,
                    Value: element.Value,
                    Id: guid(),
                }
            }),
        }
    })
}

function mapToImportExportActions(data: Action[]): ImportExportAction[] {
    return data.map((action) => {
        return {
            Label: action.Label,
            Elements: action.Elements.map((element) => {
                return {
                    Label: element.Label,
                    Value: element.Value,
                }
            }),
        }
    })
}

function isImportExportAction(action: unknown): action is ImportExportAction {
    return (
        typeof action === 'object' &&
        action !== null &&
        'Label' in action &&
        'Elements' in action &&
        Array.isArray(action.Elements)
    )
}

function validateAndParseImportExportActions(
    stringifiedActions: string | null | undefined,
): ImportExportAction[] {
    if (!stringifiedActions) {
        throw new Error('No data to parse')
    }
    const data: ImportExportAction[] = JSON.parse(stringifiedActions)
    if (!Array.isArray(data) || !data.every(importExportDataManager.isImportExportAction)) {
        throw new Error('File is not an array or is not the right element type in array')
    }

    return data
}

const importExportDataManager: ImportExportDataManager = {
    mapToActions,
    mapToImportExportActions,
    isImportExportAction,
    validateAndParseImportExportActions,
}

export default importExportDataManager
