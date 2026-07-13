import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 1. Aplica as configurações recomendadas de JS e TS globais
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // 2. Aplica o comportamento do Prettier (substitui o antigo 'plugin:prettier/recommended')
  eslintPluginPrettierRecommended,

  // 3. Customizações de ambiente baseadas no arquivo do professor
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser, // Herança do 'browser: true' que o professor usou
      },
    },
    rules: {
      // Caso o professor adicione alguma regra customizada na seção 'rules' durante as aulas,
      // você vai digitá-la diretamente aqui dentro.
    },
  },

  // 4. Arquivos que o linter deve ignorar (Evita validar a pasta de build)
  {
    ignores: ['dist/', 'node_modules/'],
  }
);