const tituloNota = document.querySelector("#editorNotasNombre");
const textoNota = document.querySelector("#editorNotas");
const btnGuardarNota = document.querySelector("#btnGuardarNota");
const btnNuevaNota = document.querySelector("#btnNuevaNota");
const btnEliminarNota = document.querySelector("#btnEliminarNota");
let notaSeleccionadaId =null;

btnGuardarNota.addEventListener("click",() => {

const titulo = tituloNota.value.trim();
const texto = textoNota.value.trim();

if (titulo === "" || texto === ""){
    alert("La nota está vacía");
    return;
}


const notas = JSON.parse(localStorage.getItem("notas")) || [];
if(notaSeleccionadaId === null){
    const nuevaNota = {
    id: Date.now(),
    titulo: titulo,
    texto:texto,
    fecha: new Date().toISOString()

};
notas.push(nuevaNota);
} else {
    const notaEncontrada = notas.find((nota) => nota.id === notaSeleccionadaId);
    if(notaEncontrada){
        notaEncontrada.titulo =titulo;
        notaEncontrada.texto = texto;
        notaEncontrada.fecha = new Date().toISOString();
    }
}

localStorage.setItem("notas", JSON.stringify(notas));

alert("Nota Guardada correctamente");
mostrarNotas();
})


// Lógica para mostrar el array en mis notas 

const listaNotas = document.querySelector("#listaNotas");

function mostrarNotas(){
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    listaNotas.innerHTML ="";

    notas.forEach((nota) => {
        const recuadroNota = document.createElement("div");
        recuadroNota.classList.add("notaGuardada")
        const titulo = document.createElement("h3");
        titulo.textContent = nota.titulo;
        recuadroNota.appendChild(titulo);
        listaNotas.appendChild(recuadroNota);

        recuadroNota.addEventListener("click",() =>{
            tituloNota.value = nota.titulo;
            textoNota.value = nota.texto;
            notaSeleccionadaId = nota.id;
        });
        listaNotas.appendChild(recuadroNota);
    });

}
    mostrarNotas();

//BOTON NUEVA NOTA
    btnNuevaNota.addEventListener("click",() =>{
        tituloNota.value = "";
        textoNota.value = "";
        notaSeleccionadaId = null;
    })

//BOTON ELIMINAR NOTA 

btnEliminarNota.addEventListener("click", () => {
    if (notaSeleccionadaId === null){
        alert("Seleccione una nota para eliminar");
        return;
    }
    const notas = JSON.parse(localStorage.getItem("notas")) || [];
    const NotasFiltradas = notas.filter((nota) => nota.id !== notaSeleccionadaId);
    
    localStorage.setItem ("notas",JSON.stringify(NotasFiltradas));
    tituloNota.value ="";
    textoNota.value = "";
    notaSeleccionadaId.value = null;

    mostrarNotas();
    alert("Nota eliminada correctamente"); 
});