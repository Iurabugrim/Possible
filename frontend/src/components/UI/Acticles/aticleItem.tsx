import Image from "next/image";
import {FC} from "react";
import Link from "next/link";
import clsx from "classnames"

interface ArticleItemProps {
    id: number
    colorCategory: string
    category: string
    title: string
    text: string
    imageUrl: string
}
const ArticleItem: FC<ArticleItemProps> = ({id, title, text, imageUrl, colorCategory, category}) => {
    return (
        <div className={"w-[47%] bg-matt-black rounded-3xl overflow-hidden flex flex-col cursor-pointer hover:border-[1px] hover:border-primary transition-all duration-300 ease-out"}>
            <Link href={`/article/${id}`}>
                <div className={"w-[auto] h-[260px]"}>
                    <Image src={imageUrl} alt={""} width={800} height={600} className={"h-[100%] object-cover"}/>
                </div>
                <div className={"px-7 py-7 flex flex-col justify-center"}>
                    <div className={"flex items-center mb-2"}>
                        <i style={{background: colorCategory}} className={"mr-3 h-[10px] w-[10px] rounded-3xl inline-block"}></i>
                        <p>{category}</p>
                    </div>
                    <h1 className={"text-2xl font-bold mb-3"}>
                        {title}
                    </h1>
                    <p className={"text-[16px] font-light"}>
                        {text}
                    </p>
                </div>
            </Link>
        </div>
    )
}

export default ArticleItem;