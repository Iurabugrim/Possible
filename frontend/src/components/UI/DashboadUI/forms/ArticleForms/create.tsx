import instance from "@/api/api.interceptor"
import { ArticleService } from "@/services/articles.service"
import { CategoryService } from "@/services/category.service"
import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select, Upload } from "antd"
import { useForm } from "antd/es/form/Form"
import TextArea from "antd/es/input/TextArea"
import { FC, useState } from "react"
import { useQuery } from "react-query"


interface ArticleFormProps {
    title: string
    description: string
    body: string
    imageUrl: string
    categoryId: number
}

interface CreateArticleFormProps {
    onClose: () => void
}

const CreateArticleForm: FC<CreateArticleFormProps> = ({ onClose }) => {
    const [form] = useForm()
    const { data, isLoading } = useQuery(["allCategories"], async () => await CategoryService.getAll())
    const [selectCategory, setSelectCategory] = useState<number>()

    const onFinish = async (value: ArticleFormProps) => {
        if (selectCategory) {
            const { categoryId, ...allFields } = value
            await ArticleService.create({ categoryId: selectCategory, ...allFields }).then(res => {
                onClose()
            }).catch(err => {
                form.setFields([{ name: 'title', errors: ['Something wat`s wrong'] }, { name: 'description', errors: ['Something wat`s wrong'] }, { name: 'body', errors: ['Something wat`s wrong'] }])
            })
        }
    }

    return (
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
                    rules={[{ required: true, message: 'Please input article title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<ArticleFormProps>
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input article description!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<ArticleFormProps>
                    label="Body"
                    name="body"
                    rules={[{ required: true, message: 'Please input article body!' }]}
                >
                    <TextArea style={{ resize: "none" }} />
                </Form.Item>

                <Form.Item<ArticleFormProps>
                    label="Image"
                    name="imageUrl"
                    rules={[{ required: true, message: 'Please enter article image url!' }]}
                >
                    <Input type="url" />
                </Form.Item>

                <Form.Item<ArticleFormProps>
                    label="Category"
                    name="categoryId"
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
    )
}

export default CreateArticleForm