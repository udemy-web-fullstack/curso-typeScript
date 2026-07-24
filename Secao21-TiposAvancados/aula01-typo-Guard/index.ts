export function add(a: unknown, b: unknown) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : `${a}${b}`;
}

console.log(add(1, 5));
console.log(add('a', 'b'));

/* type Pessoa = { nome: string };
type Animal = { raca: string };
export class Aluno implements Pessoa {
  constructor(public nome: string) {}

function mostraNome(obj: PessoaOuAnimal) {
  if ('nome' in obj) console.log(obj.nome);
  if (obj instanceof Aluno) console.log(obj.nome);
}
*/

type Pessoa = { tipo: 'pessoa'; nome: string };
type Animal = { tipo: 'animal'; raca: string };
type PessoaOuAnimal = Pessoa | Animal;

export class Aluno implements Pessoa {
  tipo: 'pessoa' = 'pessoa';
  constructor(public nome: string) {}
}

function mostraNome(obj: PessoaOuAnimal) {
  switch (obj.tipo) {
    case 'pessoa':
      console.log(obj.nome);
      return;
    case 'animal':
      console.log('Parece ser um pet', obj.raca);
      return;
  }
}

mostraNome(new Aluno('Gael'));
mostraNome({ tipo: 'animal', raca: 'de raça pura.' });
