import { ProductService } from "../service/product.service";
import type { Request, Response } from 'express';
import type { ProductRequest, ProductResponse } from "../model/dto/product.dto";
import type { ErrorReponse } from "../model/dto/error.dto"

export class ProductController {
    static async getAll(
        req: Request,
        res: Response<ProductResponse[] | ErrorReponse>
    ): Promise<void> {
        try {
            const products = await ProductService.getAll();
            res.status(200).json(products);
        } catch (e) {
            const err = e as Error; // Tipizzazione sicura per l'errore
            res.status(500).json({ message: 'Error retrieving Products', error: err.message });
        }
    }

    static async getById(
        req: Request<{ id: string }>, // Tipizza req.params.id come stringa
        res: Response<ProductResponse | ErrorReponse>
    ): Promise<void> {
        try {
            const product = await ProductService.getById(req.params.id);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.status(200).json(product);
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error retrieving Product', error: err.message });
        }
    }

    static async getByName(
        req: Request<{ name: string }>, // Tipizza req.params.id come stringa
        res: Response<ProductResponse | ErrorReponse>
    ): Promise<void> {
        try {
            const product = await ProductService.getByName(req.params.name);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.status(200).json(product);
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error retrieving Product', error: err.message });
        }
    }

    // 1. Ricerca per nome (da Query Params: GET /Products/search?q=caffe)
    static async searchByName(
        req: Request<{}, {}, {}, { q?: string }>,
        res: Response<ProductResponse[] | ErrorReponse>
    ): Promise<void> {
        try {
            const queryText = req.query.q || '';
            const products = await ProductService.searchByName(queryText);
            res.status(200).json(products);
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error searching products', error: err.message });
        }
    }

    // 2. Creazione nuova bevanda (POST /products con body: ProductRequest)
    static async create(
        req: Request<{}, {}, ProductRequest>,
        res: Response<ProductResponse | ErrorReponse>
    ): Promise<void> {
        try {
            const newProduct = await ProductService.create(req.body);
            res.status(201).json(newProduct); // 201 Created
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error creating Product', error: err.message });
        }
    }

    // 3. Aggiornamento bevanda esistente (PUT /Products/:id con body: ProductRequest)
    static async update(
        req: Request<{ id: string }, {}, ProductRequest>,
        res: Response<ProductResponse | ErrorReponse>
    ): Promise<void> {
        try {
            const updatedProduct = await ProductService.update(req.params.id, req.body);
            
            if (!updatedProduct) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }

            res.status(200).json(updatedProduct);
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error updating product', error: err.message });
        }
    }

    // 4. Eliminazione bevanda (DELETE /Products/:id)
    static async deleteById(
        req: Request<{ id: string }>,
        res: Response<void | ErrorReponse>
    ): Promise<void> {
        try {
            const deleted = await ProductService.deleteById(req.params.id);

            if (!deleted) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }

            res.status(204).send(); // 204 No Content
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error deleting product', error: err.message });
        }
    }
}
