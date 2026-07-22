export class CarDeCompras {
  private readonly produtos: Produto[] = [];

  inserirProdutos(...produstos: Produto[]): void {
    for (const produto of produstos) {
      this.produtos.push(produto);
    }
  }

  qtdeProdutos(): number {
    return this.produtos.length;
  }

  valorTotal(): number {
    return this.produtos.reduce((soma, produto) => soma + produto.preco, 0);
  }
}

export class Produto {
  constructor(
    public nome: string,
    public preco: number,
  ) {}
}

const prod1 = new Produto('Camiseta', 59.9);
const prod2 = new Produto('Calça jeans', 99.9);
const prod3 = new Produto('Bermuda tactel', 89.9);
const carDeCompras = new CarDeCompras();

carDeCompras.inserirProdutos(prod1, prod2, prod3);
console.log(carDeCompras.valorTotal());
console.log(carDeCompras.qtdeProdutos());
