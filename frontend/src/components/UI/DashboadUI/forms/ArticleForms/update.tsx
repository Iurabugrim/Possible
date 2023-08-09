"use client"
import { ArticleService } from "@/services/articles.service"
import { CategoryService } from "@/services/category.service"
import { Button, Form, Input, Select, Spin } from "antd"
import { useForm } from "antd/es/form/Form"
import TextArea from "antd/es/input/TextArea"
import { FC, useState } from "react"
import { useQuery } from "react-query"


interface ArticleFormProps {
    id: number
    title: string
    description: string
    body: string
    categoryId: number
    imageUrl: string
}

interface CreateArticlesFormProps {
    onClose: () => void
    refetch: () => void
    article: number
}

const UpdateArticlesForm: FC<CreateArticlesFormProps> = ({ onClose, refetch, article }) => {
    const [form] = useForm()
    const { data, isLoading } = useQuery(["allCategories"], async () => await CategoryService.getAll())
    const { data: curArticle, isLoading: isLoadingArticle } = useQuery(["getArticle"], async () => await ArticleService.getById(article))
    const [selectCategory, setSelectCategory] = useState<number>()

    const onFinish = async (fields: ArticleFormProps) => {
        if (curArticle && selectCategory) {
            const {categoryId, ...rest} = fields
            await ArticleService.update(curArticle.data.id, { ...rest, categoryId: selectCategory }).then(res => {
                onClose()
                refetch()
            }).catch(err => {
                form.setFields([{ name: 'title', errors: ['Something wat`s wrong'] }, { name: 'description', errors: ['Something wat`s wrong'] }, { name: 'body', errors: ['Something wat`s wrong'] }])
            })
        }
    }

    if (isLoading || isLoadingArticle) {
        return (
            <div className='h-screen w-[100%] flex justify-center items-center'>
                <Spin size="large" />
            </div>
        )
    }

    return (
        <>
            {curArticle && (
                <div>
                    <Form
                        form={form}
                        name="basic"
                        initialValues={{ remember: true }}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item<ArticleFormProps>
                            label="Title"
                            name="title"
                            initialValue={curArticle.data.title}
                            rules={[{ required: true, message: 'Please input article title!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<ArticleFormProps>
                            label="Description"
                            name="description"
                            initialValue={curArticle.data.description}
                            rules={[{ required: true, message: 'Please input article description!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<ArticleFormProps>
                            label="Body"
                            name="body"
                            initialValue={curArticle.data.body}
                            rules={[{ required: true, message: 'Please input article body!' }]}
                        >
                            <TextArea style={{ resize: "none" }} />
                        </Form.Item>

                        <Form.Item<ArticleFormProps>
                            label="Image"
                            name="imageUrl"
                            initialValue={curArticle.data.imageUrl}
                            rules={[{ required: true, message: 'Please enter article image url!' }]}
                        >
                            <Input type="url" />
                        </Form.Item>

                        <Form.Item<ArticleFormProps>
                            label="Category"
                            name="categoryId"
                            initialValue={curArticle.data.categoryId}
                            rules={[{ required: true, message: 'Please enter article image url!' }]}
                        >
                            <Select
                                placeholder="Select a category"
                                optionFilterProp="children"
                                size={"large"}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onSelect={(value) => {
                                    const item = data?.data.filter(item => item.value === value)
                                    setSelectCategory(item?.[0].id)
                                }}
                                options={data?.data}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </>
    )
}

export default UpdateArticlesForm