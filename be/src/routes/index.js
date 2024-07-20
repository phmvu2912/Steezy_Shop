import routeCategory from "./category.js"

const router = (app) => {
    app.use('/api/v1/categories', routeCategory) // For Endpoint Categories
}

export default router