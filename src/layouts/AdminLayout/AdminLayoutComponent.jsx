import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { FooterComponent } from "../../components/Footer/FooterComponent"
import { NavbarComponent } from "../../components/Navbar/NavbarComponent"
import { SidebarComponent } from "../../components/Sidebar/SidebarComponent"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const AdminLayoutComponent = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const routes = [
    { id: 1, name: "Your Profile", path: "/admin/profile" },
    { id: 2, name: "Users List", path: "/admin/user-list" },
    { id: 3, name: "Update user", path: "/admin/update-user" },
    { id: 4, name: "Log out", path: "/admin/logout" },
  ];

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <div className="h-screen flex flex-col p-4 overflow-hidden">
        <div className="h-[10%] flex">
          <NavbarComponent />
        </div>
        <div className="flex flex-row flex-grow">
          <div className="basis-[70px]">
            <SidebarComponent />
          </div>
          <div className="grow flex flex-col">
            <div className="flex-grow overflow-auto">
              {/* Botones de navegación */}
              <div>
                {routes.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => navigate(route.path)} // Redirige usando `navigate`
                    className="icon-nav m-4 px-4 p-2 text-white rounded"
                  >
                    {route.name}
                  </button>
                ))}
              </div>
              <div className="h-[88%]">
                {isAuthenticated ? (
                  <Outlet /> // Renderiza las rutas privadas si el usuario está autenticado
                ) : (
                  <Navigate to="/login" /> // Redirige a /login si no está autenticado
                )}
              </div>
            </div>
            <div className="h-[10%]">
              <FooterComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};