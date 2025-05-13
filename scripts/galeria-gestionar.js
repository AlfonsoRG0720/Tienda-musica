import { listaDiscos } from "./BBDD.js";
import { recuperarBbddLS, almacenarBbddLS } from "./galeria-discos.js";

function crearGaleriaLista(listaDiscos) {

  document.getElementById("Lista-Discos").innerHTML="";

    let galeria = document.getElementById("Lista-Discos");
        
    for (let i = 0; i < listaDiscos.length; i++) {
    
        let nuevoDisco=document.createElement("div")
    
        nuevoDisco.innerHTML=`<picture> 
                                <img src="/assets/${listaDiscos[i].imagen}" alt="">
                              </picture>
                              <div>
                                <h2>Nombre: ${listaDiscos[i].nombre}</h2>
                                <p>Año: ${listaDiscos[i].anio}</p>
                                <h3>Precio: ${listaDiscos[i].precio.toFixed(2)}</h3>
                              </div>
                              <div>
                                <button id="BTN-editar-gestionar-${listaDiscos[i].id}">Editar</button>
                                <button id="BTN-eliminar-gestionar-${listaDiscos[i].id}">Eliminar</button>
                              </div>`;
    
        galeria.appendChild(nuevoDisco);



        document.getElementById(`BTN-editar-gestionar-${listaDiscos[i].id}`).addEventListener("click", function () {
          datosEditarDiscos(listaDiscos[i]);
          document.querySelector("#Editar-Disco").addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("hola desde el submit de editar");

            const nombrePrueba=document.getElementById("NombreEditar").value;
            const anioPrueba=document.getElementById("AnioEditar").value;
            const imagenPrueba=document.getElementById("ImagenEditar").value;
            const precioPrueba=document.getElementById("PrecioEditar").value;

            listaDiscos[i].nombre=nombrePrueba;
            listaDiscos[i].anio=anioPrueba;
            listaDiscos[i].imagen=imagenPrueba;
            listaDiscos[i].precio= parseFloat(precioPrueba);

            console.log(listaDiscos);
            
            crearGaleriaLista(listaDiscos);
            console.log("empieza el guardar galeria con Disco unico editado en LS")
            almacenarBbddLS("BBDD",listaDiscos);
            
          })

          
        })



        document.getElementById(`BTN-eliminar-gestionar-${listaDiscos[i].id}`).addEventListener("click", function () {
          const confirmEliminar=confirm(`Seguro quieres eliminar el disco ${listaDiscos[i].nombre}?`);

          if (confirmEliminar) {
            eliminar(listaDiscos, listaDiscos[i].id);
          }
          
        })
    }

    function datosEditarDiscos(DiscoParaEditar) {
      console.log("Desde el enviar datos al formulario para editar ");
      console.log(DiscoParaEditar);
      const formularioEditar=document.querySelector("#Editar-Disco");
      formularioEditar.querySelector("#NombreEditar").value=DiscoParaEditar.nombre;
      formularioEditar.querySelector("#AnioEditar").value=DiscoParaEditar.anio;
      formularioEditar.querySelector("#ImagenEditar").value=DiscoParaEditar.imagen;
      formularioEditar.querySelector("#PrecioEditar").value=DiscoParaEditar.precio;
    }

    function eliminar(listaDiscos, id) {
            let temporal=[];
            let LocalStorage=recuperarBbddLS("BBDD")|| listaDiscos;
            console.log("Empieza eliminar")
    
            for (let i = 0; i < LocalStorage.length; i++) {
                
                if (LocalStorage[i].id != id) {
                    let temporal2=LocalStorage[i];
                    temporal.push(temporal2);
                } 
            }
    
            crearGaleriaLista(temporal);
            console.log("empieza el guardar galeria editada en LS")
            almacenarBbddLS("BBDD",temporal);
            
            
        }
}

function EscuchaAgregarDisco() {
  document.getElementById("AgregarDisco").addEventListener("click", function (event) {
    let agregar = document.getElementById("FormularioAgregar");
    agregar.classList.toggle("ocultar");
  })
}

function ObtenerValoresNuevos() {
  console.log("hola desde obtener valores");

  document.getElementById("FORM-AgregarDisco").addEventListener("submit", function (event) {
    event.preventDefault();

    let LocalStorage=[];
    LocalStorage=recuperarBbddLS("BBDD")|| listaDiscos;
    let idNuevo=LocalStorage.length+1;
    
    console.log(idNuevo);
    let nombre=document.getElementById("NombreNuevo").value;
    console.log(nombre);
    let anio=document.getElementById("AnioNuevo").value;
    console.log(anio);
    let imagen=document.getElementById("ImagenNuevo").value;
    console.log(imagen);
    let precio=document.getElementById("PrecioNuevo").value;    
    console.log(precio);

    //=====================COMPROBAR QUE NO ESTÁ VACÍO EL NUEVO DISCO==========================
    if (nombre==="" || anio==="" || imagen==="" || precio==="") {

      alert("Debes ingresar todos los campos del nuevo disco")

    } else {

      //=======================COMPARAR SI YA EXISTE EN LA BBDD=================================
      const comparar = LocalStorage.find(t => t.nombre === nombre);

      if (comparar) {

        alert("El disco ya existe en la base de datos")
        
      } else {
        let nuevoDisco={
          id:idNuevo,
          nombre:nombre,
          anio:anio,
          imagen:imagen,
          precio:parseFloat(precio)
        };
        
        LocalStorage.push(nuevoDisco);
        almacenarBbddLS("BBDD",LocalStorage);
        crearGaleriaLista(LocalStorage);
      }

    }
    
  })


}

function main() {

    let ListaDiscosRecuperada=recuperarBbddLS("BBDD")|| listaDiscos;
    crearGaleriaLista(ListaDiscosRecuperada);
    EscuchaAgregarDisco();
    ObtenerValoresNuevos();
}

document.addEventListener("DOMContentLoaded",main);