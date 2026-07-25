export class Calculadora {
  constructor(public numero: number) {}

  add(n: number): this {
    this.numero += n;
    return this;
  }

  sub(n: number): this {
    this.numero -= n;
    return this;
  }

  div(n: number): this {
    this.numero /= n;
    return this;
  }

  mult(n: number): this {
    this.numero *= n;
    return this;
  }
}

export class SubCalc extends Calculadora {
  pow(n: number): this {
    this.numero **= n;
    return this;
  }
}

// const calculadora = new Calculadora(10);
const calculadora = new SubCalc(10);
calculadora.add(5).mult(2).div(2).sub(10).pow(2);

// console.log(calculadora);

//************************************************************

// Builder - GoF
export class RequestBuilder {
  private method: 'get' | 'post' | null = null;
  private url: string | null = null;

  setMethod(method: 'get' | 'post'): this {
    this.method = method;
    return this;
  }

  seturl(url: string): this {
    this.url = url;
    return this;
  }

  send(): void {
    console.log(`Trasportando dados via ${this.method} para ${this.url}`);
  }
}

const request = new RequestBuilder(); // aqui é o Builder
request.seturl('https://api.magnovgomes.me').setMethod('post').send();
