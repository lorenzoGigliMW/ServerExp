
const express = require('express');
const { networkInterfaces } = require('os');
const bodyParser = require('body-parser');
var cors = require('cors')

var todos = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
]

const app = express();
const nets = networkInterfaces();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Server port
const PORT = 3005;
app.use(cors({
    origin: '*'
}));
app.get('/', (request, response) => response.send('Hello from www.mischianti.org!'));
app.get('/api/todos', (request, response) => {
    response.setHeader('content-type', 'application/json');
    response.status(200).json(todos);
});

// app.post('/api/todos', (req, res) => {
//      response.setHeader('content-type', 'application/json');    
//      res.status(200).json([
//         { id: "todo-0", name: "Eat", completed: true },
//         { id: "todo-1", name: "Sleep", completed: false },
//         { id: "todo-2", name: "Repeat", completed: false }
//       ]);
// });
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.post('/api/todo/edit/:id', cors(corsOptions), (req, res) => {

     const id = req.params['id'];
    console.log('Got body:', req.body);
            // console.log('Got body:', req);
            //[...todos][req.body.id].name=req.body.name
            //[...todos][0].name=req.body.name
  
    index = todos.findIndex(p => p.id == id);
    console.log(index)
            //index=todos.findIndex(myFunction)
            //console.log(index)
    todos[index].name = req.body.name
            //todos.filter((elem) => (elem.id === req.body.id))[index].name = req.body.name

    res.sendStatus(200);
});

app.post('/api/todos', cors(corsOptions), (req, res) => {

    todos.forEach(e => e.completed = true)
    res.sendStatus(200);
  
});



app.post('/api/todo/add', cors(corsOptions), (req, res) => {

    newTodo =
    {
        id: req.body.id,
        name: req.body.name,//params
        completed: false
    }
    todos.push(newTodo)
    //todos.push(...todos, newTodo)

    //todos.data.push(newTodo)
    console.log('Got body:', req.body);
    res.sendStatus(200);
    // const taskList=req.params    
    // taskList= [...taskList,newTodo]

})

// app.delete('/api/todo/del/id', cors(corsOptions), (req, res) => {
// //todos.slice(todos.find(id)-1,todos.find(id)+1)
// //id=req.body.id
// //todos.splice(todos.lenght.find(id)-1,1)
//     res.sendStatus(200);
//     // const taskList=req.params
//     // taskList= [...taskList,newTodo]

// })
app.delete('/api/todo/del/:id', cors(corsOptions), (req, res) => {
    
    const  id  = req.params['id'];
    const projectIndex = todos.findIndex(p => p.id === id );
    console.log(projectIndex)
    todos.splice(projectIndex, 1);
    return res.sendStatus(200);
})

app.listen(PORT, () => {
    const results = {}; // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    console.log('Listening on port ' + PORT + '\n', results)
});