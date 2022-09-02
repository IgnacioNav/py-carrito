// Variables
const carrito = document.querySelector('#carrito');                     
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); 
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let precioTotal = document.querySelector('.precio-total');
let cantidadProducto = document.querySelector('.contador-producto')
let articulosCarrito = [];
let totalCarrito = 0;
let contadorProducto = 0;

cargarEventListeners();
function cargarEventListeners() {
    // Agregar al Carrito
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
        
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement

        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito.forEach(curso => {
            if(curso.id === cursoId){
                let disminuirPrecio = parseFloat(curso.precio) * parseFloat(curso.cantidad);
                totalCarrito = totalCarrito - disminuirPrecio;
                totalCarrito = totalCarrito.toFixed(2);
            }
        });     
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        contadorProducto--;
        
    }

    if (articulosCarrito.length === 0){
        //totalCarrito.innerHTML = 0;
        precioTotal.innerHTML = 0;
        cantidadProducto.innerHTML = 0;
    }
    carritoHTML(); 
}

function leerDatosCurso(curso) {
    //console.log(curso);
    
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('div p span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Sumando elementos del carrito a un total
    totalCarrito = parseFloat(totalCarrito) + parseFloat(infoCurso.precio);
    totalCarrito = totalCarrito.toFixed(2);
    

    // Revisar si un elemento ya existe en el carrito para sumar cantidad y no duplicar
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {

                curso.cantidad++;
                return curso;   
            } else {
                return curso;  
            }
        });
        articulosCarrito = [...cursos];
        
    } else {
        // Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
        contadorProducto++;
    }
    //console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el HTML previamente, para evitar duplicación de productos..
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" width="100"> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;

        // Agregando el HTML del carrito en el body
        contenedorCarrito.appendChild(row);

        precioTotal.innerHTML = totalCarrito;

        cantidadProducto.innerHTML = contadorProducto;
    });
}

// Elimina los productos del tbody
function limpiarHTML() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

// Vaciar carrito completamente
function vaciarCarrito() {

    limpiarHTML();
    for (let i = articulosCarrito.length; i > 0; i--){
        articulosCarrito.pop();
    };

    cantidadProducto.innerHTML = 0;
    totalCarrito = 0;
    contadorProducto = 0;
}
