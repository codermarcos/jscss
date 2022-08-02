import type {InitialOptionsTsJest} from 'ts-jest/dist/types';

// Sync object
const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1'
  }
};
export default config;