import useState from './state';

export const renderStyles = (): string => {
    const state = useState();

    return state.styles.toString();
};