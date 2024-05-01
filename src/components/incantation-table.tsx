import { useEffect, useState } from 'react';
import { Incantation } from '../models/models';
import { Item, Table } from './table';
import { LocalStorageAdapter } from '../adapters/local-storage-adapter';

export function IncantationTable(props: { db: LocalStorageAdapter }) {
    const [items, setItems] = useState<Item[]>([]);

    // Fetch incantations when the component mounts and whenever the DB changes
    useEffect(() => {
        console.log("fetching incantations again!")
        setItems(props.db.getIncantations());
    }, [props.db]);

    const handleStateChange = (itemId: string, checked: boolean) => {
        setItems((prevItems: Item[]) => {
            return prevItems.map((item: Item) => {
                if (item.id === itemId) {
                    return { ...item, checked };
                }
                return item;
            });
        });
    };

    const handleCommentChange = (itemId: string, comment: string) => {
        const updatedItems = items.map((item: Item) => {
            if (item.id === itemId) {
                return { ...item, comment: comment };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const save = (items: Item[]) => {
        props.db.saveIncantations(items);
    };

    return (
        <Table save={save} handleCommentChanged={handleCommentChange} handleStateChange={handleStateChange} items={items as Incantation[]} />
    );
}
