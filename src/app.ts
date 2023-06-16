import express from 'express';
import { getUserByName, getAllUsers, postUser, deleteUser, updateUser } from './controllers/usersController.ts';
import { handleApplicationErrors } from './middlewares/error-handling-middleware.ts';
import { authenticateToken } from './middlewares/authenticationMiddleware.ts';

const app = express();
app.use(express.json());

app.get("/user", getUserByName);
app.get("/users", getAllUsers);
app.post("/users", postUser);
app.delete('/users', authenticateToken, deleteUser);
app.put("/users", updateUser);
app.get("/users/access",);
app.use(handleApplicationErrors);


const port = 3000;
app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});