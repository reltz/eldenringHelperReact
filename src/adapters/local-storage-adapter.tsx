import { Item } from "../components/table";
import sorceriesDB from "../data/sorceries.json";
import incantationsDB from "../data/incantations.json";

interface DB {
    sorceries: Item[];
    incantations: Item[];
    character: string;
}

export class LocalStorageAdapter {
    private readonly key = "eldenRingHelperDB";
    private db: DB;

    constructor() {
        let dbString = localStorage.getItem(this.key);

        if(!dbString) {
            dbString = JSON.stringify({
                incantations: incantationsDB.items,
                sorceries: sorceriesDB.items
            });
            localStorage.setItem(this.key, dbString)
        }
        this.db = JSON.parse(dbString)
    }

    public getIncantations(): Item[] {
        return this.db.incantations;
    }

    public getSorceries(): Item[] {
        return this.db.sorceries;
    }
    
    public saveIncantations(incantations: Item[]) {
        this.db.incantations = incantations;
        localStorage.setItem(this.key, JSON.stringify(this.db));
    }

    public saveSorceries(sorceries: Item[]) {
        this.db.sorceries = sorceries;
        localStorage.setItem(this.key, JSON.stringify(this.db));
    }

}