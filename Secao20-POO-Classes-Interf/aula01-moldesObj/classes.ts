export class Empresa {
  public readonly nome: string; // public não necessário
  private readonly freelancers: Freeler[] = [];
  protected readonly cnpj: string;

  constructor(nome: string, cnpj: string) {
    this.nome = nome;
    this.cnpj = cnpj;
  }

  addFreller(freller: Freeler): void {
    this.freelancers.push(freller);
  }

  mostrarFreller(): void {
    for (const freller of this.freelancers) {
      console.log(freller);
    }
  }
}

export class Freeler {
  constructor(
    public readonly nome: string,
    public readonly sobrenome: string,
  ) {}
}

const filial1 = new Empresa('MagnoDev', '00.111.222/0001-44');
const freeler1 = new Freeler('Magno', 'V Gomes');
const freeler2 = new Freeler('Neusa', 'B Gomes');
const freeler3 = new Freeler('Novato', 'Espera');

filial1.addFreller(freeler1);
filial1.addFreller(freeler2);
filial1.addFreller(freeler3);

console.log(filial1, '\n');
filial1.mostrarFreller();

//Forma mais cumprida / Longa
//   export class Empresa {
//   public readonly nome: string;
//   private readonly freelancers: freeler[] = [];
//   protected readonly cnpj: string;
// }
