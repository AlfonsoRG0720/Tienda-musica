import { listaDiscos, carrito } from "./BBDD.js";
import { carritoPago, recuperarCarritoLS } from "./carrito-compras.js";
import { ordenarLista, cuentaItems, vaciarCarrito, recuperarBbddLS, funcionPaginacion, almacenarBbddLS } from "./galeria-discos.js";



console.table(listaDiscos);
export let estilo=true;


export function mainIndex() {
    
    //=======================================================================

    let bbdd=recuperarBbddLS("BBDD") || listaDiscos;
    cuentaItems(bbdd);
    almacenarBbddLS("BBDD", bbdd);
    let carroRecuperado=recuperarCarritoLS() || carrito;
    carritoPago(carroRecuperado);
    funcionPaginacion(bbdd, estilo);

    //============================CREACIÓN DE GALERIA=============================

    document.getElementById("Cuadricula").addEventListener("click", function () {

        document.getElementById("Gallery").classList.remove("lista-discos");
        document.getElementById("Gallery").classList.add("gallery");
        estilo=true;
        console.log("este es el estilo: "+ estilo);
        bbdd=recuperarBbddLS("BBDD") || listaDiscos;
        funcionPaginacion(bbdd, estilo);
    });

    document.getElementById("Lista").addEventListener("click", function () {

        document.getElementById("Gallery").classList.remove("gallery");
        document.getElementById("Gallery").classList.add("lista-discos");
        estilo=false;
        console.log("este es el estilo: "+ estilo);
        bbdd=recuperarBbddLS("BBDD") || listaDiscos;
        funcionPaginacion(bbdd, estilo);
    });

    //=============================GUARDAR Y RECUPERAR CARRITO========================

    document.getElementById("BTN-vaciar-carrito").addEventListener("click", vaciarCarrito);

    //===================================ORDENAR GALERIA==============================

    document.getElementById("OrdenarGaleria").addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("esto es en el evento de ordenar")
        bbdd=recuperarBbddLS("BBDD") || listaDiscos;
        console.log(bbdd);
        console.log(estilo);
        ordenarLista(bbdd, estilo);
    });
    
}

document.addEventListener("DOMContentLoaded",mainIndex);

