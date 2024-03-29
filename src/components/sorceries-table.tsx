import { useState } from 'react';
import sorceries from '../data/sorceries.json'
import { Item, Table } from './table'
import { LocalStorageAdapter } from '../adapters/local-storage-adapter';

interface CheckedState {
  [key: number]: boolean;
}

export function SorceriesTable() {
  // const sorted = sortItemsByField(sorceries.items, "intelligence");

  // State to manage the checked state for each row
  const [items, setItems] = useState<any>(sorceries.items);

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

  const save = (items: Item[]) => {
    const db = new LocalStorageAdapter();
    db.saveSorceries(items);
  };

  return (
    <Table save={save} handleStateChange={handleStateChange} items={items as unknown as Item[]}></Table>
  )
}