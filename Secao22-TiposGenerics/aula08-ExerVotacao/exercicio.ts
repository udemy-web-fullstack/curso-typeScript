type OpcaoVotacao = {
  numDeVotos: number;
  opcao: string;
};

export class Votacao {
  private _opcoesVotacao: OpcaoVotacao[] = [];
  constructor(public escolha: string) {}

  addOpcaoVoto(opcaoVotacao: OpcaoVotacao): void {
    this._opcoesVotacao.push(opcaoVotacao);
  }

  voto(contVotacao: number) {
    if (!this._opcoesVotacao[contVotacao]) return;
    this._opcoesVotacao[contVotacao].numDeVotos += 1;
  }

  get opcoesVotacao(): OpcaoVotacao[] {
    return this._opcoesVotacao;
  }
}

export class AppVotacao {
  private votacoes: Votacao[] = [];

  addVoto(votacao: Votacao) {
    this.votacoes.push(votacao);
  }

  mostreVotacao(): void {
    for (const votacao of this.votacoes) {
      console.log(votacao.escolha);
      for (const opcaoVotacao of votacao.opcoesVotacao) {
        console.log(opcaoVotacao.opcao, opcaoVotacao.numDeVotos);
      }
      console.log('##### \n');
    }
  }
}

const votacao1 = new Votacao('Qual sua linguagem de Programação favorita?');
votacao1.addOpcaoVoto({ opcao: 'Python', numDeVotos: 0 });
votacao1.addOpcaoVoto({ opcao: 'Java', numDeVotos: 0 });
votacao1.addOpcaoVoto({ opcao: 'JavaScript', numDeVotos: 0 });

votacao1.voto(0);
votacao1.voto(1);
votacao1.voto(0);
votacao1.voto(1);
votacao1.voto(2);
votacao1.voto(0);

const votacao2 = new Votacao('Qual sua cor favorita?');
votacao2.addOpcaoVoto({ opcao: 'Azul', numDeVotos: 0 });
votacao2.addOpcaoVoto({ opcao: 'Verde', numDeVotos: 0 });
votacao2.addOpcaoVoto({ opcao: 'Preto', numDeVotos: 0 });

votacao2.voto(0);
votacao2.voto(1);
votacao2.voto(0);
votacao2.voto(1);
votacao2.voto(2);
votacao2.voto(0);

const votacaoApp = new AppVotacao();
votacaoApp.addVoto(votacao1);
votacaoApp.addVoto(votacao2);

votacaoApp.mostreVotacao();
