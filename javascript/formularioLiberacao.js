const liberaPaginaPrincipal = document.querySelector("[data-main-content]");
const ocultaForm = document.querySelector('[data-form-content]');
const botaoAcesso = document.querySelector('[data-login-button]');
const caixasConteudo = document.querySelectorAll('.caixa__conteudo');

function liberarAcesso () {

   // Valores do select pais e input de idade.
   let idade = document.querySelector('[data-ano]');
   let localizacao  = document.querySelector('[data-pais]'); 

   //O parametro evento, encontra o alvo clicado para ativar o evento alteração de estado.
   caixasConteudo.forEach(container => container.addEventListener('change', () => { 
      const tituloPais = document.querySelector('.rotulo--localizacao');     
      const tituloIdade = document.querySelector('.rotulo--idade');
      tituloPais.innerText = localizacao.options[localizacao.selectedIndex].textContent;        
      const idadeDigitada = tituloIdade.innerText = idade.options[idade.selectedIndex].textContent;
      const idadeMinima = 18;      
      if (idadeDigitada >= idadeMinima && localizacao) {
         botaoAcesso.classList.remove('desabilitar');
      } else {
         botaoAcesso.classList.add('desabilitar');
      }
   }));

   localizacao.value = null;
   idade.value = null;


   // Código para armazenamento dos dados de idade e pais.
   function tempoCookie(idadeUsuario, paisUsuario) {
      const tempo = new Date();
      tempo.toLocaleDateString("pt-BR");
      tempo.setTime(tempo.getTime() + (24 * 60 * 60 *1000));
      let expiraArmazenamento = "expires="+ tempo.toUTCString();
      let cookieIdade = document.cookie = idadeUsuario + "=" + decodeURIComponent(idade.options[idade.selectedIndex].textContent) + ";" + "SameSite=Lax" + ";" + expiraArmazenamento + ";path=/"; 
      let cookiePais = document.cookie = paisUsuario + "=" + decodeURIComponent(localizacao.options[localizacao.selectedIndex].textContent)  + ";" + "SameSite=Lax" + ";" + expiraArmazenamento + ";path=/";   
    }

    function verificaMemoria(idadeUsuario, paisUsuario) {
      let anos = idadeUsuario + "=";
      let pais = paisUsuario + "=";
      let decodificaCookie = decodeURIComponent(document.cookie);
      let valorCookieSeparado = decodificaCookie.split(';');
      for(let indice = 0; indice < valorCookieSeparado.length; indice++) {
        let cookieAnalisado = valorCookieSeparado[indice];
        while (cookieAnalisado.charAt(0) == ' ') {
          cookieAnalisado = cookieAnalisado.substring(1);
        }
        if (cookieAnalisado.indexOf(anos) && cookieAnalisado.indexOf(pais) == 0) {
          return cookieAnalisado.substring(anos.length, pais.length, cookieAnalisado.length);
        }
      }
      return " ";
    }

   function armazenaCookie() {
    let usuario = verificaMemoria("Idade", "Pais");
    if (usuario != " ") {
      liberaPaginaPrincipal.classList.remove('esconder');
      ocultaForm.classList.add('esconder');
    } else {
      usuario = tempoCookie ("Idade", "Pais");    
      liberaPaginaPrincipal.classList.remove('esconder');
      ocultaForm.classList.add('esconder');
    }
   }

   
  let cookie = window.document.cookie;
  if(cookie) armazenaCookie();

  botaoAcesso.addEventListener('click', armazenaCookie);  
  
}


liberarAcesso();