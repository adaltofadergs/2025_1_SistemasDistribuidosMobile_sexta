function lerJSON(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            var objJSON = JSON.parse( this.responseText )
            var conteudo = "Modelo: " + objJSON.modelo;
            conteudo += "<br>Ano: " + objJSON.ano; 
            conteudo += "<br>Motor: " + objJSON.motor; 
            if( objJSON.cambioAutomatico )
                conteudo += "<br>Tem câmbio automático: SIM";
            else
                conteudo += "<br>Tem câmbio automático: NÃO";

            conteudo += "<br>Cores: "
            objJSON.cor.forEach( color => {
                conteudo += color + " - "
            });
            conteudo += "<br>Local: " + objJSON.local.cidade + " / " + objJSON.local.uf;
            conteudo += "<br>Opcionais: " ;
            objJSON.opcionais.forEach( op =>{
                conteudo += "<br>Nome: " + op.nome + " | Marca: " + op.marca ;
            });
            document.getElementById("divCarro").innerHTML = conteudo;
        }else if( this.readyState == 4){
            alert("Erro na requisição: " + this.responseText );
        }
    }

    req.open("GET" , "dados.json", true);
    req.send()
}