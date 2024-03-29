import { useState } from 'react';
import { Item, Table } from './table'
import { LocalStorageAdapter } from '../adapters/local-storage-adapter';

interface CheckedState {
  [key: number]: boolean;
}

export function SorceriesTable(props: {db: LocalStorageAdapter}) {
  // const sorted = sortItemsByField(sorceries.items, "intelligence");

  // State to manage the checked state for each row
  const [items, setItems] = useState<any>(props.db.getSorceries());

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
    props.db.saveSorceries(items);
  };

  return (
    <Table save={save} handleStateChange={handleStateChange} items={items as unknown as Item[]}></Table>
  )
}