import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/(client)/Header'
import styles from './styles/layout.module.scss'
import Footer from '../../components/(client)/Footer'
import { FloatButton } from 'antd'

const LayoutClient = () => {
    return (
        <div className={styles.parent}>
            <Header />
            <main >
                <Outlet />
            </main>
            <Footer />
            <FloatButton.BackTop />
        </div>
    )
}

export default LayoutClient