"use client"
import { ArticleService } from "@/services/articles.service";
import { IArticle } from "@/types/Article.interface";
import { Button, Modal, Space, Spin, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useQuery } from "react-query";
import SearchField from "../Search/Search";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import CreateArticleForm from "./forms/ArticleForms/create";
import { Key } from "antd/es/table/interface";
import UpdateArticlesForm from "./forms/ArticleForms/update";

interface DataType {
    id: number
    title: string;
    description: string;
    imageUrl: string;
}

const perPage = 10;

const Articles = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const { data: articles, isLoading, refetch } = useQuery(["allArticles", searchTerm, currentPage], async () => await ArticleService.getAll({ searchTerm, page: currentPage, perPage }))
    const [selectedElements, setSelectedElements] = useState<Key[] | []>([])
    const [updateElementId, setUpdateElementId] = useState<number>()

    const onSearch = (value: string) => {
        setSearchTerm(value)
    }

    const onDelete = () => {
        if (selectedElements.length) {
            selectedElements.forEach(async item => {
                await ArticleService.delete(item as number).then(() => {
                    refetch()
                }).catch(err => {

                })
            })
        }
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Update',
            render: (el: DataType) => <EditOutlined className={"text-xl editicon text-center cursor-pointer"} onClick={() => {
                setUpdateElementId(el.id)
                setIsModalUpdateOpen(true)
            }} />
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'imageUrl',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl) => <img src={imageUrl} className="w-[50px] h-[50px] object-cover" />
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (descr) => <p className="">{descr}</p>
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
        }
    ];

    if (isLoading) {
        return (
            <div className='h-screen w-[100%] flex justify-center items-center'>
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div className="w-[100%] bg-matt-black rounded-3xl mt-10 p-10">
            <h1 className="text-center text-4xl font-bold">Articles</h1>
            <p className="text-center text-lg">Dashboard for edit your articles</p>
            <div className="flex items-center mt-10">
                <div className="flex items-center">
                    <Button onClick={() => setIsModalOpen(true)} type="primary" size="large" className="mr-5 create">Create</Button>
                    <Button type="default" size="large" className="delete" onClick={onDelete}>Delete</Button>
                </div>
                <div className="w-[60%] ml-5">
                    <SearchField onSearch={onSearch} />
                </div>
            </div>
            <div className="mt-5">
                {articles && <Table rowKey={(record) => record.id} rowSelection={{ onChange: (record) => setSelectedElements(record) }} pagination={{ total: articles.data.length, pageSize: 10, current: currentPage, onChange: (value) => setCurrentPage(value) }} columns={columns} dataSource={articles.data.articles.filter((item) => ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    imageUrl: item.imageUrl,
                    createdAt: item.createdAt
                }))} />}
            </div>
            <Modal title="Create Article" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} style={{ background: "#000 !important" }}>
                <CreateArticleForm onClose={() => setIsModalOpen(false)} />
            </Modal>
            {updateElementId && (
                <Modal title="Update Article" open={isModalUpdateOpen} onOk={() => setIsModalUpdateOpen(false)} onCancel={() => setIsModalUpdateOpen(false)}>
                    <UpdateArticlesForm onClose={() => setIsModalUpdateOpen(false)} refetch={refetch} article={updateElementId} />
                </Modal>
            )}
        </div>
    )
}

export default Articles;