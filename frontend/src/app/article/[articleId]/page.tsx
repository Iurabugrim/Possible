"use client"
import Image from "next/image";
import { ArticleService } from "@/services/articles.service";
import { Spin, Empty, Divider } from "antd";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const ArticlePage = () => {
    const {articleId} = useParams()
    const { data, isLoading, isError } = useQuery(['articles', articleId], async () => await ArticleService.getById(+articleId))
    const [createDate, setCreateDate] = useState<string>()

    useEffect(() => {
        if (data) {
            const newDate = new Date(data.data.createdAt)
            setCreateDate(newDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
        }
    }, [data])

    if (isLoading) {
        return (
            <div className='h-screen w-[100%] flex justify-center items-center'>
                <Spin size="large" />
            </div>
        )
    }

    return (
        <main className="bg-matt-black rounded-3xl p-16">
            {data ? (
                <>
                    <h1 className="text-4xl text-white font-bold mb-5">{data.data.title}</h1>
                    <div className="flex">
                        <div className={"flex items-center mb-2"}>
                            <i style={{background: data.data.category.color}} className={"mr-3 h-[10px] w-[10px] rounded-3xl inline-block"}></i>
                            <p>{data.data.category.label}</p>
                        </div>
                        <p className={"text-white text-opacity-60 ml-5"}>{createDate}</p>
                    </div>
                    <Image src={data.data.imageUrl} alt="Main img" width={1000} height={500} className="object-cover rounded-xl my-7"/>
                    <Divider className="bg-white"/>
                    <div className="text-lg">
                        {data.data.body}
                    </div>
                </>
            ) : (
                <div className='h-screen w-[100%] flex justify-center items-center'>
                    <Empty />
                </div>
            )}
        </main>
    )
}

export default ArticlePage;