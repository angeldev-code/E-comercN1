// Passo 1 - importar o motor do banco (sqite3) é o cerebro tradutor

const sqlite3 = require("sqlite3");

const { open } = require("sqlite");

// PAsso 2 Criar a função assincrona para gerenciar o banco

const criarBanco = async () => {
  // Passo 3 Abrir ou criar o arquivo de banco de dados

  const db = await open({
    filename: "./database.db",
    // nome do arquivo que será criado

    driver: sqlite3.Database, // o motor que vai realizar as operações
  });

  // Passo 4: Criar a tabela de produtos

  await db.exec(`
    CREATE TABLE IF NOT EXISTS produto (
     id INTERGIR PRIMARY KEY AUTOINCREMENT,          
     nome TEXT,
     categoria TEXT,
     quantidade INTERGER,
     preço REAL
    )
    `);

  console.log(`Tabela criada com sucesso`);

  // passo 5: Inserir dados na nossa tabela (linhas) - C - Create - INSERT

  await db.exec(`INSERT INTO PRODUTOS (nome, categoria, quantidade, preço ) VALUES
    
    (Smarphone Samsung G24','Eletronicos', 50,2500),
    ('Notebook Dell Inspiron','Informatica' ,15,4200,50),
    ('Cadeira Gamer RGB', 'Moveis',10,1200,00)`);

  console.log(`Tabela criada e estoque abstecido`);

  // Passo 6 Buscar todos os produtos

  const inventario = await db.all(`Select``FROM produtos`);

  console.table(inventario);

  // passo7: buscando um produto especifico
  const produtoEspecifico = await db.all(
    `SELECT preco FROM produtos WHERE id = 2`,
  );
  console.log(produtoEspecifico);

  // atualizarinformações (U-Update)

  await db.run(`
        UPDATE produtos        -- Atualize a tabela produtos
        SET preco = 4500.00    -- Definindo que o notebook vai ser 4500.00
        WHERE id = 2           -- Cuidado sem WHERE vai atuaizar todos os preços 
        `);
  console.log("Preço do notebook atuaizado com sucesso!");

  //consultando novamente se a alteração realmente aconteceu

  const produtoAtualizado = await db.get(`
            SELECT = FROM produtos`);
  console.table(produtoAtualizado);

  //atualizando multiplos campos
  await db.run(`
        UPDATE produtos 
        SET preco = 5100.23,
        quantidade = 30
        WHERE id = 2
        
        `);

  //REMOVER UM PRODUTO (D - Deletar)
  await db.run(`
        DELETE FROM produtos
        WHERE id = 3
        
        `);

   await db.exec(`
    INSERT INTO produtos (nome , categoria, quantidade, preco) VALUES
    ("mouse", "informatica", 10 , 40.00)
    
    
    `);
};

criarBanco();
