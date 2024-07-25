import { RollbackOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import { TCategoty } from '../../../common/types/category';
import { TProduct } from '../../../common/types/product';
import { getCategories } from '../../../services/category';
import { createProduct, getProductById, updateProductById } from '../../../services/product';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

const FormSubmit = () => {

  const { id } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

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



  useEffect(() => {
    if (product && product.data && product.data.data) {
      form.setFieldsValue(product.data.data);
    }
  }, [product, form]);

  //* Get categories data 
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

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
        content: `${error}`,
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

  // const normFile = (e: any) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };



  const onFinish = (data: any) => {
    mutate(data)
  }

  const onFill = () => {
    form.setFieldsValue(product?.data?.data);
  }

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
          initialValues={onFill}
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
            <Select>
              {
                categoriesData?.map((item: TCategoty) => (
                  <Select.Option value={item._id} key={item._id}>
                    {item.name}
                  </Select.Option>
                ))
              }
            </Select>
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

          {/* Thumnail */}
          {/* <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item> */}

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