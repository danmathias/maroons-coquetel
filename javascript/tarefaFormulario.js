//  Início da tarefa que vai incluir máscaras nos inputs: Data de nascimento, Nome e sobrenome e telefone.     

//  FUNÇÃO GENÉRICA   
export function validar(dadosEntrada) {                
        const tipoDeEntrada = dadosEntrada.dataset.entrada;        
        // CONDIÇÕES FUNDAMENTAIS PARA QUE O CÓDIGO FAÇA PERCURSO CORRETAMENTE

        // Condição das máscaras do input do formulário.
        if (mascara[tipoDeEntrada]) 
            dadosEntrada.value = mascara[tipoDeEntrada](dadosEntrada);      

        // Condição para autorizar cadastro para clientes maiores de 18 anos e Digíto Verificador do CPF.
        if (campoInvalido[tipoDeEntrada])
            campoInvalido[tipoDeEntrada](dadosEntrada);             

        // Condição de mensagens de erro ou validação de campos da entrada de dados.
        if (!dadosEntrada.validity.valid) {
            //  Msg de erro personalizada para cada propriedade do objeto ValidityState
            dadosEntrada.parentElement.querySelector('.entrada__mensagem--erro').innerHTML       =apresentaMsgErro(tipoDeEntrada, dadosEntrada);
            dadosEntrada.parentElement.classList.remove('caixa__entrada--form--valido');
            dadosEntrada.parentElement.classList.add('caixa__entrada--form--invalido');
        }  else {
            dadosEntrada.parentElement.classList.remove('caixa__entrada--form--invalido');
            dadosEntrada.parentElement.classList.add('caixa__entrada--form--valido'); 
        }   
    }


    // Início da lógica para verificar tipos de erros de entrada no formulário.
    const tiposDeErroEntrada = [
        'valueMissing', 
        'typeMismatch',
        'patternMismatch',
        'customError'
    ]
    function apresentaMsgErro(tipoEntrada, dadosEntrada) {
        let msg = '';
        for (let indice = 0; indice < tiposDeErroEntrada.length; indice++) {
            const erro = tiposDeErroEntrada[indice];
            if (dadosEntrada.validity[erro]) {
                msg = mensagensErro[tipoEntrada][erro];
            }            
        }
        return msg
    }
    //  Objeto exclusivo para sinalização de dadosEntrada incorretos.
    const mensagensErro = {
        nome: {
            valueMissing: 'Insira o seu Nome, por favor.'
        }
        ,
        cpf: {
            valueMissing: 'Insira o número do seu CPF, por favor.',
            customError: 'Cpf inválido.'
        }
        ,
        nascimento: {
            valueMissing: 'Insira a sua Data de Nascimento, por favor.',
            customError: 'O cadastro só é autorizado para maiores de 18 anos!'
        }
        ,
        email: {
            valueMissing: 'Insira o seu Email, por favor.' ,
            typeMismatch: 'O formato do seu Email é inválido. Por favor, tente novamente'
        }
        , 
        telefone: {
            valueMissing: 'Insira o seu Número de Telefone, por favor.',
            patternMismatch: 'O número digitado é insuficiente.'
        }
        ,
        senha: {
            valueMissing: 'Insira a sua Senha, por favor.' ,
            patternMismatch: 'A Senha deve ter no mínimo 8 caracteres, que por regra são: 1 letra maiúscula e 1 minúscula, 1 número e 1 caractere especial, por exemplo($%@&+/).'
        }
    }
    // Fim da tarefa.

    
    
    
    // Início da lógica para inserção de máscaras nas entradas do formulário.    
    const mascara = {
        nascimento (dadosEntrada) {
            dadosEntrada = dadosEntrada.value.replace(/\D/g, "");
            dadosEntrada = dadosEntrada.replace(/(0[1-9]|1[0-9]|2[0-9]|3[0-1])(\d)/, '$1/$2');
            dadosEntrada = dadosEntrada.replace(/(0[1-9]|1[0-2])(\d)/, '$1/$2');
            dadosEntrada = dadosEntrada.replace(/([^3-9]\d{4})\d+?$/, "$1");            
            return dadosEntrada;          
        }
        , 
        cpf (dadosEntrada) {
            dadosEntrada = dadosEntrada.value.replace(/\D/g, '');
            dadosEntrada = dadosEntrada.replace(/(\d{3})(\d)/, '$1.$2');
            dadosEntrada = dadosEntrada.replace(/(\d{3})(\d)/, '$1.$2');
            dadosEntrada = dadosEntrada.replace(/(\d{3})(\d)/, '$1-$2');
            dadosEntrada = dadosEntrada.replace(/(-\d{2})\d+?$/, '$1');
            return dadosEntrada
        }
        ,        
        telefone (dadosEntrada) {                        
            dadosEntrada = dadosEntrada.value.replace(/\D/g, '');
            dadosEntrada = dadosEntrada.replace(/^(\d{2})(\d{4,5})(\d{4})/g, '($1) $2-$3');
            dadosEntrada = dadosEntrada.replace(/(-\d{4})\d+?$/g, '$1');
            return dadosEntrada;                       
        }        
    }
    // Fim da tarefa.
    
    
    // Início da lógica para para autorizar cadastro de maiores de 18 anos e o digíto verificador do CPF.

    const campoInvalido = {
         nascimento: dadosEntrada => confirmaDataNascimento(dadosEntrada.value)
         ,
        cpf: cpfDigitado => validarCpf(cpfDigitado.value)        
    }
    

    // Início da lógica para cadastro para maiores de 18 anos.
    function confirmaDataNascimento (dataEntrada) {
        let vetorData = dataEntrada.split("/")
        let mes = vetorData[1];
        let dia = vetorData[0];
         let ano = vetorData[2];
         let dataReconfigurada = `${mes}/${dia}/${ano}`;
         let dataSistemaOper = new Date(dataReconfigurada);
         let msg = '';        
         if (!idadeAutorizada(dataEntrada)) {                    
             msg = 'O cadastro só é autorizado para maiores de 18 anos!'
         } 
             dataEntrada.setCustomValidity('')           
     }
 
     function idadeAutorizada (data) {
         let objetoData = new Date().toLocaleDateString('pt-br')
         let diaNascUsuario = data.substring(0,2)
         let mesNascUsuario = data.substring(3,5)
         let anoNascUsuario = parseInt(data.substring(6,10))
         let idadeAutorizada = (anoNascUsuario + 18)
         let idadeUsuario = new Date(`${diaNascUsuario}/${mesNascUsuario}/${idadeAutorizada}`)

         let diaAtual = objetoData.getDate();
         let mesAtual = objetoData.getMonth() + 1;
         let anoAtual = objetoData.getFullYear();
         let dataAtual = `${diaAtual}${mesAtual}${anoAtual}`
         let idadePermitida = (data.getDate(), data.getMonth() , data.getFullYear() + 18)        
     }

    //  Fim da tarefa para clientes maiores de 18 anos.


  // Início da lógica do CPF verificador.  
    function validarCpf(dadosEntrada) {        
        let cpfSemMascara = dadosEntrada.replace(/\W/g, '');
        if (!checaCpf(cpfSemMascara) || !estruturaCpf(cpfSemMascara)) {
            dadosEntrada.setCustomValidity('Cpf inválido.')
        } else {
            dadosEntrada.setCustomValidity("")
        }
    }    
    function checaCpf(cpf) {                
        const cpfRepetido = [
            '00000000000',
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999'
        ];    
        let cpfValido = true;
        cpfRepetido.forEach(valor => {
            if (valor == cpf) {
             cpfValido = false
            }
        })        
        return cpfValido;         
    }

    function estruturaCpf(cpf) {        
        let multiplicador = 10
        return checarDigitoVerificador(cpf, multiplicador)
    }

    function checarDigitoVerificador(cpf, multiplicador) {
        //  Condição para o laço ser interrompido.
        if (multiplicador >= 12) return true;
        let soma = 0        
        //  Variável que impede que o valor multiplicador seja subscrito.        
        let multiplicadorInicial = multiplicador;        
        let cpfRecortado = cpf.substring(multiplicadorInicial - 1, 0).split('');
        let digitoVerificador = cpf.charAt(multiplicadorInicial - 1);      
        for (let contador = 0; multiplicadorInicial > 1 ; multiplicadorInicial--) {
             soma = soma + cpfRecortado[contador] * multiplicadorInicial
             contador++                         
        }
        if (digitoVerificador == confirmaDigito(soma)) {
            // O valor de retorno da função checar... com parametro multiplicador volta somando + 1, 
            // porque a próxima verificação  a ser feita no cpf, sera no décimo primeiro dígito.
            return checarDigitoVerificador(cpf, multiplicador + 1)    
        }
        return false
    }
    function confirmaDigito(soma) {
        return 11 - (soma % 11);       
    }  
    // Fim da tarefa CPF verifcador.



    //  Sequência de funções que manipulam a troca de abas do formulário.
    function inativarAbas () {
        abas.forEach(aba => aba.classList.remove('ativar'));
    }

    function esconderConteudo () {
        const conteudos = document.querySelectorAll('[data-conteudo]');
        conteudos.forEach(conteudo => conteudo.classList.add('esconder'));
    }
    
    function ativarConteudo (valor) {
        const conteudo = document.querySelector(`[data-conteudo= ${valor}]`);
        conteudo.classList.remove('esconder');
    }

    function ativarAba (aba) {
        aba.classList.add('ativar');
    }

    const abas = document.querySelectorAll('[data-aba]');
    abas.forEach(aba => aba.addEventListener('click', () => {
        const valor = aba.dataset.aba 
        
        inativarAbas();
        esconderConteudo();
        ativarConteudo(valor);        
        ativarAba(aba);
    }));
    //  Fim da tarefa abas
