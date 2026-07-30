// Method property (Decoradores de Propriedades)

// Observação (2026):
// Nas versões atuais do TypeScript/JavaScript, o comportamento dos
// Property Decorators pode diferir do mostrado no curso (gravado há anos).
// Por isso, este exemplo pode não inverter o valor da propriedade.

function decorator(_classPrototype: any, _nome: string | symbol): any {
  let valorProperty: any;
  return {
    get: () => valorProperty,
    set: (valor: any) => {
      valorProperty = valor.split('').reverse().join('');
    },
  };
}

export class UmaPessoa {
  @decorator
  nome: string;
  @decorator
  sobrenome: string;
  idade: number;

  constructor(nome: string, sobrenome: string, idade: number) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.idade = idade;
  }

  metodo(msg: string): string {
    return `${this.nome} ${this.sobrenome}: ${msg}`;
  }

  get nomeCompleto(): string {
    return this.nome + ' ' + this.sobrenome;
  }

  set nomeCompleto(valor: string) {
    const palavras = valor.split(/\s+/g);
    const primeiroNome = palavras.shift();
    if (!primeiroNome) return;
    this.nome = primeiroNome;
    this.sobrenome = palavras.join(' ');
  }
}

const pessoa = new UmaPessoa('Magno', 'V Gomes', 52);
const metodo = pessoa.metodo('Deus é fiel!!');
console.log(metodo);

/*
function decorador(_classPrototype: any, _nome: string | symbol): any {
  let valorPropriedade: any;
  return {
    get: () => valorPropriedade,
    set: (valor: any) => {
      if (typeof valor === 'string') {
        valorPropriedade = valor.split('').reverse().join('');
        return;
      }
      valorPropriedade = valor;
    },
  };
}

export class UmaPessoa {
  @decorador
  nome: string;
  @decorador
  sobrenome: string;
  @decorador
  idade: number;

  constructor(nome: string, sobrenome: string, idade: number) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.idade = idade;
  }

  metodo(msg: string): string {
    return `${this.nome} ${this.sobrenome}: ${msg}`;
  }

  get nomeCompleto(): string {
    return this.nome + ' ' + this.sobrenome;
  }

  set nomeCompleto(valor: string) {
    const palavras = valor.split(/\s+/g);
    const primeiroNome = palavras.shift();
    if (!primeiroNome) return;
    this.nome = primeiroNome;
    this.sobrenome = palavras.join(' ');
  }
}

const pessoa = new UmaPessoa('Luiz', 'Otávio', 30);
const metodo = pessoa.metodo('Olá mundo!');
console.log(metodo);


*/
