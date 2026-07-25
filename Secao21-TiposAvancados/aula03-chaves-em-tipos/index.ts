type veiculo = {
  marca: string;
  ano: number; // aqui o certo é uma string
};

type Car = {
  brand: veiculo['marca']; // aqui pega a chave marca garantindo que não troque o valor
  year: veiculo['ano']; // aqui tb pega a chave marca garantindo que não troque o valor
  name: string;
};

const carro: Car = {
  brand: 'hyundai',
  year: '2010', // aqui por ter trocado 'ano' de string para number, reclamou
  name: 'VeraCruz',
};

console.log(carro);
