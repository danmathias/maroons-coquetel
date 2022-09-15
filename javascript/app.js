import { movimentaAbas, validar, verASenha } from "./tarefaFormulario.js"


const entradas = document.querySelectorAll('[data-entrada]');
entradas.forEach(entrada => entrada.addEventListener('input', (evento) => {
    validar(evento.target);    
}, false));

const abas = document.querySelectorAll('[data-aba]');
abas.forEach(aba => aba.addEventListener('click', function (evento)  {
    movimentaAbas(evento.target, abas);
}, false));

const vejaSenhas = document.querySelectorAll('[data-mostra-senha]');
vejaSenhas.forEach(vejaSenha => vejaSenha.addEventListener('click', function () {    
    const senha =  document.getElementById('senha');
    const confirmaSenha = document.getElementById('confirma-senha');
    verASenha(senha, confirmaSenha);
}, false));



