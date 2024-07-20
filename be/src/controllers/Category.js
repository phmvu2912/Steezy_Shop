import Category from "../models/Category.js"

// * GET ALL
export const getCategories = async (req, res) => {
    try {

        const {
            _page = 1,
            _limit = 10,
            _sort = "createdAt",
            _order = "asc"
        } = req.query;

        const options = {
            page: _page,
            limit: _limit,
            sort: {
                [_sort]: _order === "asc" ? 1 : -1
            }
        }

        const result = await Category.paginate({}, options);

        console.log(result?.docs.length)

        if (result?.docs.length === 0)
            return res
                .status(404)
                .json({ message: "No data available!" })

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({ error })
    }
}

// * GET ONE
export const getCategoryById = async (req, res) => {
    try {
        const result = await Category.findById(req.params.id);

        if (result.length === 0)
            return res
                .status(404)
                .json({ message: "No data available!" })

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({ error })
    }
}

// * CREATE
export const create = async (req, res) => {
    try {
        const result = await Category.create(req.body);

        return res.status(201).json({
            data: result,
            message: 'Created Successfully!'
        });
    } catch (error) {
        return res.status(500).json({ error })
    }
}

// * UPDATE BY ID
export const updateCategoryById = async (req, res) => {
    try {
        const result = await Category.findByIdAndUpdate(req.params.id, req.body);

        return res.status(204).json({
            data: result,
            message: 'Updated Successfully!'
        });
    } catch (error) {
        return res.status(500).json({ error })
    }
}

// * DELETE BY ID
export const deleteCategoryById = async (req, res) => {
    try {
        const idCategory = req.params.id;


        const result = await Category.findByIdAndDelete(idCategory);

        return res.status(200).json({
            data: result,
            message: 'Deleted Successfully!'
        });
    } catch (error) {
        return res.status(500).json({ error })
    }
}