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

    $("#idtableMascotaSection").css("display", "none");
}
function peticionEstudianteProgramacion() {
    return $.ajax({
        type: "GET",
        url: 'https://johnfredyb.github.io/ApiPersonas/Persona.json',
        dataType: 'json',
    });
}

function IngresarMascota() {
    let idPersona = document.getElementById('idPersona').value;
    let numMascota = document.getElementById('numMascota').value;
    let existe = true;
    
    personaArray.forEach(atencion => {

        if( idPersona == atencion.ID ){
            window.localStorage.setItem('idPersona', JSON.stringify(atencion));
            window.localStorage.setItem('numMascota', numMascota);

            pintarTablaMascotaGuardar(numMascota);
            existe=false;
        }
    });
    if(existe){
        alert("No Existe Persona con ese Id");
    }
}

function pintarTablaMascotaGuardar(num) {

    $("#idtableMascotaSection").css("display", "block");

    document.getElementById('bodyMascota').innerHTML = '';

    var contadorItem = 0;

    for (let i = 0; i < num; i++) {
        
        $('#bodyMascota').append(
            `<tr id="filaCompra${contadorItem}" data-index="${contadorItem}">
                    <td>
                        <input type="text" id="nombreMascota${contadorItem}" name="nombreMascota${contadorItem}"
                            class="form-control">
                    </td>
                    <td>
                        <div class="form-check d-flex justify-content-center">
                            <input class="form-check-input" type="radio" name="gridRadios${contadorItem}" id="gato${contadorItem}">
                            <label class="form-check-label" for="gridRadios2"></label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check d-flex justify-content-center">
                            <input class="form-check-input" type="radio" name="gridRadios${contadorItem}" id="perro${contadorItem}">
                            <label class="form-check-label" for="gridRadios2"></label>
                        </div>
                    </td>
            </tr>`
        );
        contadorItem++;
    }
}

function validarcamposTablaMascota() {
        
    let formulaBody = document.getElementById('bodyMascota').rows;
    let existe = true;

    for (let i = 0; i < formulaBody.length; i++) {
        let elementoIndex = formulaBody[i];
        let index = elementoIndex.dataset.index;

        let nombre = document.getElementById( `nombreMascota${index}`).value;
        let gato = document.getElementById(`gato${index}`).checked ? '1' : '0';
        let perro = document.getElementById(`perro${index}`).checked ? '1' : '0';
        
        let mascota = 'yes';
        if( gato==='0' && perro==='0'){
            mascota = '';
        }

        if (
            nombre === '' ||
            mascota === ''
        ) {
            existe=false;
            break;
        }
    }
    
    if(existe){
        armadoMascota();
        // console.log("paso");
    }else{
        alert("Alguno de los campos no se ha completado");
    }
}

function armadoMascota() {
    
    let arrayMascota = null;
    let formulaBody = document.getElementById('bodyMascota').rows;
    arrayMascota = new Array(formulaBody+1);

    for (let i = 0; i < formulaBody.length; i++) {
        let elementoIndex = formulaBody[i];
        let index = elementoIndex.dataset.index;

        let nombre = document.getElementById( `nombreMascota${index}`).value;
        let gato = document.getElementById(`gato${index}`).checked ? '1' : '0';
        let perro = document.getElementById(`perro${index}`).checked ? '1' : '0';
        
        let mascota = 'perro';
        if( gato==1 ){
            mascota = "gato";
        }

        var data = {
            "nombre": nombre,
            "mascota": mascota
        }
        arrayMascota[i]=data;
    }

    console.log(arrayMascota);
    window.localStorage.setItem('arrayMascota', JSON.stringify(arrayMascota));
    window.location.href = "html/principal.html";
}