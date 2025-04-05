var express = require('express')
var http = require('http')

var app = express()

app.get( '/' , (req, res) => {
    res.status(200).send("Bem-vindo à nossa API REST")
} )

app.get( '/produtos' , (req, res) => {
    res.status(200).send("Aqui serão retornados os produtos")
} )

app.post( '/produtos' , (req, res) => {
    // inserir um produto no banco
    res.status(200).send("Aqui um produto será cadastrado")
} )

app.get( '/clientes' , (req, res) => {
    res.status(200).send("Aqui serão retornados os clientes")
} )

app.post( '/clientes' , (req, res) => {
    // inserir um cliente no banco
    res.status(200).send("Aqui um cliente será cadastrado")
} )

http.createServer(app).listen( 8001 , () => {
    console.log( "Servidor rodando em: http://localhost:8001" )
} )
