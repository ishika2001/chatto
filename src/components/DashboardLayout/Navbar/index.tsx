import Icon from "../../Icon"
import Profile from "./Profile"

export const Navbar = () => {
    return (
        <div className="text-slate-700 ">
            <div className="flex justify-center items-center">
            <div className="relative w-[25rem] mt-3 mb-3 flex justify-center items-center">
                <button
                    className="group absolute top-3 left-4 text-0"
                    type="submit"
                >
                    <Icon
                        className="w-5 h-5 fill-n-7 transition-colors group-hover:fill-primary-1 dark:fill-n-5"
                        name="search-1"
                    />
                </button>
                <input
                    className="items-center w-full h-11 pl-11 pr-4 bg-transparent shadow-[inset_0_0_0_0.0625rem_#DADBDC] rounded-full outline-none caption1 text-n-7 transition-shadow focus:shadow-[inset_0_0_0_0.125rem_#0084FF] placeholder:text-n-4 dark:shadow-[inset_0_0_0_0.0625rem_#2A2E2F] dark:text-n-1 dark:focus:shadow-[inset_0_0_0_0.125rem_#0084FF]"
                    type="text"
                    name="search"
                    placeholder="Search For Anything"/>
            </div>
            </div>
            
            <div className="absolute top-0 right-0 flex justify-end items-center h-18 px-9 border-n-3 lg:pr-18 md:pr-16 dark:border-n-5">
                <Profile/>
            </div>
        </div>
    )
}
