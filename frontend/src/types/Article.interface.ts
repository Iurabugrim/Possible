import { ICategory } from "./Category.inteface"

export interface IArticle {
    id: number
    title: string
    description: string
    body: string
    imageUrl: string
    category: ICategory
    categoryId: number
    createdAt: Date
}

export class getAllArticles {
    page?: number
    perPage?: number
    searchTerm?: string | undefined
    category?: string | undefined
}