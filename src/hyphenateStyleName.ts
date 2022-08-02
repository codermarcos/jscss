const uppercasePattern = /([A-Z])/g;
const msPattern = /^ms-/;

const hyphenateStyleName = (name: string): string => name
    .replace(uppercasePattern, '-$1')
    .toLowerCase()
    .replace(msPattern, '-ms-');

export default hyphenateStyleName;