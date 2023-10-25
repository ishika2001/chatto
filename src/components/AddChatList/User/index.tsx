import Image from "../../Image";
import Select from "../../Select";
import Icon from "../../Icon";
import { useState } from "react";
import '../../../styles/global.css'

type UserProps = {
    item: any;
};

const typesAccess = [
    {
        id: "0",
        title: "Full access",
    },
    {
        id: "1",
        title: "Can view",
    },
    {
        id: "2",
        title: "Can start chat",
    },
];

const User = ({ item }: UserProps) => {
    const [typeAccess, setTypeAccess] = useState<any>(typesAccess[1]);

    return (
        <div className="flex items-center mb-5 last:mb-0" key={item.id}>
            <div className="relative w-8 h-8 mr-3">
                <Image
                    className="object-cover rounded-full"
                    src={item.avatar}
                    alt="Avatar"
                />
            </div>
            <div className="mr-auto base2 font-semibold text-n-5 dark:text-n-3">
                {item.name}
            </div>
            {item.status ? (
                <div className="flex items-center caption1 font-semibold text-n-4">
                    {item.status}{" "}
                    <Icon
                        className="w-5 h-5 ml-1.5 fill-n-4"
                        name="check-thin"
                    />
                </div>
            ) : (
                <Select
                    className="shrink-0"
                    classButton="h-auto px-0 !shadow-none caption1 font-semibold"
                    classOptions="left-auto -right-1 w-[10.125rem]"
                    classOption="items-end caption1 font-semibold"
                    items={typesAccess}
                    value={typeAccess}
                    onChange={setTypeAccess}
                />
            )}
        </div>
    );
};

export default User;
