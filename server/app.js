const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

let todos=[
        {
            todoItemId: 0,
            name: 'an item',
            priority: 3,
            completed: false
        },
        {
            todoItemId: 1,
            name: 'another item',
            priority: 2,
            completed: false
        },
        {
            todoItemId: 2,
            name: 'a done item',
            priority: 1,
            completed: true
        }
    ];

let nextId = 0;

app.get('/',(req,res) => {
    res.status(200).json({status:'ok'});
});

app.get('/api/TodoItems',(req,res)=>{
    res.json(todos);
});


app.get('/api/TodoItems/:number',(req,res)=>{
    const todo = todos.find(t => t.todoItemId === Number(req.params.number));

    if (!todo) return res.status(404).json({ error: 'Not found' });

    res.json(todo);
});


app.post('/api/TodoItems',(req,res)=>{
    const newTodo = {
        todoItemId: req.body.todoItemId !== undefined ? req.body.todoItemId : nextId++,
        name: req.body.name,
        priority: req.body.priority,
        completed: false
    };
    
    todos.push(newTodo);
    res.status(201).json(newTodo);

});

app.delete('/api/TodoItems/:number',(req,res)=>{
    const index = todos.findIndex(todo => todo.todoItemId === Number(req.params.number));
    if(index === -1){
        return res.status(404).json({error:'Not Found'});
    }
    const [deleted] = todos.splice(index,1);
    res.status(200).json(deleted);
});







module.exports = app;
