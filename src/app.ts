import express from 'express';
import { getUserByName, getAllUsers, postUser, deleteUser, updateUser, getUserTimesReadCount } from './controllers/usersController.ts';
import { handleApplicationErrors } from './middlewares/error-handling-middleware.ts';
import { authenticateToken } from './middlewares/authenticationMiddleware.ts';
import { sessionController } from './controllers/sessionController.ts';
import { validateBody } from './middlewares/validation-middleware.ts';
import { userSchema } from './schemas/userSchema.ts';

const app = express();
app.use(express.json());

app.get("/user", getUserByName);
app.get("/users", getAllUsers);
app.post("/users", validateBody(userSchema), postUser);
app.delete('/users', authenticateToken, deleteUser);
app.put("/users", authenticateToken, validateBody(userSchema), updateUser);
app.get("/users/access", getUserTimesReadCount);
app.use(handleApplicationErrors);
app.get('/sessions', sessionController);


export default app;