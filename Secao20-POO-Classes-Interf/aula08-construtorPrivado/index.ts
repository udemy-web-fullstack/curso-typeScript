export class DataBase {
  private static database: DataBase;

  private constructor(
    private host: string,
    private user: string,
    private password: string,
  ) {}

  connect(): void {
    console.log(`Conectado: ${this.host}, ${this.user}, ${this.password}`);
  }

  static getDatabase(host: string, user: string, password: string): DataBase {
    if (DataBase.database) {
      console.log('Retornando instância existente.', '\n');
      return DataBase.database;
    }
    console.log('Criando nova instância', '\n');

    DataBase.database = new DataBase(host, user, password);
    return DataBase.database;
  }
}

const database1 = DataBase.getDatabase('localhost', 'root', '12345');
database1.connect();

const database2 = DataBase.getDatabase('localhost', 'root', '12345');
database2.connect();

const database3 = DataBase.getDatabase('localhost', 'root', '12345');
database3.connect();

const database4 = DataBase.getDatabase('localhost', 'root', '12345');
database4.connect();

console.log(database1 === database2, '\n');
