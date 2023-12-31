
const btnGuardaCliente = document.querySelector('#guardar-cliente');

// estructura para guarda

let cliente = {
    mesa: '',
    hora: '',
    pedido: []
}

const categorias = {
    1: 'pizza',
    2: 'postres',
    3: 'juegos',
    4: 'comida',
    5: 'cafe',
    6: 'bebidas'
}

btnGuardaCliente.addEventListener('click', guardaCliente);

function guardaCliente() {
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    const camposVacios = [mesa, hora].some(campo => campo === '')

    if (camposVacios) {
        // console.log('campo vacios');
        const existeAlerta = document.querySelector('.invalid-feedback');
        if (!existeAlerta) {
            const alerta = document.createElement('div');
            alerta.classList.add('text-center', 'text-danger');
            alerta.textContent = 'Los campos son obligatorios';
            document.querySelector('.modal-body form').appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000)
        }
    } else {
        // console.log('campo llenos');

        cliente = { ...cliente, mesa, hora };
        console.log(cliente);

        const modalForm = document.querySelector('#formulario');
        const modal = bootstrap.Modal.getInstance(modalForm);
        modal.hide();

        mostrarSecciones();

        obtenerMenu();


    }

    function mostrarSecciones() {
        const secciones = document.querySelectorAll('.d-none');
        //console.log(secciones);

        secciones.forEach(seccion => seccion.classList.remove('d-none'));
    }

    function obtenerMenu() {
        const url = 'http://localhost:3000/menu';
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarMenu(resultado))
            .catch(error => console.log(error))
    }

    function mostrarMenu(menu) {
        const contenido = document.querySelector('#menu .contenido');
        menu.forEach(pos => {
            const fila = document.createElement('div');
            fila.classList.add('row', 'borde-top')
            const nombre = document.createElement('div')
            nombre.textContent = pos.nombre;
            nombre.classList.add('col-md-4', 'py-3');

            const precio = document.createElement('div');
            precio.textContent = pos.precio;
            precio.classList.add('col-md-3', 'py-3');

            const categoria = document.createElement('div');
            categoria.textContent = categorias[pos.categoria];
            categoria.classList.add('col-md-3', 'py-3');

            const inputCantidad = document.createElement('input');
            inputCantidad.type = 'number';
            inputCantidad.min = 0;
            inputCantidad.value = 0;
            inputCantidad.id = `producto-${pos.id}`;
            // inputCantidad.classList.add('col-1');
            inputCantidad.onchange = function () {
                const cantidad = parseInt(inputCantidad.value)
                agreagarOrden({ ...pos, cantidad })
            }

            const agreagar = document.createElement('div');
            agreagar.classList.add('col-md-1', 'py-3', 'w-10');
            agreagar.appendChild(inputCantidad)

            fila.appendChild(nombre);
            fila.appendChild(precio);
            fila.appendChild(categoria);
            fila.appendChild(agreagar);

            contenido.appendChild(fila);
        })
    }
}