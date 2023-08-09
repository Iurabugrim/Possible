import {FC} from "react";
import Logo from "@/components/UI/Logo/Logo";
import Navigation from "@/components/Layout/Navigation/Navigation";
import Link from "next/link";


const Header: FC = () => {
    return (
        <header>
            <div className="container">
                <div className={"flex justify-between items-center py-10"}>
                    <Link href={"/"} className={"relative"}>
                        <Logo fill={"#A1E216"}/>
                    </Link>
                    <Navigation/>
                </div>
            </div>
        </header>
    )
}

export default Header;