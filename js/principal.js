window.addEventListener('load', function(){

    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');
    const btnCerrarSesion = this.document.getElementById('btnCerrarSesion');

    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

    // implementar listener del boton
    btnCerrarSesion.addEventListener('click', function(){
        cerrarSesion();
    });

});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

async function cerrarSesion() { 
    const url = 'http://localhost:8082/login/logout-async';
    const request = {
        tipoDocumento: localStorage.getItem("tipoDocumento"),
        numeroDocumento: localStorage.getItem("numeroDocumento")
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        // validar respuesta
        const result = await response.json();
        console.log('Respuesta del servidor: ', result);

        if(result.resultado) {
            localStorage.clear();
            window.location.replace('index.html');
        } else {
            console.log("Error: "+ result.mensaje);
        }
    } catch (error) {
        console.log('Error: Ocurrió un problema al cerrar sesion', error);
    }

}
