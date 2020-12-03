$(function() { 
    
 
    function exibir_clientes() {
        $.ajax({
            url: 'http://localhost:5000/listar_clientes',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar (clientes) {
            
            $('#corpoTabelaClientes').empty();
         
            mostrar_conteudo("tabelaClientes");      
          
            for (var i in clientes) { 
                lin = '<tr id="linha_'+clientes[i].id+'">' + 
                '<td>' + clientes[i].username + '</td>' + 
                '<td>' + clientes[i].password + '</td>' + 
                '<td>' + clientes[i].name + '</td>' + 
                '<td>' + clientes[i].email + '</td>' + 
                '<td>' + clientes[i].cpf + '</td>' + 
                '<td>' + clientes[i].rg + '</td>' + 
                '<td>' + clientes[i].celular + '</td>' + 
                '<td>' + clientes[i].endereco + '</td>' +
                '<td><a href=# id="excluir_' + clientes[i].id + '" ' + 
                  'class="excluir_cliente"><img src="img/excluir.png" '+
                  'alt="Excluir Cliente" title="Excluir Cliente"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaClientes').append(lin);
            }
        }
    }
   
    
    function mostrar_conteudo(identificador) {
      
        $("#tabelaClientes").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }

   
    $(document).on("click", "#linkListarClientes", function() {
        exibir_clientes();
    });
    
    
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

  
    $(document).on("click", "#btIncluirCliente", function() {
      
        username = $("#campoUsername").val();
        password = $("#campoPassword").val();
        name = $("#campoName").val();
        email = $("#campoEmail").val();
        cpf = $("#campoCpf").val();
        rg = $("#campoRg").val();
        celular = $("#campoCelular").val();
        endereco = $("#campoEndereco").val();

      
        var dados = JSON.stringify({ username: username, password: password, name: name, email: email, cpf: cpf, rg: rg, celular: celular, endereco: endereco });
     
        $.ajax({
            url: 'http://localhost:5000/incluir_cliente',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: clienteIncluido, 
            error: erroAoIncluir
        });
        function clienteIncluido (retorno) {
            if (retorno.resultado == "ok") { 
                
                alert("Cliente incluído com sucesso!");
              
                $("#campoUsername").val("");
                $("#campoPassword").val("");
                $("#campoName").val("");
                $("#campoEmail").val("");
                $("#campoCpf").val("");
                $("#campoRg").val("");
                $("#campoCelular").val("");
                $("#campoEndereco").val("");

            } else {
               
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
    function erroAoIncluir (retorno) {
           
            alert("ERRO: "+ retorno.resultado + ":" + retorno.detalhes);
        }
    });


    $('#modalIncluirCliente').on('hide.bs.modal', function (e) {
        
        if (! $("#tabelaClientes").hasClass('invisible')) {
    
            exibir_clientes();
        }
    });

    
    mostrar_conteudo("conteudoInicial");


    $(document).on("click", ".excluir_cliente", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_";
        var id_cliente = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/excluir_cliente/'+id_cliente,
            type: 'DELETE', 
            dataType: 'json', 
            success: clienteExcluida, 
            error: erroAoExcluir
        });
        function clienteExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_cliente).fadeOut(1000, function(){
                  
                    alert("Cliente removido da lista");
                });
            } else {
                
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            
            alert("Erro ao excluir cliente da lista");
        }
    });
    
});


