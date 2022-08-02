import useState from './state';
import { RulesList } from './types';
import { createRule } from './createRule';

type CreateStyleSheetOptions = {
  namespace?: string;
};

export const createStyleSheet = <T extends RulesList>(rules: T, options?: CreateStyleSheetOptions) => {
  const state = useState<T>();
  state.styles.resfresh();

  for (const key in rules) {
    createRule(rules[key], key);
  }

  return state;
};