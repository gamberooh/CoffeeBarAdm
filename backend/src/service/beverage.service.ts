import type { IBeverageDocument } from '../model/Beverage';
import mongoose from 'mongoose';
import Beverage from '../model/Beverage';
import type { BeverageRequest, BeverageResponse } from "../model/dto/beverage.dto";

type BeverageRecord = Pick<
    IBeverageDocument,
    'name' | 'description' | 'price' | 'alcoholic' | 'ingredients'
> & {
    _id: mongoose.Types.ObjectId;
    __v?: number;
};

export class BeverageService {
    /**
     * Mapper privato per trasformare in modo sicuro i POJO/Documenti Mongoose in BeverageResponse DTO.
     * Garantisce l'isolamento del tipo di persistenza (_id) dal tipo di risposta API (id).
     */
    private static mapToResponse(doc: BeverageRecord): BeverageResponse {
        const { _id, __v, ...rest } = doc;
        return {
            id: _id.toString(),
            ...rest
        };
    }

    /**
     * Recupera tutte le bevande.
     */
    static async getAll(): Promise<BeverageResponse[]> {
        const docs = await Beverage.find().lean().exec();
        return docs.map(doc => this.mapToResponse(doc));
    }

    /**
     * Recupera una singola bevanda tramite l'ID.
     */
    static async getById(id: string): Promise<BeverageResponse | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }

        const doc = await Beverage.findById(id).lean().exec();
        return doc ? this.mapToResponse(doc) : null;
    }

    /**
     * Recupera una singola bevanda tramite il nome esatto.
     */
    static async getByName(name: string): Promise<BeverageResponse | null> {
        const doc = await Beverage.findOne({ name }).lean().exec();
        return doc ? this.mapToResponse(doc) : null;
    }

    /**
     * Esegue una ricerca case-insensitive per nome.
     */
    static async searchByName(queryText: string): Promise<BeverageResponse[]> {
        const trimmed = queryText?.trim();
        if (!trimmed) {
            return [];
        }

        const safeSearchTerm = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const filter = {
            name: { $regex: safeSearchTerm, $options: 'i' }
        };

        const docs = await Beverage.find(filter).lean().exec();
        return docs.map(doc => this.mapToResponse(doc));
    }

    /**
     * Crea un nuovo record di bevanda.
     */
    static async create(payload: BeverageRequest): Promise<BeverageResponse> {
        const created = await Beverage.create(payload);
        const rawObject = created.toObject();
        return this.mapToResponse(rawObject);
    }

    /**
     * Aggiorna una bevanda esistente.
     */
    static async update(id: string, payload: BeverageRequest): Promise<BeverageResponse | null> {
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
     * Elimina una bevanda tramite ID.
     */
    static async deleteById(id: string): Promise<boolean> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return false;
        }

        const result = await Beverage.findByIdAndDelete(id).exec();
        return result !== null;
    }
}