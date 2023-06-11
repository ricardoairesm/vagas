import express from 'express';
import { getUserByName, getAllUsers, postUser, deleteUser, updateUser } from './controllers/usersController'
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

app.get("/user", getUserByName);
app.get("/users", getAllUsers);
app.post("/users", postUser)
app.delete("/users", deleteUser)
app.put("/users", updateUser)
app.get("/users/access",);


const port  = 3000;
app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});