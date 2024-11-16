//Recibimos un target con el formulario
export const SerializeForm = (form) => {
    const formData = new FormData(form);

    //Objeto vacio 
    const completeObj = {};

    for (let [name, value] of formData) {
        completeObj[name] = value;
    }

    return completeObj;
}