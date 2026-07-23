/* usando classes abstratas
  export abstract class TpPessoa {
  protected abstract nome: string;
  protected abstract sobrenome: string;
  protected abstract nomeCompleto(): string;
}
*/

/* usando type substituindo classes abstratas
type TpPessoa = {
  nome: string;
  sobrenome: string;
  nomeCompleto(): string; // modo 1
  nomeCompleto: () => string; // modo 2
};
*/

//Implementando tipos para a classe
type TpNome = {
  nome: string;
};

type TpSobrenome = {
  sobrenome: string;
};

type TPNomeCompl = {
  nomeCompleto(): string;
};

export class Pessoa implements TpNome, TpSobrenome, TPNomeCompl {
  constructor(
    public nome: string,
    public sobrenome: string,
  ) {}

  nomeCompleto(): string {
    return this.nome + ' ' + this.sobrenome;
  }
}

const pessoa1 = new Pessoa('Magno', 'V Gomes');
console.log(pessoa1.nomeCompleto());
