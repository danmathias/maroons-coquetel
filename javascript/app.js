import { movimentaAbas, validar } from "./tarefaFormulario.js"


const entradas = document.querySelectorAll('[data-entrada]');
entradas.forEach(entrada => entrada.addEventListener('input', (evento) => {
    validar(evento.target);    
}, false));

const abas = document.querySelectorAll('[data-aba]');
abas.forEach(aba => aba.addEventListener('click', (evento) => {
    movimentaAbas(evento.target, abas);
}, false));

c
const vejaSenhas = document.querySelectorAll('[data-mostra-senha]');
vejaSenhas.forEach(vejaSenha => vejaSenha.addEventListener('click', () => {
    
    
    // const senha = document.getElementById("senha");
    // console.log(senha.value);
    // if(senha.type === "password") {
    //     senha.type = "text";
    // } else {
    //     senha.type = "password";
    // }    
}, false));



