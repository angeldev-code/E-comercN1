// Passo 1 - importar o motor do banco (sqlite3)

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// Passo 2 - Criar a função assíncrona para gerenciar o banco

const criarBanco = async () => {

  // Passo 3 - Abrir ou criar o arquivo do banco

  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database
  });

  // Passo 4 - Criar tabela

  await db.exec(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      categoria TEXT,
      quantidade INTEGER,
      preco REAL
    )
  `);

  console.log("Tabela criada com sucesso!");

  // Passo 5 - Inserir dados

  await db.exec(`
    INSERT INTO produtos (nome, categoria, quantidade, preco) VALUES
    ('Smartphone Samsung G24','Eletronicos',50,2500),
    ('Notebook Dell Inspiron','Informatica',15,4200.50),
    ('Cadeira Gamer RGB','Moveis',10,1200.00)
  `);

  console.log("Tabela criada e estoque abastecido!");

  // Passo 6 - Buscar todos os produtos

  const inventario = await db.all(`
    SELECT * FROM produtos
  `);

  console.table(inventario);

  // Passo 7 - Buscar produto específico

  const produtoEspecifico = await db.all(`
    SELECT preco FROM produtos WHERE id = 2
  `);

  console.log(produtoEspecifico);

  // Passo 8 - Atualizar preço

  await db.run(`
    UPDATE produtos
    SET preco = 4500.00
    WHERE id = 2
  `);

  console.log("Preço do notebook atualizado com sucesso!");

  // Passo 9 - Consultar novamente

  const produtoAtualizado = await db.all(`
    SELECT * FROM produtos
  `);

  console.table(produtoAtualizado);

  // Passo 10 - Atualizar múltiplos campos

  await db.run(`
    UPDATE produtos
    SET preco = 5100.23,
        quantidade = 30
    WHERE id = 2
  `);

  console.log("Produto atualizado!");

  // Passo 11 - Deletar produto

  await db.run(`
    DELETE FROM produtos
    WHERE id = 3
  `);

  console.log("Produto removido!");

  // Passo 12 - Inserir novo produto

  await db.exec(`
    INSERT INTO produtos (nome, categoria, quantidade, preco)
    VALUES ('Mouse','Informatica',10,40.00)
  `);

  console.log("Novo produto inserido!");

};

criarBanco();