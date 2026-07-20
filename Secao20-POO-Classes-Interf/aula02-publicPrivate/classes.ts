import { pull } from 'lodash';

export class Empresa {
  readonly nome: string; // public não necessário
  private readonly freelancers: Freeler[] = [];
  // readonly freelancers: Freeler[] = [];
  // freelancers: Freeler[] = [];
  protected readonly cnpj: string;

  constructor(nome: string, cnpj: string) {
    this.nome = nome;
    this.cnpj = cnpj;
  }

  addFreller (freller: Freeler): void {
    this.freelancers.push(freller);
  }

  mostrarFreller(): void {
    for (const freller of this.freelancers) {
      console.log(freller);
    }
  }
  // getNome(): string { apenas para exemplificar o public
  //   return this.nome;
  // }
}


export class Freeler {
  constructor(
    readonly nome: string,      // public não necessário
    readonly sobrenome: string  // public não necessário
  ) {}
}

const filial1 = new Empresa('MagnoDev', '00.111.222/0001-44');
const freeler1 = new Freeler('Magno', 'V Gomes');
const freeler2 = new Freeler('Neusa', 'B Gomes');
const freeler3 = new Freeler('Novato', 'Espera');

filial1.addFreller(freeler1);
filial1.addFreller(freeler2);
filial1.addFreller(freeler3);

// filial1.freelancers = [];

// filial1.freelancers.pop();
// filial1.freelancers.pop();
// filial1.freelancers.pop();

console.log(filial1);


// console.log(filial1.nome);
// console.log(filial1.getNome(), filial1.nome, '\n');
// filial1.mostrarFreller();
