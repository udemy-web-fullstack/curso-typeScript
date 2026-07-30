// Passo 1: A função do decorator é definida.

function decorator<T extends new (...args: any[]) => object>(_constructor: T) {
  // Passo 3: O JavaScript chama o decorator,
  // passando o construtor da classe como argumento.
  console.log('sou o Decorator');
}

// Passo 2: O JavaScript encontra a declaração da classe Pessoa e vê o @decorator.
@decorator
class Pessoa {
  constructor(public nome: string) {
    // Passo 6: O construtor SÓ roda quando instanciamos a classe com 'new'.
    console.log('sou o Construtor da classe');
  }
}

// Passo 4: A classe já foi processada pelo decorator e está pronta.
// O script continua sua execução normal abaixo.
console.log('Programa concluído');

// Passo 5: Somente aqui, ao fazer 'new', o construtor da classe Pessoa é chamado.
const p = new Pessoa('Magno');
console.log(p);
