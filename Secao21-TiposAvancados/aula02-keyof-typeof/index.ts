// ********** EXEMPLO DE TYPEOF **********

/* type CoresObj = {  com o typeof este bloco de type fica irrelevante
  azul: string;
  verde: string;
  rosa: string;
};

const coresObj = {  usa-se apenas este
  azul: 'blue',
  verde: 'green',
  rosa: 'pink',
};

function traduzirCor(cor: 'azul' | 'verde' | 'rosa', cores: typeof coresObj) {
  return cores[cor];
}

console.log(traduzirCor('azul', coresObj));
console.log(traduzirCor('verde', coresObj));
*/

// ********** EXEMPLO DE KEYOF **********

type CoresObj = typeof coresObj;
type CoresChaves = keyof CoresObj;

const coresObj = {
  azul: 'blue',
  verde: 'green',
  rosa: 'pink',
  roxo: 'purple',
};

function traduzirCor(cor: CoresChaves, cores: CoresObj) {
  return cores[cor];
}

console.log(traduzirCor('azul', coresObj));
console.log(traduzirCor('verde', coresObj));
console.log(traduzirCor('roxo', coresObj));
