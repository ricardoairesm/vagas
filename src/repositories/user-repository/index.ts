import { User, UserInput } from "../../types/users.ts";

import { fakeData, fakeCount } from "../../../fakeData.ts";

async function getUserByName(name: string) {
    const user = fakeData.find((user: User) => user.name === name);
    if(user){
       const count = fakeCount.find((count)=> count.userId === user.id);
       count.timesRead++;
    }
    return (user);
}

async function checkIfNameExists(name: string) {
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
    const newCount = {
        userId:newUser.id,
        timesRead:0,
    }
    fakeData.push(newUser);
    fakeCount.push(newCount);
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

async function getTimesReadByUserName(name:string){
    const user = fakeData.find((user)=> user.name === name);
    const count = fakeCount.find((count)=> count.userId === user.id);
    return(count);
}

const userRepository = {
    getUserByName,
    getUserById,
    getAllUsers,
    checkIfNameExists,
    postUser,
    deleteUser,
    updateUser,
    getTimesReadByUserName,
}

export default userRepository;