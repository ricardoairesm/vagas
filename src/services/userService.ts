import userRepository from '../repositories/user-repository/index.ts';
import { notFoundError } from "../errors/not-found-error.ts";
import { duplicatedNameError } from "../errors/duplicated-name-error.ts";
import { User, UserInput } from "../types/users.ts";

async function findUserByName(name: string) {
    const user = await userRepository.getUserByName(name);
    if (!user) throw notFoundError();
    return (user);
}

async function findAllUsers() {
    const Users = userRepository.getAllUsers();
    return Users;
}

async function createUser(user: UserInput) {
    const userNameExists = await userRepository.checkIfNameExists(user.name);
    if (userNameExists) throw duplicatedNameError();
    const newUser = userRepository.postUser(user);
    return newUser;
}

async function deleteUserFromDb(user: User) {
    const userExists = await userRepository.checkIfNameExists(user.name);
    if (!userExists) throw notFoundError();
    const erasedUser = userRepository.deleteUser(user.name);
    return erasedUser;
}

async function updateUserInformation(user: User) {
    const userExists = await userRepository.getUserById(user.id);
    if (!userExists) throw notFoundError();
    const updatedUser = await userRepository.updateUser(user);
    return updatedUser;
}

async function returnTimesReadByName(name: string) {
    const userExists = await userRepository.checkIfNameExists(name);
    if (!userExists) throw notFoundError();
    const timesRead = await userRepository.getTimesReadByUserName(name);
    return timesRead;
}

const userService = {
    findAllUsers,
    findUserByName,
    createUser,
    deleteUserFromDb,
    updateUserInformation,
    returnTimesReadByName,
}

export default userService;