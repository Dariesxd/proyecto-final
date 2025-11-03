const CATEGORIAS_VALIDAS = ["Refrescantes", "Calientes", "Jugos", "Otros"]; 
let bebidasAPI = [
    {
        id: 1,
        nombre: "Limonada Refrescante",
        categoria: "Refrescantes",
        foto: "https://valles.tabusushi.com/wp-content/uploads/2023/03/produto_limonada-natural-600x600.jpg",
        receta: "Jugo de 3 limones, 2 cucharadas de azúcar, agua al gusto y mucho hielo. Mezclar bien."
    },
    {
        id: 2,
        nombre: "Café Americano Caliente",
        categoria: "Calientes",
        foto: "https://eltenedorviajero.com/wp-content/uploads/2025/03/por-que-el-cafe-americano-se-llama-asi-te-lo-contamos.webp",
        receta: "Una medida de espresso y agua caliente. Servir en taza precalentada."
    },
    {
        id: 3,
        nombre: "Jugo de Naranja Natural",
        categoria: "Jugos",
        foto: "https://www.cocinadominicana.com/wp-content/uploads/2023/10/jugos-de-zanahoria-carrot-orange-juice-GLZ5989.jpg",
        receta: "Exprimir 4 naranjas. Servir inmediatamente sin azúcar ni agua."
    },
    {
        id: 4,
        nombre: "Chocolate Caliente de Abuela",
        categoria: "Calientes",
        foto: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcphazelnuthotchocolate/images/Hazelnut_Hot_Chocolate__0.jpg",
        receta: "Leche, una tableta de chocolate y canela. Calentar a fuego lento hasta disolver y espumar."
    }
    
];
function mostrarBebidas(bebidas) {
    const contenedor = document.getElementById('contenedor-recetas');
    contenedor.innerHTML = ''; 

    if (bebidas.length === 0) {
        contenedor.innerHTML = '<p style="width: 100%; text-align: center;">No se encontraron bebidas con esos criterios.</p>';
        return;
    }

    bebidas.forEach(bebida => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'receta-tarjeta';

        tarjeta.innerHTML = `
            <img src="${bebida.foto}" alt="Foto de ${bebida.nombre}">
            <span class="categoria">${bebida.categoria}</span>
            <h3>${bebida.nombre}</h3>
            <p><strong>Receta:</strong> ${bebida.receta}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function popularFiltroCategorias() {
    const selectFiltro = document.getElementById('filtro-categoria');
    selectFiltro.innerHTML = '<option value="todos">Todas las Categorías</option>'; 

    CATEGORIAS_VALIDAS.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        selectFiltro.appendChild(option);
    });
}

function popularSelectAgregar() {
    const selectAgregar = document.getElementById('categoria-bebida');
    selectAgregar.innerHTML = '<option value="">Selecciona una categoría</option>';
    
    CATEGORIAS_VALIDAS.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        selectAgregar.appendChild(option);
    });
}

function aplicarFiltros() {
    const textoBuscador = document.getElementById('buscador').value.toLowerCase();
    const categoriaSeleccionada = document.getElementById('filtro-categoria').value;

    const bebidasFiltradas = bebidasAPI.filter(bebida => {
        const coincideNombre = bebida.nombre.toLowerCase().includes(textoBuscador);
        const coincideCategoria = categoriaSeleccionada === 'todos' || bebida.categoria === categoriaSeleccionada;

        return coincideNombre && coincideCategoria;
    });

    mostrarBebidas(bebidasFiltradas);
}

function manejarFormulario(event) {
    event.preventDefault(); 

    const nombre = document.getElementById('nombre-bebida').value;
    const categoria = document.getElementById('categoria-bebida').value; 
    const foto = document.getElementById('foto-bebida').value;
    const receta = document.getElementById('receta-bebida').value;

    if (!categoria) { 
        alert('Debes seleccionar una categoría.');
        return;
    }

    const nuevaBebida = {
        id: Date.now(),
        nombre,
        categoria,
        foto,
        receta
    };

    bebidasAPI.push(nuevaBebida);
    aplicarFiltros(); 
    popularFiltroCategorias(); 

    document.getElementById('formulario-agregar').reset();
    alert(` ¡Bebida "${nombre}" agregada a la categoría "${categoria}"!`);
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarBebidas(bebidasAPI);

    popularFiltroCategorias();
    popularSelectAgregar();
    document.getElementById('buscador').addEventListener('input', aplicarFiltros);
    document.getElementById('filtro-categoria').addEventListener('change', aplicarFiltros);
    document.getElementById('formulario-agregar').addEventListener('submit', manejarFormulario);
});