import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Global } from "../../../services/Global";
import avatar from "../../../assets/img/avatar.png";
import { Typography, Button } from "@mui/material";

export const ShowArticles = () => {
  const { auth, loading } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null); // Estado para almacenar el artículo seleccionado
  const [error, setError] = useState(null);
  const urlImage = `http://localhost:3900/`;

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${Global.url}article/list-articles`, {
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
      console.log("Datos obtenidos:", data);

      if (data.status === "success" && Array.isArray(data.article)) {
        setArticles(data.article);
      } else {
        throw new Error("No se pudo obtener la lista de artículos");
      }
    } catch (error) {
      console.error("Error en la solicitud de articulos:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!loading && auth.token) {
      fetchArticles();
    }
  }, [loading, auth?.token]);// eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <p>Cargando datos de usuario...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Typography className="text-center" variant="h1">
        Articles List
      </Typography>
      <div className="flex flex-wrap flex-row">
        {/* Contenedor de artículos con scroll */}
        <div className="w-[48%] h-[30rem]">
          <div className="bg-black-tran flex flex-col p-4 m-4 h-full overflow-y-scroll custom-scroll">
            {articles.length === 0 ? (
              <p>No se encontraron artículos.</p>
            ) : (
              articles.map((article) => (
                <div
                  className="w-full bg-black-tran flex flex-row my-2 p-4"
                  key={article._id}
                >
                  <div className="w-full flex flex-row">
                    <div className="w-[30%] flex flex-col items-center justify-center">
                      <div>
                        {article.image && article.image !== "default.png" ? (
                            <img
                                src={`${urlImage}uploads/${article.image}`}
                                className="w-[150px]"
                                alt="Foto de perfil"
                            />
                            ) : (
                            <img
                                src={avatar}
                                className="w-[150px]"
                                alt="Foto de perfil predeterminada"
                            />
                        )}
                      </div>
                    </div>
                    <div className="w-[70%]">
                      <div className="flex flex-col gap-2 p-3">
                        <Typography className="text-justify" variant="h3">{article.title}</Typography>
                        <Typography className="text-center" variant="body2">
                          Created at: {article.created_at}
                        </Typography>
                        <Typography className="text-justify" variant="body2">{article.summary}</Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setSelectedArticle(article)}
                          className="icon-nav"
                        >
                          Show Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contenedor de detalles */}
        <div className="w-[48%] h-[30rem] bg-black-tran flex items-center justify-center gap-4 m-4">
          <div className="w-full flex flex-col h-full overflow-y-scroll custom-scroll">
            {selectedArticle ? (
              <div className="flex flex-col gap-2 p-6">
                <Typography className="text-center" variant="h1">{selectedArticle.title}</Typography>
                <Typography className="text-left" variant="h2">Resumen: </Typography>
                <Typography variant="h3">{selectedArticle.summary}</Typography>
                <Typography className="text-left" variant="h2">Contenido: </Typography>
                <Typography variant="body1">{selectedArticle.content}</Typography>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Typography className="text-left" variant="h3">Etiqueta: </Typography>
                  <Typography variant="body2">{selectedArticle.tags}</Typography>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Typography className="text-left" variant="h3">Estatus: </Typography>
                  <Typography variant="body2">{selectedArticle.status}</Typography>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Typography className="text-left" variant="h3">Creado por: </Typography>
                  <Typography variant="body2">{selectedArticle.created_by}</Typography>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Typography className="text-left" variant="h3">Creado: </Typography>
                  <Typography variant="body2">{selectedArticle.created_at}</Typography>
                </div>
                
                
              </div>
            ) : (
              <Typography variant="body1">Selecciona un artículo para ver los detalles</Typography>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
