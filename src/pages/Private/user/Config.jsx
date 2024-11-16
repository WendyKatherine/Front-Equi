import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Global } from "../../../services/Global";
import { SerializeForm } from "../../../services/SerializeForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from '@mui/material';

export const Config = () => {

    //Recibir la informacion del contexto por medio del Hook useAuth
    const { auth, setAuth } = useAuth() || {};

    //Estado para mostrar resultado del registro del user
    const [saved, setSaved] = useState("not_saved");

    //Hook para redireccionar
    const navigate = useNavigate();

    //Funcion para actualizar usuario
    const updateUser = async (e) => {
        
        //Prevenir que se actualice la pantalla
        e.preventDefault();

        //variable para almacenar el token para las peticiones en el componente
        const token = localStorage.getItem("token");

        //Obtener los datos del formulario
        let newDataUser = SerializeForm(e.target);

        //Borrar imagen no volverla a actualizar
        delete newDataUser.image;

        try {
            //Actualizar el usuario modificado con en la BD
            const userUpdateResponse = await fetch(`${Global.url}/user/${auth.id}`, {
                method: "PUT",
                body: JSON.stringify(newDataUser),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            
            //Obtener la informacion retornada del request
            const userData = await userUpdateResponse.json();

            if (userData?.status === "success" && userData.user) {
                
                //Eliminar objeto recibido la contraseña
                delete userData.user.password;

                //Actualizar el contexto de los datos del usuario moddificado
                setAuth(userData.user);
                setSaved("saved");

                //Mostrar el modal de exito
                const successMessage = userData?.message || 'Usuario actualizado correctamente';

                Swal.fire({
                    title: successMessage,
                    icon: 'success',
                    confirmButtonText: 'Continue'
                }).then(() => {
                    navigate('/login');
                });
            } else {
                setSaved("error");

                //Mostrar el modal de error con el mensaje del backend o un mensaje por defecto
                const errorMessage = userData?.message || 'Error al actualizar el usuario';

                //Mostrar modal de error 
                Swal.fire({
                    title: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Try again'
                });
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setSaved("error");

            //Mostrar el modal de error con el mensaje del backend o un mensaje por defecto
            const errorMessage = error.response ?.data?.message || 'Error al actualizar el usuario';

            //Mostrar modal de error 
            Swal.fire({
                title: errorMessage,
                icon: 'error',
                confirmButtonText: 'Try again'
            });
        }
    }

    return (
        <>
        <div className="container">
            <div>
                {saved === "saved" ? (
                    <strong>Usuario actualizado correctamente</strong>
                ) : ''}
                {saved === "error" ? (
                    <strong>Usuario no se ha actualizado correctamente</strong>
                ) : ''}
                <div className="flex flex-col items-center justify-center">
                    <Typography variant='h1'>Update your user { auth.name }</Typography>
                    <Typography variant='h3'>Change your user data</Typography>
                </div>
                <div>
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
                        onSubmit={updateUser}
                    >
                        <div className="flex flex-row gap-4 items-center justify-center">
                            <TextField
                                className="w-[50%]"
                                type="text"
                                label="Name"
                                variant="outlined"
                                name="name"
                                autoComplete="First Name"
                                value={auth.name}
                                required
                            />
                            <TextField
                                className="w-[50%]"
                                type="text"
                                label="Last Name"
                                variant="outlined"
                                name="last_name"
                                autoComplete="Last Name"
                                value={auth.last_name}
                                required
                            />
                        </div>
                        <TextField
                            type="text"
                            label="Nick"
                            variant="outlined"
                            name="nick"
                            autoComplete="Nick Name"
                            value={auth.nick}
                            required
                        />
                        <TextField
                            type="text"
                            label="Bio"
                            variant="outlined"
                            name="bio"
                            autoComplete="Biography Content"
                            value={auth.bio}
                            required
                        />
                        <TextField
                            type="email"
                            label="Email"
                            variant="outlined"
                            name="email"
                            autoComplete="email email.com"
                            value={auth.email}
                            required
                        />
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            name="password"
                            autoComplete="New password"
                            value={auth.password}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" value="Editar">
                            Enviar
                        </Button>
                    </Box>
                </div>
    
            </div>
        </div>
        </>
    )
}

