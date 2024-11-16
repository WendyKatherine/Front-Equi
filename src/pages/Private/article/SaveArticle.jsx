import { useState, useContext } from "react";
import { useForm } from "../../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { Global } from "../../../services/Global";
import { AuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2";
import { TextField, Button, Box, Typography } from "@mui/material";

export const SaveArticle = () => {
    const { form, changed, resetForm } = useForm({
        author_id: "",
        title: "",
        content: "",
        summary: "",
        image: "",
        status: "",
        tags: "",
        created_by: "",
    });

    const [ saved, setSaved ] = useState("not sended");
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const articleSave = async (e) => {
        e.preventDefault();

        let newArticle = form;

        try {
            const request = await fetch(Global.url + "article/save-article", {
                method: 'POST',
                body: JSON.stringify(newArticle),
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
              Create new Article
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
                onSubmit={articleSave}
              >
                <TextField
                  type="text"
                  label="Author identification"
                  variant="outlined"
                  name="author_id"
                  onChange={changed}
                  autoComplete="Author identification"
                  value={form.author_id || ''}
                  required
                />
                <TextField
                  type="text"
                  label="Main title"
                  variant="outlined"
                  name="title"
                  onChange={changed}
                  autoComplete="Main title"
                  value={form.title || ''}
                  required
                />
                <TextField
                  type="text"
                  label="Main Content"
                  variant="outlined"
                  name="content"
                  onChange={changed}
                  autoComplete="Main Content"
                  value={form.content || ''}
                  required
                />
                <TextField
                  type="text"
                  label="Summary"
                  variant="outlined"
                  name="summary"
                  onChange={changed}
                  autoComplete="Summary"
                  value={form.summary || ''}
                  required
                />
                <TextField
                  type="text"
                  label="Status"
                  variant="outlined"
                  name="status"
                  onChange={changed}
                  autoComplete="Status"
                  value={form.status || ''}
                  required
                />
                <TextField
                  type="text"
                  label="tags"
                  variant="outlined"
                  name="tags"
                  onChange={changed}
                  autoComplete="tags"
                  value={form.tags || ''}
                  required
                />
                <TextField
                  type="text"
                  label="Created by"
                  variant="outlined"
                  name="created_by"
                  onChange={changed}
                  autoComplete="Created by"
                  value={form.created_by || ''}
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