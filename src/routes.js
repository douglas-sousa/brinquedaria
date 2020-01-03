
const routes = require('express').Router();
const ConsumidorController = require('./controllers/ConsumidorController');
const ProdutoController = require('./controllers/ProdutoController');
const CompraController = require('./controllers/CompraController');

//Definição de rotas

// Para consumidores
routes.get('/consumidor', ConsumidorController.buscaTodos);
routes.get('/consumidor/:id', ConsumidorController.buscaUm);
routes.put('/consumidor/:id', ConsumidorController.atualizaUm);
routes.delete('/consumidor/:id', ConsumidorController.excluiUm);
routes.post('/consumidor', ConsumidorController.criaUm);

// Para produtos
routes.get('/produto', ProdutoController.buscaTodos);
routes.get('/produto/:id', ProdutoController.buscaUm);
routes.put('/produto/:id', ProdutoController.atualizaUm);
routes.delete('/produto/:id', ProdutoController.excluiUm);
routes.post('/produto', ProdutoController.criaUm);

// Para compras
routes.get('/compra', CompraController.buscaTodos);
routes.get('/compra/:id', CompraController.buscaUm);
routes.delete('/compra/:id', CompraController.excluiUm);
routes.post('/compra', CompraController.criaUm);

module.exports = routes;