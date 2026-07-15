export function criaErro(): never {
  throw new Error('Erro qualquer');
  // O código trava aqui! A função nunca chega ao fim.
}

criaErro();

// Module mode
export default 1;
