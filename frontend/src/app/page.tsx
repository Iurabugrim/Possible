"use client"
import FirstArticle from "@/components/UI/Acticles/first-article";
import ArticleItem from "@/components/UI/Acticles/aticleItem";
import { Empty, Spin } from "antd";
import SearchField from "@/components/UI/Search/Search";
import SelectCategory from "@/components/UI/Select/Select";
import { useEffect, useState } from "react";
import { ICategory } from "@/types/Category.inteface";
import Pagination from "@/components/UI/Pagination/Pagination";
import { useQuery } from 'react-query';
import { ArticleService } from '@/services/articles.service';
import { CategoryService } from "@/services/category.service";

const perPage = 10;

export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [currentCategory, setCurrentCategory] = useState<string>("")
    const [selectCategoryOptions, setSelectCategoryOptions] = useState<{ value: string, label: string }[]>([])
    const { data: articles, isLoading, isError } = useQuery(["allArticles", searchTerm, page, currentCategory], async () => await ArticleService.getAll({ category: currentCategory, page, perPage, searchTerm }))
    const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery(["allCategories"], async () => await CategoryService.getAll())

    useEffect(() => {
        if (categories) {
            const options = categories.data.map((item) => ({ value: item.value, label: item.label }))
            options.unshift({ value: "", label: "All" })
            setSelectCategoryOptions(options)
        }
    }, [categories])

    const onChangeCategory = (value: string) => {
        setCurrentCategory(value)
    };

    const onSearchCategory = (value: string) => {
        console.log('search:', value);
    };

    const onSearchTerm = (value: string) => {
        setSearchTerm(value)
    }

    const onChangePage = (value: number) => {
        setPage(value)
    }

    if (isLoading) {
        return (
            <div className='h-screen w-[100%] flex justify-center items-center'>
                <Spin size="large" />
            </div>
        )
    }

    return (
        <main className={"py-5 hover:transform-[scale(1.1)]"}>
            <div className={"container"}>
                <div className={" mx-auto mt-3 mb-9 flex items-center gap-9"}>
                    <SearchField onSearch={onSearchTerm} />
                    <SelectCategory options={selectCategoryOptions} onChange={onChangeCategory} onSearch={onSearchCategory} />
                </div>
                {articles && articles.data.articles[0] && (
                    <FirstArticle id={articles.data.articles[0].id} colorCategory={articles.data.articles[0].category.color}
                        title={articles.data.articles[0].title}
                        text={articles.data.articles[0].description}
                        imageUrl={articles.data.articles[0].imageUrl} category={articles.data.articles[0].category.label} />
                )}
                <div className={"flex flex-wrap gap-10 justify-center"}>
                    {articles && articles.data.length ? articles.data.articles.filter((item, i) => i !== 0).map((item) => (
                        <ArticleItem key={item.id} id={item.id} title={item.title} text={item.description} category={item.category.label} imageUrl={item.imageUrl} colorCategory={item.category.color} />
                    )) : (
                        <div className='w-[100%] h-[50vh] flex justify-center items-center'>
                            <Empty />
                        </div>
                    )}
                </div>
                {articles && (
                    <div className={"flex justify-center my-9"}>
                        <Pagination currentPage={page} total={articles.data.length} onChange={onChangePage} pageSize={perPage} />
                    </div>
                )}
            </div>
        </main>
    )
}
