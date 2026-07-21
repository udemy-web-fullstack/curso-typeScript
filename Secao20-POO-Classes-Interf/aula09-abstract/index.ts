// Classes, métodos e atributos abstratos

export abstract class Personagem {
  protected abstract emoji: string;

  constructor(
    protected nome: string,
    protected ataque: number,
    protected vida: number,
  ) {}

  atacar(personagem: Personagem): void {
    this.bordao();
    personagem.perderVida(this.ataque);
  }

  perderVida(forcaAtaque: number): void {
    this.vida -= forcaAtaque;
    console.log(
      `${this.emoji} - ${this.nome} agora tem ${this.vida} de vida...`,
      '\n',
    );
  }

  abstract bordao(): void;
}

export class Lutadora extends Personagem {
  protected emoji = '\u{1F9DD}';

  bordao(): void {
    console.log(this.emoji + ' Guerreira Ataque pra valeerrrrrrrrrrr!!');
  }
}
export class Covarde extends Personagem {
  protected emoji = '\u{1F9DF}';
  bordao(): void {
    console.log(this.emoji + ' Ao ataqueeeeeee!!!');
  }
}

const lutadora = new Lutadora('Guerreira', 100, 1000);
const covarde = new Covarde('Covarde', 88, 1000);

lutadora.atacar(covarde);
covarde.atacar(lutadora);
lutadora.atacar(covarde);

covarde.atacar(lutadora);
lutadora.atacar(covarde);
covarde.atacar(lutadora);
covarde.atacar(lutadora);
