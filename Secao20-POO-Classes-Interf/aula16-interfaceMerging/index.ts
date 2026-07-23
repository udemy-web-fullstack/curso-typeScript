// Declaration Merging

// type Pessoa = {
//   nome: string;
// };

interface Pessoa {
  nome: string;
}

interface Pessoa {
  readonly sobrenome: string;
}

interface Pessoa {
  idade?: number;
}

// interface Pessoa {
//   readonly enderecos: string[];
// }

const pessoa: Pessoa = {
  nome: 'Magno',
  sobrenome: 'V Gomes',
  idade: 52,
  // enderecos: ['Gama Leste-DF'],
};

// pessoa.enderecos.push('Aqui meu endereço muda por conta do readonly somente da declaração');
console.log(pessoa);
