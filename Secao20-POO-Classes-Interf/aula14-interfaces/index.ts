// type TpNome = {
//   nome: string;
// };

interface TpNome {
  nome: string;
}

// type TpSobrenome = {
//   sobrenome: string;
// };

interface TpSobrenome {
  sobrenome: string;
}

// type TPNomeCompl = {
//   nomeCompleto(): string;
// };

interface TPNomeCompl {
  nomeCompleto(): string;
}

// type TpPessoa = TpNome & TpSobrenome & TPNomeCompl;
interface TpPessoa1 extends TpNome, TpSobrenome, TPNomeCompl {}

export class Pessoa implements TpPessoa1 {
  constructor(
    public nome: string,
    public sobrenome: string,
  ) {}

  nomeCompleto(): string {
    return this.nome + ' ' + this.sobrenome;
  }
}

const pessoaObj: TpPessoa1 = {
  nomeCompleto() {
    return this.nome + ' ' + this.sobrenome;
  },
  nome: 'Neusa',
  sobrenome: 'B Gomes',
};

const pessoa = new Pessoa('Magno', 'V Gomes');
console.log(pessoa.nomeCompleto());
console.log(pessoaObj.nomeCompleto());
