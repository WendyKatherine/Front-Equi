import { useState } from "react";

/**
 * Custom Hook para manejar formularios de manera eficiente
 * @param {Object} initialObj - Estado inicial del formulario
 * @returns {Object} { form, changed, resetForm }
 */
export const useForm = (initialObj = {}) => {
  // Estado para los valores del formulario
  const [form, setForm] = useState(initialObj);

  /**
   * Maneja los cambios en los inputs
   * @param {Object} target - Input que desencadena el cambio
   */
  const changed = ({ target }) => {
    const { name, value, type } = target;

    // Convertir el valor si es necesario (ej. checkbox o número)
    const parsedValue = type === "checkbox" ? target.checked : value;

    setForm({
      ...form,
      [name]: parsedValue,
    });
  };

  /**
   * Resetea el formulario al estado inicial
   */
  const resetForm = () => {
    setForm(initialObj);
  };

  return {
    form,
    changed,
    resetForm,
  };
};
