"use client";
import {FC} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "classnames"
import {NavigationData} from "@/components/Layout/Navigation/NavigationData.data";


const Navigation: FC = () => {
    const pathname = usePathname();

    return (
        <nav className={"flex"}>
            {NavigationData.map(item => (
                <div className={clsx("mr-14 text-gray", {"text-white": pathname == item.path})} key={item.path}>
                    <Link href={item.title}>{item.title}</Link>
                </div>
            ))}
        </nav>
    )
}

export default Navigation;