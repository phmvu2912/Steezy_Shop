import React from 'react'
import { Route, Routes } from 'react-router-dom'

import LayoutAdmin from '../pages/(admin)/LayoutAdmin'
import Dashboard from '../pages/(admin)/Dashboard'
import ListProducts from '../pages/(admin)/products/List'
import FormProduct from '../pages/(admin)/products/FormSubmit'
import ListCategories from '../pages/(admin)/categories/List'

type Props = {}

const Routing = (props: Props) => {
    return (
        <>
            <Routes>
                <Route path='/admin' element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />

                    {/* Endpoint Products */}
                    <Route path='/admin/products' element={<ListProducts />} />
                    <Route path='/admin/products/create' element={<FormProduct />} />
                    <Route path='/admin/products/update/:id' element={<FormProduct />} />
                    <Route path='/admin/products/details' element={''} />

                    {/* Endpoint Categories */}
                    <Route path='/admin/categories' element={<ListCategories />} />
                    <Route path='/admin/categories/create' element={''} />
                    <Route path='/admin/categories/update/:id' element={''} />
                </Route>

                <Route path='/' element={<h1>Layout Client</h1>}>
                    <Route index element={''} />

                    {/* Endpoint Products */}
                    <Route path='/products' element={''} />
                    <Route path='/products/create' element={''} />
                    <Route path='/products/update/:id' element={''} />
                    <Route path='/products/details' element={''} />

                    {/* Endpoint Categories */}
                    <Route path='/categories' element={''} />
                    <Route path='/categories/create' element={''} />
                    <Route path='/categories/update/:id' element={''} />
                </Route>

                <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
        </>
    )
}

export default Routing