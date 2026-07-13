let x = 10;
x = 0b1010;
const y = 10;
const a = 100;

const pessoa = {
  nome: 'Magno' as const,
  sobrenome: 'V Gomes',
};

export function escolhaCor(cor: 'Azul' | 'Amarelo' | 'Tulipa'): string {
  return cor;
}
console.log(escolhaCor('Azul'), pessoa, x, y);
