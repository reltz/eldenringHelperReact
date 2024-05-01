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
}

export class LocalStorageAdapter {
    private readonly key = "eldenRingHelperDB";
    private readonly charactersKey = "eldenRingHelperCharacters";

    private db: DB | undefined;
    private charactersDB: string[] = [];
    private currentDBKey: string= "";

    constructor() {
        const charactersString = localStorage.getItem(this.charactersKey);
        if (charactersString) {
            const characters: string[] = JSON.parse(charactersString);
            this.charactersDB = characters;
        } else {
            localStorage.setItem(this.charactersKey, JSON.stringify([]));
        }

        const current = localStorage.getItem(this.currentDBKey);
        if(current) {
            this.db = JSON.parse(current);
        }
        if (!this.db) {
            // Initialize an empty DB if not found
            this.db = {
                sorceries: [],
                incantations: [],
                talismans: [],
                ashes: [],
                weapons: [],
                armors: []
            };
        }
    }

    public setCurrentDB(character: string) {
        this.currentDBKey = `${this.key}_${character}`;
        console.log(`current db key = ${this.currentDBKey}`);
        const dbString = localStorage.getItem(this.currentDBKey);
        if(dbString){
            console.log("found db!");
            this.db = JSON.parse(dbString);
            console.info(this.db);
        } else {
            console.log("creating new character db!")
            this.db = {
                armors: armorDB.items as any,
                incantations: incantationsDB.items as any,
                sorceries: sorceriesDB.items as any,
                ashes: ashesDB.items as any,
                talismans: talismanDB.items as any,
                weapons: weaponsDB.items as any,
            }
            this.persist();
        }
    }

    public getCharacters(): string[] {
        return this.charactersDB;
    }


    public saveCharacter(name: string): void {
        this.charactersDB.push(name);
        localStorage.setItem(this.charactersKey, JSON.stringify(this.charactersDB));
    }

    public getIncantations(): Item[] {
        console.info('getting incantations')
        console.log(this.db?.incantations);
        return this.db?.incantations || [];
    }

    public getSorceries(): Item[] {
        return this.db?.sorceries || [];
    }

    public getTaslismans(): Item[] {
        return this.db?.talismans || [];
    }

    public getAshes(): Item[] {
        return this.db?.ashes || [];
    }

    public getWeapons(): Item[] {
        return this.db?.weapons || [];
    }

    public getArmors(): Item[] {
        return this.db?.armors || [];
    }

    public saveIncantations(incantations: Item[]) {
        if (this.db) {
            this.db.incantations = incantations;
            this.persist();
        }
    }

    public saveSorceries(sorceries: Item[]) {
        if (this.db) {
            this.db.sorceries = sorceries;
            this.persist()
        }
    }

    public saveTalismans(talismans: Item[]) {
        if (this.db) {
            this.db.talismans = talismans;
            this.persist()
        }
    }

    public saveWeapons(weapons: Item[]) {
        if (this.db) {
            this.db.weapons = weapons;
            this.persist()
        }
    }

    public saveArmors(armors: Item[]) {
        if (this.db) {
            this.db.armors = armors;
            this.persist()
        }
    }

    public saveAshes(ashes: Item[]) {
        if (this.db) {
            this.db.ashes = ashes;
            localStorage.setItem(this.key, JSON.stringify(this.db));
        }
    }

    private persist(): void {
        if (this.currentDBKey) {
            localStorage.setItem(this.currentDBKey, JSON.stringify(this.db));
        }
    }
}