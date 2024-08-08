document.addEventListener("DOMContentLoaded", () => {
    configurarValidacionEntrada(); // Configura la validación del texto de entrada

    // Añade eventos a los botones
    document.getElementById('boton-encrip').addEventListener('click', encriptarTexto);
    document.getElementById('boton-desencrip').addEventListener('click', desencriptarTexto);
    document.getElementById('boton-copiar').addEventListener('click', copiarTexto);
});

function configurarValidacionEntrada() {
    // Valida la entrada para permitir solo letras minúsculas y espacios
    document.getElementById('texto-entrada-encrip').addEventListener('input', (evento) => {
        const input = evento.target;
        const texto = input.value;
        const regex = /^[a-z\s]*$/;

        // Reemplaza caracteres no permitidos
        if (!regex.test(texto)) {
            input.value = texto.replace(/[^a-z\s]/g, '');
        }
    });
}

function manejarCajaSalida(visible) {
    const cajaSalida = document.getElementById('texto-encrip');
    const cajaDurmiendo = document.getElementById('d-encrip');

    // Muestra u oculta las cajas según la visibilidad
    if (visible) {
        cajaSalida.classList.remove('oculto');
        cajaSalida.classList.add('visible');
        cajaDurmiendo.classList.remove('visible');
        cajaDurmiendo.classList.add('oculto');
    } else {
        cajaSalida.classList.add('oculto');
        cajaSalida.classList.remove('visible');
        cajaDurmiendo.classList.add('visible');
        cajaDurmiendo.classList.remove('oculto');
    }

    // Actualiza la visibilidad después de un retraso
    setTimeout(() => {
        cajaSalida.classList.toggle('d-none', !visible);
        cajaDurmiendo.classList.toggle('d-none', visible);
    }, 500);
}

function encriptarTexto() {
    const texto = document.getElementById('texto-entrada-encrip').value.trim();
    if (!texto) {
        manejarCajaSalida(false);
        return;
    }

    // Mapea las letras para encriptar
    const encriptarMap = { 'e': 'enter', 'i': 'imes', 'a': 'ai', 'o': 'ober', 'u': 'ufat' };
    const textoEncriptado = texto.replace(/[eioua]/g, (letra) => encriptarMap[letra]);

    // Muestra el texto encriptado
    document.getElementById('texto-salida-desencrip').innerHTML = `<p>${textoEncriptado}</p>`;
    manejarCajaSalida(true);
}

function desencriptarTexto() {
    const texto = document.getElementById('texto-entrada-encrip').value.trim();
    if (!texto) {
        manejarCajaSalida(false);
        return;
    }

    // Mapea las secuencias encriptadas para desencriptar
    const desencriptarMap = { 'enter': 'e', 'imes': 'i', 'ai': 'a', 'ober': 'o', 'ufat': 'u' };
    let textoDesencriptado = texto;

    // Reemplaza las secuencias encriptadas con las letras correspondientes
    for (const [clave, valor] of Object.entries(desencriptarMap)) {
        const regex = new RegExp(clave, 'g');
        textoDesencriptado = textoDesencriptado.replace(regex, valor);
    }

    // Muestra el texto desencriptado
    document.getElementById('texto-salida-desencrip').innerHTML = `<p>${textoDesencriptado}</p>`;
    manejarCajaSalida(true);
}

function copiarTexto() {
    const texto = document.getElementById('texto-salida-desencrip').innerText;
    navigator.clipboard.writeText(texto).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}
