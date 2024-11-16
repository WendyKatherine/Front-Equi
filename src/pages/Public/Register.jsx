import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { Global } from '../../services/Global';
import Swal from 'sweetalert2';
import { TextField, Button, Box } from '@mui/material';

export const Register = () => {
  
  // Usar el hook personalizado useForm para cargar los datos del formulario
  const { form, changed } = useForm({});

  // Estado para mostrar el resultado del registro del user en la BD
  const [ saved, setSaved ] = useState("not sended");

  // Hook para redirigir
  const navigate = useNavigate();

  // Método Guardar un usuario en la BD
  const saveUser = async (e) => {

    // Prevenir que se actualice la pantalla
    e.preventDefault();

    // Obtener los datos del formulario
    let newUser = form;

    // Petición a la API (Backend) para guardar el usuario en la BD
    const request = await fetch(Global.url + 'user/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Obtener la información retornada por el backend
    const data = await request.json();

    // Verificar si el estado de la respuesta es "created" seteamos la variable de estado saved con "saved"
    if(request.status === 201 && data.status === "created"){
      setSaved("saved");

      // Mostrar el modal de éxito
      Swal.fire({
        title: data.message,
        icon: 'success',
        confirmButtonText: 'Continuar',
      }).then(() => {
        // Redirigir después de cerrar el modal
        navigate('/login');
      });

    } else {
      setSaved("error");

      // Mostrar el modal de error
      Swal.fire({
        title: data.message || "¡Error en el registro!",
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente',
      });
    };
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>

      {/* Formulario de Registro*/}
      <div className="content__posts">
        <div className="form-style">

          {/* Respuesta de usuario registrado */}
          {saved == "saved" ? (
            <strong className="alert alert-success">¡Usuario registrado correctamente!</strong>
          ) : ''}
          {saved == "error" ? (
            <strong className="alert alert-danger">¡El Usuario no se ha registrado correctamente!</strong>
          ) : ''}

          <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: 400,
                margin: 'auto',
                mt: 4,
            }}
            onSubmit={saveUser}
          >
            <TextField
              type="text"
              label="Name"
              variant="outlined"
              name="name"
              onChange={changed}
              autoComplete="Your Name"
              value={form.name || ''}
              required
            />
            <TextField
              type="text"
              label="Last Name"
              variant="outlined"
              name="last_name"
              onChange={changed}
              autoComplete="Your Last Name"
              value={form.last_name || ''}
              required
            />
            <TextField
              type="text"
              label="Nick Name"
              variant="outlined"
              name="nick"
              onChange={changed}
              autoComplete="Your Nick Name"
              value={form.nick || ''}
              required
            />
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              name="email"
              onChange={changed}
              autoComplete="Your Email"
              value={form.email || ''}
              required
            />
            <TextField
              type="text"
              label="Biography"
              variant="outlined"
              name="bio"
              onChange={changed}
              autoComplete="Your Biography"
              value={form.bio || ''}
              required
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              name="password"
              onChange={changed}
              autoComplete="Your Password"
              value={form.password || ''}
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              value="Enviar">
                Register
            </Button>
          </Box>
        </div>
      </div>
    </>
  )
}