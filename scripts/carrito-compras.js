//=======================CREACIÓN DE LISTA DE CARRITO DE COMPRAS======================

export function carritoPago(carrito) {

        let carritoTemporal = document.getElementById("Lista-carrito");
        let total=0;

        carritoTemporal.innerHTML="";
          
        for (let i = 0; i < carrito.length; i++) {
          
            let nuevoElementoCarrito = document.createElement("div");

            nuevoElementoCarrito.classList.add("nuevoDiscoCarrito")

            nuevoElementoCarrito.innerHTML = `<picture>
                                                 <img src="/assets/${carrito[i].imagen}" alt="">
                                              </picture>
                                              <div>
                                                <h4>${carrito[i].nombre}</h4>
                                                <div class="btns-cantidad"><button data-id="menosCant-${carrito[i].id}">-</button><p>${carrito[i].cantidad}</p><button data-id="masCant-${carrito[i].id}">+</button></div>
                                                <div>
                                                    <button data-id="borrar-${carrito[i].id}"><span class="material-symbols-outlined">
                                                    delete
                                                    </span></button>
                                                    <p>€${carrito[i].precio.toFixed(2)}</p>
                                                </div>
                                              </div>`;
            carritoTemporal.appendChild(nuevoElementoCarrito);
            const data=(`borrar-${carrito[i].id}`);
            document.querySelector(`[data-id=${data}]`).addEventListener("click", function () {
            
              let preguntarEliminar=confirm(`Deseas eliminar del carrito el disco: ${carrito[i].nombre}?`);

              if (preguntarEliminar) {
                let carritoDespuesBorrar = eliminarDiscoCarrito(carrito,carrito[i].id);
                carritoPago(carritoDespuesBorrar);
              }
              
            })

            const dataCantidadMenos=(`menosCant-${carrito[i].id}`);
            document.querySelector(`[data-id=${dataCantidadMenos}]`).addEventListener("click", function () {
            
              if (carrito[i].cantidad==1) {
                let preguntarEliminar=confirm(`Deseas eliminar del carrito el disco: ${carrito[i].nombre}?`);   //OJO!! ESTAMOS REPITIENDO CÓDIGO DE ELIMINAR DE LA FUNCIÓN DE ARRIBA!!

                if (preguntarEliminar) {
                  let carritoDespuesBorrar = eliminarDiscoCarrito(carrito,carrito[i].id);
                  carritoPago(carritoDespuesBorrar);
                }

              } else {
                reducirCantidad(carrito[i]);
                carritoPago(carrito);
              }

            })

            const dataCantidadMas=(`masCant-${carrito[i].id}`);
            document.querySelector(`[data-id=${dataCantidadMas}]`).addEventListener("click", function () {
             
              aumentarCantidad(carrito[i]);
              carritoPago(carrito);
            
            })

            total=total+carrito[i].precio;

        }

        const totalArticulosCarrito=document.getElementById("TotalArticulosCarrito");
        const sumaCarrito=document.getElementById("sumaCarrito");
        let cantCarritoUnidades=0;

        if (carrito.length==0) {
          
          totalArticulosCarrito.style.display="none";
          carritoTemporal.innerHTML="<h2 class=vacio>El carrito está vacío</h2>";
        } else {
          totalArticulosCarrito.style.display="flex";
          carrito.forEach(element => {
            cantCarritoUnidades=cantCarritoUnidades+element.cantidad;
          });
          sumaCarrito.innerHTML=cantCarritoUnidades;
        }

        guardarCarritoLS(carrito);
        document.getElementById("Total").innerText="€"+total.toFixed(2);

    
        
}

//=============================GUARDAR Y RECUPERAR CARRITO DEL LOCAL STORAGE========================

export function guardarCarritoLS(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function recuperarCarritoLS() {
  let carritoRecuperado=JSON.parse(localStorage.getItem("carrito"));
  return carritoRecuperado;
}

function eliminarDiscoCarrito(carritoAntesBorrar,id) {
  let nuevoCarrito=[];
  for (let i = 0; i < carritoAntesBorrar.length; i++) {
    if (carritoAntesBorrar[i].id != id) {
      nuevoCarrito.push(carritoAntesBorrar[i]);
    }
  }
  return nuevoCarrito;
}


//=====================FUNCIONES DE BOTONES DE REDUCIR Y AUMENTAR CANTIDAD EN CARRITO=======================

function reducirCantidad(carrito) {
  carrito.cantidad--;
}

function aumentarCantidad(carrito) {
  carrito.cantidad++;
}