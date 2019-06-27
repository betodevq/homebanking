//Declaración de variables
var nombreUsuario = 'beto';
var saldoCuenta = 0;
var limiteExtraccion = 1000;
var cuentasAmigas = [1234567, 7654321];
var claveHomeBanking = 1234;
//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    if (iniciarSesion()) {
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    }
}

function iniciarSesion() {

    var inputClave = prompt('Ingrese su contraseña:');
    if (validarContrasena(inputClave)) {
        alert('Ingrese la contraseña correcta.');
        return false;
    }
    accederHomeBanking;
    alert('Bienvenido/a ' + nombreUsuario + ' ya puedes comenzar a realizar operaciones');
    return true;
}

function accederHomeBanking(){ //Activa las diferentes opciones del homebanking en caso de ser correcta la contraseña
    var botones = document.getElementsByClassName("links");
    for (i = 0; i < botones.length; i++) { 
        botones[i].disabled = false;
    }
}

//                      Validaciones
function validarContrasena(contrasenaIngresada) {    //Verifica la contraseña de login
    if (contrasenaIngresada != claveHomeBanking) {
        return true;
    }
    return false;
}

function validarInput(cantidad) {   //Valida que se ingrese un numero válido y que sea positivo
    if (isNaN(cantidad) || cantidad < 0) {
        return true;
    }
}

function saldoInsuficiente(cantidad) {   //Verifica la disponibilidad en la cuenta
    if (cantidad > saldoCuenta) {
        return true;
    }
}

function verificarCuentaAmiga(cuentaAmiga) {    //Verifica que la cuenta amiga esté agendada
    for (i = 0; i < cuentasAmigas.length; i++) {
        if (cuentasAmigas[i] === cuentaAmiga) {
            return true;
        }
    }
    return false;
}

//          Main

function sumarDinero(montoDeposito) {
    saldoCuenta += montoDeposito;
}

function restarDinero(montoRestar) {
    saldoCuenta -= montoRestar;
}

function cambiarLimiteDeExtraccion() {
    var limiteNuevo = parseInt(prompt('Ingrese su nuevo limite de extracción.'));

    if (validarInput(limiteNuevo)) {
        return alert('Ingrese un monto válido.');
    }

    limiteExtraccion = limiteNuevo;
    actualizarLimiteEnPantalla()
    alert('Su nuevo limite de extracción es: ' + limiteExtraccion);
}

function extraerDinero() {
    var saldoAnterior = saldoCuenta;
    var cantidadRestar = parseInt(prompt('Ingrese la cantidad a extraer.'));

    if (validarInput(cantidadRestar)) {
        return alert('Ingrese un monto válido.');
    }

    if (cantidadRestar > saldoCuenta) {
        return alert('Esta cantidad excede su monto disponible.');
    }

    if (cantidadRestar > limiteExtraccion) {
        return alert('Monto inválido, su limite de extracción es de $' + limiteExtraccion);
    }

    if ((cantidadRestar % 100) !== 0) {
        return alert('Solo es permitido extraer billetes de $100.')
    }

    restarDinero(cantidadRestar);
    alert('Has extraido: $' + saldoCuenta + '\nSaldo anterior: $' + saldoAnterior + '\nSaldo Actual: $' + saldoCuenta);
    actualizarSaldoEnPantalla();
}

function depositarDinero() {
    var saldoAnterior = saldoCuenta;
    var cantidadDeposito = parseInt(prompt('Ingrese la cantidad a depositar.'));

    if (validarInput(cantidadDeposito)) {
        return alert('Ingrese un monto válido.');
    }

    sumarDinero(cantidadDeposito);
    alert('Has depositado: $' + saldoCuenta + '\nSaldo anterior: $' + saldoAnterior + '\nSaldo Actual: $' + saldoCuenta);
    actualizarSaldoEnPantalla();
}

function pagarServicio() {
    var agua = 350; var telefono = 425;
    var luz = 210; var internet = 570;
    var pagarServicio = parseInt(prompt('Ingrese el número que corresponda con el servicio que quiere pagar\n1 - Agua\n2 - Luz\n3 - Internet\n4 - Teléfono'));
    if (validarInput(pagarServicio)) {
        return alert('Ingrese un servicio válido.');
    }

    if (pagarServicio >= 1 && pagarServicio <= 4) {
        switch (pagarServicio) {
            case 1:
                if (saldoInsuficiente(agua)) {
                    return alert('No hay suficiente saldo en tu cuenta para pagar este servicio');
                }
                restarDinero(agua);
                actualizarSaldoEnPantalla();
                break;

            case 2:
                if (saldoInsuficiente(luz)) {
                    return alert('No hay suficiente saldo en tu cuenta para pagar este servicio');
                }
                restarDinero(luz);
                actualizarSaldoEnPantalla();
                break;

            case 3:
                if (saldoInsuficiente(internet)) {
                    return alert('No hay suficiente saldo en tu cuenta para pagar este servicio');
                }
                restarDinero(internet);
                actualizarSaldoEnPantalla();
                break;

            case 4:
                if (saldoInsuficiente(telefono)) {
                    return alert('No hay suficiente saldo en tu cuenta para pagar este servicio');
                }
                restarDinero(telefono);
                actualizarSaldoEnPantalla();
                break;
        }
    } else {
        return alert('Ingrese un servicio válido.');
    }


}

function transferirDinero() {
    var montoTransferir = parseInt(prompt('Ingrese el monto a transferir:'));

    if (validarInput(montoTransferir) || saldoInsuficiente(montoTransferir)) {
        return alert('Ingrese un monto válido.');
    }
    var cuentaAmiga = parseInt(prompt('Ingrese el numero de cuenta a transferir:'));
    if (!verificarCuentaAmiga(cuentaAmiga)) {
        return alert('Ingrese una cuenta amiga válida.');
    }
    restarDinero(montoTransferir);
    actualizarSaldoEnPantalla();
    alert('Se han transferido: $' + montoTransferir + '\nCuenta destino: ' + cuentaAmiga);
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {

    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {

    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {

    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}