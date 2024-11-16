import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { GetProfile } from '../../../services/GetProfile';
import { useParams } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import { Typography, Button } from '@mui/material';
//import { Global } from '../../../services/Global';

export const Profile = () => {
    const { auth, loading } = useAuth();
    const [user, setUser] = useState({});
    const [image, setImage] = useState(""); // Estado para la imagen
    //const [setError] = useState("");
    const params = useParams();

    const navigate = useNavigate();

    const routes = [
        { id: 1, name: "Create new Author", description: "A job well done", path: "/admin/save-author" },
        { id: 2, name: "Create new Article", description: "A job well done", path: "/admin/save-article" },
        { id: 3, name: "See All Authors", description: "A job well done", path: "/admin/list-author" },
        { id: 4, name: "See All Articles", description: "A job well done", path: "/admin/list-article" },
    ];

    useEffect(() => {
        if (!loading) {
            // Obtener perfil del usuario
            GetProfile(params.id || auth.id, setUser, auth.token);
            setUser(auth); // Usar el auth directamente si está cargado
        }
    }, [loading, auth, params.id]);


    const fetchImage = () => {
        const urlImage = `http://localhost:3900/`;

        if (user.image) {
            const imageUrl = `${urlImage}uploads/${user.image}`; // Construir URL directa
            setImage(imageUrl); // Establecer URL en el estado
        } else {
            setImage("/path-to-default-image.png"); // Imagen predeterminada si no hay imagen
        }
    };
    
    // Llama a `fetchImage` cuando `user.image` cambie
    useEffect(() => {
        if (user.image) {
            fetchImage();
        }
    }, [user.image]);
    

    return (
        <div className='w-full h-full flex flex-row'>
            <div className="bg-black-tran flex flex-col items-center justify-center p-4 m-4  w-[50%]">
                <div className="">
                    <div className="flex flex-col items-center justify-center">
                        {image != "default.png" && (
                            <img src={image} className="w-[150px] img-user" alt="Foto de perfil" />
                        )}
                        {image == "default.png" && (
                            <img src={image} className="w-[150px] img-user" alt="Foto de perfil" />
                        )}
                    </div>

                    <div className="">
                        <div className="">
                            <Typography className='text-center' variant='h1'>
                                Hello, Welcome back
                            </Typography>
                            <Typography className='text-center' variant='h2'>
                                {user.name} {user.last_name}
                            </Typography>

                            
                        </div>
                        <Typography variant='body1'>Your nick name:</Typography>
                        <Typography className='text-center' variant='h3'>{user.nick}</Typography>
                        <Typography variant='body1'>Your biography:</Typography>
                        <Typography className='text-center' variant='body1'>{user.bio}</Typography>
                    </div>
                </div>
            </div>
            <div className='bg-black-tran flex flex-col p-4 m-4  w-[50%]'>
                <div>
                    <Typography variant='h1'>
                        Your Actions
                    </Typography>
                </div>
                <div className="h-full flex flex-col p-4">
                        <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-grow">
                            {routes.map((route) => (
                                <div 
                                    key={route.id}
                                    className="background-gradient flex flex-col items-center justify-center flex-grow">
                                    <Typography className='text-center' variant='h3'>
                                        {route.name}
                                    </Typography>
                                    <Typography className='text-center' variant='body1'>
                                        {route.description}
                                    </Typography>
                                    <Button 
                                        className='text-center'
                                        onClick={() => navigate(route.path)

                                    }>
                                        Go now
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
        </div>
    )
}