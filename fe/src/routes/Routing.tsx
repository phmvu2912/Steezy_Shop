import { Route, Routes } from 'react-router-dom'

import ListCategories from '../pages/(admin)/categories/List'
import Dashboard from '../pages/(admin)/Dashboard'
import LayoutAdmin from '../pages/(admin)/LayoutAdmin'
import FormProduct from '../pages/(admin)/products/FormSubmit'
import ListProducts from '../pages/(admin)/products/List'
import FormSubmitCategory from '../pages/(admin)/categories/FormSubmit'

// type Props = {}

const Routing = () => {
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
                    <Route path='/admin/categories/create' element={<FormSubmitCategory />} />
                    <Route path='/admin/categories/update/:id' element={<FormSubmitCategory />} />
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