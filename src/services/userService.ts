import userRepository from "../repositories/user-repository";
import { notFoundError } from "../errors/not-found-error";
import { duplicatedNameError } from "../errors/duplicated-name-error";
import { User, UserInput } from "../types/users";

async function findUserByName(name: string) {
    const user = await userRepository.getUserByName(name);
    if (!user) throw notFoundError();
    return (user);
}

async function findAllUsers(){
    const Users = userRepository.getAllUsers();
    return Users;
}

async function createUser(user: UserInput){
    const userNameExists = await userRepository.getUserByName(user.name);
    if (userNameExists) throw duplicatedNameError();
    const newUser = userRepository.postUser(user);
    return newUser;
}

async function deleteUserFromDb(user: User){
    const userExists = await userRepository.getUserByName(user.name);
    if (!userExists) throw notFoundError();
    const erasedUser = userRepository.deleteUser(user.name);
    return erasedUser;
}

async function updateUserInformation(user: User){
    const userExists = userRepository.getUserById(user.id);
    if (!userExists) throw notFoundError();
    const updatedUser = userRepository.updateUser(user);
    return updatedUser;
}

const userService = {
    findAllUsers,
    findUserByName,
    createUser,
    deleteUserFromDb,
    updateUserInformation,
}

export default userService;