function decorator<T extends new (...args: any[]) => object>(_constructor: T) {
  console.log('Decorator');
}

@decorator
class Pessoa {
  constructor() {
    console.log('Construtor executado');
  }
}

console.log('Antes da instância');

const p = new Pessoa();
console.log(p);
