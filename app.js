const tituloNota = document.querySelector("#editorNotasNombre");
const textoNota = document.querySelector("#editorNotas");
const btnGuardarNota = document.querySelector("#btnGuardarNota");

btnGuardarNota.addEventListener("click",() => {

const titulo = tituloNota.value.trim();
const texto = textoNota.value.trim();

if (titulo === "" || texto === ""){
    showMessage("La nota está vacía")
    return;
}

const nuevaNota = {
    id: Date.now,
    titulo: titulo,
    texto:texto,
    fecha: new Date().toISOString

};

localStorage.setItem("nota", JSON.stringify(nuevaNota));

showMessage("Nota Guardada correctamente");

})