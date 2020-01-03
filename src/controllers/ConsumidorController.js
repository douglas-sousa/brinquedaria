const Consumidor = require('../models/Consumidor');
const db = require('../db');

db.connect((err) => {
  if(!err) return console.log('Connection succesful');
  console.log('Connection failed\n' + err);
});

class ConsumidorController {
  buscaTodos(req, res) {
    db.query(Consumidor.selectAll, (err, rows, fields) => {
      if(!err) return res.status(200).json(rows);

      //Se houver erro
      res.status(500).send(err);
    })
  }

  buscaUm(req, res) {
    const { id } = req.params;

    db.query(Consumidor.selectOne, [id], (err, rows, fields) => {
      if(!err) {
        //Se rows retornar com dados de usuário, o usuário procurado foi achado
        if(rows.length) return res.status(200).json(rows);
        
        //Se rows estiver vazio, o usuário pelo id procurado não existe
        return res.status(204)
      }

      //Se houver erro
      res.status(500).send(err);
    })
  }

  atualizaUm(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    db.query(Consumidor.updateOne, [nome, id], (err, rows, fields) => {
      if(!err) {
        //Se rows retornar com colunas afetadas, o usuário foi atualizado
        if(!!rows.affectedRows) return res.status(200).json({
          message: 'Consumidor atualizado com sucesso',
          id,
          nome
        });
        
        //Se rows estiver vazio, o usuário pelo id procurado não existe
        return res.status(204)
      }

      //Se houver erro
      res.status(500).send(err);
    })
  }

  excluiUm(req, res) {
    const { id } = req.params;

    db.query(Consumidor.deleteOne, [id], (err, rows, fields) => {
      if(!err) {
        //Se rows retornar com colunas afetadas, o usuário foi excluído
        if(!!rows.affectedRows) return res.status(200).json({
          message: 'Consumidor excluído com sucesso',
          id
        });
        
        //Se rows estiver vazio, o usuário pelo id procurado não existe
        return res.status(204)
      }

      //Se houver erro
      res.status(500).send(err);
    })
  }

  criaUm(req, res) {
    const { nome } = req.body;

    db.query(Consumidor.insertOne, [nome], (err, rows, fields) => {
      if(!err) {
        //Se rows retornar com colunas afetadas, o usuário foi criado
        if(!!rows.affectedRows) return res.status(200).json({
          message: 'Consumidor criado com sucesso',
          nome,
          id: rows.insertId
        });
      }

      //Se houver erro
      res.status(500).send(err);
    })
  }
    
}

module.exports = new ConsumidorController();