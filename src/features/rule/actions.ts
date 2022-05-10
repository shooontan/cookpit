import { Rule } from './state';

const ADD_RULE = 'ADD_RULE';
const DELETE_RULE = 'DELETE_RULE';
const UPDATE_RULE = 'UPDATE_RULE';
const SET_RULES = 'SET_RULES';

export const actionTypes = {
  ADD_RULE,
  DELETE_RULE,
  UPDATE_RULE,
  SET_RULES,
} as const;

const addRule = (rule: Rule) => ({
  type: actionTypes.ADD_RULE,
  payload: rule,
});

const deleteRule = (ruleId: string) => ({
  type: actionTypes.DELETE_RULE,
  payload: ruleId,
});

const updateRule = (rule: Rule) => ({
  type: actionTypes.UPDATE_RULE,
  payload: rule,
});

const setRules = (rules: Rule[]) => ({
  type: actionTypes.SET_RULES,
  payload: rules,
});

export const ruleActtions = {
  addRule,
  deleteRule,
  updateRule,
  setRules,
};

export type ActionType =
  | ReturnType<typeof addRule>
  | ReturnType<typeof deleteRule>
  | ReturnType<typeof updateRule>
  | ReturnType<typeof setRules>;
