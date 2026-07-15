/* Recomendado */

// Condicional
const body1 = document.querySelector('body');
if (body1) body1.style.background = 'blue';

// Type assertion
const body3 = document.querySelector('body') as HTMLBodyElement;
body3.style.background = 'blue';

// HTMLElement
const input = document.querySelector('.input') as HTMLInputElement;
input.value = 'Aprendendo TypeScript';
input.focus();

//************************************************************************

/* Não Recomendado */

// Type assertion
const body4 = (document.querySelector('body') as unknown) as number;

// Non-null assertion (!)
const body2 = document.querySelector('body')!;
body2.style.background = 'red';


//**************************************************************************

// 1. O TypeScript acha que isso é apenas um 'Element' genérico ou 'null'
const body5 = document.querySelector('body');

// 2. Com a Asserção (as), nós garantimos que ele é especificamente o HTMLBodyElement
const body6 = document.querySelector('body') as HTMLBodyElement;
