import { BeverageService } from "../service/beverage.service";
import type { Request, Response } from 'express';
import type { BeverageRequest, BeverageResponse } from "../model/dto/beverage.dto";
import type { ErrorReponse } from "../model/dto/error.dto"

export class BeverageController {
    static async getAll(
        req: Request,
        res: Response<BeverageResponse[] | ErrorReponse>
    ): Promise<void> {
        try {
            const beverages = await BeverageService.getAll();
            res.status(200).json(beverages);
        } catch (e) {
            const err = e as Error; // Tipizzazione sicura per l'errore
            res.status(500).json({ message: 'Error retrieving beverages', error: err.message });
        }
    }

    static async getById(
        req: Request<{ id: string }>, // Tipizza req.params.id come stringa
        res: Response<BeverageResponse | ErrorReponse>
    ): Promise<void> {
        try {
            const beverage = await BeverageService.getById(req.params.id);
            if (!beverage) {
                res.status(404).json({ message: 'Beverage not found' });
                return;
            }
            res.status(200).json(beverage);
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error retrieving beverage', error: err.message });
        }
    }

    static async getByName(
        req: Request<{ name: string }>, // Tipizza req.params.id come stringa
        res: Response<BeverageResponse | ErrorReponse>
    ): Promise<void> {
        try {
            const beverage = await BeverageService.getByName(req.params.name);
            if (!beverage) {
                res.status(404).json({ message: 'Beverage not found' });
                return;
            }
            res.status(200).json(beverage);
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error retrieving beverage', error: err.message });
        }
    }

    // 1. Ricerca per nome (da Query Params: GET /beverages/search?q=caffe)
    static async searchByName(
        req: Request<{}, {}, {}, { q?: string }>,
        res: Response<BeverageResponse[] | ErrorReponse>
    ): Promise<void> {
        try {
            const queryText = req.query.q || '';
            const beverages = await BeverageService.searchByName(queryText);
            res.status(200).json(beverages);
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error searching beverages', error: err.message });
        }
    }

    // 2. Creazione nuova bevanda (POST /beverages con body: BeverageRequest)
    static async create(
        req: Request<{}, {}, BeverageRequest>,
        res: Response<BeverageResponse | ErrorReponse>
    ): Promise<void> {
        try {
            const newBeverage = await BeverageService.create(req.body);
            res.status(201).json(newBeverage); // 201 Created
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error creating beverage', error: err.message });
        }
    }

    // 3. Aggiornamento bevanda esistente (PUT /beverages/:id con body: BeverageRequest)
    static async update(
        req: Request<{ id: string }, {}, BeverageRequest>,
        res: Response<BeverageResponse | ErrorReponse>
    ): Promise<void> {
        try {
            const updatedBeverage = await BeverageService.update(req.params.id, req.body);
            
            if (!updatedBeverage) {
                res.status(404).json({ message: 'Beverage not found' });
                return;
            }

            res.status(200).json(updatedBeverage);
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error updating beverage', error: err.message });
        }
    }

    // 4. Eliminazione bevanda (DELETE /beverages/:id)
    static async deleteById(
        req: Request<{ id: string }>,
        res: Response<void | ErrorReponse>
    ): Promise<void> {
        try {
            const deleted = await BeverageService.deleteById(req.params.id);

            if (!deleted) {
                res.status(404).json({ message: 'Beverage not found' });
                return;
            }

            res.status(204).send(); // 204 No Content
        } catch (e) {
            const err = e as Error;
            res.status(500).json({ message: 'Error deleting beverage', error: err.message });
        }
    }
}
