const express = require('express');

const server = express();

const port = process.env.PORT || 3000;

server.use(express.json());

const lista_produtos = { 
  produtos: [ 
      { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  }, 
      { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  }, 
      { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  }, 
      { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  }, 
      { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  }, 
  ] 
}

server.get('/produtos/:id', (req, res) => {
  const { id } = req.params;

  lista_produtos.produtos.forEach(produto => {
    if(produto.id == id) {
      return res.json(produto);
    } else {
      return false;
    }
  });

})

server.get('/produtos', (req, res) => {
  return res.json(lista_produtos.produtos)
})

server.post('/produtos', (req, res) => {
  const produto = req.body;
  lista_produtos.produtos.push(produto);

  return res.json(lista_produtos.produtos)
})

server.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const produto = req.body;
  lista_produtos.produtos.forEach((prod, index) => {
    if(prod.id == id) {
      lista_produtos.produtos[index] = produto;
      return res.json(lista_produtos.produtos);
    }
  });

});

server.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;

  lista_produtos.produtos.forEach((prod, index) => {
    console.log(id);
    if(prod.id == id) {
      console.log('Aqui')
      console.log(index);
      lista_produtos.produtos.splice(index, 1);
      return res.json({ message: 'O curso foi deletado.' });
    }
  });
})

server.listen(port, () => {
  console.info('Aplicação rodando em http://localhost:3000');
});