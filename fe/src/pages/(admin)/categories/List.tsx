import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const List = (props: Props) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className='font-bold text-2xl '>Danh sách danh mục</h1>
        <Button type='primary'>
          <PlusOutlined />
          <Link to={'/admin/categories'}>Thêm mới</Link>
        </Button>
      </div>

      <div className="content">
        
      </div>
    </>
  )
}

export default List