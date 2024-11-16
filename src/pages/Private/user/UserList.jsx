import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import avatar from "../../../assets/img/avatar.png";
import { Global } from "../../../services/Global";
import { Typography } from '@mui/material';

export const UserList = () => {
  const { auth, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const urlImage = `http://localhost:3900/`;

  // Función para obtener la lista de usuarios
  const fetchUsers = async () => {
    try {
      const response = await fetch(Global.url + "user/list-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("La respuesta no es JSON");
      }

      const data = await response.json();
      if (data.status === "success") {
        setUsers(data.users);
        console.log(data.users);
      } else {
        throw new Error("No se pudo obtener la lista de usuarios");
      }
    } catch (err) {
      console.error("Error en la solicitud de usuarios:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!loading && auth?.token) {
      fetchUsers();
    }
  }, [loading, auth?.token]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <p>Cargando datos de usuario...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Typography className="text-center" variant="h1">
        Users List
      </Typography>
      <div className="flex flex-wrap flex-row ">
        <div className="w-full h-[30rem]">
          <div className="flex flex-wrap flex-row p-4 m-4 h-full overflow-y-scroll custom-scroll">
            {users.length === 0 ? (
                <p>No se encontraron usuarios.</p>
              ) : (
                users.map((user) => (
                  <div className="w-[45%] bg-black-tran flex flex-row m-4 p-4" key={user._id}>
                    <div className="flex flex-col items-center justify-center">
                        {user.image && user.image !== "default.png" ? (
                          <img
                            src={`${urlImage}uploads/${user.image}`}
                            className="w-[200px] img-user"
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
                    <div className="body">
                      <div className="flex flex-col">
                        <Typography variant="h2">
                          {user.name} {user.last_name}
                        </Typography>
                        <Typography variant="body1" className="user-info__create-date">
                          {user.nick}
                        </Typography>
                      </div>
                      <Typography variant="body1" className="post__content">
                        {user.bio}
                      </Typography>
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
