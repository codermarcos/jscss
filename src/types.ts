import { Properties } from 'csstype';


type StateMutationsMethods = {
    delete(token: string, key?: string): void;
    update(key: string, value: Array<string>): string;
    insert(value: Array<string>, key?: string): string;
    upsert(value: Array<string>, key?: string): string;
};

export type ListenersEvents = keyof Omit<StateMutationsMethods, 'upsert'>;
type StateListennersMethods = {
    on(event: ListenersEvents, callback: TokenFn): void;
};

type StateRenderMethods = {
    resfresh(): void;
    toString(): string;
}

type StateStylesMethods = StateMutationsMethods & StateListennersMethods & StateRenderMethods;

export type StateStyles = Record<string, Array<string>> & StateStylesMethods;

export type TokenFn = (token: string, key?: string) => void;

export type RulesList = Record<string, Properties>;

export type State<T extends string | number | symbol> = { 
  keys: Record<T, string>; 
  styles: StateStyles; 
}