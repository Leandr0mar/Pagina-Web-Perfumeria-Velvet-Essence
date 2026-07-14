// ============================================================
//  DATOS DE PRODUCTOS - 22 PERFUMES ÚNICOS
// ============================================================
const productos = (window.productosDesdeThymeleaf && window.productosDesdeThymeleaf.length > 0) ? window.productosDesdeThymeleaf : [
    {
        id: 1,
        nombre: "Sauvage",
        marca: "Dior",
        tipo: "Eau de Parfum",
        precio: 350.00,
        genero: "Hombre",
        contenido: "100 ml",
        imagen: "https://media.falabella.com/falabellaPE/16237038_1/w=1500,h=1500,fit=cover",
        descripcion: "Una fragancia audaz y sofisticada inspirada en la naturaleza salvaje.",
        salida: "Bergamota, Calabaza, Pimienta",
        corazon: "Lavanda, Jazmín, Geranio",
        fondo: "Ámbar, Sándalo, Vainilla",
        duracion: "8 horas",
        intensidad: "Alta",
        disponibilidad: true,
        stock: 25,
        aroma: "Aromática Fougère",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 2,
        nombre: "Bleu de Chanel",
        marca: "Chanel",
        tipo: "Eau de Parfum",
        precio: 420.00,
        genero: "Hombre",
        contenido: "100 ml",
        imagen: "https://media.falabella.com/falabellaPE/14196050_1/w=1500,h=1500,fit=cover",
        descripcion: "Una fragancia que combina frescura y sensualidad con un carácter distintivo.",
        salida: "Limón, Pomelo, Menta",
        corazon: "Jazmín, Nuez moscada, Jengibre",
        fondo: "Sándalo, Cedro, Ámbar",
        duracion: "10 horas",
        intensidad: "Media-Alta",
        disponibilidad: true,
        stock: 18,
        aroma: "Cítrica Amaderada",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 3,
        nombre: "Light Blue",
        marca: "Dolce & Gabbana",
        tipo: "Eau de Toilette",
        precio: 280.00,
        genero: "Mujer",
        contenido: "50 ml",
        imagen: "https://static.sweetcare.com/img/prd/max/v-638242346900610036/dolce-gabbana-009160dg_04.jpg",
        descripcion: "Frescura mediterránea con notas cítricas y florales.",
        salida: "Limón, Manzana, Cedro",
        corazon: "Bambú, Jazmín, Rosa",
        fondo: "Ámbar, Almizcle, Madera",
        duracion: "6 horas",
        intensidad: "Media",
        disponibilidad: true,
        stock: 30,
        aroma: "Cítrica Floral",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Italia"
    },
    {
        id: 4,
        nombre: "Acqua di Gio",
        marca: "Armani",
        tipo: "Eau de Parfum",
        precio: 310.00,
        genero: "Hombre",
        contenido: "100 ml",
        imagen: "https://rimage.ripley.com.pe/home.ripley/Attachment/WOP/1/2014370210332/thumbnail-2014370210332.webp",
        descripcion: "La esencia del mar Mediterráneo en una fragancia fresca y elegante.",
        salida: "Bergamota, Limón, Neroli",
        corazon: "Jazmín, Romero, Cardamomo",
        fondo: "Ámbar, Almizcle, Cedro",
        duracion: "9 horas",
        intensidad: "Media",
        disponibilidad: true,
        stock: 22,
        aroma: "Marina Aromática",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Italia"
    },
    {
        id: 5,
        nombre: "Good Girl",
        marca: "Carolina Herrera",
        tipo: "Parfum",
        precio: 390.00,
        genero: "Mujer",
        contenido: "80 ml",
        imagen: "https://plazavea.vteximg.com.br/arquivos/ids/31436515-418-418/imageUrl_1.jpg",
        descripcion: "Una fragancia audaz y seductora que combina dulzura y misterio.",
        salida: "Almendra, Café, Bergamota",
        corazon: "Jazmín, Tuberosa, Ylang-Ylang",
        fondo: "Cacao, Vainilla, Pachulí",
        duracion: "12 horas",
        intensidad: "Alta",
        disponibilidad: true,
        stock: 15,
        aroma: "Oriental Floral",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "España"
    },
    {
        id: 6,
        nombre: "Eros",
        marca: "Versace",
        tipo: "Eau de Toilette",
        precio: 260.00,
        genero: "Hombre",
        contenido: "100 ml",
        imagen: "https://static.sweetcare.com/img/prd/488/v-638200526911318100/versace-011428vg_04.webp",
        descripcion: "Frescura mediterránea con un toque de sensualidad.",
        salida: "Limón, Manzana, Menta",
        corazon: "Geranio, Jazmín, Salvia",
        fondo: "Cedro, Almizcle, Vainilla",
        duracion: "7 horas",
        intensidad: "Media",
        disponibilidad: true,
        stock: 28,
        aroma: "Cítrica Aromática",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Italia"
    },
    {
        id: 7,
        nombre: "Black Opium",
        marca: "Yves Saint Laurent",
        tipo: "Eau de Parfum",
        precio: 370.00,
        genero: "Mujer",
        contenido: "90 ml",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_827472-MLA47600189575_092021-O.webp",
        descripcion: "Una fragancia adictiva con notas de café y vainilla.",
        salida: "Pera, Rosa, Pimienta",
        corazon: "Café, Jazmín, Naranja",
        fondo: "Vainilla, Pachulí, Almizcle",
        duracion: "10 horas",
        intensidad: "Alta",
        disponibilidad: true,
        stock: 20,
        aroma: "Gourmand Floral",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 8,
        nombre: "1 Million",
        marca: "Paco Rabanne",
        tipo: "Eau de Parfum",
        precio: 330.00,
        genero: "Hombre",
        contenido: "100 ml",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_721468-MPE84258610404_052025-O.webp",
        descripcion: "Una fragancia dorada y sofisticada para el hombre moderno.",
        salida: "Canela, Menta, Limón",
        corazon: "Rosa, Jazmín, Manzana",
        fondo: "Cuero, Ámbar, Pachulí",
        duracion: "8 horas",
        intensidad: "Alta",
        disponibilidad: false,
        stock: 0,
        aroma: "Especiada Amaderada",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 9,
        nombre: "La Vie Est Belle",
        marca: "Lancôme",
        tipo: "Eau de Parfum",
        precio: 360.00,
        genero: "Mujer",
        contenido: "50 ml",
        imagen: "https://aruma.vtexassets.com/arquivos/ids/210952-800-auto?v=638899327324270000&width=800&height=auto&aspect=true",
        descripcion: "Una fragancia floral y golosa que celebra la alegría de vivir.",
        salida: "Grosella, Pera, Azúcar",
        corazon: "Jazmín, Naranja, Iris",
        fondo: "Vainilla, Pachulí, Almizcle",
        duracion: "8 horas",
        intensidad: "Alta",
        disponibilidad: true,
        stock: 25,
        aroma: "Floral Dulce",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 10,
        nombre: "Terre d'Hermès",
        marca: "Hermès",
        tipo: "Eau de Parfum",
        precio: 400.00,
        genero: "Hombre",
        contenido: "125 ml",
        imagen: "https://media.falabella.com/falabellaPE/155202727_01/w=1500,h=1500,fit=cover",
        descripcion: "Una fragancia terrosa y amaderada con notas cítricas.",
        salida: "Naranja, Pomelo, Limón",
        corazon: "Pimienta, Geranio, Pachulí",
        fondo: "Cedro, Ámbar, Benjuí",
        duracion: "10 horas",
        intensidad: "Media-Alta",
        disponibilidad: true,
        stock: 12,
        aroma: "Amaderada Cítrica",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 11,
        nombre: "Flowerbomb",
        marca: "Viktor & Rolf",
        tipo: "Eau de Parfum",
        precio: 340.00,
        genero: "Mujer",
        contenido: "50 ml",
        imagen: "https://static.sweetcare.com/img/prd/max/v-637542588260175792/viktor-rolf-013330vk_03.jpg",
        descripcion: "Una explosión floral con notas dulces y cálidas.",
        salida: "Bergamota, Té, Naranja",
        corazon: "Jazmín, Rosa, Orchid",
        fondo: "Vainilla, Patchulí, Almizcle",
        duracion: "8 horas",
        intensidad: "Alta",
        disponibilidad: true,
        stock: 18,
        aroma: "Floral Oriental",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Países Bajos"
    },
    {
        id: 12,
        nombre: "Aventus",
        marca: "Creed",
        tipo: "Eau de Parfum",
        precio: 580.00,
        genero: "Hombre",
        contenido: "100 ml",
        imagen: "https://media.falabella.com/falabellaPE/144444041_01/w=1500,h=1500,fit=cover",
        descripcion: "Una fragancia legendaria con notas de piña y madera.",
        salida: "Piña, Bergamota, Manzana",
        corazon: "Rosa, Jazmín, Abedul",
        fondo: "Ámbar, Almizcle, Vainilla",
        duracion: "12 horas",
        intensidad: "Alta",
        disponibilidad: false,
        stock: 0,
        aroma: "Frutal Amaderada",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 13,
        nombre: "J'adore",
        marca: "Dior",
        tipo: "Eau de Parfum",
        precio: 410.00,
        genero: "Mujer",
        contenido: "50 ml",
        imagen: "https://rimage.ripley.com.pe/home.ripley/Attachment/WOP/1/2014121300008/image1-2014121300008.webp",
        descripcion: "Un ramo floral luminoso y femenino con notas de jazmín y rosa.",
        salida: "Mandarina, Melón, Melocotón",
        corazon: "Jazmín, Rosa, Lirio",
        fondo: "Sándalo, Vainilla, Almizcle",
        duracion: "8 horas",
        intensidad: "Media-Alta",
        disponibilidad: true,
        stock: 22,
        aroma: "Floral Frutal",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 14,
        nombre: "CK One",
        marca: "Calvin Klein",
        tipo: "Eau de Toilette",
        precio: 180.00,
        genero: "Unisex",
        contenido: "100 ml",
        imagen: "https://oechsle.vteximg.com.br/arquivos/ids/1672253-1000-1000/1471243.jpg?v=637494943262930000",
        descripcion: "La fragancia unisex icónica con notas frescas y cítricas.",
        salida: "Limón, Bergamota, Piña",
        corazon: "Rosa, Jazmín, Nuez moscada",
        fondo: "Ámbar, Almizcle, Cedro",
        duracion: "5 horas",
        intensidad: "Media",
        disponibilidad: true,
        stock: 35,
        aroma: "Cítrica Fresca",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "EE.UU."
    },
    {
        id: 15,
        nombre: "Angel",
        marca: "Mugler",
        tipo: "Eau de Parfum",
        precio: 380.00,
        genero: "Mujer",
        contenido: "50 ml",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_697370-MLA46428291640_062021-O.webp",
        descripcion: "Una fragancia gourmand con notas de chocolate y caramelo.",
        salida: "Bergamota, Melón, Coco",
        corazon: "Caramelo, Miel, Frutos Rojos",
        fondo: "Chocolate, Vainilla, Pachulí",
        duracion: "10 horas",
        intensidad: "Alta",
        disponibilidad: true,
        stock: 14,
        aroma: "Gourmand Oriental",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 16,
        nombre: "Le Male",
        marca: "Jean Paul Gaultier",
        tipo: "Eau de Toilette",
        precio: 290.00,
        genero: "Hombre",
        contenido: "125 ml",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_613128-MLA91308147935_082025-O.webp",
        descripcion: "Una fragancia icónica con notas de lavanda y vainilla.",
        salida: "Lavanda, Menta, Cardamomo",
        corazon: "Canela, Naranja, Flor de Azahar",
        fondo: "Vainilla, Ámbar, Cedro",
        duracion: "7 horas",
        intensidad: "Media",
        disponibilidad: true,
        stock: 20,
        aroma: "Aromática Especiada",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 17,
        nombre: "Coco Mademoiselle",
        marca: "Chanel",
        tipo: "Eau de Parfum",
        precio: 450.00,
        genero: "Mujer",
        contenido: "100 ml",
        imagen: "https://media.falabella.com/falabellaPE/16237620_1/w=1500,h=1500,fit=cover",
        descripcion: "Una fragancia oriental y floral con un toque moderno y audaz.",
        salida: "Naranja, Bergamota, Mandarina",
        corazon: "Rosa, Jazmín, Lirio",
        fondo: "Sándalo, Vainilla, Ámbar",
        duracion: "10 horas",
        intensidad: "Alta",
        disponibilidad: true,
        stock: 16,
        aroma: "Oriental Floral",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 18,
        nombre: "Spicebomb",
        marca: "Viktor & Rolf",
        tipo: "Eau de Parfum",
        precio: 310.00,
        genero: "Hombre",
        contenido: "90 ml",
        imagen: "https://rimage.ripley.com.pe/home.ripley/Attachment/WOP/1/2014303542233/full_image-2014303542233.",
        descripcion: "Una fragancia explosiva con notas especiadas y amaderadas.",
        salida: "Canela, Pimienta, Bergamota",
        corazon: "Lavanda, Salvia, Nuez moscada",
        fondo: "Cuero, Ámbar, Pachulí",
        duracion: "8 horas",
        intensidad: "Alta",
        disponibilidad: true,
        stock: 18,
        aroma: "Especiada Amaderada",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Países Bajos"
    },
    {
        id: 19,
        nombre: "Hypnotic Poison",
        marca: "Dior",
        tipo: "Eau de Parfum",
        precio: 370.00,
        genero: "Mujer",
        contenido: "50 ml",
        imagen: "https://i1.perfumesclub.com/grande/17650-2.jpg",
        descripcion: "Una fragancia floral y especiada con un toque misterioso.",
        salida: "Almendra, Café, Jazmín",
        corazon: "Rosa, Vainilla, Canela",
        fondo: "Ámbar, Almizcle, Sándalo",
        duracion: "9 horas",
        intensidad: "Alta",
        disponibilidad: true,
        stock: 12,
        aroma: "Oriental Especiada",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    },
    {
        id: 20,
        nombre: "Aqua di Parma",
        marca: "Colonia",
        tipo: "Cologne",
        precio: 250.00,
        genero: "Unisex",
        contenido: "100 ml",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTwZc8IaUG950t7R705dM0jDJjS9A5wMZyLh0hZmqeNPfcmurf0Ebt-3MY&s=10",
        descripcion: "Una colonia italiana clásica con notas cítricas y frescas.",
        salida: "Limón, Bergamota, Naranja",
        corazon: "Lavanda, Rosa, Romero",
        fondo: "Sándalo, Almizcle, Cedro",
        duracion: "4 horas",
        intensidad: "Baja-Media",
        disponibilidad: true,
        stock: 25,
        aroma: "Cítrica Clásica",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Italia"
    },
    {
        id: 21,
        nombre: "Si",
        marca: "Giorgio Armani",
        tipo: "Eau de Parfum",
        precio: 340.00,
        genero: "Mujer",
        contenido: "50 ml",
        imagen: "https://media.falabella.com/falabellaPE/20962133_02/w=1500,h=1500,fit=cover",
        descripcion: "Una fragancia floral y afrutada con un toque de sofisticación.",
        salida: "Grosella, Bergamota, Naranja",
        corazon: "Rosa, Jazmín, Flor de Azahar",
        fondo: "Vainilla, Ámbar, Pachulí",
        duracion: "8 horas",
        intensidad: "Media-Alta",
        disponibilidad: true,
        stock: 20,
        aroma: "Floral Frutal",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Italia"
    },
    {
        id: 22,
        nombre: "Phantom",
        marca: "Paco Rabanne",
        tipo: "Eau de Parfum",
        precio: 300.00,
        genero: "Hombre",
        contenido: "100 ml",
        imagen: "https://media.falabella.com/falabellaPE/19938116_1/w=1500,h=1500,fit=cover",
        descripcion: "Una fragancia futurista con notas de lavanda y vainilla.",
        salida: "Lavanda, Limón, Manzana",
        corazon: "Rosa, Jazmín, Salvia",
        fondo: "Vainilla, Ámbar, Cedro",
        duracion: "7 horas",
        intensidad: "Media",
        disponibilidad: true,
        stock: 22,
        aroma: "Aromática Moderna",
        crueltyFree: true,
        contieneAlcohol: true,
        pais: "Francia"
    }
];

// ============================================================
//  REFERENCIAS DOM
// ============================================================
// ============================================================
//  REFERENCIAS DOM
// ============================================================
const DOM = {
    grid: document.getElementById('productsGrid'),
    search: document.getElementById('searchInput'),
    filterMarca: document.getElementById('filterMarca'),
    filterGenero: document.getElementById('filterGenero'),
    filterTipo: document.getElementById('filterTipo'),
    filterPrecio: document.getElementById('filterPrecio'),
    filterContenido: document.getElementById('filterContenido'),
    filterOrden: document.getElementById('filterOrden'),
    count: document.getElementById('productsCount'),
    
    // Modal
    modal: document.getElementById('productModal'),
    modalClose: document.getElementById('modalClose'),
    modalImage: document.getElementById('modalProductImage'),
    modalBrand: document.getElementById('modalProductBrand'),
    modalName: document.getElementById('modalProductName'),
    modalType: document.getElementById('modalProductType'),
    modalContent: document.getElementById('modalProductContent'),
    modalDescription: document.getElementById('modalProductDescription'),
    modalAvailability: document.getElementById('modalProductAvailability'),
    modalStock: document.getElementById('modalProductStock'),
    modalPrice: document.getElementById('modalProductPrice'),
    modalFeatureAroma: document.getElementById('modalFeatureAroma'),
    modalFeatureCruelty: document.getElementById('modalFeatureCruelty'),
    modalFeatureAlcohol: document.getElementById('modalFeatureAlcohol'),
    modalAccordionDescripcion: document.getElementById('modalAccordionDescripcion'),
    modalInfoFamilia: document.getElementById('modalInfoFamilia'),
    modalInfoSalida: document.getElementById('modalInfoSalida'),
    modalInfoCorazon: document.getElementById('modalInfoCorazon'),
    modalInfoFondo: document.getElementById('modalInfoFondo'),
    modalInfoVolumen: document.getElementById('modalInfoVolumen'),
    modalInfoPais: document.getElementById('modalInfoPais'),
    modalQuantityInput: document.getElementById('modalQuantityInput'),
    modalQtyNumberMobile: document.getElementById('modalQtyNumberMobile'),
    modalDecrementBtn: document.getElementById('modalDecrementBtn'),
    modalIncrementBtn: document.getElementById('modalIncrementBtn'),
    modalDecrementBtnMobile: document.getElementById('modalDecrementBtnMobile'),
    modalIncrementBtnMobile: document.getElementById('modalIncrementBtnMobile'),
    modalAddToCartBtn: document.getElementById('modalAddToCartBtn'),
    modalAddToCartBtnMobile: document.getElementById('modalAddToCartBtnMobile'),
    
    // Carrito
    cartToggle: document.getElementById('cartToggle'),
    cartSidebar: document.getElementById('cartSidebar'),
    closeCart: document.getElementById('closeCart'),
    cartItems: document.getElementById('cartItems'),
    cartCount: document.getElementById('cartCount'),
    cartTotalPrice: document.getElementById('cartTotalPrice')
};

// ============================================================
//  ACORDEÓN DEL CATÁLOGO
// ============================================================
document.querySelectorAll('.accordion-header-custom').forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        document.querySelectorAll('.accordion-item-custom').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// ============================================================
//  ACORDEÓN DEL MODAL
// ============================================================
document.querySelectorAll('.modal-accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const accordionItem = this.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        document.querySelectorAll('.modal-accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// ============================================================
//  RENDERIZAR PRODUCTOS
// ============================================================
function renderizarProductos(productos) {
    if (productos.length === 0) {
        DOM.grid.innerHTML = `
            <div class="col-12 text-center py-5" style="color:#999;">
                <i class="bi bi-search" style="font-size:48px; display:block; margin-bottom:16px;"></i>
                <p style="font-family:'Montserrat',sans-serif; font-size:24px; margin-bottom:8px;">No encontramos fragancias</p>
                <p style="font-size:14px;">Intenta ajustar los filtros de búsqueda</p>
            </div>
        `;
        DOM.count.textContent = 'Mostrando 0 productos';
        return;
    }

    let html = '';
    productos.forEach(p => {
        html += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="product-card">
                    <div class="product-image-wrapper">
                        <img src="${p.imagen}" alt="${p.nombre}" class="product-image">
                    </div>
                    <div class="product-info">
                        <div class="product-brand">${p.marca}</div>
                        <h3 class="product-name">${p.nombre}</h3>
                        <div class="product-content">${p.contenido}</div>
                        <div class="product-type">${p.tipo}</div>
                        <p class="product-description">${p.descripcion}</p>
                        <div class="product-footer">
                            <span class="product-price">S/ ${p.precio.toFixed(2)}</span>
                            <button class="btn-details" data-id="${p.id}">
                                Ver detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    DOM.grid.innerHTML = html;
    DOM.count.textContent = `Mostrando ${productos.length} productos`;

document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const idProducto = e.currentTarget.dataset.id;
            // Redirigir a la URL del detalle del producto
            window.location.href = '/producto/detalle/' + idProducto;
        });
    });
}

// ============================================================
//  FILTRADO Y ORDENAMIENTO
// ============================================================
function filtrarYOrdenar() {
    const searchTerm = DOM.search.value.toLowerCase().trim();
    const marca = DOM.filterMarca.value;
    const genero = DOM.filterGenero.value;
    const tipo = DOM.filterTipo.value;
    const precio = DOM.filterPrecio.value;
    const contenido = DOM.filterContenido.value;
    const orden = DOM.filterOrden.value;

    let result = [...productos];

    if (searchTerm) {
        result = result.filter(p =>
            p.nombre.toLowerCase().includes(searchTerm) ||
            p.marca.toLowerCase().includes(searchTerm)
        );
    }

    if (marca !== 'all') {
        result = result.filter(p => p.marca === marca);
    }

    if (genero !== 'all') {
        result = result.filter(p => p.genero === genero);
    }

    if (tipo !== 'all') {
        result = result.filter(p => p.tipo === tipo);
    }

    if (precio !== 'all') {
        const [min, max] = precio.split('-').map(Number);
        result = result.filter(p => p.precio >= min && p.precio <= max);
    }

    if (contenido !== 'all') {
        result = result.filter(p => p.contenido === contenido);
    }

    switch (orden) {
        case 'precio-menor':
            result.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio-mayor':
            result.sort((a, b) => b.precio - a.precio);
            break;
        case 'nombre-az':
            result.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        default:
            result.sort((a, b) => a.id - b.id);
            break;
    }

    renderizarProductos(result);
}

// ============================================================
//  MODAL - VERSIÓN MEJORADA CON CANTIDAD Y CARRITO
// ============================================================

let modalCantidad = 1;

function abrirModal(e) {
    const btn = e.currentTarget;
    const id = parseInt(btn.dataset.id);
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    DOM.modal.dataset.productId = producto.id;

    DOM.modalImage.src = producto.imagen;
    DOM.modalImage.alt = producto.nombre;
    DOM.modalBrand.textContent = producto.marca;
    DOM.modalName.textContent = producto.nombre;
    DOM.modalType.textContent = producto.tipo;
    DOM.modalContent.textContent = producto.contenido;
    DOM.modalDescription.textContent = producto.descripcion;
    DOM.modalPrice.textContent = `S/ ${producto.precio.toFixed(2)}`;
    DOM.modalStock.textContent = producto.stock || 20;
    DOM.modalFeatureAroma.textContent = producto.aroma || 'Floral';
    DOM.modalFeatureCruelty.textContent = producto.crueltyFree ? 'Cruelty Free' : '';
    DOM.modalFeatureAlcohol.textContent = producto.contieneAlcohol ? 'Contiene alcohol' : '';
    DOM.modalAccordionDescripcion.textContent = producto.descripcion;
    DOM.modalInfoFamilia.textContent = producto.aroma || 'Floral';
    DOM.modalInfoSalida.textContent = producto.salida || '—';
    DOM.modalInfoCorazon.textContent = producto.corazon || '—';
    DOM.modalInfoFondo.textContent = producto.fondo || '—';
    DOM.modalInfoVolumen.textContent = producto.contenido;
    DOM.modalInfoPais.textContent = producto.pais || 'Perú';

    if (producto.disponibilidad) {
        DOM.modalAvailability.innerHTML = `
            <i class="bi bi-check-circle-fill text-success me-1"></i>
            <strong>Disponible</strong> · stock: <span>${producto.stock || 20}</span>
        `;
    } else {
        DOM.modalAvailability.innerHTML = `
            <i class="bi bi-x-circle-fill text-danger me-1"></i>
            <strong>No disponible</strong>
        `;
    }

    modalCantidad = 1;
    if (DOM.modalQuantityInput) DOM.modalQuantityInput.value = 1;
    if (DOM.modalQtyNumberMobile) DOM.modalQtyNumberMobile.textContent = 1;

    DOM.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    DOM.modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
//  CONTROL DE CANTIDAD EN EL MODAL
// ============================================================

function actualizarModalCantidad(valor) {
    if (valor < 1) valor = 1;
    if (valor > 10) valor = 10;
    modalCantidad = valor;
    
    if (DOM.modalQuantityInput) DOM.modalQuantityInput.value = valor;
    if (DOM.modalQtyNumberMobile) DOM.modalQtyNumberMobile.textContent = valor;
}

DOM.modalDecrementBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    actualizarModalCantidad(modalCantidad - 1);
});

DOM.modalIncrementBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    actualizarModalCantidad(modalCantidad + 1);
});

DOM.modalDecrementBtnMobile?.addEventListener('click', function(e) {
    e.preventDefault();
    actualizarModalCantidad(modalCantidad - 1);
});

DOM.modalIncrementBtnMobile?.addEventListener('click', function(e) {
    e.preventDefault();
    actualizarModalCantidad(modalCantidad + 1);
});

DOM.modalQuantityInput?.addEventListener('change', function() {
    let val = parseInt(this.value) || 1;
    actualizarModalCantidad(val);
});

// ============================================================
//  CARRITO - VARIABLES Y FUNCIONES
// ============================================================

const CART_KEY = 'velvetEssenceCart';
let cart = JSON.parse(localStorage.getItem(CART_KEY) || localStorage.getItem('carrito') || '[]');

function updateCartUI() {
    const totalItems = cart.reduce((acc, item) => acc + (item.cantidad || 0), 0);
    if (DOM.cartCount) DOM.cartCount.innerText = totalItems;
    
    if (cart.length === 0) {
        if (DOM.cartItems) {
            DOM.cartItems.innerHTML = '<p class="empty-cart text-center mt-4">🛒 Aún no tienes productos</p>';
        }
        if (DOM.cartTotalPrice) DOM.cartTotalPrice.innerText = 'S/ 0.00';
        return;
    }
    
    let html = '';
    let total = 0;

    cart.forEach((item, idx) => {
        const price = item.precio || 0;
        const quantity = item.cantidad || 1;
        const subtotal = price * quantity;
        total += subtotal;

        html += `
<div class="cart-item d-flex align-items-center justify-content-between mb-3">
    <div class="d-flex align-items-center">
        <img src="${item.imagen || ''}" alt="${item.nombre || 'Producto'}" width="50" height="50" class="img-fluid me-2 rounded" style="object-fit: cover;">
        <div>
            <strong style="display: block; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.nombre || 'Producto'}</strong>
            <small class="text-muted">
                Cant: ${quantity} x S/ ${price.toFixed(2)}
            </small>
        </div>
    </div>
    <div class="d-flex align-items-center gap-2">
        <span class="fw-bold text-dark small">S/ ${subtotal.toFixed(2)}</span>
        <button class="remove-item btn p-1" data-index="${idx}" title="Eliminar producto">
            <i class="bi bi-trash text-danger fs-5"></i>
        </button>
    </div>
</div>
        `;
    });

    if (DOM.cartItems) DOM.cartItems.innerHTML = html;
    if (DOM.cartTotalPrice) DOM.cartTotalPrice.innerText = `S/ ${total.toFixed(2)}`;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem('carrito', JSON.stringify(cart));

    if (DOM.cartItems) {
        DOM.cartItems.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCartUI();
                if (cart.length === 0 && DOM.cartSidebar) {
                    DOM.cartSidebar.classList.remove('open');
                }
            });
        });
    }
}

// ============================================================
//  AÑADIR AL CARRITO DESDE EL MODAL
// ============================================================

function addToCartFromModal() {
    const productId = parseInt(DOM.modal.dataset.productId);
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;

    const cantidad = modalCantidad;

    if (!producto.disponibilidad) {
        return;
    }

    const existingIndex = cart.findIndex(item => item.id === producto.id);
    
    if (existingIndex !== -1) {
        cart[existingIndex].cantidad += cantidad;
    } else {
        cart.push({
            id: producto.id,
            nombre: producto.nombre,
            marca: producto.marca,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad,
            tipo: producto.tipo,
            contenido: producto.contenido
        });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem('carrito', JSON.stringify(cart));
    updateCartUI();
    
    if (DOM.modalAddToCartBtn) {
        DOM.modalAddToCartBtn.style.transform = 'scale(0.95)';
        setTimeout(() => DOM.modalAddToCartBtn.style.transform = '', 200);
    }

    if (DOM.cartSidebar) DOM.cartSidebar.classList.add('open');
}

// Eventos de los botones "Añadir al carrito" del modal
DOM.modalAddToCartBtn?.addEventListener('click', addToCartFromModal);
DOM.modalAddToCartBtnMobile?.addEventListener('click', addToCartFromModal);

// ============================================================
//  EVENTOS DEL MODAL
// ============================================================

DOM.modalClose?.addEventListener('click', cerrarModal);
DOM.modal?.addEventListener('click', (e) => {
    if (e.target === DOM.modal) cerrarModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
});

// ============================================================
//  EVENTOS DE FILTROS
// ============================================================

let debounceTimer;
DOM.search?.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(filtrarYOrdenar, 200);
});

DOM.filterMarca?.addEventListener('change', filtrarYOrdenar);
DOM.filterGenero?.addEventListener('change', filtrarYOrdenar);
DOM.filterTipo?.addEventListener('change', filtrarYOrdenar);
DOM.filterPrecio?.addEventListener('change', filtrarYOrdenar);
DOM.filterContenido?.addEventListener('change', filtrarYOrdenar);
DOM.filterOrden?.addEventListener('change', filtrarYOrdenar);

// ============================================================
//  CARRITO FLOTANTE - ABRIR/CERRAR
// ============================================================

DOM.cartToggle?.addEventListener('click', function(e) {
    e.stopPropagation();
    if (DOM.cartSidebar) DOM.cartSidebar.classList.toggle('open');
});

DOM.closeCart?.addEventListener('click', function(e) {
    e.stopPropagation();
    if (DOM.cartSidebar) DOM.cartSidebar.classList.remove('open');
});

document.addEventListener('click', function(e) {
    const clickedRemove = e.target.closest('.remove-item');
    if (
        DOM.cartSidebar &&
        DOM.cartToggle &&
        !DOM.cartSidebar.contains(e.target) &&
        !DOM.cartToggle.contains(e.target) &&
        !clickedRemove &&
        DOM.cartSidebar.classList.contains('open')
    ) {
        DOM.cartSidebar.classList.remove('open');
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && DOM.cartSidebar) {
        DOM.cartSidebar.classList.remove('open');
    }
});

// ============================================================
//  INICIALIZAR
// ============================================================

renderizarProductos(productos);
updateCartUI();
console.log('✅ Catálogo y carrito inicializados');
