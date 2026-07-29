// Decorator (@) de classes no TS - Introdução

// Decorators -> funções precedidas por @ que adicionam comportamento
// a classes, métodos, propriedades ou parâmetros.

@decorator
export class Animal {
  constructor(
    public nome: string,
    public cor: string,
  ) {}
}

function decorator<T extends new (...args: any[]) => any>(target: T) {
  return class extends target {
    cor: string;
    nome: string;

    constructor(...args: any[]) {
      super(...args);
      this.nome = this.invert(args[0]);
      this.cor = this.invert(args[1]);
    }

    invert(valor: string): string {
      return valor.split('').reverse().join('');
    }
  };
}

const animal = new Animal('Kakau', 'Pintado');
console.log(animal);

/* ***** Forma longa codado na mão *****

export class Animal {
  constructor(public cor: string) {}
}

function decorator(target: any) {
  console.log('AQUI é a função do DECORATOR\n');

  return target;
}

const AnimalDecorated = decorator(Animal);
const animal = new AnimalDecorated('Pintado');
console.log(animal);
*/
