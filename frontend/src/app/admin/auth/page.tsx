"use client"
import { NextPage } from "next";
import { Button, Form, Input } from "antd";
import instance from "@/api/api.interceptor";
import { saveToStorage } from "@/services/auth/auth.helper";
import { useRouter } from "next/navigation";

type FieldType = {
    email?: string;
    password?: string;
};
const AuthPage: NextPage = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = async (value: any) => {
        await instance.post('/auth/login', value).then(res => {
            saveToStorage(res.data)
            router.push('/admin')
        }).catch(err => {
            form.setFields([{name: 'email', errors: ['Invalid email or password']}, {name: 'password', errors: ['Invalid email or password']}])
        })
    }

    const onFinishFailed = () => {
        console.log("Failed")
    }

    return (
        <main className={"w-screen h-screen flex items-center justify-center"}>
            <div className={"py-5 px-7 border-gray border-[1px] rounded-3xl text-white bg-matt-black w-[400px]"}>
                <h1 className={"text-center text-4xl font-bold mb-10"}>Sign in</h1>
                <Form
                    form={form}
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }, { type: 'email', message: 'Please input valid email' }]}
                    >
                        <Input size={"large"} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'Password must be at least 6 characters' }]}
                    >
                        <Input.Password size={"large"} />
                    </Form.Item>
                    <Form.Item className={"flex justify-center"}>
                        <Button type="primary" htmlType="submit" size={"large"} className={"!w-[150px] mt-5"}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </main>
    )
}

export default AuthPage;