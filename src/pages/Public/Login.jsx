import { useState } from "react";
import { Global } from "../../services/Global";
import { useForm } from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Box } from '@mui/material';

export const Login = () => {

  const navigate = useNavigate();
  
  // Estado para obtener los datos desde el formulario
  const { form, changed, resetForm } = useForm({ email: "", password: "" });

  // Estado para validar si el usuario se identificó correctamente
  const [logged, setLogged] = useState("not logged");

  // Estado para setear los valores del token y usuario en el contexto de la aplicación
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    // prevenir que se actualice el navegador
    e.preventDefault();

    // Obtener los datos del formulario
    let userToLogin = form;

    // Petición al backend
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Obtener la información retornada por la request
    const data = await request.json();

    if (data.status == "success") {
      // Guardar los datos del token y usuario en el localstorage del navegador
      localStorage.setItem("token", data.token);
      // Asegurarse de almacenar el usuario en formato JSON
      localStorage.setItem("user", JSON.stringify(data.userBD)); 
      //Guardar el id en localstorage
      localStorage.setItem("userId", data.userBD._id || data.userBD.id);

      // Seteamos la variable de estado logged si se autenticó correctamente el usuario
      setLogged("logged");

      // Seteamos los datos del usuario en el Auth
      setAuth({ token: data.token, ...data.userBD });

      // Limpiar el formulario
      resetForm();

      // Redirección
      navigate("/admin");

      // Forzar una recarga
      // window.location.reload();

    } else {
      // Seteamos la variable de estado logged si no se autenticó el usuario
      setLogged("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <Typography className="text-center" variant="h1">
          Hello, welcome back to work
        </Typography>
      </header>
  
      {/* Formulario de Login */}
      <div className="flex flex-row gap-8 h-[85%] p-4">
        <div className="bg-black-tran w-[50%] background-img"></div>
        <div className="bg-black-tran w-[50%] flex flex-col justify-center items-center">
          {/* Mensajes para el usuario */}
          {logged === "logged" ? (
            <strong className="alert alert-success">
              ¡Usuario autenticado correctamente!
            </strong>
          ) : (
            ""
          )}
          {logged === "error" ? (
            <strong className="alert alert-danger">
              ¡El usuario no se ha autenticado!
            </strong>
          ) : (
            ""
          )}
          <Typography className="text-center" variant="h2">
              Fill in your data
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              maxWidth: 400,
              mt: 4,
            }}
            onSubmit={loginUser}
          >
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              name="email"
              autoComplete="Your Email"
              value={form.email}
              onChange={changed}
              required
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              name="password"
              autoComplete="Your password"
              value={form.password}
              onChange={changed}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              value="Enviar"
            >
              Enviar
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
  
};