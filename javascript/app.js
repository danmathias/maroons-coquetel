import { validar } from "./tarefaFormulario.js"
const entradas = document.querySelectorAll('[data-entrada]');
entradas.forEach(entrada => entrada.addEventListener('invalid', (evento) => {
    validar(evento.target)
},false))
entradas.forEach(entrada => entrada.addEventListener('input', (evento) => {
    validar(evento.target);    
}, false));
entradas.forEach(entrada => entrada.addEventListener('blur', (evento) => {    
     validar(evento.target);
},false));
