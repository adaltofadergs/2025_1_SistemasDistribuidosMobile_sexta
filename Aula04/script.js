function buscarProdutos(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            objJSON = JSON.parse( this.responseText );

            if( objJSON.resposta ){
                alert( objJSON.resposta );
            }else{
                txt = ' <table border="1" > ';
                txt += '    <tr> ';
                txt += '        <th>Id</th>';
                txt += '        <th>Nome</th>';
                txt += '        <th>Preço</th>';
                txt += '    </tr> ';

                objJSON.produtos.forEach( prod => {
                    txt += '<tr> ';
                    txt += '    <td>' + prod.id + '</td>';
                    txt += '    <td>' + prod.nome + '</td>';
                    txt += '    <td>' + prod.preco + '</td>';
                    txt += '</tr> ';
                });
                txt += '</table>';
                document.getElementById("divProdutos").innerHTML = txt;
            }
            
        }else if( this.readyState == 4){
            alert("Erro na requisição: " + this.responseText );
        }
    }

    req.open("GET" , "servidor.php?buscar", true);
    req.send()
}


function inserir(){
    nome = document.getElementById("txtNome").value;
    if( nome == "" ){
        alert( "O camo NOME deve ser preenchido!");
    }else{
        var req = new XMLHttpRequest();

        req.onreadystatechange = function(){
            if( this.readyState == 4 && this.status == 200 ){

                objJSON = JSON.parse( this.responseText );
                if( objJSON.resposta ){
                    alert( objJSON.resposta );
                }else{
                    alert( "ID gerado: " + objJSON.id);
                }
                buscarProdutos();
            }
        };

        preco = document.getElementById("txtPreco").value;
        preco = preco.replace( "," , "." );

        req.open("POST" , "servidor.php?inserir", true);
        req.setRequestHeader("Content-type" ,"application/x-www-form-urlencoded");
        req.send("name=" + nome + "&price=" + preco);

    }
}


/*
Exercício: 

Contruir a função que exclui produtos

1) Fazer com que na tabela exista um botão excluir para cada produtos
2) Ao clicar no botão excluir, chamar a função no script que faz uma requisição AJAX para o servidor.php, 
acionando a função excluir que lá deve existir.
3) Ao ser excluido um produto, a tabela deve ser atualizada automaticamente. 
*/