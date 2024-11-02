import { CiUser } from "react-icons/ci";
import { CiCloudMoon } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";

export const NavbarComponent = () => {
  return (
    <>
      <div className="h-full flex flex-row flex-wrap mx-2 p-2">
        <div className="flex flex-1 flex-row items-center justify-between gap-4"> {/* Flex-row aplicado aquí */}
          <div className="flex flex-row items-center justify-center gap-4">
            <div>
              <CiCloudMoon className="px-2" size={45} color="white" />
            </div>
            <div>
              <h1 className="Logo-Title text-white">Equinoccio</h1>
            </div>
          </div>
          <div>
            <input type="text" placeholder="Buscar" />
          </div>
        </div>
        <div className="flex flex-1 flex-row items-center justify-end gap-4"> {/* Flex-row aplicado aquí */}
          <div>
            <CiBellOn className="icon-nav" size={45} color="white" />
          </div>
          <div>
            <CiUser className="icon-nav" size={45} color="white" />
          </div>
        </div>
      </div>
    </>
  );
};
