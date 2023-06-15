import express from 'express';
import { getUserByName, getAllUsers, postUser, deleteUser, updateUser } from './controllers/usersController';
import { handleApplicationErrors } from './middlewares/error-handling-middleware';

var app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(req, res){
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

app.get("/user", getUserByName)
.get("/users", getAllUsers)
.post("/users", postUser)
.delete("/users", deleteUser)
.put("/users", updateUser)
.get("/users/access",)
.use(handleApplicationErrors);


const port  = 3000;
app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});