let x: unknown;
// let x: any; não chega nada

x = 100;
x = 'Luiz';
x = 900;
x = 10;
const y = 800;

// console.log(x + y);

if (typeof x === 'number') console.log(x + y);

// Module mode
export default 1;
