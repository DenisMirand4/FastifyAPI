import { User } from "../../Domain/Entities/User";
import { IUserRepository } from "../../Domain/Interfaces/IUserRepository";
import { prisma } from "../db-client";

class UserRepository implements IUserRepository {

  public async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  public async getById(id: number): Promise<User | null> {
    id = parseInt(id.toString());
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  public async create(user: User): Promise<User> {
    const newUser = await prisma.user.create({ data: user });
    return newUser;
  }

  public async update(id: number, user: User): Promise<User> {
    id = parseInt(id.toString());
    const updatedUser = await prisma.user.update({ where: { id }, data: user });
    return updatedUser;
  }

  public async delete(id: number): Promise<User> {
    id = parseInt(id.toString());
    const deletedUser = await prisma.user.delete({ where: { id } });
    return deletedUser;
  }

  public async login(username: string, password: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { username, password } });
    return user;
  }
}

export { UserRepository };
