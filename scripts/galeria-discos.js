import { carrito } from "./BBDD.js";
import { carritoPago, recuperarCarritoLS, guardarCarritoLS } from "./carrito-compras.js";

function agregarEscuchas(disco) {
  const id=disco.id;
  const idTexto=id.toString();
  
  document.getElementById(idTexto).addEventListener("click", function () {
    let carroRecuperado=recuperarCarritoLS();
    const productoEnCarrito=carroRecuperado.find((productId) => id===productId.id)
    
    if (productoEnCarrito) {

      for (let i = 0; i < carroRecuperado.length; i++) {  
        if (carroRecuperado[i].id===id) {
          carroRecuperado[i].cantidad++;
        } 
      }
      guardarCarritoLS(carroRecuperado)
      carritoPago(carroRecuperado);
      return
    }
    if (carroRecuperado != null) { 

      disco.cantidad=1;
      carroRecuperado.push(disco);
      carritoPago(carroRecuperado);
    }  
  })
}

//=================================Vacía el carrito======================================
export function vaciarCarrito() {
  carrito.length = 0;
  carritoPago(carrito)
}

//=========================Indica la cantidad de items en la galería========================
export function cuentaItems(lista) {
  const cantidadDiscos=document.getElementById("CantidadItems");
  const total=lista.length;
  cantidadDiscos.innerText=`Total de discos: ${total}`
}


//=====================Ordenación de la lista por precio o por año=============================
export function ordenarLista(lista, estilo) {

  console.log("Esto es dentro de la función ordenar")
  console.log(lista);
  console.log(estilo);

  const orden=parseInt(document.querySelector("[name='Select']").value);
  let ordenTemporal=[];
  console.log(orden);
  console.table(lista);

  switch (orden) {
    case 1:
      ordenTemporal=[];
      const longitudArrayTemporal1=lista.length;
      for (let j = 0; j < longitudArrayTemporal1; j++) {
        let indiceMinimo = 0;

        for (let i = 1; i < lista.length; i++) {
    
          if (lista[i].anio <= lista[indiceMinimo].anio) {
          indiceMinimo = i;
          }
        }

        ordenTemporal[j]=lista[indiceMinimo];
        lista.splice(indiceMinimo, 1);

      }

      console.log("Empieza el orden 1");
      console.table(ordenTemporal);
      almacenarBbddLS("BBDD", ordenTemporal);
      funcionPaginacion(ordenTemporal, estilo);
      break;

    case 2:
      ordenTemporal=[];
      const longitudArrayTemporal2=lista.length;
      for (let j = 0; j < longitudArrayTemporal2; j++) {
        let indiceMinimo = 0;

        for (let i = 1; i < lista.length; i++) {
    
          if (lista[i].anio >= lista[indiceMinimo].anio) {
          indiceMinimo = i;
          }
        }

        ordenTemporal[j]=lista[indiceMinimo];
        lista.splice(indiceMinimo, 1);

      }

      console.log("Empieza el orden 2");
      console.table(ordenTemporal);
      almacenarBbddLS("BBDD", ordenTemporal);
      funcionPaginacion(ordenTemporal, estilo);
      break;

    case 3:
      ordenTemporal=[];
      const longitudArrayTemporal3=lista.length;
      for (let j = 0; j < longitudArrayTemporal3; j++) {
        let indiceMinimo = 0;

        for (let i = 1; i < lista.length; i++) {
    
          if (lista[i].precio <= lista[indiceMinimo].precio) {
          indiceMinimo = i;
          }
        }

        ordenTemporal[j]=lista[indiceMinimo];
        lista.splice(indiceMinimo, 1);

      }

      console.log("Empieza el orden 3");
      console.table(ordenTemporal);
      almacenarBbddLS("BBDD", ordenTemporal);
      funcionPaginacion(ordenTemporal, estilo);
      break;

    case 4:
      ordenTemporal=[];
      const longitudArrayTemporal4=lista.length;
      for (let j = 0; j < longitudArrayTemporal4; j++) {
        let indiceMinimo = 0;

        for (let i = 1; i < lista.length; i++) {
    
          if (lista[i].precio >= lista[indiceMinimo].precio) {
          indiceMinimo = i;
          }
        }

        ordenTemporal[j]=lista[indiceMinimo];
        lista.splice(indiceMinimo, 1);

      }

      console.log("Empieza el orden 4");
      console.table(ordenTemporal);
      almacenarBbddLS("BBDD", ordenTemporal);
      funcionPaginacion(ordenTemporal, estilo);
      break; 
  
    default:
      alert("Error en el orden");
      
      break;
  }

}

//=================Con el orden modificado se crea la galería en lista o en cuadrícula=====================

export function crearGaleria(listaDiscos) {
    console.log("Empieza crear galeria")
    document.getElementById("Gallery").innerHTML="";
    let galeria = document.getElementById("Gallery");
    
    for (let i = 0; i < listaDiscos.length; i++) {
        let nuevoDisco = document.createElement("div")
    
        nuevoDisco.innerHTML=`<picture> 
                                <img src="/assets/${listaDiscos[i].imagen}" alt="">
                              </picture>
                              <div>
                                <h2>${listaDiscos[i].nombre}</h2>
                                <p>${listaDiscos[i].anio}</p>
                                <h3>Precio: €${listaDiscos[i].precio.toFixed(2)}</h3>
                                <button id="${listaDiscos[i].id}">🛒 Añadir al carrito</button>
                              </div>`;

        

        galeria.appendChild(nuevoDisco);   

        agregarEscuchas(listaDiscos[i]);
        
    }
}

export function crearGaleriaVertical(listaDiscos) {
  document.getElementById("Gallery").innerHTML="";
  let galeria = document.getElementById("Gallery");
      
  for (let i = 0; i < listaDiscos.length; i++) {
  
      let nuevoDisco = document.createElement("div");
  
      nuevoDisco.innerHTML=`<picture> 
                              <img src="/assets/${listaDiscos[i].imagen}" alt="">
                            </picture>
                            <div>
                              <div>
                                <h2>Nombre: ${listaDiscos[i].nombre}</h2>
                                <p>Año: ${listaDiscos[i].anio}</p>
                                <h3>Precio: €${listaDiscos[i].precio.toFixed(2)}</h3>
                              </div>
                              <div>
                                <button id="${listaDiscos[i].id}">🛒 Añadir al carrito</button>
                              </div>
                            </div>`;
  
      galeria.appendChild(nuevoDisco);

      agregarEscuchas(listaDiscos[i]);
  }
}

//============================Recupera la BBDD del LocalStorage=========================
export function recuperarBbddLS(clave) {
  let BBDDRecuperado=JSON.parse(localStorage.getItem(clave));
  console.log(BBDDRecuperado);
  return BBDDRecuperado;
}

//=========================Guarda la BBDD modificada en el LocalStorage=================
export function almacenarBbddLS(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
  console.log("Dato guardado en localStorage:", clave);
}

//=============================Función de paginación==================================
export function funcionPaginacion(bbdd, estilo) {
  let paginaActual=1;
  const cantidadDiscosMostrar=12;
  
  let paginasTotales=Math.ceil(bbdd.length/cantidadDiscosMostrar);
  let arraySeparado=separarbbdd(bbdd, paginasTotales, cantidadDiscosMostrar);

  paginacionPaginaActual(paginaActual, paginasTotales);

  ordenMostrar(arraySeparado[paginaActual-1], estilo);

  

  let btnAnteriorOriginal = document.getElementById("BTN-anterior");
  let btnSiguienteOriginal = document.getElementById("BTN-siguiente");

  let btnAnterior = btnAnteriorOriginal.cloneNode(true);
  let btnSiguiente = btnSiguienteOriginal.cloneNode(true);

  btnAnteriorOriginal.replaceWith(btnAnterior);
  btnSiguienteOriginal.replaceWith(btnSiguiente);  

  btnAnterior=document.getElementById("BTN-anterior");
  habilitarBTNAnterior(btnAnterior, paginaActual)
  btnAnterior.addEventListener("click", () => {
    paginaActual--;
    habilitarBTNSiguiente(btnSiguiente, paginaActual, paginasTotales)
    habilitarBTNAnterior(btnAnterior, paginaActual)
    ordenMostrar(arraySeparado[paginaActual-1], estilo);  
    paginacionPaginaActual(paginaActual, paginasTotales)
    console.log("Dentro del click de pagina anterior: "+paginaActual)
  })

  btnSiguiente=document.getElementById("BTN-siguiente");
  habilitarBTNSiguiente(btnSiguiente, paginaActual, paginasTotales)
  btnSiguiente.addEventListener("click", () => {
    paginaActual++;
    habilitarBTNAnterior(btnAnterior);
    habilitarBTNSiguiente(btnSiguiente, paginaActual, paginasTotales)
    ordenMostrar(arraySeparado[paginaActual-1], estilo);
    paginacionPaginaActual(paginaActual, paginasTotales)  
    console.log("Dentro del click de pagina siguiente: "+paginaActual)
  })

}

function habilitarBTNAnterior(btnAnterior, paginaActual) {
  btnAnterior.disabled=paginaActual===1;
}

function habilitarBTNSiguiente(btnSiguiente, paginaActual, paginasTotales) {
  btnSiguiente.disabled=paginaActual===paginasTotales;
}

function paginacionPaginaActual(paginaActual, paginasTotales) {
  let paginasCantidad=document.getElementById("Paginacion");
  paginasCantidad.innerText=`Pagina ${paginaActual} de ${paginasTotales}`
}

export function separarbbdd(bbdd, paginasTotalesSeparar, cantidadDiscosPagina) {

  let arrayPaginado=[];
  let z=0;
  let largoDeBbdd=bbdd.length;

  for (let i = 0; i < paginasTotalesSeparar; i++) {

    arrayPaginado[i] = [];            

    for (let j = 0; j < cantidadDiscosPagina; j++) {
      
      arrayPaginado[i][j]=bbdd[z];
      z++;
      largoDeBbdd--;

      if (largoDeBbdd==0) {
        break
      }

    }
    
    if (largoDeBbdd==0) {
        break
      }

  }

  console.log(arrayPaginado);

  return(arrayPaginado);

}

function ordenMostrar(arraySeparado, estilo) {
  
  console.log(arraySeparado);

  if (estilo) {
      console.log("dentro del if galeria cuadricula")
      crearGaleria(arraySeparado);
    } else {
      console.log("dentro del if galeria lista")
      crearGaleriaVertical(arraySeparado);
  }
}