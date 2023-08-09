"use client"
import Image from "next/image";
import {FC, useState} from "react";
import clsx from "classnames";
import Link from "next/link";

interface FirstArticle {
    id: number
    colorCategory: string
    category: string
    title: string
    text: string
    imageUrl: string
}
const FirstArticle: FC<FirstArticle> = ({id, title, text, imageUrl, colorCategory, category}) => {

    return (
        <Link href={`/article/${id}`}>
            <div className={"w-[100%] bg-matt-black rounded-3xl flex mb-10 cursor-pointer overflow-hidden hover:border-[1px] hover:border-primary transition-all duration-300 ease-out"}>
                <div className={"w-[auto] relative"}>
                    <Image src={imageUrl} alt={""} width={500} height={600} className={"h-[100%] object-cover"}/>
                </div>
                <div className={"px-10 py-20 flex flex-col justify-center w-[53%]"}>
                    <div className={"flex items-center mb-3"}>
                        <i style={{background: colorCategory}}  className={"mr-3 h-[10px] w-[10px] rounded-3xl inline-block"}></i>
                        <p>{category}</p>
                    </div>
                    <h1 className={"text-4xl font-bold mb-5"}>
                        {title}
                    </h1>
                    <p className={"text-[16px] font-light"}>
                        {text}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default FirstArticle;