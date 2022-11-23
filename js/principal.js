pintarInfrimacion();
var personaArray = [];
async function pintarInfrimacion(){
    personaArray = await peticionEstudianteProgramacion();
    personaArray = await personaArray.Personas;

    // let personaArrayAux = await peticionEstudianteProgramacion();
    // personaArrayAux.Personas.forEach(atencion => {
    //     personaArray.push(atencion);
    // });

    console.log(personaArray);
    pintarCliente();
}
function peticionEstudianteProgramacion() {
    return $.ajax({
        type: "GET",
        url: 'https://johnfredyb.github.io/ApiPersonas/Persona.json',
        dataType: 'json',
    });
}

function pintarCliente(){

    let atencion = JSON.parse(localStorage.getItem("idPersona"));

    document.getElementById('nombrePersona').innerHTML = atencion.Nombre+" "+atencion.Apellidos;
    document.getElementById('ciudadPersona').innerHTML = atencion.Ciudad;
    document.getElementById('celularPersona').innerHTML = atencion.Celular;
    document.getElementById('fijoPersona').innerHTML = atencion.Fijo;
    // document.getElementById('nacimientoPersona').innerHTML = Fecha Nacimiento;
    // document.getElementById('civilPersona').innerHTML = atencion.Estado Civil;
    document.getElementById('hijosPersona').innerHTML = atencion.Hijos;
    document.getElementById('macotaPersona').innerHTML = localStorage.getItem('numMascota');


    let mascota = JSON.parse(localStorage.getItem("arrayMascota"));

    let tablaAux2 = '';

    const tbody = document.getElementById('bodyMascota');
    tbody.innerHTML = '';
    mascota.forEach(async atencion => {

        let imgRuta = null;
        if( atencion.mascota==="perro" ){
            imgRuta = await peticionPerroRandom();
            imgRuta = imgRuta.message;
        }else{
            imgRuta = await peticionGatoRandom();
            imgRuta = imgRuta.url;
        }
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${atencion.mascota}</td>
            <td>${atencion.nombre}</td>
            <td>
                <img width="200px" src="${imgRuta}">
            </td>
        `;
        tbody.appendChild(tr);

        const tbody2 = document.getElementById('contenedorMascota');
        tablaAux2+=`
            <div class="col-6">
                <h3 class="text-center">${atencion.nombre}</h3>
                <div class="d-flex justify-content-center">
                    <img width="170px" src="${imgRuta}">  
                </div>
            </div>
        `;
        tbody2.innerHTML = tablaAux2;
    });
}

function peticionPerroRandom() {
    return $.ajax({
        type: "GET",
        url: 'https://dog.ceo/api/breeds/image/random',
        dataType: 'json',
    });
}

function peticionGatoRandom() {
    return $.ajax({
        type: "GET",
        url: 'https://api.thecatapi.com/v1/images/search',
        dataType: 'json',
    });
}



