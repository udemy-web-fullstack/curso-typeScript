// Decorator factories (Fábrica de Decoradores)
function inverteNomeECor(param1: string, param2: string) {
  // Closure
  return function <T extends new (...args: any[]) => any>(target: T) {
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
        return `${valor.split('').reverse().join('')} ${param1} ${param2}`;
      }
    };
  };
}

@inverteNomeECor('Magno1', 'Magno2')
export class Animal {
  constructor(
    public nome: string,
    public cor: string,
  ) {
    console.log('Sou a classe');
  }
}

const animal = new Animal('Kakau', 'Pintado');
console.log(animal);
