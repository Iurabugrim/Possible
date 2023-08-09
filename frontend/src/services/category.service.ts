import instance from "@/api/api.interceptor";
import { ICategory } from "@/types/Category.inteface";

const CATEGORY = "category"

export const CategoryService = {
    async getAll() {
        return await instance.get<ICategory[]>(`${CATEGORY}`);
    },

    async getById(id: number) {
        return await instance.get<ICategory>(`${CATEGORY}/${id}`)
    },

    async create(data: Pick<ICategory, "value" | "label" | "color">) {
        return await instance.post<ICategory>(`${CATEGORY}`, data)
    },

    async update(id: number, data: Pick<ICategory, "value" | "label" | "color">) {
        return await instance.patch<ICategory>(`${CATEGORY}/${id}`, data)
    },

    async delete(id: number) {
        return await instance.delete<ICategory>(`${CATEGORY}/${id}`)
    },
}