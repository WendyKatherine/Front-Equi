import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Global } from "../services/Global.jsx";
import { AuthContext } from "./AuthContext.js";

export const AuthProvider = ({ children }) => {
    //Estado para guardar la informacion del usuario y verificar que esta autenticado
    const [auth, setAuth] = useState({});

    //Estado para configurar la carga de los elementos del perfil
    const [loading, setLoading] = useState(true);

    useEffect(() => {
         // Verificar si el token existe antes de intentar autenticarse
         const token = localStorage.getItem("token");
         const userId = localStorage.getItem("id");

         if (token && userId) {
             authUser(token, userId); // Ejecuta authUser solo si hay un token
         } else {
             setLoading(false); // Si no hay token, establece loading en false directamente
         }
    }, []);

    const authUser = async (token, userId) => {
        try {
            //Peticion que comprueba el token y devuelve los datos del usuario
            const request = await fetch(`${Global.url}user/user-profile/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });

            if (!request.ok) {
                throw new Error(`Error ${request.status} : ${request.statusText}`);
            }

        const data = await request.json();
        setAuth({ ...data.user, token, userId });

        setLoading(false);

        } catch (error) {
            console.error("Error en la autenticación:", error);
        } finally {
            setLoading(false);
        }
    };

    //Renderizar el proverdor de contexto con AuthCOntext. Provider
    return (
        <AuthContext.Provider 
            value={{
                auth,
                setAuth,
                loading,
                setLoading,
                isAuthenticated: !!auth?.token,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

//Definir propTypes para el componente AuthProvider
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
