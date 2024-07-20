import express from 'express';
import { create, deleteCategoryById, getCategories, getCategoryById, updateCategoryById } from '../controllers/Category.js';

const routeCategory = express.Router();

// Routing Category
routeCategory.get('/',          getCategories)          // GET ALL
routeCategory.get('/:id',       getCategoryById);       // GET ONE BY ID
routeCategory.post('/',         create);                // POST
routeCategory.put('/:id',       updateCategoryById);    // UPDATE ONE BY ID
routeCategory.delete('/:id',    deleteCategoryById);    // UPDATE ONE BY ID

export default routeCategory;