// Decorator Composition
type Constructor = new (...args: any[]) => any;

function inverteNomeECor(param1: string, param2: string) {
  return function (target: Constructor) {
    console.log('Sou o decorador e recebi:', target);

    return class extends target {
      cor: string;
      nome: string;

      constructor(...args: any[]) {
        super(...args);
        this.nome = this.invert(args[0]);
        this.cor = this.invert(args[1]);
      }

      invert(valor: string): string {
        return `${valor.split('').join('')} ${param1} ${param2}`;
      }
    };
  };
}

function composicaoDecorator(param1: string) {
  return function (target: Constructor) {
    console.log('Sou a composição do 1º decorador', param1);
    return target;
  };
}

@composicaoDecorator('\nSou o parâmetro do 2º decorator') // decarator 2
@inverteNomeECor('Magno1', 'Magno2') // decarator 1
export class Animal {
  constructor(
    public nome: string,
    public cor: string,
  ) {
    console.log('Sou a classe');
  }
}

const animal = new Animal('Kakau', 'Marronzinha');
console.log(animal);
