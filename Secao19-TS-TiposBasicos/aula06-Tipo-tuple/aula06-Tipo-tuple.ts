// Tuple

const dadosCliente1: readonly [number, string] = [1, 'Magno'];
const dadosCliente2: [number, string, string] = [1, 'Magno', 'V Gomes'];
const dadosCliente3: [number, string, string?] = [1, 'Magno', ''];
const dadosCliente4: [number, string, ...string[]] = [1, 'Magno', 'V Gomes'];

// dadosCliente1[0] = 100;
// dadosCliente1[1] = 'Claudemagno';

console.log(dadosCliente1);
console.log(dadosCliente2);
console.log(dadosCliente3);
console.log(dadosCliente4);

// // readonly array
const array1: readonly string[] = ['Magno', 'V Gomes'];
const array2: ReadonlyArray<string> = ['Magno', 'V Gomes'];

console.log(array1);
console.log(array2);

// Module mode
export default 1;
