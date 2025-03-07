pessoa = {
    nome : "Maria" ,
    anoNascimento : 1986 ,
    altura : 1.75 ,
    endereco : null ,
    temFilhos : true ,
    formacoes : [ "Técnico" , "Graduação" , "Mestrado" ] ,
    anoDeFormacao : [ 2006 , 2013 , 2017 ] , 
    conjuge : { nome : "João" , idade : 40 } ,
    filhos : [
        { nome : "Júlia" , idade : 16 } ,
        { nome : "Pedrinho" , idade : 10 } 
    ] ,
    getIdade : function(){
        return 2025 - this.anoNascimento;
    }
}

function imprimir(){
    var divImp = document.getElementById("divImpressao")
    divImp.innerHTML = "Nome: " + pessoa.nome 
    divImp.innerHTML += "<br>Ano Nascimento: " + pessoa.anoNascimento 
    divImp.innerHTML += "<br>Idade: " + pessoa.getIdade()
    divImp.innerHTML += "<br>Formações: "
    pessoa.formacoes.forEach( curso => {
        divImp.innerHTML +=  curso + " - "
    });
    divImp.innerHTML += "<br>Cônjuge: " + pessoa.conjuge.nome
    divImp.innerHTML += "<br>Filhos: "
    pessoa.filhos.forEach( filho => {
        divImp.innerHTML +=   "<br>" + filho.nome + " - Idade: " + filho.idade
    });
}