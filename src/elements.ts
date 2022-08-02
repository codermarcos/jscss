let elements: {
  parent: HTMLElement;
  style: HTMLStyleElement;
};

function useElements({ parent, style }: Partial<typeof elements>) {
  if (typeof elements === 'object') return elements;

  if (!parent || !(parent instanceof HTMLElement)) parent = document.head;

  if (!style || !(style instanceof HTMLStyleElement)) style = document.createElement('style');

  elements = {
    parent,
    style,
  };
  
  elements.parent.appendChild(elements.style);

  return elements;
}

export default useElements;