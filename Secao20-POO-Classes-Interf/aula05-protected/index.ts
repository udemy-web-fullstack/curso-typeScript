export class Empresa {
  readonly nome: string;
  protected readonly freelancers: Freeler[] = [];
  private readonly cnpj: string;

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
}

export class MagnoTech extends Empresa {
  constructor() {
    super('MagnoTech', '00.111.222/0001-44')
  }

  popFreller(): Freeler| null {
    const freller = this.freelancers.pop();
    if (freller) return freller;
    return null
  }
}

export class Freeler {
  constructor(
    readonly nome: string,
    readonly sobrenome: string
  ) {}
}

const filial1 = new MagnoTech();

const freller1 = new Freeler('Magno', 'V Gomes');
const freller2 = new Freeler('Neusa', 'B Gomes');
const freller3 = new Freeler('Novato', 'Espera');

filial1.addFreller(freller1);
filial1.addFreller(freller2);
filial1.addFreller(freller3);

const frellerremoved = filial1.popFreller();
console.log('Colaborador removido: \n', frellerremoved, '\n')
console.log(filial1);
