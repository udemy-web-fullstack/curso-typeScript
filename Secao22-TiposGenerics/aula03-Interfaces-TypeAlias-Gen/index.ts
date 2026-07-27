// Generics com Interfaces e Type Alias

// interface PessoaProtocolo<T, U> { É aceitável especificar ou não como abaixo
interface PessoaProtocolo<T = string, U = number> {
  nome: T;
  sobrenome: T;
  idade: U;
}

type PessoaProtocolo2<T = string, U = number> = {
  nome: T;
  sobrenome: T;
  idade: U;
};

const aluno1: PessoaProtocolo<string, number> = {
  nome: 'Magno',
  sobrenome: 'V Gomes',
  idade: 52,
};

const aluno3: PessoaProtocolo2 = {
  nome: 'Magno',
  sobrenome: 'V Gomes',
  idade: 52,
};

const aluno2: PessoaProtocolo<number, number> = {
  nome: 123,
  sobrenome: 456,
  idade: 52,
};

console.log(aluno1, aluno2, aluno3);
