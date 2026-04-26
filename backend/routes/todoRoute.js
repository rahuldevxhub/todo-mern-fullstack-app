import express from 'express'
import  { getTodoController ,createTodoController, deleteTodo, updateTodoController,} from '../controllers/todoController.js';
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/create',authMiddleware, createTodoController);

router.post('/getall/:userId',authMiddleware, getTodoController );

router.delete('/delete/:id',authMiddleware, deleteTodo );

router.patch('/update/:id',authMiddleware, updateTodoController)


export default router;