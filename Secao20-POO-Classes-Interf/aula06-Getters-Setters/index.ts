export class Pessoa {
  constructor(
    private nome: string,
    private sobrenome: string,
    private idade: number,
    private _cpf: string,
  ) {
    this.cpf = _cpf; // ← ① CHAMA o setter
  }

  set cpf(cpf: string) {
    // ← executa quando alguém ATRIBUI um valor
    console.log('SETTER foi chamado', '\n');
    this._cpf = cpf;
  }

  get cpf(): string {
    // ← executa quando alguém LÊ o valor
    console.log('GETTER tb foi chamado', '\n');
    return this._cpf.replace(/\D/g, '');
  }
}

const pessoa = new Pessoa('Magno', 'V Gomes', 52, '111.222.333-44');
// ↑ entra no constructor
// ↑ dentro do constructor chama o setter (①)

pessoa.cpf = '444.333.222-11'; // ← ② CHAMA o setter novamente

console.log(pessoa.cpf, '\n'); // ← ③ CHAMA o getter

/* ##### COMPORTAMENTO ANTIGO DE GET E SET #####
  getCpf(): string {
    return this.cpf.replace(/\D/g, '');
  }
  getNome(): string {
    return this.nome;
  }

  setCpf(valor: string): void {
    this.cpf = valor;
  }

  getCpf(): string {
    return this.cpf.replace(/\D/g, '');
  }

console.log(pessoa.getNome(), '\n');
*/
