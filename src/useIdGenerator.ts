export const characters = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];

export function getGenerator() {
  let generator: Generator<string, void, string> & { current: string };
  
  function* create() {
    let index = 0;
    while (characters.length > index) {
      generator.current = characters[index++]; 
      yield generator.current;
    }
  }

  generator = create() as typeof generator;

  return generator;
};

export function* useIdGenerator(): Generator<string, string, string> {
  const hash = [getGenerator()];

  const increment = (i: number): string => {
    if (typeof hash[i] === 'undefined') {
      hash.push(getGenerator());
      hash[i].next();
    } else {
      let { done } = hash[i].next();

      if (done) {
        hash[i] = getGenerator();
        hash[i].next();
  
        return increment(i + 1);
      }
    }

    return hash.reduce((p, { current }) => `${p}${current}`, '');
  }

  while (true) yield increment(0);
};