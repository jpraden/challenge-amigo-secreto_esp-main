//Desarrollado : Jaime Pradenas Pizarro

//Funciones Reutilización de Alertas
function mostrarAlertaNombreInvalido() {
   alert("Por favor, ingrese un nombre válido.\n\n *** Se permite sólo texto y vocales con tilde...***");
}

function mostrarAlertaExisteEnLista() {
   alert("NOMBRE YA EXISTE en la lista...\n\n *** Ingrese otro nombre ***");
}

//Declación de lista (arreglo)
let amigos = [];

//Implementa una función para agregar amigos
function agregarAmigo() {

    //Capturar el valor del campo de entrada: 
    let input = document.getElementById("amigo");
    
    //Se obtiene el valor del input ingresado y se elimina los espacios en blanco al inicio y al final del registro
	let nombreAmigo = input.value.trim();

	//Se valida el registro ingresado por usuario no haya dejado el campo vacío
    if (nombreAmigo === "") {
        mostrarAlertaNombreInvalido();        
        return; // Salimos de la función sin agregar nada
    }

    //Se valida que le registro "nombreAmigo" contenga sólo letras y se permita vocales con tílde
    let valNombreAmigo = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    //Usamos el método test() para verificar el registro almeacenado en variable "nombreAmigo', que permita recibir sólo caracteres permitidos.
    if (!valNombreAmigo.test(nombreAmigo)) {
        mostrarAlertaNombreInvalido(); /*alert("Nombre inválido.!\n\n...Favor, ingrese solo texto, se permite vocales con tilde.");*/
		input.value = "";
        return;
    }
    
// Se valida en registro ingresado por el usuario que NO exista en la lista (array), en caso que exita envía alerta que el registro se encuentra en la lista
    let valExisteNombreAmigo = nombreAmigo.toLowerCase();
    let existe = amigos.some(amigo => amigo.toLowerCase() === valExisteNombreAmigo);
    if (existe) {
        mostrarAlertaExisteEnLista() /*alert("Este nombre de amigo,  ya está en la lista...");*/
        return;
    }

//Añadimos a la lista el nombre de amigo registrado por el usuario en la lista de amigos creada anteriormente.
    amigos.push(nombreAmigo);

//Se limpia el registro del input ingresado por el usuario para recibir nu nuevo nombre de amigo
    input.value = "";

//Invocamos a la fuención para actualizar por pantalla el registro del nombre del amigo
    mostrarListaAmigos();
	resultado.innerHTML = "<li></li>";
}

//Esta función permite desplegar por pantalla el nombre de amigo interactuando con el HTML "listaAmigos"
function mostrarListaAmigos() {
    //Obtenemos el elemento <ul> "listaAmigos", que desplegará el nombre de los amigos en la página
    let lista = document.getElementById("listaAmigos");
	resultado2.innerHTML = "<li></li>";

 // Limpiamos el contenido actual de la lista antes de volver a generarla
    lista.innerHTML = "";

//Se recorre la lista "amigos" generada, creado una nueva línea para cada registro ingresado por le usuario
    amigos.forEach(function(amigo) {
        let li = document.createElement("li"); // Creamos un elemento <li>
        li.textContent = amigo; // Asignamos el nombre del amigo como texto
        lista.appendChild(li); // Agregamos el <li> a la lista <ul>
    });
}

//Está función permite obtener el resultado del "sorteo amigo" de forma aletatoria, aplicando algunas validaciones.
// ej: cuando la lista está vacía o la lista tiene menos de dos registros para sortear
function sortearAmigo() {
    let resultado = document.getElementById("resultado");
	let resultado2 = document.getElementById("resultado2");
    let lista = document.getElementById("listaAmigos");

//En caso que no tenga amigos para agregar y si aprete el boton sortear aparecera este mensaje
    if (amigos.length === 0) {
//resultado.innerHTML = "<li>No hay amigos para sortear</li>";
        mostrarAlertaNombreInvalido();        
		resultado.innerHTML = "<li></li>";
		resultado2.innerHTML = "<li></li>";
        return;
    }

//Se váalida que la liste contenga a lo mensos dos registros para ejecutar el sorteo, de lo contrario envía alerta por pantalla que indica al usuario que debe ingresar al menos dos amigos para sortear
    if (amigos.length < 3) {
        resultado2.innerHTML = "<li>Debe ingresar al menos tres amigos para sortear.</li>";
		return;		
		
    }

//Se elige un elemento indice aleatorios de la lista de amigo ingresada
    let indiceAleatorio = Math.floor(Math.random() * amigos.length);


//Se seleciona el nombreAmigo que fue sorteado aleatoriamente
    let amigoSeleccionado = amigos[indiceAleatorio];

//Despliega por pantalla el amigo selecionado 
    resultado.innerHTML = `
    <h2>Amigo secreto sorteado es: 
        <span style="color: var(--color-sorteo);">${amigoSeleccionado}</span>
    </h2><p>
    <h4 style="color: var(--color-primary);">
        Para un nuevo juego, vuelva ingresar amigos...
    </h4>
    `;


// Limpiar la lista de amigos en pantalla
   lista.innerHTML = "";

// Vaciar el array amigos para que no queden nombres
  amigos = [];
}

