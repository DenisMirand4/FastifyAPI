import { Product } from "../../Domain/Entities/Product";
import { IProductRepository } from "../../Domain/Interfaces/IProductRepository";
import { prisma } from "../db-client";

class ProductRepository implements IProductRepository {

  public async getAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();
    return products;
  }

  public async getById(id: number): Promise<Product | null> {
    id = parseInt(id.toString());
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
  }

  public async create(product: Product): Promise<Product> {
    const newProduct = await prisma.product.create({ data: product });
    return newProduct;
  }

  public async update(id: number, product: Product): Promise<Product> {
    id = parseInt(id.toString());
    const updatedProduct = await prisma.product.update({ where: { id }, data: product });
    return updatedProduct;
  }

  public async delete(id: number): Promise<Product> {
    id = parseInt(id.toString());
    const deletedProduct = await prisma.product.delete({ where: { id } });
    return deletedProduct;
  }
}

export default ProductRepository;
