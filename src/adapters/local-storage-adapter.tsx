import { Item } from "../components/table";
import sorceriesDB from "../data/sorceries.json";
import incantationsDB from "../data/incantations.json";
import talismanDB from "../data/talisman.json"
import ashesDB from "../data/ashes.json";
import weaponsDB from "../data/weapons.json"
import armorDB from "../data/armor.json";

interface DB {
    sorceries: Item[];
    incantations: Item[];
    talismans: Item[];
    ashes: Item[];
    weapons: Item[];
    armors: Item[];
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
                sorceries: sorceriesDB.items,
                talismans: talismanDB.items,
                ashes: ashesDB.items,
                weapons: weaponsDB.items,
                armors: armorDB.items
            });
            localStorage.setItem(this.key, dbString)
        }

        const dbParsed = JSON.parse(dbString);

        // if data change -> implement migration
        // if(!dbParsed.version || dbParsed.version < 1.0) {
        //     // migrate data shape!!
        // }
        this.db = dbParsed;
    }

    public getIncantations(): Item[] {
        return this.db.incantations;
    }

    public getSorceries(): Item[] {
        return this.db.sorceries;
    }

    public getTaslismans(): Item[] {
        return this.db.talismans;
    }

    public getAshes(): Item[] {
        return this.db.ashes;
    }

    public getWeapons(): Item[] {
        return this.db.weapons;
    }

    public getArmors(): Item[] {
        return this.db.armors;
    }
    
    public saveIncantations(incantations: Item[]) {
        this.db.incantations = incantations;
        this.persist()
    }

    public saveSorceries(sorceries: Item[]) {
        this.db.sorceries = sorceries;
        this.persist()
    }

    public saveTalismans(talismans: Item[]) {
        this.db.talismans = talismans;
        this.persist()
    }

    public saveWeapons(weapons: Item[]) {
        this.db.weapons = weapons;
        this.persist()
    }

    public saveArmors(armors: Item[]) {
        this.db.armors = armors;
        this.persist()
    }

    private persist(): void {
        localStorage.setItem(this.key, JSON.stringify(this.db));
    }

    public saveAshes(ashes: Item[]) {
        this.db.ashes = ashes;
        localStorage.setItem(this.key, JSON.stringify(this.db));
    }
}