import { fakeData } from "../../../fakeData.js";
import { User, UserInput } from "../../types/users";
async function getUserByName(name: string) {
    const user = fakeData.find((user: User) => user.name === name);
    return (user);
}

async function getUserById(id: number) {
    const user = fakeData.find((user: User) => user.id === id);
    return (user);
}

async function getAllUsers() {
    return fakeData;
}

async function postUser(user: UserInput) {
    const newUser = {
        ...user,
        id: fakeData.length + 1,
    }
    fakeData.push(newUser);
    return (newUser);
}

async function deleteUser(name: string) {
    const user = fakeData.find((user: User) => user.name === name);
    if (user) {
        fakeData.splice(fakeData.indexOf(user), 1);
    }
    return (user);
}

async function updateUser(user: User) {
    const userExists = fakeData.find((user: User) => user.id === user.id);
    const updatedUser = {
        id: fakeData.length + 1,
        name: user.name,
        job: user.job,
    };
    if (userExists) {
        const index = fakeData.indexOf(userExists);
        fakeData[index] = updatedUser;
    };

    return updatedUser;
}

const userRepository = {
    getUserByName,
    getUserById,
    getAllUsers,
    postUser,
    deleteUser,
    updateUser,
}

export default userRepository;