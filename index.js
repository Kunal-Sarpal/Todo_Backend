const express = require('express');
const {createTodo,updateTodo} = require('./types');
const {todo} = require('./db/db');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.get('/', (req, res) => {

    res.send("Hey Hello")
})
app.post("/todos",async (req,res)=>{
    try{

        const Todo  = req.body;
    
        const parsTodo = createTodo.safeParse(Todo);
        if(!parsTodo.success){return res.status(404).json({msg:"Invalid credentials"})}
        else{
            await todo.create({
                title:Todo.title,
                description:Todo.description
            })
            res.json({
               msg:"Todo created successfully"
            })
        }
    }
    catch(err){
        res.json({
            msg:"Internal Server error"
        })
    }
})
app.get('/todos/find', async (req, res) => {
    try {
        const title = req.query.title; // Accessing title from query parameters
        console.log(title); // Logging title to verify
        
        const tododata = await todo.find({ title });

        if (tododata.length > 0) {
            res.json(tododata);
            console.log(tododata); 
        } else {
            res.status(404).json({ msg: "Todo not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
app.get("/todos",async (req,res)=>{
    const alltodo = await todo.find({});
    res.json({
        alltodo
    })
})
app.put("/completed/:id", async (req, res) => {
    const id = req.params.id;

    // Update the todo item with the given ID to mark it as completed
    try {
        await todo.updateOne({ _id: id }, { completed: true });
        res.json({
            msg: "Todo marked as Completed Successfully."
        });
    } catch (error) {
        console.error("Error marking todo as completed:", error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
});
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try{

        await todo.deleteOne({_id:id});
        res.json({
            msg:"Deleted successfully"
        })

    }
    catch(err){
        res.status(404).json({msg: err.message});
    }
})

app.listen(3000,()=>{
    console.log("http://localhost:3000");
});