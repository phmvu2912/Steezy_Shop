import { CloseOutlined, HeartOutlined, PhoneFilled, SearchOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles/header.module.scss';
import { useEffect, useState } from 'react';
import Sidebar from './Menu';
import { Button } from 'antd';

const Header = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [displayAccount, setDisplayAccount] = useState(false);

  const [displayNotify, setDisplayNotify] = useState(true)
  const location = useLocation();

  useEffect(() => {
    setDisplaySidebar(false);
  }, [location]);


  const showSidebar = () => {
    setDisplaySidebar(!displaySidebar)
  }

  return (
    <>
      {
        displayNotify && (
          <div className=' bg-[#E6DED3]'>
            <div className="container mx-auto">
              <div className="inner p-2 flex justify-between items-center ">
                <div className=""></div>
                <div className="space-x-3">
                  <PhoneFilled className='text-red-600' /><Link to={''} className='underline'>Liên hệ chuyên viên tư vấn</Link> để tận hưởng trải nghiệm mua sắm tại nhà
                </div>
                <div className="hover:cursor-pointer" onClick={() => setDisplayNotify(false)}>
                  <CloseOutlined />
                </div>
              </div>
            </div>
          </div>
        )
      }
      <header className={styles.header}>
        <div className="container mx-auto">
          <div className={styles.innerHeader}>
            <div className={styles.left}>
              <div className={styles.item} onClick={showSidebar} >
                <UnorderedListOutlined />
                <p>Menu</p>
              </div>


              {/* <div className={styles.item}>
                <SearchOutlined />
                <p>Tìm kiếm</p>
              </div> */}

            </div>
            <div className={styles.center}>
              <div className={styles.logo}>
                <Link to={'/'}>Steezy Co.</Link>
              </div>
            </div>
            <div className={styles.right}>
              <Link to={''}>Liên hệ với chúng tôi</Link>
              <div className={styles.item}>
                <HeartOutlined />
              </div>
              <div className={styles.item} style={{ position: 'relative' }} onClick={() => setDisplayAccount(!displayAccount)}>
                <UserOutlined />
                {displayAccount ? (
                  <div className="absolute right-0 my-3 flex bg-slate-200 p-5 rounded-xl justify-center items-center">
                    <ul className='m-0 flex flex-col gap-1'>
                      <li className=''>
                        <Button className='w-full px-14' disabled>Thông tin cá nhân</Button>
                      </li>
                      <li className=''>
                        <Button className='w-full px-14' href='register'>Đăng ký</Button>
                      </li>
                      <li className=''>
                        <Button type='primary' danger className='w-full px-14' disabled>Đăng xuất</Button>
                      </li>
                    </ul>
                  </div>
                ) : ('')}

              </div>
            </div>
          </div>
        </div>
      </header>
      {displaySidebar && <Sidebar />}
    </>
  )
}

export default Header