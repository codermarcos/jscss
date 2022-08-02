import { ListenersEvents, State, StateStyles, TokenFn } from './types';
import { useIdGenerator } from './useIdGenerator';

let state: State<string> = { } as any;

function useState<T extends Record<string, any>>() {
  if (typeof state.keys === 'object') return state as State<keyof T>;
  
  let listeners = {
    insert: new Array<TokenFn>(),
    update: new Array<TokenFn>(),
    delete: new Array<TokenFn>(),
  };

  let generator = useIdGenerator();
  
  const trigger = (event: ListenersEvents, token: string, key?: string) => 
  listeners[event].forEach(callback => callback(token, key));
  
  const keys = {};

  const styles = {
    on(event, callback) {
      listeners[event].push(callback);
    },
    update(token, value) {
      state.styles[token] = value;
      
      trigger('update', token);

      return token;
    },
    upsert(value, key) {
      return key && key in state.styles 
        ? styles.update(key, value)
        : styles.insert(value, key);
    },
    insert(value, key) {
      const token = generator.next().value;
      
      if (!key)
        key = token;
      
      state.keys[key] = token;
      state.styles[token] = value;

      trigger('insert', token, key);

      return token;
    },
    delete(token, key) {
      delete state.styles[token];
      delete state.keys[key || token];

      trigger('delete', token, key);
    },
    resfresh() {
      generator = useIdGenerator();

      for (const key in state.keys) {
        const token = generator.next().value;

        const oldKey = state.keys[key];
        const value = state.styles[oldKey];

        state.keys[key] = token;
        state.styles[token] = value;

        delete state.styles[oldKey];
      }
    },
    toString() {
      let style = '';
      for (const key in state.styles) {
        if (Array.isArray(state.styles[key]))
          style += `.${key}{${state.styles[key].join(';')}}`;
      }
      return style;
    },
  } as StateStyles;

  state = { keys, styles };
 
  return state as State<keyof T>;
}

export default useState;