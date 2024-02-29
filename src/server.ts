import fastify, { FastifyInstance } from "fastify";
import ProductController from "./Service/Controllers/ProductController";
import ProductRoutes from "./Routes/ProductRoutes";
import userRoutes from "./Routes/UserRoutes";
import UserController from "./Service/Controllers/UserController";
import authenticateToken from "./Middleware/AuthenticateJWT";

const app: FastifyInstance = fastify();
app.addHook('onRequest', authenticateToken);
const productController = new ProductController();
const userController = new UserController();
// console.log(productRepository.getAll());
ProductRoutes(app, productController);
userRoutes(app, userController);

app.listen(
  {
    port: 3000,
  },
  () => { console.log('Server is running on port 3000') });
  

