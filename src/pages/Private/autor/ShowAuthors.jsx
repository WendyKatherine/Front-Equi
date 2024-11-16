import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import avatar from "../../../assets/img/avatar.png";
import { Global } from "../../../services/Global";
import { Typography } from '@mui/material';

export const ShowAuthors = () => {
    const { auth, loading } = useContext(AuthContext);
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);
    const urlImage = `http://localhost:3900/`;
  
    const fetchAuthors = async () => {
      try {
        const response = await fetch(`${Global.url}author/list-author`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
  
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La respuesta no es JSON válida");
        }
  
        const data = await response.json();
        console.log("Estructura de la respuesta:", data);
  
        if (data.status === "success") {
          setAuthors(data.authors || []); // Reemplaza 'authors' según el nombre correcto
        } else {
          throw new Error("No se pudo obtener la lista de autores");
        }
      } catch (error) {
        console.error("Error en la solicitud de autores:", error.message);
        setError(error.message);
      }
    };
  
    useEffect(() => {
      if (!loading && auth.token) {
        fetchAuthors();
      }
    }, [loading, auth?.token]); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (loading) return <p>Cargando datos de usuario...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <>
        <Typography className="text-center" variant="h1">
          Authors List
        </Typography>
        <div className="flex flex-wrap flex-row">
          <div className="w-full h-[30rem]">
            <div className="bg-black-tran flex flex-wrap flex-row p-4 m-4 h-full overflow-y-scroll custom-scroll">
              {authors.length === 0 ? (
                <p>No se encontraron autores.</p>
              ) : (
                authors.map((author) => (
                    <div
                        className="w-[48%] bg-black-tran flex flex-row m-2 p-4"
                        key={author._id}
                    >
                    <div className="flex flex-row">
                        <div className=" w-[30%] flex flex-col items-center justify-center">
                        {author.image && author.image !== "default.png" ? (
                            <img
                                src={`${urlImage}uploads/${author.image}`}
                                className="w-[200px] h-[200px] img-user"
                                alt="Foto de perfil"
                            />
                            ) : (
                            <img
                                src={avatar}
                                className="w-[200px] h-[200px] img-user"
                                alt="Foto de perfil predeterminada"
                            />
                            )}
                        </div>
                        <div className="w-[70%] flex flex-col p-2">
                            <Typography variant="h2">
                            {author.name} {author.last_name}
                            </Typography>
                            <p className=" text-[10px] py-2 ">
                            Created at: {author.created_at}
                            </p>
                            <Typography variant="body2">{author.bio}</Typography>
                            <Typography variant="body1">
                            {author.socialLinks}
                            </Typography>
                        </div>
                    </div>
                </div>
                ))
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  