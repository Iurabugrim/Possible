import instance from "@/api/api.interceptor";
import { IArticle, getAllArticles } from "@/types/Article.interface";

const ARTICLE = "article"

export const ArticleService = {
    async getAll(query: getAllArticles) {
        let queryArr: any[] = []

        Object.entries(query).filter(item => !!item[1] ? item : false).forEach(item =>  queryArr.push(`${item[0]}=${item[1]}`))

        return await instance.get<{ articles: IArticle[], length: number }>(`${ARTICLE}?${queryArr.join('&')}`);
    },

    async getById(id: number) {
        return await instance.get<IArticle>(`${ARTICLE}/${id}`)
    },

    async create(data: Pick<IArticle, "title" | "body" | "description" | "imageUrl" | "categoryId">) {
        return await instance.post<IArticle>(`${ARTICLE}`, data)
    },

    async update(id: number, data: Pick<IArticle, "title" | "body" | "description" | "imageUrl" | "categoryId">) {
        return await instance.patch<IArticle>(`${ARTICLE}/${id}`, data)
    },

    async delete(id: number) {
        return await instance.delete<IArticle>(`${ARTICLE}/${id}`)
    },

}