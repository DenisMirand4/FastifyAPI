import { User } from "../Entities/User";

export interface IUserRepository {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User | null>;
    create(user: User): Promise<User>;
    update(id: number, user: User): Promise<User>;
    delete(id: number): Promise<User>;
    login(username: string, password: string): Promise<User | null>;
}