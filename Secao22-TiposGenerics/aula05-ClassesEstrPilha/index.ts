//Classes em Generics -> Estrutura de dados pilha

export class Pessoa<T, U> {
  constructor(
    public nome: T,
    public idade: U,
  ) {}
}

export class Pilha<T> {
  private contador = 0;
  private elementos: { [k: number]: T } = {};

  push(elemento: T): void {
    this.elementos[this.contador] = elemento;
    this.contador++;
  }

  pop(): T | void {
    if (this.pilhaVazia()) return undefined;

    this.contador--;
    const elemento = this.elementos[this.contador];
    delete this.elementos[this.contador];
    return elemento;
  }

  pilhaVazia(): boolean {
    return this.contador === 0;
  }

  qtde(): number {
    return this.contador;
  }

  exibirPilha(): void {
    for (const chave in this.elementos) {
      console.log(this.elementos[chave]);
    }
  }
}

const pilha = new Pilha<number | string>();
pilha.push(1);
pilha.push(2);
pilha.push(3);
pilha.push(4);
pilha.push('Magno');

// pilha.exibirPilha();

while (!pilha.pilhaVazia()) {
  console.log(pilha.pop());
}

/*
const pessoa1 = new Pessoa('Magno', 52);
const pessoa2 = new Pessoa(['Magno'], 52);
const pessoa3 = new Pessoa(['Magno'], { idade: 52 });
const pessoa4 = new Pessoa<string, number>('Magno', 52);
*/
