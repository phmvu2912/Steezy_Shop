import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Select,
    Upload,
    UploadFile,
    UploadProps
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import { TCategoty } from '../../../common/types/category';
import { TProduct } from '../../../common/types/product';
import { getCategories } from '../../../services/category';
import { createProduct, getProductById, updateProductById } from '../../../services/product';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { uploadImage } from '../../../common/utils/cloudinary';

const FormSubmit = () => {

    const { id } = useParams();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // const [newDataProduct, setNewDataProduct] = useState()

    // * APIs

    const { data: product, isError, error, isLoading, isPending, isFetching } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            try {
                return await getProductById(id)
            } catch (error) {
                console.log(error)
            }
        },
        enabled: !!id
    })

    //* Get categories data 
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })

    // console.log(product?.data?.data)

    if (id) {
        useEffect(() => {
            if (product && product.data && product.data.data) {
                form.setFieldsValue(product.data.data);
            }
        }, [product, form]);
    }

    if (id) {
        useEffect(() => {
            if (product?.data?.data?.images) {
                setFileList(
                    product?.data?.data?.images?.map((url: any, index: number) => {
                        return {
                            uid: index.toString(),
                            name: `image${index}`,
                            status: "done",
                            url: url,
                        };
                    })
                );
            }
        }, [product]);
    }

    const { mutate } = useMutation({
        mutationFn: async (data: TProduct) => {
            if (id) {

                const newData = { ...data, _id: id }

                // return console.log(newData._id)

                const res = await updateProductById(newData)
                console.log('update')
                if (res.status !== 204) {
                    throw new Error(error?.message);
                }
            } else {
                await createProduct(data)
                console.log('create')
            }
        },
        onError: () => {
            messageApi.open({
                type: 'error',
                content: `Có lỗi xảy ra!`,
            });
        },
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: `${id ? 'Cập nhật' : 'Thêm mới'} thành công`,
            });
            {
                id ?
                    queryClient.invalidateQueries({
                        queryKey: ['product']
                    })
                    :
                    form.resetFields()
            }
        }
    })


    // Lấy giá trị giá sản phẩm và khuyến mãi
    const priceValue = Form.useWatch('price', form)
    const discountValue = Form.useWatch('discount', form)

    const comparePrices = (price: number, discount: number) => {
        if (discount > price) {
            return 'Giá khuyến mãi không được phép lớn hơn giá gốc!'
        } else {
            return 'Giá gốc không được phép nhỏ hơn giá khuyến mãi!'
        }

        return null
    }


    // console.log(discountValue)

    // console.log(categories?.data?.data)


    const categoriesData = categories?.data?.data


    // * UI configs...
    const { TextArea } = Input;
    //* //

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList([...newFileList])
    }

    const onFinish = (data: any) => {
        // mutate(data)
        const imageURLs = fileList
            .filter((file) => file.status === 'done')
            .map((file) => file.response?.secure_url)

        mutate({ ...data, images: imageURLs })
    }

    // const onFill = () => {
    //     form.setFieldsValue(product?.data?.data);
    // }



    return (
        <>
            {contextHolder}
            <div className="flex justify-between items-center mb-10">
                <h1 className='font-bold text-2xl'>{id ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}</h1>
                <Button type='primary'>
                    <Link to={'/admin/products'}>Quay lại</Link>
                    <RollbackOutlined />
                </Button>
            </div>

            <div className="content my-3 mx-3">
                <Form
                    form={form}
                    name="wrap"
                    labelCol={{ flex: '130px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600 }}
                    layout="horizontal"
                    onFinish={onFinish}
                    initialValues={product}
                >
                    <Form.Item label="Tên sản phẩm" name='title'
                        rules={[
                            { required: true, message: 'Tên sản phẩm không được bỏ trống!' },
                            { max: 255, message: 'Tên sản phẩm có độ dài tối đa 5 ký tự!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Chọn danh mục" name='category'
                        rules={[
                            { required: true, message: 'Danh mục không được bỏ trống!' },
                        ]}
                    >
                        <Select
                            options={
                                categoriesData?.map((item: TCategoty) => ({
                                    value: item._id,
                                    label: item.name
                                }
                                ))
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Giá sản phẩm" name='price'
                        rules={[
                            { required: true, message: 'Giá sản phẩm không được bỏ trống!' },

                            // { message: priceValue < discountValue ? 'Giá gốc không được nhỏ hơn giá khuyến mãi!!' : '' }
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label=" Giá khuyến mãi" name='discount'
                        rules={[
                            { required: true, message: 'Giá sản phẩm không được bỏ trống!' },
                            // { message: discountValue > priceValue ? 'Giá khuyến mãi không được lớn hơn giá gốc!!' : '' }
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Mô tả" name='description'>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Số lượng hàng" name='stock'
                        rules={[
                            { required: true, message: 'Số lượng sản phẩm không được bỏ trống!' },

                            // { message: priceValue < discountValue ? 'Giá gốc không được nhỏ hơn giá khuyến mãi!!' : '' }
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>

                    {/* Images */}
                    <Form.Item label="Ảnh sản phẩm" name='images'>
                        <Upload
                            action="https://api.cloudinary.com/v1_1/phmvu2912/image/upload"
                            data={{ upload_preset: 'steezy_shop' }}
                            // onPreview={handlePreview}
                            onChange={handleChange}
                            multiple
                            fileList={fileList}
                            listType="picture-card"
                        >
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>

                    <div className="mt-10">
                        <Button type="primary" htmlType="submit">
                            {id ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default FormSubmit