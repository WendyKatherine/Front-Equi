import { useNavigate } from "react-router-dom";
import { CiUser, CiCloudMoon, CiBellOn } from "react-icons/ci";
import { TextField } from "@mui/material";

export const NavbarComponent = () => {
  const navigate = useNavigate();

  const routes = [
    { id: 1, name: "Login", description: "Some thing to do", path: "/login" },
  ];

  const handleBellClick = () => {
    navigate(routes[0].path); // Asegúrate de usar el índice correcto
  };

  return (
    <div className="flex flex-row items-center justify-between h-full w-full mx-2 p-2">
      {/* Izquierda */}
      <div className="flex flex-row items-center justify-start gap-4">
        <CiCloudMoon className="px-2" size={45} color="white" />
        <h1 className="Logo-Title text-white">Equinoccio</h1>
      </div>

      {/* Centro */}
      <div className="flex flex-grow justify-center items-center mx-4">
        <TextField 
          id="outlined-basic" 
          label="Search" 
          className="w-[200px]" 
        />
      </div>

      {/* Derecha */}
      <div className="flex flex-row items-center justify-end gap-4">
        <CiBellOn 
          className="icon-nav" 
          size={45} 
          color="white" 
          onClick={handleBellClick} // Llamada a la función al hacer clic
        />
        {routes.map((route) => (
          <div key={route.id}>
            <a href={route.path}>
              <CiUser className="icon-nav" size={45} color="white" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
