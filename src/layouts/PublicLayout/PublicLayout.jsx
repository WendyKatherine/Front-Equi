import { Outlet } from "react-router-dom";
import { FooterComponent } from "../../components/Footer/FooterComponent"
import { NavbarComponent } from "../../components/Navbar/NavbarComponent"
import { SidebarComponent } from "../../components/Sidebar/SidebarComponent"


export const PublicLayout = () => {
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
            <Outlet/>
          </div>
          <div className="h-[10%]">
            <FooterComponent />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
