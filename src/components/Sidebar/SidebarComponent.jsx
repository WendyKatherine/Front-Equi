import { CiViewTable } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";

export const SidebarComponent = () => {
  return (
    <>
        <div className="bg-black-tran h-full rounded-[15px] mx-2 p-[8px] flex flex-col justify-between">
            <div className="h-full w-full flex-wrap flex flex-col justify-start gap-2">
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
