import todoModel from "../models/todoModel.js";

export const createTodoController = async(req,res) => {
   try {
    const {title,description,createdBy} = req.body;
    if(!title || !description){
        return res.status(400).send({
            success:false,
            message:'please provide title and description'
        })
    }

    const todo = new todoModel({title,description,createdBy})
    const result = await todo.save()
    res.status(201).send({
        success:true,
        message:'your task has been created ',
        result
    })
    
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in create tod api',
        error
    })
    
   }

}

 export const getTodoController = async(req,res) => {
    try {
   const { userId } = req.params;
console.log("UserId from URL:", userId);
        if(!userId){
            return res.status(404).send({
                success:false,
                message:"no user found with this id"
            })
        }
        const todos = await todoModel.find({createdBy: userId});
        if(!todos){
            return res.status(404).send({
                success:true,
                message:'you have no task'
            })
        }
        res.status(200).send({
            success:true,
            message:'your tasks',
            todos,
        })
        
    } catch (error) {
        console.log(error)
        res.send(500).send({
            success:false,
            message:'error in get todo api',
            error
        })
        
    }
}


export const deleteTodo = async (req,res) =>{
    try {
        const {id} = req.params
         if(!id){
            return res.status(404).send({
                success:false,
                message:'no task found with this id'
            })
         }  
         
         const todo = await todoModel.findByIdAndDelete({_id:id})
         if(!todo){
            return res.status(404).send({
                success:false,
                message:'Not task found',
            })
         }

         res.status(200).send({
            success:true,
            message:'your task has been deleted'
         })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in delete task api'
        })
        
    }

}

export const  updateTodoController = async(req,res) => {
    try { 
        const {id} = req.params
        if(!id){
            return res.status(404).send({
                success:false,
                message:'please provide valid id'
            })
        }
        const data = req.body

        const todo = await todoModel.findByIdAndUpdate(id,{$set:data},{new:false})
        res.status(200).send({
            success:true,
            message:"your taks has been updated",
            todo
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Update Todo Api'
        })
        
    }

}

