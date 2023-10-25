import { useContext } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import Icon from "../../../Icon";
import { Link, useLocation } from "react-router-dom";
import '../../../../styles/global.css'
import { getAllTags } from "../../../API/Api";
import { UserContext } from "../../../../App";
type ItemListType = {
    id: string;
    title: string;
    color?: string;
    url: string;
};

type ItemListProps = {
    visible?: boolean;
    items: ItemListType[];
};

const ItemList = ({ visible, items }: ItemListProps) => {
    const { setMainData, setVisibleAddBtn} = useContext(UserContext);
    const router = useLocation();

    const handleTagItemClick = (e: React.FormEvent) => {
        e.preventDefault();
        getAllTags(setMainData, setVisibleAddBtn);
    };
  
    return (
        <>
            <div className="mb-auto pb-6">
                <Disclosure defaultOpen={true}>
                    <Disclosure.Button
                        className={`flex items-center w-full h-12 text-left base2 text-black transition-colors hover:text-blue ${visible ? "justify-center px-3" : "px-5"
                            }`}
                    >
                        {!visible && <div className="ml-5 mr-5 hover:text-primary-1">Set-up</div>}
                        <Icon
                            className="fill-n-4 transition-transform ui-open:rotate-180"
                            name="arrow-down"
                        />
                    </Disclosure.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Disclosure.Panel className={`${visible && "px-2"}`}>
                            {items.map((item) => (
                                <Link
                                    className={twMerge(
                                        `flex items-center w-full h-12 rounded-lg text-black base2 font-semibold transition-colors ${visible ? "px-3" : "px-5"
                                        } ${router.pathname === item.url &&
                                        "text-black"
                                        }`
                                    )}
                                    key={item.id}
                                    to={item.id === '1' ? "" : item.url}
                                    onClick={item.id === "1" ? handleTagItemClick : undefined}
                                >
                                    <div className="flex justify-center items-center w-6 h-6">
                                        <div
                                            className="w-3.5 h-3.5 rounded"
                                            style={{
                                                backgroundColor: item.color,
                                            }}
                                        ></div>
                                    </div>
                                    {!visible && (
                                        <>
                                            <div className=" hover:text-primary-1">
                                                {item.title}
                                            </div>
                                        </>
                                    )}
                                </Link>
                            ))}
                        </Disclosure.Panel>
                    </Transition>
                </Disclosure>
            </div>
        </>
    );
};

export default ItemList;
