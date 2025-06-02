import { listaDiscos } from "./BBDD.js";
import { iniciarPaginaHome } from "./galeria-discos.js";
import { mainGestionar } from "./galeria-gestionar.js";



console.table(listaDiscos);

export function mainIndex() {
    
    const path = window.location.pathname;
    console.log(path);
    
    switch (true) {
        case path.endsWith("/index.html"):
            iniciarPaginaHome();
            break

        case path.endsWith("/gestionar.html"):
            mainGestionar();
            break
        
        default:
            iniciarPaginaHome();
    }    
}

document.addEventListener("DOMContentLoaded",mainIndex);

