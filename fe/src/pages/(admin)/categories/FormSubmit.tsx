import { RollbackOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, message } from 'antd';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { TCategoty } from '../../../common/types/category';
import { createCategory, getCategoryById, updateCategoryById } from '../../../services/category';

const FormSubmit = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TCategoty>()




    //! Fetch API by Id
    const { data, isLoading } = useQuery({
        queryKey: ['category', id],
        queryFn: () => getCategoryById(id),
        enabled: !!id
    })

    // console.log(data?.data?.data)

    //! Fill data
    if (id) {
        useEffect(() => {
            if (data && !isLoading) {
                const detail = data?.data?.data;
                reset(detail);
            }
        }, []);

    }

    const onSubmit = async (dataForm: TCategoty) => {
        try {
            // return console.log(dataForm)

            if (dataForm._id) {
                console.log('Update')
                const { status } = await updateCategoryById(dataForm);

                // console.log(status)

                if (status === 204) {
                    messageApi.open({
                        type: 'success',
                        content: `Cập nhật bản ghi thành công`,
                    });
                }

            } else {
                console.log('Create')
                const { status } = await createCategory(dataForm);

                // console.log(status)

                if (status === 201) {
                    messageApi.open({
                        type: 'success',
                        content: `Thêm mới bản ghi thành công`,
                    });
                }
            }
        } catch (error) {
            console.log('Có lỗi xảy ra khi gửi dữ liệu từ Form!');
        }
    }



    return (
        <>
            {contextHolder}
            <div className="flex justify-between items-center mb-5">
                <h1 className='font-bold text-2xl'>{id ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}</h1>
                <Button type='primary'>
                    <Link to={'/admin/categories'}>Quay lại</Link>
                    <RollbackOutlined />
                </Button>
            </div>

            <div className="content h-100">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="grid grid-cols-12 gap-10 mb-10">
                        {/* Tên danh mục */}
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Tên danh mục</label>
                            <input
                                type="text"
                                className="border border-black-500 text-sm rounded-lg fo cus:ring-green-500 block w-full p-2.5"
                                placeholder="Nhập tên danh mục"
                                {...register('name', { required: true, maxLength: 50 })}
                            />
                            {/* Required error */}
                            {errors.name && errors.name.type === "required" && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Tên danh mục không được bỏ trống!</p>
                            )}
                            {/* Max Length error */}
                            {errors.name && errors.name.type === "maxLength" && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Tên danh mục không được phép vượt quá 5 ký tự!</p>
                            )}
                        </div>
                    </div>

                    <Button
                        type='primary'
                        htmlType='submit'
                        className='b'>{id ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}
                    </Button>
                </form>

            </div>
        </>
    )
}

export default FormSubmit