import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.ts'],
  },
  entry: {
    plugin: {
      import: './src/plugin.ts',
      // dependOn: 'state',
    },
    index: {
      import: './src/index.ts',
      // dependOn: 'state',
    },
    state: {
      import: './src/state.ts',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', 
    globalObject: 'this',
    library: {
      type: 'umd',
    },
    clean: true,
  },
};

export default config;