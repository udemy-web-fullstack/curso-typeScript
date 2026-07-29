/* Utility Types em generics - os genericos padrões

No curso (TS antigo), era usado para tratar o arquivo como módulo
e evitar avisos do TypeScript/ESLint. Nas versões atuais, geralmente
 não é mais necessário quando já existe import/export.*/

// Records -> cria um objeto tipado: define o tipo das chaves e o tipo dos valores.
const Pessoa1: Record<string, string | number> = {
  nome: 'Magno',
  sobrenome: 'V Gomes',
  idade: 52,
};
console.log(Pessoa1);

type ProtocoloDePessoas = {
  nome?: string;
  sobrenome?: string;
  idade?: number;
};

// Required<T> -> torna todas as propriedades opcionais obrigatórias.
type PessoaRequired = Required<ProtocoloDePessoas>;

// Partial<T> todas as propriedades voltam a serem opcionais.
type PessoaPartial = Partial<PessoaRequired>;

// Readonly<T> impede alterações.
type PessoaReadonly = Readonly<PessoaRequired>;

// Pick<T, K> → seleciona apenas algumas propriedades.
type PessoaPick = Pick<PessoaRequired, 'nome' | 'sobrenome'>;

const Pessoa2: PessoaReadonly | PessoaPartial | PessoaPick = {
  // interceções para o erro sair
  nome: 'Magno',
  sobrenome: 'V Gomes',
  idade: 52,
};
console.log(Pessoa2, '\n');

// Exclude<T, U> → remove tipos de uma união.
// Extract<T, U> → mantém apenas os tipos em comum.

type ABC = 'A' | 'B' | 'C';
type CDE = 'C' | 'D' | 'E';

type TipoExclude = Exclude<ABC, CDE>; // 'A' | 'B'
type TipoExtract = Extract<ABC, CDE>; // 'C'

const itensExcluidos: TipoExclude[] = ['A', 'B'];
const itensExtraidos: TipoExtract[] = ['C'];

itensExcluidos.forEach((item) => console.log(item));
itensExtraidos.forEach((item) => console.log(item));

type AccountMongo = {
  _id: string;
  nome: string;
  idade: number;
  sobrenome: string;
};

type AccountApi = Pick<AccountMongo, Exclude<keyof AccountMongo, '_id'>> & {
  id: string;
};

const accountMongo: AccountMongo = {
  _id: 'adfj35845gngfn48g',
  nome: 'Magno',
  idade: 52,
  sobrenome: 'V Gomes',
};

function mapAccount(accountMongo: AccountMongo): AccountApi {
  const { _id, ...accountDate } = accountMongo;
  return { ...accountDate, id: _id };
}

const accountApi = mapAccount(accountMongo);
console.log('\nAPI');

console.log(accountApi);

/* abaixo o código usa tipo normal, sem usar os generics padrão

type AccountMongo = {
  _id: string;
  nome: string;
  idade: number;
};

type AccountApi = {
  id: string;
  nome: string;
  idade: number;
};

const accountMongo: AccountMongo = {
  _id: 'adfj35845gngfn48g',
  nome: 'Magno',
  idade: 52,
};

function mapAccount(accountMongo: AccountMongo): AccountApi {
  const { _id, ...accountDate } = accountMongo;
  return { ...accountDate, id: _id };
}

const accountApi = mapAccount(accountMongo);
console.log('\nAPI');

console.log(accountApi); */

// Module mode
export default 1;
