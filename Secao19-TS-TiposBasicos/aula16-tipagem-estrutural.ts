// 1. Definimos o formato que nossa função espera
type TipoPessoa = { nome: string };

function mostraNome(pessoa: TipoPessoa) {
  console.log(pessoa);
}

// 2. Criamos um objeto comum (sem dizer explicitamente que ele é do tipo 'TipoPessoa')
const usuario = {
  nome: 'Magno',
  idade: 52, // Tem uma propriedade extra!
  cidade: 'Gama' // Mais uma extra!
};

// 3. Isso funciona perfeitamente! 
// O TS apenas olha se o objeto tem a propriedade 'nome: string'. O resto ele ignora.
mostraNome(usuario);


/*
type VerifyUserFn = (user: User, sentValue: User) => boolean;
type User = { username: string; password: string };

const verifyUser: VerifyUserFn = (user, sentValue) => {
  return (
    user.username === sentValue.username && user.password === sentValue.password
  );
};

const bdUser = { username: 'joao', password: '123456' };
const sentUser = { username: 'joao', password: '123456', permissions: '' };
const loggedIn = verifyUser(bdUser, sentUser);
console.log(loggedIn);
*/