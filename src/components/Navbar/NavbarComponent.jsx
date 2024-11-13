import { CiUser, CiCloudMoon, CiBellOn } from "react-icons/ci";
import { TextField } from '@mui/material';

export const NavbarComponent = () => {
  return (
    <div className="flex flex-row items-center justify-between h-full w-full mx-2 p-2"> {/* Asegúrate de que ocupe toda la altura */}
      <div className="flex flex-row items-center justify-start gap-4"> {/* Cambiar justify-center a justify-start */}
        <CiCloudMoon className="px-2" size={45} color="white" />
        <h1 className="Logo-Title text-white">Equinoccio</h1>
      </div>
      <div className="flex flex-grow justify-center items-center mx-4"> {/* Añadido mx-4 para espacio en los lados */}
        <TextField 
          id="outlined-basic" 
          label="Search"
          className="w-[200px]"
        />
      </div>
      <div className="flex flex-row items-center justify-end gap-4">
        <CiBellOn className="icon-nav" size={45} color="white" />
        <CiUser className="icon-nav" size={45} color="white" />
      </div>
    </div>
  );
};
