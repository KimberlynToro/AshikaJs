const stockProductos = [
  {
    id: 1,
    nombre: "Jersey de Rayas",
    cantidad: 1,
    desc: "Jersey de punto ajustado a la cintura con diseño de rayas, cuello perkins y de manga larga",
    precio: 4500,
    img: "img/jersey2.jpg",
  },
  {
    id: 2,
    nombre: "Jersey Canale",
    cantidad: 1,
    desc: "Jersey de punto canalé con cuello caja y de manga larga.",
    precio: 4200,
    img: "img/jersey3.jpg",
  },
  {
    id: 3,
    nombre: "Vestido Básico",
    cantidad: 1,
    desc: "Vestido básico canalé ajustado tipo skater con detalle de abertura, cuello redondo.",
    precio: 3000,
    img: "img/jersey4.jpg",
  },
  {
    id: 4,
    nombre: "Jersey Cropped",
    cantidad: 1,
    desc: "Jersey cropped multiposición de punto con escote cruzado, manga larga y en tejido de canalé.",
    precio: 2000,
    img: "img/jersey6.jpg",
  },
  {
    id: 5,
    nombre: "Vestido Halter",
    cantidad: 1,
    desc: "Vestido básico canalé ajustado tipo skater con detalle de abertura, cuello redondo,  color verde.",
    precio: 3000,
    img: "img/jersey5.jpg",
  },
  {
    id: 6,
    nombre: "Top Halter",
    cantidad: 1,
    desc: "Top halter multiposición de punto canalé con tirantes finos, cordones ajustables y detalle de ondulado en la parte de abajo.",
    precio: 2800,
    img: "img/jersey7.jpg",
  },
  {
    id: 7,
    nombre: "Crop Top",
    cantidad: 1,
    desc: "Crop top halter de punto calado con espalda abierta",
    precio: 3500,
    img: "img/jersey8.jpg",
  },
  {
    id: 8,
    nombre: "Jersey Perkins",
    cantidad: 1,
    desc: "Jersey básico de manga larga disponible en varios tonos, con cuello perkins y acabados en rib",
    precio: 4000,
    img: "img/jersey9.jpg",
  },
  
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();

  if(activarFuncion) {
  document.querySelector("#activarFuncion").click(procesarPedido);
}

});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } 
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const ropaId = id;
  carrito = carrito.filter((ropa) => ropa.id !== ropaId);
  mostrarCarrito();
}


function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Completa el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {

  const btn = document.getElementById('button');

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_qxwi0jn';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }


//  Rutas relativas

const novedades = document.getElementById("novedades");
const novedadesProductos = "json/novedades.json";

fetch(novedadesProductos) 
    .then(repuesta => repuesta.json())
    .then(datos => {
      datos.forEach( falda => {
        novedades.innerHTML += `
          <img class= "imgNove" src= ${falda.image} >
        `
      })
    })
    .catch(error => console.log(error))
    .finally( () => console.log("Fin de las Novedades"))

    console.log(novedadesProductos)


  
