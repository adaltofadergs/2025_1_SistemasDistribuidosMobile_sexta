const restify = require("restify");
const errors = require("restify-errors");

const server = restify.createServer( {
    name : "Lojinha" ,
    version : "1.0.0"
})

server.use( restify.plugins.acceptParser( server.acceptable ) )
server.use( restify.plugins.queryParser() )
server.use( restify.plugins.bodyParser() )

server.listen( 8001, function(){
    console.log( "%s executando em: %s" , server.name, server.url)
} )

var conn = require( "knex" )( {
    client : "mysql" ,
    connection : {
        host : "localhost" ,
        user : "root" ,
        password : "" ,
        database : "loja"
    }
} )

server.get( "/produto" , (req, res, next) =>{ 
    conn( "produto" )
        .then(  (dados) =>{
            res.send( dados )
        } , next )  
 } )


 server.get( "/produto/:idProd" , (req, res, next) =>{ 
    id = req.params.idProd
    conn( "produto" )
        .where( "id" , id )
        .first()
        .then(  (dados) =>{
            res.send( dados )
        } , next )  
 } )

 server.post( "/produto" , (req, res, next) =>{ 
    conn( "produto" )
        .insert( req.body )
        .then(  (dados) =>{
            if( !dados ){
                return res.send( new errors.BadRequestError("Não foi possível inserir") )
            }
            res.send( dados )
        } , next )  
 } )

//  server.put( "/produto/:idProd" , (req, res, next) =>{ 
//     id = req.params.idProd
//     conn( "produto" )
//         .where( "id" , id )
//         .update( req.body )
//         .then(  (dados) =>{
//             if( !dados ){
//                 return res.send( new errors.BadRequestError("Não foi possível editar") )
//             }
//             res.send( dados )
//         } , next )  
//  } )

//  server.del( "/produto/:idProd" , (req, res, next) =>{ 
//     id = req.params.idProd
//     conn( "produto" )
//         .where( "id" , id )
//         .delete()
//         .then(  (dados) =>{
//             if( !dados ){
//                 return res.send( new errors.BadRequestError("Não foi possível excluir") )
//             }
//             return res.send( dados )
//         } , next )  
//  } )

 server.del("/produto/:idProd", (req, res, next) => {
    const id = req.params.idProd
    conn("produto")
        .where("id", id)
        .delete()
        .then((dados) => {
            if (!dados) {
                return next(new errors.NotFoundError("Produto não encontrado"))
            }
            res.send(200, { success: true })
            return next()
        }, (err) => {
            return next(new errors.BadRequestError("Não foi possível excluir"))
        })
})

 server.put("/produto/:idProd", (req, res, next) => {
    const id = req.params.idProd
    conn("produto")
        .where("id", id)
        .update(req.body)
        .then((dados) => {
            if (!dados) {
                return next(new errors.NotFoundError("Produto não encontrado"))
            }
            res.send(200, { success: true })
            return next()
        }, (err) => {
            return next(new errors.BadRequestError("Não foi possível editar"))
        })
})

server.get( "/" , (req, res, next) =>{ 
    //res.setHeader( 'Content-type' , 'application/json')
    res.send( { "resposta" : "Sejam bem-vindos à nossa Lojinha" } )
 } )