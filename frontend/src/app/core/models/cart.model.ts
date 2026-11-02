import { ProductResponse } from "./product.model";

export interface CartItem {
    id: string;
    product: ProductResponse;
    quantity: number;
    selectedOptionsLabels?: string[];
    unitPrice: number;
}

export interface CartSummary {
    subtotal: number;
    discount?: number;
    total: number;
    itemCount: number;
}