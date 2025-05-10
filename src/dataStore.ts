import { v4 as guid } from 'uuid'
import type { Action } from './action'
import type { Outcome } from './outcome'

const MAIN_STORAGE_KEY = '__fantasyRollerStorage'

type LocalStorageData = {
    Actions: Action[]
    Outcomes: Outcome[]
}
const BASE_DATA: LocalStorageData = { Actions: [], Outcomes: [] }

if (localStorage.getItem(MAIN_STORAGE_KEY) === null) {
    localStorage.setItem(MAIN_STORAGE_KEY, JSON.stringify(BASE_DATA))
}

function setLocalStorageData(data: LocalStorageData): void {
    localStorage.setItem(MAIN_STORAGE_KEY, JSON.stringify(data))
}

function getOutcomes(): Outcome[] {
    const data = getLocalStorageData()
    return data.Outcomes
}

function setOutcomes(outcomes: Outcome[]): void {
    const data = getLocalStorageData()
    data.Outcomes = outcomes
    setLocalStorageData(data)
}

function clearOutcomes(): void {
    setOutcomes([])
}

function addOutcome(outcome: Outcome): void {
    const outcomes = getOutcomes()
    outcomes.push(outcome)
    setOutcomes(outcomes)
}

function getActions(): Action[] {
    const data = getLocalStorageData()
    return data.Actions
}

function getLocalStorageData(): LocalStorageData {
    return JSON.parse(localStorage.getItem(MAIN_STORAGE_KEY) ?? JSON.stringify(BASE_DATA))
}

function setActions(actions: Action[]): void {
    const data = getLocalStorageData()
    data.Actions = actions
    setLocalStorageData(data)
}

function addAction(action: Pick<Action, 'Label' | 'Elements'>): void {
    const newAction = {
        Label: action.Label,
        Id: guid(),
        Elements: action.Elements,
    }
    const actions = getActions()
    actions.push(newAction)
    setActions(actions)
}

function removeAction(actionToDelete: Pick<Action, 'Id'>): void {
    const actions = getActions().filter((a) => a.Id !== actionToDelete.Id)
    setActions(actions)
}

function updateAction(actionToUpdate: Action): void {
    const actions = getActions()
    const action = actions.find((a) => a.Id === actionToUpdate.Id)! // we know the element will always be found

    action.Label = actionToUpdate.Label
    action.Elements = actionToUpdate.Elements
    setActions(actions)
}

export type DataStore = {
    addAction: (action: Pick<Action, 'Label' | 'Elements'>) => void
    getActions: () => Action[]
    removeAction: (actionToDelete: Pick<Action, 'Id'>) => void
    updateAction: (actionToUpdate: Action) => void
    getOutcomes: () => Outcome[]
    addOutcome: (outcome: Outcome) => void
    clearOutcomes: () => void
    setActions: (actions: Action[]) => void
}

export default {
    addAction,
    getActions,
    removeAction,
    updateAction,
    getOutcomes,
    addOutcome,
    clearOutcomes,
    setActions,
} satisfies DataStore
