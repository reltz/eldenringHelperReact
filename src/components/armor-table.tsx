import { useState } from 'react';
import { Incantation } from '../models/models';
import { Item, Table } from './table'
import { LocalStorageAdapter } from '../adapters/local-storage-adapter';

export function ArmorTable(props: { db: LocalStorageAdapter }) {
    const [items, setItems] = useState<any>(props.db.getArmors());

    const handleStateChange = (itemId: string, checked: boolean) => {
        setItems((prevItems: { id: string; }[]) => {
            return prevItems.map((item: { id: string; }) => {
                if (item.id === itemId) {
                    return { ...item, checked };
                }
                return item;
            });
        });
    };

    const handleCommentChange = (itemID: string, comment: string) => {
        const updatedItems = items.map((item: { id: string; }) => {
          if (item.id === itemID) {
            return { ...item, comment: comment };
          }
          return item;
        });
        setItems(updatedItems)
      }

    const save = (items: Item[]) => {
        props.db.saveArmors(items);
    };

    return (
        <Table save={save} handleCommentChanged={handleCommentChange} handleStateChange={handleStateChange} items={items as Incantation[]}></Table>
    )
}
