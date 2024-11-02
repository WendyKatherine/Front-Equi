import { FooterComponent } from "../../components/Footer/FooterComponent"
import { NavbarComponent } from "../../components/Navbar/NavbarComponent"
import { SidebarComponent } from "../../components/Sidebar/SidebarComponent"
import { PagesComponent } from "../../pages/PagesComponent"

export const AdminLayoutComponent = () => {
  return (
    <>
      <div className="h-screen flex flex-col p-4">
        <div className="h-[15%]">
          <NavbarComponent />
        </div>
        <div className="flex flex-row h-full">
          <div className="basis-[70px]">
            <SidebarComponent />
          </div>
          <div className="grow">
            <div className="flex flex-col h-full">
              <div className="h-[90%]">
                <PagesComponent />
              </div>
              <div className="h-[10%]">
                <FooterComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

