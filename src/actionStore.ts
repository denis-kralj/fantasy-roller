import { v4 as guid } from 'uuid'
import type { Action } from './action'

const MAIN_STORAGE_KEY = '__fantasyRollerStorage'

if (localStorage.getItem(MAIN_STORAGE_KEY) === null) {
  localStorage.setItem(MAIN_STORAGE_KEY, '[]')
}

function getActions(): Action[] {
  const actions = JSON.parse(localStorage.getItem(MAIN_STORAGE_KEY) ?? '[]')
  return actions
}

function setActions(actions: Action[]) {
  const stringifiedActions = JSON.stringify(actions)
  localStorage.setItem(MAIN_STORAGE_KEY, stringifiedActions)
}

function addAction(action: Pick<Action, 'Label'>) {
  const newAction = { Label: action.Label, Id: guid() }
  const actions = getActions()
  actions.push(newAction)
  setActions(actions)
}

function removeAction(actionToDelete: Pick<Action, 'Id'>) {
  const actions = getActions().filter(a => a.Id !== actionToDelete.Id)
  setActions(actions)
}

export default {
  addAction,
  getActions,
  removeAction
}
