// Restrições em Generics
// Para isso tenho que usar 'extends' que vai significar "no máximo ....."

type ObterChaveFn = <O, K extends keyof O>(objeto: O, chave: K) => O[K];

const obterChave: ObterChaveFn = (objeto, chave) => objeto[chave];

const local = {
  cidade: 'Gama-DF',
  logradouro: ['Qd 34', 'casa 55', 'setor Leste'],
  CEP: 7200003,
};

const lougradouro = obterChave(local, 'logradouro');
const cidade = obterChave(local, 'cidade');

console.log(lougradouro, cidade, obterChave(local, 'CEP'));
