import { useState, useContext } from "react";
import { useForm } from "../../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { Global } from "../../../services/Global";
import { AuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2";
import { TextField, Button, Box, Typography } from "@mui/material";

export const SaveAuthor = () => {
    const { form, changed, resetForm } = useForm({
        name: "",
        last_name: "",
        bio: "",
        socialLinks: "",
    });

    const [ saved, setSaved ] = useState("not sended");
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    
    const authorSave = async (e) => {
        e.preventDefault();

        let newAuthor = form;
        
        try{
        const request = await fetch(Global.url + "author/save-author", {
            method: 'POST',
            body: JSON.stringify(newAuthor),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${auth?.token}`,
            }
        });

        const data = await request.json();

        if (request.status === 201 && data.status === "created") {
            setSaved("saved");

            // Mostrar el modal de éxito
            Swal.fire({
                title: data.message,
                icon: "success",
                confirmButtonText: "Continuar",
            }).then(() => {
                // Redirigir después de cerrar el modal
                navigate("/admin/profile");
            });

            // Resetear el formulario
            resetForm();
        } else {
            throw new Error(data.message || "Error en el registro");
        }
    } catch (error) {
        setSaved("error");

        // Mostrar el modal de error
        Swal.fire({
            title: error.message || "¡Error en el registro!",
            icon: "error",
            confirmButtonText: "Intentar nuevamente",
        });
    }
};
    
  return (
    <div>
      <Typography className="text-center" variant="h1">
              Create new Author
          </Typography>
      <div>
        {/* Respuesta de usuario registrado */}
        {saved == "saved" ? (
            <strong className="alert alert-success">¡Usuario registrado correctamente!</strong>
          ) : ''}
          {saved == "error" ? (
            <strong className="alert alert-danger">¡El Usuario no se ha registrado correctamente!</strong>
          ) : ''}
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
            onSubmit={authorSave}
          >
            <TextField
              type="text"
              label="Name"
              variant="outlined"
              name="name"
              onChange={changed}
              autoComplete="Author Name"
              value={form.name || ''}
              required
            />
            <TextField
              type="text"
              label="Last Name"
              variant="outlined"
              name="last_name"
              onChange={changed}
              autoComplete="Author Last Name"
              value={form.last_name || ''}
              required
            />
            <TextField
              type="text"
              label="Biography"
              variant="outlined"
              name="bio"
              onChange={changed}
              autoComplete="Author Biography"
              value={form.bio || ''}
              required
            />
            <TextField
              type="text"
              label="Social Links"
              variant="outlined"
              name="socialLinks"
              onChange={changed}
              autoComplete="Author Social Links"
              value={form.socialLinks || ''}
              required
            />
             <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              value="Enviar">
                Add Author
            </Button>
        </Box>
      </div>
    </div>
  )
}