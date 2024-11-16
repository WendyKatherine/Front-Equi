import { useNavigate } from "react-router-dom";
import { CiViewTable, CiSquarePlus, CiShare2, CiHome } from "react-icons/ci";

export const SidebarComponent = () => {
  const navigate = useNavigate();

  const routes = [
    { id: 1, name: "Home", description: "Some thing to do", path: "/" },
  ];

  const handleBellClick = () => {
    navigate(routes[0].path); // Asegúrate de usar el índice correcto
  };

  return (
    <>
        <div className="bg-black-tran h-full rounded-[15px] mx-2 p-[8px] flex flex-col justify-between">
            <div className="h-full w-full flex-wrap flex flex-col justify-start gap-2">
                {routes.map((route) => (
                  <div key={route.id}>
                    <a href={route.path}>
                      <CiHome  onClick={handleBellClick} className="icon-nav" size={45} color="white" />
                    </a>
                  </div>
                ))}
                <CiViewTable className="icon-nav" size={40} color="white" />
                <CiSquarePlus className="icon-nav" size={40} color="white" />
                <CiShare2 className="icon-nav" size={40} color="white" />
            </div>
            <div>
                <CiShare2 className="icon-nav" size={40} color="white" />
            </div>
        </div>
    </>
  )
}
