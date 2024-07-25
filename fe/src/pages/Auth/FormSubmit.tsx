import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { FormProps } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TAuth } from '../../common/types/auth';
import { login, register } from '../../services/auth';

const FormSubmit = () => {

    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const recentEndpoint = useLocation();
    const [messageApi, contextHolder] = message.useMessage();
    // console.log(recentEndpoint)


    const { mutate, isPending } = useMutation({
        mutationFn: async (data: TAuth) => {
            try {
                if (recentEndpoint.pathname === '/register') {
                    const res = await register(data);
                    if (res.status === 201) {
                        messageApi.open({
                            type: 'success',
                            content: `Đăng ký thành công!`,
                        })

                        form.setFieldsValue({});

                        return res
                    } else {
                        messageApi.open({
                            type: 'error',
                            content: `Đăng ký thất bại! Mã lỗi: ${res.status}`,
                        })
                    }
                } else {
                    const res = await login(data);
                    if (res.status === 201) {
                        messageApi.open({
                            type: 'success',
                            content: `Đăng nhập thành công!`,
                        })

                        

                        return res
                    } else {
                        messageApi.open({
                            type: 'error',
                            content: `Đăng thất bại! Mã lỗi: ${res.status}`,
                        })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        // onError: (error) => messageApi.open({
        //     type: 'error',
        //     content: `${error}`,
        // }),
        onSuccess: () => form.resetFields()
    })

    const onFinish = (values: any) => {
        mutate(values)

        // console.log(values)
    };

    return (
        <div className='container mx-auto'>
            {contextHolder}
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <div className="heading text-2xl font-semibold ">
                    {recentEndpoint.pathname === '/register' ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP'}
                </div>

                <Form
                    form={form}
                    size="large"
                    name="trigger"
                    layout='vertical'
                    onFinish={onFinish}
                    className='w-full'
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        hasFeedback
                        rules={[
                            { required: true, message: 'Không được bỏ trống!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên người dùng"
                        name="username"
                        hasFeedback

                        rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        hasFeedback

                        rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='w-full my-10'>
                            {recentEndpoint.pathname === '/register' ? 'Đăng ký' : 'Đăng nhập'}
                        </Button>
                    </Form.Item>


                </Form>
                <span className='text-lg text-center'>
                    {recentEndpoint.pathname === '/register' ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'} <Link to={recentEndpoint.pathname === '/register' ? '/login' : '/register'} className='font-semibold hover:underline'>tại đây</Link></span>
            </div>
        </div>
    )
}

export default FormSubmit