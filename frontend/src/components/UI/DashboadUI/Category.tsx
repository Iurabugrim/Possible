"use client"
import { Button, Modal, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useQuery } from "react-query";
import SearchField from "../Search/Search";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { CategoryService } from "@/services/category.service";
import { ICategory } from "@/types/Category.inteface";
import CreateCategoriesForm from "./forms/CategoriesForm/create";
import UpdateCategoriesForm from "./forms/CategoriesForm/update";
import { Key } from "antd/es/table/interface";

interface DataType {
    id: number
    value: string;
    label: string;
    color: string;
}

const perPage = 10;

const Categories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [allACategories, setAllCategories] = useState<ICategory[]>([])
    const { data, isLoading, refetch } = useQuery(["allACategories"], async () => await CategoryService.getAll())
    const [updateElement, setUpdateElement] = useState<DataType>()
    const [selectedElements, setSelectedElements] = useState<Key[]>([])

    useEffect(() => {
        if (data) {
            setAllCategories(data.data)
        }
    }, [data])

    const onSearch = (value: string) => {
        setAllCategories(state => {
            return state.filter(item => item.value.includes(value) || item.label.includes(value))
        })
    }

    const onDelete = () => {
        if (selectedElements.length) {
            selectedElements.forEach(async item => {
                await CategoryService.delete(item as number).then(() => {
                    refetch()
                }).catch(err => {
                    
                })
            })
        }
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Update',
            render: (el) => <EditOutlined className={"text-xl editicon text-center cursor-pointer"} onClick={() => {
                setUpdateElement(el)
                setIsModalUpdateOpen(true)
            }} />
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            render: (color) => <i style={{ background: color }} className={"mr-3 h-[10px] w-[10px] rounded-3xl inline-block"}></i>
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
        <div className="w-[100%] bg-matt-black rounded-3xl my-10 p-10">
            <h1 className="text-center text-4xl font-bold">Categories</h1>
            <p className="text-center text-lg">Dashboard for edit your categories</p>
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
                {allACategories && <Table rowKey={(record) => record.id} rowSelection={{ onChange: (record) => setSelectedElements(record) }} pagination={{ total: allACategories.length, pageSize: 10, current: currentPage, onChange: (value) => setCurrentPage(value) }} columns={columns} dataSource={allACategories.filter((item) => ({
                    id: item.id,
                    label: item.label,
                    value: item.value,
                    color: item.color,
                }))} />}
            </div>
            <Modal title="Create Article" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} style={{ background: "#000 !important" }}>
                <CreateCategoriesForm onClose={() => setIsModalOpen(false)} refetch={refetch} />
            </Modal>
            {updateElement && (
                <Modal title="Update Article" open={isModalUpdateOpen} onOk={() => setIsModalUpdateOpen(false)} onCancel={() => setIsModalUpdateOpen(false)}>
                    <UpdateCategoriesForm onClose={() => setIsModalUpdateOpen(false)} refetch={refetch} category={updateElement} />
                </Modal>
            )}
        </div>
    )
}

export default Categories;