export class Escritor {
  private _ferramenta: Ferramenta | null = null;

  constructor(private _nome: string) {}

  get nome(): string {
    return this._nome;
  }

  set ferramenta(ferramenta: Ferramenta | null) {
    this._ferramenta = ferramenta;
  }

  get ferramenta(): Ferramenta | null {
    return this._ferramenta;
  }

  escrever(): void {
    if (this.ferramenta === null) {
      console.log('Não posso escrever sem os meios adequados.', '\n');
      return;
    }
    this.ferramenta.escrever();
  }
}

export abstract class Ferramenta {
  constructor(private _nome: string) {}
  abstract escrever(): void;

  get nome(): string {
    return this._nome;
  }
}

export class Caneta extends Ferramenta {
  escrever(): void {
    console.log(`${this.nome} está escrevendo...`, '\n');
  }
}

export class MaqEscrever extends Ferramenta {
  escrever(): void {
    console.log(`${this.nome} está digitando...`, '\n');
  }
}

const escritor = new Escritor('Magno');
const caneta = new Caneta('Caneta do bico fino');
const maqEscrever = new MaqEscrever('Maquina tipo elétrica está digitando...');

// console.log(escritor.nome);
// console.log(caneta.nome);
// console.log(maqEscrever.nome, '\n');

escritor.ferramenta = caneta;
escritor.ferramenta = maqEscrever;
escritor.ferramenta = null;
escritor.escrever();
