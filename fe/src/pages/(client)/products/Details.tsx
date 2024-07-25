import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../../services/product';
import { HeartOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from '../styles/detailsP.module.scss'
import { TProduct } from '../../../common/types/product';
import { Tabs, TabsProps } from 'antd';


const Details = () => {

    const { id } = useParams();



    const { data: product, isError, error, isFetching, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            try {
                const res = await getProductById(id);

                return res
            } catch (error) {
                console.log(error)
            }
        }
    })

    // Lấy sản phẩm dã xem từ storage
    const recentProducts = localStorage.getItem('products_watched');
    const productsWatched = recentProducts ? JSON.parse(recentProducts) : [];

    const detailsProduct = product?.data.data;

    // const onChange = (key: string) => {
    //     console.log(key);
    // };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Mô tả sản phẩm',
            children: <p className='text-xl text-justify py-3'>{detailsProduct?.description}</p>,
        },
        {
            key: '2',
            label: 'Bình luận [0]',
            children: 'Content of Tab Pane 2',
        }
    ];


    return (
        <>
            <div className="container mx-auto">
                <div className={styles.mainContent}>
                    <div className={styles.left}>
                        <div className={styles.imgs}>
                            <img src="https://picsum.photos/200/300" alt="" className={styles.img} />
                            <img src="https://picsum.photos/200/300" alt="" className={styles.img} />
                            <img src="https://picsum.photos/200/300" alt="" className={styles.img} />
                            <img src="https://picsum.photos/200/300" alt="" className={styles.img} />
                            <img src="https://picsum.photos/200/300" alt="" className={styles.img} />
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.title}>
                            {detailsProduct?.title}
                        </div>

                        <div className={styles.info}>
                            <div className={styles.category}>
                                <span className='font-semibold'>Loại sản phẩm: </span>
                                <Link to={''} className='hover:underline'>{detailsProduct?.category.name}</Link>
                            </div>

                            <div className={styles.rating}>
                                <span className='font-semibold'>Lượt đánh giá: </span>
                                <p className='hover:underline'>{detailsProduct?.rating === 0 ? detailsProduct?.rating : (<span className='text-gray-500'>Chưa có đánh giá</span>)}</p>
                            </div>
                        </div>

                        <div className={styles.prices}>
                            <span className='font-semibold text-3xl'>${detailsProduct?.discount}</span>

                            <del className='text-gray-500 text-xl'>${detailsProduct?.price}</del>
                        </div>
                    </div>

                </div>

                <div className="tabs my-10">
                    <Tabs defaultActiveKey="1" items={items} size='large' centered />
                </div>






                {/* Danh sách xem gần đây */}
                <section className={styles.listWatched}>
                    <div className={styles.heading}>
                        <h3 className='text-2xl font-semibold'>Sản phẩm đã xem</h3>
                    </div>

                    <div className={styles.content}>
                        {
                            productsWatched?.map((item: TProduct, index: any) => (
                                <div className={styles.item} key={index}>
                                    {/* <Link to={`/products/details/${item._id}`} className={styles.innerCard}> */}
                                    <div className={styles.innerCard}>
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
                                        <img src={item.thumbnail ? `${item.thumbnail}` : 'https://picsum.photos/200/300'} />

                                        {/* Thông tin sản phẩm */}
                                        <div className={styles.info}>
                                            <p className={styles.title}>{item.title}</p>
                                            <p>${item.discount}</p>
                                        </div>
                                    </div>
                                    {/* </Link> */}
                                </div>
                            ))
                        }
                    </div>
                </section>
            </div>
        </>
    )
}

export default Details