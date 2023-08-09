"use client"
import { CategoryService } from "@/services/category.service"
import { ICategory } from "@/types/Category.inteface"
import { Button, ColorPicker, Form, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import { FC, useState } from "react"


interface CategoriesFormProps {
    id: number
    label: string
    value: string
    color: string
}

interface CreateCategoriesFormProps {
    onClose: () => void
    refetch: () => void
    category:Pick<ICategory, "label" | "value" | "color" | "id">
}

const UpdateCategoriesForm: FC<CreateCategoriesFormProps> = ({ onClose, refetch, category }) => {
    const [form] = useForm()
    const [color, setColor] = useState("")

    const onFinish = async (fields: CategoriesFormProps) => {
        await CategoryService.update(category.id, {value: fields.value, label: fields.label, color}).then(res => {
            onClose()
            refetch()
        }).catch(err => {
            form.setFields([{ name: 'value', errors: ['Something wat`s wrong'] }, { name: 'label', errors: ['Something wat`s wrong'] }, { name: 'color', errors: ['Something wat`s wrong'] }])
        })
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
                <Form.Item<CategoriesFormProps>
                    label="Label"
                    name="label"
                    initialValue={category.label}
                    rules={[{ required: true, message: 'Please input categories label!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<CategoriesFormProps>
                    label="Value"
                    name="value"
                    initialValue={category.value}
                    rules={[{ required: true, message: 'Please input categories value!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<CategoriesFormProps>
                    label="Color"
                    name="color"
                    initialValue={category.color}
                    rules={[{ required: true, message: 'Please input categories color!' }]}
                >
                    <ColorPicker format="hex" onChangeComplete={(color) => setColor(`#${color.toHex()}`)}/>
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

export default UpdateCategoriesForm