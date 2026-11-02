import type { IBeverageDocument } from '../model/Beverage';
import mongoose from 'mongoose';
import Beverage from '../model/Beverage';
import type { ProductRequest, ProductResponse } from '../model/dto/product.dto';

type BeverageRecord = Pick<
    IBeverageDocument,
    'title' | 'description' | 'price' | 'imageUrl' | 'category' |
    'categoryLabel' | 'ingredients' | 'allergens'
> & {
    _id: mongoose.Types.ObjectId;
};

export class ProductService {
    /**
     * Mapper privato per trasformare in modo sicuro i POJO/Documenti Mongoose in ProductResponse DTO.
     * Garantisce l'isolamento del tipo di persistenza (_id) dal tipo di risposta API (id).
     */
    private static mapToResponse(doc: BeverageRecord): ProductResponse {
        return {
            id: doc._id.toString(),
            title: doc.title,
            description: doc.description,
            price: doc.price,
            imageUrl: doc.imageUrl,
            category: doc.category,
            categoryLabel: doc.categoryLabel,
            ingredients: doc.ingredients,
            allergens: doc.allergens
        };
    }

    /**
     * Recupera tutti i prodotti.
     */
    static async getAll(): Promise<ProductResponse[]> {
        const docs = await Beverage.find().lean().exec();
        return docs.map(doc => this.mapToResponse(doc));
    }

    /**
     * Recupera un prodotto tramite ID.
     */
    static async getById(id: string): Promise<ProductResponse | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }

        const doc = await Beverage.findById(id).lean().exec();
        return doc ? this.mapToResponse(doc) : null;
    }

    /**
     * Recupera un prodotto tramite titolo esatto.
     */
    static async getByName(title: string): Promise<ProductResponse | null> {
        const doc = await Beverage.findOne({ title }).lean().exec();
        return doc ? this.mapToResponse(doc) : null;
    }

    /**
     * Esegue una ricerca case-insensitive per titolo.
     */
    static async searchByName(queryText: string): Promise<ProductResponse[]> {
        const trimmed = queryText?.trim();
        if (!trimmed) {
            return [];
        }

        const safeSearchTerm = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const filter = {
            title: { $regex: safeSearchTerm, $options: 'i' }
        };

        const docs = await Beverage.find(filter).lean().exec();
        return docs.map(doc => this.mapToResponse(doc));
    }

    /**
     * Crea un nuovo prodotto.
     */
    static async create(payload: ProductRequest): Promise<ProductResponse> {
        const created = await Beverage.create(payload);
        const rawObject = created.toObject();
        return this.mapToResponse(rawObject);
    }

    /**
     * Aggiorna un prodotto esistente.
     */
    static async update(id: string, payload: ProductRequest): Promise<ProductResponse | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }

        const updatedDoc = await Beverage.findByIdAndUpdate(
            id,
            { $set: payload },
            { new: true, runValidators: true }
        ).lean().exec();

        return updatedDoc ? this.mapToResponse(updatedDoc) : null;
    }

    /**
     * Elimina un prodotto tramite ID.
     */
    static async deleteById(id: string): Promise<boolean> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return false;
        }

        const result = await Beverage.findByIdAndDelete(id).exec();
        return result !== null;
    }
}