<?php

    header("Content-type: application/json");

    $local = "localhost" ;
    $user = "root";
    $senha = "";
    $banco = "loja";

    if( isset( $_REQUEST["buscar"] ) ){

        try {
            $conn = mysqli_connect( $local, $user, $senha, $banco );
            if( $conn ){
                $query = "SELECT * FROM produto ORDER BY nome";
                $result = mysqli_query( $conn, $query ); 

                $linhas = array();

                while( $row = mysqli_fetch_assoc( $result ) ){
                    $linhas[] = $row;
                }
                mysqli_close($conn);
                echo '{ "produtos" : '.json_encode($linhas).' } ';
            }else{
                echo '{ "resposta" : "Erro ao tentar conectar ao banco de dados!" } ';
            }
        } catch (\Throwable $th) {
            echo '{ "resposta" : "Erro no servidor!" } ';
        }
    }







    
    if( isset( $_REQUEST["inserir"] ) ){
        $nome = $_POST["name"];
        $preco = $_POST["price"];

        if( $nome != "" ){

            try {
                $conn = mysqli_connect( $local, $user, $senha, $banco );
                if( $conn ){
                    $query = "INSERT INTO produto (nome, preco) VALUES ( '$nome' , $preco ) ";
                    mysqli_query( $conn, $query ); 
                    $id = mysqli_insert_id( $conn );

                    mysqli_close($conn);
                    echo '{ "id" : '.$id.' } ';
                }
            } catch (\Throwable $th) {
                echo '{ "resposta" : "Erro no servidor!" } ';
            }

        }
    }