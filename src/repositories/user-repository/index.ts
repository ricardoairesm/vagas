import { User, UserInput } from "../../types/users";

const fakeData = [
    {
        id: 1,
        name: "João Oliveira",
        job: "Desenvolvedor"
    }
]

const fakeSession = [
    {
        userId:1,
        token:'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIn0.1ZBc33kR6QU2rjm2rqNe-Lba-qW0NAaXPh2MzKdLl1U',
    }
]

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

async function updateUser(updatedUserInformation: User) {
    const userExists = fakeData.find((user: User) => user.id === updatedUserInformation.id);
    if (userExists) {
        const index = fakeData.indexOf(userExists);
        fakeData[index] = updatedUserInformation;
    };
    return updatedUserInformation;
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