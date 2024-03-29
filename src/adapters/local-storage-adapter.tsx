import { Item } from "../components/table";

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
                incantations: [],
                sorceries: []
            });
            localStorage.setItem(this.key, JSON.stringify(dbString))
        }
        this.db = JSON.parse(dbString)
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