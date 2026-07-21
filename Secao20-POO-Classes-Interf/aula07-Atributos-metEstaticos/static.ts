export class Pessoa {
  static idadePadrao = 0;
  static cpfUnico = '000.000.000-00';

  constructor(
    public nome: string,
    public sobrenome: string,
    public idade: number,
    public cpf: string,
  ) {}

  metodoNormal(): void {
    console.log(Pessoa.idadePadrao, Pessoa.cpfUnico, '\n');
  }

  static novaPessoa(nome: string, sobrenome: string): Pessoa {
    return new Pessoa(nome, sobrenome, Pessoa.idadePadrao, Pessoa.cpfUnico);
    // return new Pessoa(nome, sobrenome, 0, '000.000.000-00');
  }
}

const pessoa1 = new Pessoa('Magno', 'V Gomes', 52, '111.222.333-44');
const pessoa2 = Pessoa.novaPessoa('Antonio Gael', 'Vargas');
console.log(pessoa1, '\n');
console.log(pessoa2, '\n');
pessoa2.metodoNormal();
console.log(Pessoa.idadePadrao, Pessoa.cpfUnico, '\n');

// static agradeca(): void {
//   console.log('Deus é fiel!!', '\n');
// }
// pessoa.cpf = '111.222.333-44';
// Pessoa.agradeca();;
