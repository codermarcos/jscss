import useElements from './elements';
import useState from './state';

type ApplyStylesOptions = {
  appendTo?: string | HTMLElement;
}

export const applyStyles = ({ appendTo }: ApplyStylesOptions = {}): void => {
  const state = useState();

  (window as any).jscss = state;
  
  if (typeof appendTo === 'string') {
    const selected = document.querySelector(appendTo);
    appendTo = selected !== null && selected instanceof HTMLElement 
    ? selected 
    : undefined;
  }
  
  const elements = useElements({ parent: appendTo });
  
  const setStyle = () => elements.style.innerHTML = state.styles.toString();

  state.styles.on('insert', setStyle);
  state.styles.on('update', setStyle);
  state.styles.on('delete', setStyle);

  setStyle();
};