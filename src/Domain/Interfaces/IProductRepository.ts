import { Product } from "../Entities/Product";

export interface IProductRepository {
    getAll(): Promise<Product[]>;
    getById(id: number): Promise<Product | null>;
    create(product: Product): Promise<Product>;
    update(id: number, product: Product): Promise<Product>;
    delete(id: number): Promise<Product>;
}