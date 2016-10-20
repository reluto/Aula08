//criamos a instancia do express, baseado no modulo de node que baixamos
var express = require('express');
var app = express();

//vamos iniicar o mongojs driver do mongo
var mongojs = require('mongojs')
var db = mongojs("mongodb://localhost:27017/escola", ["alunos"]);
//cadastramos métodos para verificar status da conexão com o mongo;
db.on('error', function (err) {
    console.log('database error', err)
})
db.on('connect', function () {
    console.log('database connected')
})


//vamos agora criar um endereço para o aluno
app.get('/aluno/all', function (req, res) {
 
 	//executamos a busca no mongo por todos os alunos
	db.alunos.find(function(err,docs) {
		//enviamos a resposta da busca
 		res.send(docs);	
 	})

  	
});


//vamos agora criar um endereço para o aluno
app.get('/aluno/:name', function (req, res) {
 	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

 	var reg = RegExp(req.params.name,"i");
 	var query = {name:reg};
	//executamos a busca no mongo por todos os alunos
	db.alunos.find(query,function(err,docs) {
		//enviamos a resposta da busca
 		res.send(docs);	
 	})

  
});


//iniciamos o servidor na porta 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:51071');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

