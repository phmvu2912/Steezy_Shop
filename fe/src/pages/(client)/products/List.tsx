import { HeartOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TProduct } from '../../../common/types/product';
import { getProducts } from '../../../services/product';
import styles from '../styles/listP.module.scss';

const List = () => {

    const navigate = useNavigate();

    const { data, isLoading, isError, error, isFetching, isPending } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })

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
        if(updateRecentProducts.length > 4) {
            updateRecentProducts.pop()
        }

        // Cập nhật storage
        localStorage.setItem('products_watched', JSON.stringify(updateRecentProducts));
    }

    const productsData = data?.data?.data;

    return (
        <>
            <Spin spinning={isLoading ?? isFetching ?? isPending ? true : false} size='large'>
                <div className="container mx-auto">
                    <div className={styles.content}>
                        {
                            productsData?.map((item: TProduct, index: any) => (
                                <div className={styles.item} key={index}>
                                    {/* <Link to={`/products/details/${item._id}`} className={styles.innerCard}> */}
                                    <div className={styles.innerCard} onClick={() => redirectTo(item)}>
                                        <div className={styles.fav} onClick={() => alert('hi')}>
                                            <HeartOutlined />
                                        </div>
                                        <div className={styles.action}>
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
                                        </div>

                                        {/* Ảnh sản phẩm */}
                                        <img src={item.thumbnail ? `${item.thumbnail}` : 'https://picsum.photos/200/300'} alt={item.title} />

                                        {/* Thông tin sản phẩm */}
                                        <div className={styles.info}>
                                            <p className={styles.title}>{item.title}</p>
                                            <p>$ {item.discount}</p>
                                        </div>
                                    </div>
                                    {/* </Link> */}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Spin>
        </>
    )
}

export default List