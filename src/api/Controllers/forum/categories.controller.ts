import * as express from 'express';
import Category from '../../models/category.entity';
import CreateCategoryDto from '../../models/dto/category.dto'
import {getManager, getRepository} from 'typeorm';
import authMiddleware from '../../middlewares/auth.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import CategoryNotFoundException from '../../exceptions/CategoryNotFoundException';

class CategoriesController{
    public path = '/categories';
    public router = express.Router();
    private categorieRepository = getRepository(Category);
    private categorieManager = getManager();
    
    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
       
        this.router.get(this.path,authMiddleware, this.getAllCategories);
        this.router.get(`${this.path}/:id`, this.getCategoryById);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreateCategoryDto, true), this.modifyCategory)
            .delete(`${this.path}/:id`, this.deleteCategory)
            .post(this.path,authMiddleware, validationMiddleware(CreateCategoryDto), this.createCategory);

    }

    private getAllCategories = async (request: express.Request, response: express.Response)=>{
        const category = await this.categorieRepository.find();

        response.send(category);
    }

    private getCategoryById= async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const category = await this.categorieRepository.findOne(id);
        if(category)
        {
            response.send(category);
        }
        else 
        {
            next(new CategoryNotFoundException(id));
        }
    }

    private modifyCategory = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const categoryData: Category = request.body;
        await this.categorieRepository.update(id, categoryData);
        const updateCategory = await this.categorieRepository.findOne(id);
        if(updateCategory)
        {
            response.send(updateCategory);
        }
        else 
        {
            next(new CategoryNotFoundException(id));
        }
    }

    private deleteCategory = async (request: express.Request, response: express.Response, next : express.NextFunction) => {
        const id = request.params.id;

        try{
            const deleteResponse = await this.categorieRepository.delete(id);
            response.status(200).send(`Category with id ${id} deleted`);
        }catch(e){
            next(new CategoryNotFoundException(id));
        }
    }

}