import express, { request, response } from 'express'
import { index, show, store, update, modify, destroy } from '../controllers/routersFunctions.js';
import paramsRouter from '../middlewares/paramsRouter.js';
import objCheck from '../middlewares/objCheck.js';



const router = express.Router();




router.get('/', index);
//router.get('/:id', show);
router.get('/:slug', [paramsRouter,show]);
router.post('/', [objCheck, store]);
//router.put('/:id', update);
router.put('/:slug', [paramsRouter, objCheck, update]);
//router.patch('/:id', modify);
router.patch('/:slug', [paramsRouter, modify]);
//router.delete('/:id', destroy);
router.delete('/:slug', [paramsRouter, destroy]);



export default router