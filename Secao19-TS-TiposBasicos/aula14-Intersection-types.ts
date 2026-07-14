// Definindo tipos separados
type TemNome = { nome: string };
type TemIdade = { idade: number };
type TemCargo = { cargo: string };

// Criando o Intersection Type com o operador '&'
// Aqui, o tipo 'Funcionario' precisa obrigatoriamente ter nome, idade E cargo.
type Funcionario = TemNome & TemIdade & TemCargo;

// Agora, ao criar o objeto, o TypeScript vai te cobrar todas as propriedades:
const magno: Funcionario = {
  nome: 'Magno V Gomes',
  idade: 52, // Exemplo
  cargo: 'Desenvolvedor Full Stack'
};

console.log(magno);


/*

type TemNome = { nome: string };
type TemSobrenome = { sobrenome: string };
type TemIdade = { idade: number };
type Pessoa = TemNome & TemSobrenome & TemIdade; // AND

type AB = 'A' | 'B';
type AC = 'A' | 'C';
type AD = 'D' | 'A';
type Intersecao = AB & AC & AD;

const pessoa: Pessoa = {
  nome: 'Magno',
  sobrenome: 'V Gomes',
  idade: 52,
};

console.log(pessoa);

// Module mode
export { pessoa };
*/