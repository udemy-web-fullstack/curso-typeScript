export function funcao(this: Date, name: string, age: 52): void {
  console.log(this);
  console.log(name, age);
}

funcao.call(new Date(), 'Magno', 52);
funcao.apply(new Date(), ['Magno', 52]);
