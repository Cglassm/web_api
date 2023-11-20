import { User } from "./entities/user.entity";

const users: User[] = [
    new User(1, 'user', 'user'),
];

const checkUser = (username: string, password: string): User | undefined => {
    return users.find(u => u.username === username && u.password === password);
}

export { checkUser }