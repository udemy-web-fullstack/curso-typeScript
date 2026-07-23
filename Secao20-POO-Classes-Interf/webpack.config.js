import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// No ES Modules modernos, precisamos dessas duas linhas para emular o antigo "__dirname"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: 'development',

  entry: './aula15-exercicio-video/video.ts',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.frontend.json',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],

    // Necessário para NodeNext + imports ".js"
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.mjs': ['.mjs', '.mts'],
      '.cjs': ['.cjs', '.cts'],
    },
  },

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'frontend', 'assets', 'js'),
  },

  devtool: 'source-map',
};
