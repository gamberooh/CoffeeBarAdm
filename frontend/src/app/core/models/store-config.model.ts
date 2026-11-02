export interface StoreConfig {
    brandName: string;
    tagline?: string;
    logoUrl: string;
    address: string;
    hours: string;
    allergenDisclaimer?: string;
    promises: {
        icon: string;
        title: string;
        description: string
    }[];
}