import Image from "../Image";
import '../../styles/global.css'
import { Link } from "react-router-dom";

type TestProps = {
    className?: string;
    dark?: boolean;
};

export const Logo = ({ className, dark }: TestProps) => (
    <Link className={`flex w-[11.88rem] ${className}`} to="/">
        <Image
            className="w-full h-auto"
            src={dark ? "/images/logo-dark.svg" : "/images/logo.svg"}
            width={190}
            height={40}
            alt="Brainwave"
        />
    </Link>
);