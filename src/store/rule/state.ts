export type Rule = {
  id: string;
  url: string;
  body: string;
};

export type RuleState = {
  rules: Rule[];
};

export const initialRuleState: RuleState = {
  rules: [],
};
