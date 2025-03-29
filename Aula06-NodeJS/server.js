const http = require('http');
var mysql  = require('mysql');

const hostname = '127.0.0.1';
const port = 3000;


var conn = mysql.createConnection( { 
    host : "localhost" ,
    user : "root" , 
    password : "" ,
    database : "loja"
 } );


const server = http.createServer(  (req, res) => { 
    res.statusCode = 200;
    res.setHeader( 'Content-type' , 'application/json' );
     //res.end( "Olahhhh Mundo!")

    try{

        conn.connect( function( erro ) {
            if( !erro ){
                conn.query( "SELECT * FROM produto ORDER BY nome" , function( err , result , fields ){
                    if( err ){
                        res.end( ' { "resposta" : "Erro ao executar a consulta" } ' );
                    }else{
                        res.end( JSON.stringify( result ) );
                    }
                } );
            }else{
                res.end( ' { "resposta" : "Erro ao conectar com o banco de dados" } ' );
            }
         } );

    }catch( error ) {
        res.end( ' { "resposta" : "Erro no servidor" } ' );
    }
} );

server.listen( port , hostname , () => {
    console.log( `Servidor sendo executado em : http://${hostname}:${port}` );
 } );
