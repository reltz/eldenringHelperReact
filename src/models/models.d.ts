import { Item } from "../components/table";

export interface IncantationDB {
    total: number;
    items: Incantation[];
}

export interface Incantation extends Item {
    id: string;
    description: string;
    type: string;
    cost: number;
    slots: number;
    effects?: string;
}

