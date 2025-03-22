function lerXML(){
    var req = new XMLHttpRequest()

    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            texto = this.responseText + " <hr> "
            var divXML = document.getElementById("divXML")
            divXML.innerHTML = texto

            var dadosXML = this.responseXML

            carro = dadosXML.getElementsByTagName("carro")
            
            var modelo = carro[0].getElementsByTagName("modelo")
            nomeModelo = modelo[0].childNodes[0].nodeValue

            motor = carro[0].getElementsByTagName("motor")[0].childNodes[0].nodeValue

            txt = "Modelo: " + nomeModelo + "<br>Motor: " + motor + "<br>Cores: "

            var tagCores = carro[0].getElementsByTagName("cores")
            cores = tagCores[0].getElementsByTagName("cor")
            for( i = 0; i < cores.length ; i++ ){
                txt += cores[i].childNodes[0].nodeValue + ' - '
            }

            estado = carro[0].getElementsByTagName("local")[0].getElementsByTagName("uf")[0].childNodes[0].nodeValue
            cidade = carro[0].getElementsByTagName("local")[0].getElementsByTagName("cidade")[0].childNodes[0].nodeValue
            txt += "<br>Estado: " + estado + "<br>Cidade: " + cidade + "<br>Opcionais: "

            var opcionais = carro[0].getElementsByTagName("opcionais")[0].getElementsByTagName("opcional")
            for( i = 0; i < opcionais.length ; i++ ){
                nome = opcionais[i].getElementsByTagName("nome")[0].childNodes[0].nodeValue
                marca = opcionais[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue
                txt += "<br><i>Nome no Opcional:</i> " + nome + " <i>Marca:</i> " + marca
            }
            divXML.innerHTML += txt
        }
    }

    req.open("GET" , "dados.xml", true)
    req.send()
}