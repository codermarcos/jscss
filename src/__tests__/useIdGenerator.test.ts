import { characters, getGenerator, useIdGenerator } from 'src/useIdGenerator';

describe(
  'src/useIdGenerator.ts',
  () => {
    beforeAll(() => console.log('2 - beforeAll'));
    afterAll(() => console.log('2 - afterAll'));
    beforeEach(() => console.log('2 - beforeEach'));
    afterEach(() => console.log('2 - afterEach'));

    describe(
      'contract test',
      () => {
        test(
          '[characters] should have only characters a-z A-Z',
          () => {
            expect(characters.join('')).toMatch(/^[a-zA-Z]*$/);
          },
        );

        test(
          '[characters] should have one char',
          () => {
            expect(characters.reduce((p, c) => p + c.length, 0)).toBe(52);
          },
        );

        test(
          '[characters] should only unique characters',
          () => {
            expect(new Set(characters).size).toBe(52);
          },
        );

        test(
          '[getGenerator] should create a generator',
          () => {
            const generator = getGenerator();

            expect(generator).toBeDefined();
            expect(generator).toHaveProperty('next');
            expect(generator).toHaveProperty('return');
          },
        );

        test(
          '[getGenerator] generator should save last execution to current',
          () => {
            const generator = getGenerator();

            const last = generator.next();

            expect(generator).toHaveProperty('current');

            expect(generator.current).toBe(last.value);
          },
        );

        test(
          '[useIdGenerator] generator should use characters to create id',
          () => {
            const generator = useIdGenerator();

            for (let i = 0; i < characters.length; i++) {
              expect(generator.next().value).toBe(characters[i]);
            }
          },
        );

        test(
          '[useIdGenerator] generator add new characters when finish',
          () => {
            const position = 52;
            const generator = useIdGenerator();

            for (let i = 0; i < position; i++) generator.next();

            expect(generator.next().value).toBe('aa');
          },
        );

        test(
          '[useIdGenerator] generator should rotate next position to next char',
          () => {
            const position = 104;
            const generator = useIdGenerator();

            for (let i = 0; i < position; i++) generator.next();

            expect(generator.next().value).toBe('ab');
          },
        );
      },
    );
  },
);