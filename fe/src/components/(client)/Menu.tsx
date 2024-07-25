import { Link } from 'react-router-dom';
import styles from './styles/sidebar.module.scss';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const Sidebar = () => {

    return (
        <>
            <div className={styles.menu}>
                <div className="container mx-auto">
                    <div className={styles.innerMenu}>
                        <div className={styles.searchBar}>
                            <form>
                                <div className={styles.formControl}>
                                    <input type="text" />
                                    <div className={styles.btn}>
                                        <Button shape='round'  size='middle' className={styles.searchBtn}>
                                            <SearchOutlined />
                                            Tìm kiếm
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className={styles.heading}>
                            <p>Có thể bạn quan tâm</p>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.col}>
                                <b className={styles.heading}>Sản phẩm</b>
                                <ul>
                                    <li><Link to='/products' className={`${styles.linkPath} hover:underline`}>Tất cả sản phẩm</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Sản phẩm mới nhất</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Sản phẩm nổi bật</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Sản phẩm</Link></li>
                                </ul>
                            </div>

                            <div className={styles.col}>
                                <b className={styles.heading}>Danh mục</b>
                                <ul>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Dành cho Nam</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Dành cho Nữ</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Phụ kiện, trang sức</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Khác</Link></li>
                                </ul>
                            </div>

                            <div className={styles.col}>
                                <b className={styles.heading}>Cửa hàng</b>
                                <ul>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Liên hệ</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>QnA</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Tư vấn</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Địa chỉ cửa hàng</Link></li>
                                </ul>
                            </div>

                            <div className={styles.col}>
                                <b className={styles.heading}>Tin tức</b>
                                <ul>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Tin tức khuyến mãi</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Blog</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Thời trang quốc tế</Link></li>
                                    <li><Link to='' className={`${styles.linkPath} hover:underline`}>Thời trang trong nước</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar