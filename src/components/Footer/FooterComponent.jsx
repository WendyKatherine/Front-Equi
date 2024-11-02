import { CiViewTable } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

export const FooterComponent = () => {
  return (
    <div className="bg-black-tran h-full flex flex-row items-center justify-between rounded-[15px] mx-2 p-[8px]">
        <div className="mx-8 flex flex-row gap-2 items-center">
            <h2 className="footer-text">Made with </h2> <CiHeart className="icon-footer" size={40} color="white" />
        </div>
        <div className="h-full flex-wrap flex flex-col justify-start ">
            <CiViewTable className="icon-footer" size={40} color="white" />
            <CiSquarePlus className="icon-footer" size={40} color="white" />
            <CiShare2 className="icon-footer" size={40} color="white" />
        </div>
    </div>
  )
}
