export interface TProduct {
    _id: string,
    title: string,
    thumbnail?: string,
    images?: string[],
    category: {
        name: string,
        slug?: string
    },
    price: number,
    discount?: number,
    stock?: number,
    slug?: string,
    rating: number,
    description?: string,
    createdAt: string
    updatedAt: string
}