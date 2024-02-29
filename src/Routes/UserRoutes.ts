import { FastifyInstance } from 'fastify';
import { UserController } from '../Service/Controllers/UserController';

export default function userRoutes(fastify: FastifyInstance, controller: UserController) {
  fastify.get('/users', controller.getUsers);
  fastify.get('/users/:id', controller.getUserById);
  fastify.post('/users/register',  controller.createUser);
  fastify.put('/users/:id', controller.updateUser);
  fastify.delete('/users/:id', controller.deleteUser);
  fastify.post('/users/login', controller.login);
}

export { userRoutes };
