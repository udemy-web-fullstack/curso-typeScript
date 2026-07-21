export class Pessoa {
  constructor(
    public nome: string,
    public sobrenome: string,
    private idade: number,
    protected cpf: string,
  ) {}

  getIdade(): number {
    return this.idade;
  }

  getCpf(): string {
    return this.cpf;
  }

  getNomeCompleto(): string {
    return this.nome + ' ' + this.sobrenome;
  }
}

export class Aluno extends Pessoa {
  constructor(
    nome: string,
    sobrenome: string,
    idade: number,
    cpf: string,
    public turma: string,
  ) {
    super(nome, sobrenome, idade, cpf);
  }

  getNomeCompleto(): string {
    console.log('**** antes da superclasse ****');
    const result = super.getNomeCompleto();
    return result + ' INCRIVÉLLLLLLLLL';
  }
}

export class Cliente extends Pessoa {
  getNomeCompleto(): string {
    return 'Aqui vem da classe cliente: ' + this.nome + ' ' + this.sobrenome;
  }
}

const pessoa = new Pessoa('Neusa', 'B Gomes', 55, '444.444.444-44');
const aluno = new Aluno('Magno', 'V Gomes', 52, '111.222.444-33', '8º D');
const cliente = new Cliente('Magno', 'Neto', 2, '123.456.789-00');

console.log(pessoa.getNomeCompleto(), '\n');
console.log(aluno.getNomeCompleto(), '\n');
console.log(cliente.getNomeCompleto(), '\n');
console.log(aluno, '\n');
