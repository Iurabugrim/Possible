"use client"
import { CategoryService } from "@/services/category.service"
import { Button, ColorPicker, Form, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import { FC, useState } from "react"


interface CategoriesFormProps {
    label: string
    value: string
    color: string
}

interface CreateCategoriesFormProps {
    onClose: () => void
    refetch: () => void
}

const CreateCategoriesForm: FC<CreateCategoriesFormProps> = ({ onClose, refetch }) => {
    const [form] = useForm()
    const [color, setColor] = useState("")

    const onFinish = async (fields: CategoriesFormProps) => {
        await CategoryService.create({value: fields.value, label: fields.label, color}).then(res => {
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
                    rules={[{ required: true, message: 'Please input categories label!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<CategoriesFormProps>
                    label="Value"
                    name="value"
                    rules={[{ required: true, message: 'Please input categories value!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<CategoriesFormProps>
                    label="Color"
                    name="color"
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

export default CreateCategoriesForm