import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoryById } from '../../../services/category';
import { Spin } from 'antd';
import styles from '../styles/listP.module.scss';
import { HeartOutlined } from '@ant-design/icons';
import { TProduct } from '../../../common/types/product';


const Details = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isFetching, isPending, isError, error } = useQuery({
        queryKey: ['categories', id],
        queryFn: () => getCategoryById(id)
    })

    // console.log(data?.data?.data)

    const redirectTo = (product: TProduct) => {
        // chuyển hướng tới chi tiết sản phẩm qua _id
        navigate(`/products/details/${product._id}`);

        //Sau khi click sản phẩm đã chọn, thông tin sản phẩm sẽ được lưu vào trong storage
        // có mục đích lưu lịch sử sản phẩm đã xem

        // Lấy danh sách sp đã lưu trong storage
        const recentProducts = localStorage.getItem('products_watched');
        const products = recentProducts ? JSON.parse(recentProducts) : [];

        // Không lưu lại sản phẩm đã xem trước đó thêm lần nữa
        const updateRecentProducts = products.filter((item: TProduct) => item._id !== product._id)

        updateRecentProducts.unshift(product)

        // Giới hạn = 4
        if (updateRecentProducts.length > 4) {
            updateRecentProducts.pop()
        }

        // Cập nhật storage
        localStorage.setItem('products_watched', JSON.stringify(updateRecentProducts));
    }


    if (isLoading) return <div className="">Loading...</div>
    if (isError) return <div className="">{error.message}</div>

    return (
        <>
            <div className={styles.banner}>
                <div className='text-center font-semibold text-3xl space-y-3'>
                    <h3>{data?.data?.data?.name}</h3>
                    <p className='text-lg'>- Danh mục -</p>
                </div>
            </div>

            <Spin spinning={isLoading ?? isFetching ?? isPending ? true : false} size='large'>
                <div className="container mx-auto">
                    <div className="py-16">
                        <div className="flex justify-between items-center">
                            <div className="">
                                <h3 className='text-2xl font-semibold'>Tất cả sản phẩm </h3>
                                <p>Đang hiển thị <span className='font-semibold'>{data?.data?.data?.products.length}</span> sản phẩm</p>
                            </div>

                            {/* <div className="flex items-center space-x-2">
                                <span className='font-semibold'>Sắp xếp: </span>

                                <form onChange={onChange}>
                                    <select name="sort" >
                                        <option value="default">Mặc định</option>
                                        <option value="price-desc">Giá: từ thấp đến cao</option>
                                        <option value="price-asc">Giá: từ cao đến thấp</option>
                                    </select>
                                </form>

                            </div> */}
                        </div>

                        {
                            data?.data?.data?.products?.length === 0 ? (
                                <div className='text-center mt-8'>
                                    <h1 className='font-semibold text-xl'>Hiện không có sản phẩm nào thuộc danh mục này!</h1>
                                </div>
                            ) : (
                                <div className={styles.content}>
                                    {
                                        data?.data?.data?.products?.map((item: TProduct, index: any) => (
                                            <div className={styles.item} key={index}>
                                                {/* <Link to={`/products/details/${item._id}`} className={styles.innerCard}> */}
                                                <div className={styles.innerCard} onClick={() => redirectTo(item)}>
                                                    <div className={styles.fav} onClick={() => alert('hi')}>
                                                        <HeartOutlined />
                                                    </div>
                                                    {/* <div className={styles.action}>
                                                <div className={styles.prev}>
                                                    <div className={styles.act}>
                                                        <LeftOutlined />
                                                    </div>
                                                </div>
    
                                                <div className={styles.next}>
                                                    <div className={styles.act}>
                                                        <RightOutlined />
                                                    </div>
                                                </div>
                                            </div> */}

                                                    {/* Ảnh sản phẩm */}
                                                    <img
                                                        src={item.thumbnail ? item.thumbnail : (item.images && item.images.length > 0 ? item.images[0] : '')}
                                                        alt={item.title}
                                                    />

                                                    {/* Thông tin sản phẩm */}
                                                    <div className={styles.info}>
                                                        <p className={styles.title}>{item.title}</p>
                                                        <p className='font-semibold'>${item.discount}</p>
                                                    </div>
                                                </div>
                                                {/* </Link> */}
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }


                    </div>
                </div>
            </Spin>
        </>
    )
}

export default Details