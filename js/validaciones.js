export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = 
        mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre:{
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email:{
        valueMissing: 'El campo correo no puede estar vacio',
        typeMismatch: 'El correo no es válido.',
    },
    password: {
        valueMissing: 'El campo password no puede estar vacio',
        patternMismatch: 'Mínimo ocho y máximo 10 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    },
    nacimiento:{
        valueMissing:'El campo fecha no puede estar vacio.',
        customError: 'Debes tener almenos 18 años de edad.',
    },
    numero: {
        valueMissing:"El campo teléfono no puede estar vacío.",
        patternMismatch: "El formato requerido es XXX XXX XXXX 10 numeros",
    },
    direccion: {
        valueMissing:"El campo direccion no puede estar vacío.",
        patternMismatch: "El campo direccion debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing:"El campo ciudad no puede estar vacío.",
        patternMismatch: "El campo ciudad debe contener entre 10 a 40 caracteres",
    },
    estado: {
        valueMissing:"El campo estado no puede estar vacío.",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = '';
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

//Funcion para validar nacimiento del user
function validarNacimiento(input){
    const fechaClient = new Date(input.value); //acceder al valor de fecha con nueva instancia
    let mensaje = '';
    if (!mayorEdad(fechaClient)) {
        mensaje = 'Debes tener almenos 18 años de edad.';
    }

    input.setCustomValidity(mensaje);
}

//Validar mayor de 18 años, mayor de edad.
function mayorEdad(fecha){
    const fechaActual = new Date(); //fecha actual para restar fache del user luego
    //Calculamos edad del user
    const diferenciaFechas = new Date( 
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}