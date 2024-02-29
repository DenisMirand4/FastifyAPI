import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../Data/Repository/UserRepository";
import { User } from "../../Domain/Entities/User";
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository();

export class UserController {
  
    async getUsers(FastifyRequest: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await userRepository.getAll();
            reply.send(users);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    }
    async getUserById(request: FastifyRequest<{Params: { id: number } }>, reply: FastifyReply) {
        try {
            const user = await userRepository.getById(request.params.id);
            if (!user) {
                reply.status(404).send({ error: "User not found" });
                return;
            }
            reply.send(user);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    }
    async createUser(request: FastifyRequest<{ Body: User }>, reply: FastifyReply) {
        try {
            const newUser = await userRepository.create(request.body);
            reply.status(201).send(newUser);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    }
    async updateUser(request: FastifyRequest<{ Params: { id: number }, Body: User }>, reply: FastifyReply) {
        try {
            const userId = request.params.id;
            console.log(request.body);

            const updatedUser = await userRepository.update(userId, request.body);
            if (!updatedUser) {
                reply.status(404).send({ error: "User not found" });
                return;
            }
            reply.send(updatedUser);
        } catch (error) {
            console.log(error);
            reply.status(500).send({ error: error });
        }
    }

    async deleteUser(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
        try {
            const userId = request.params.id;
            const deletedUser = await userRepository.delete(userId);
            if (!deletedUser) {
                reply.status(404).send({ error: "User not found" });
                return;
            }
            reply.send(deletedUser);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    }

    async login(request: FastifyRequest<{ Body: User }>, reply: FastifyReply) {
      try {
        const user = await userRepository.login(request.body.username, request.body.password);
        if (!user) {
          reply.status(404).send({ error: "User not found" });
          return;
        }
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET || '', { expiresIn: '10m' });
        reply.send({ token });
      } catch (error) {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
}

export default UserController;