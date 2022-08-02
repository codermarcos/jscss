import { Properties } from 'csstype';

import useState from './state';
import hyphenateStyleName from './hyphenateStyleName';

function createRule(properties: Properties, key?: string) {
  const state = useState();
  let parsedProperties = new Array<string>();

  for (const key in properties) {
    parsedProperties.push(`${hyphenateStyleName(key)}:${properties[key as keyof typeof properties]}`);
  }

  let className = state.styles.upsert(parsedProperties, key);

  return className;
}

export { createRule };