import { useState } from 'react';
import incantationDB from '../data/incantations.json'
import { Incantation } from '../models/models';
import { Item, Table } from './table'
import { LocalStorageAdapter } from '../adapters/local-storage-adapter';


export function IncantationTable() {
    
const [items, setItems] = useState<any>(incantationDB.items);

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
    db.saveIncantations(items);
};


return (
        <Table save={save} handleStateChange={handleStateChange} items={items as Incantation[]}></Table>
    )
}

// LIFT STATE UP TO PRESER IF WE CARE!
// Parent component that manages the state
// function ParentComponent() {
//     const [items1, setItems1] = useState<Item[]>(/* initial items for table 1 */);
//     const [items2, setItems2] = useState<Item[]>(/* initial items for table 2 */);

//     const handleStateChange1 = (itemId: string, checked: boolean) => {
//         setItems1(prevItems => {
//             // Update the state for table 1
//         });
//     };

//     const handleStateChange2 = (itemId: string, checked: boolean) => {
//         setItems2(prevItems => {
//             // Update the state for table 2
//         });
//     };

//     return (
//         <div>
//             <SorceriesTable handleStateChange={handleStateChange1} items={items1} />
//             <IncantationTable handleStateChange={handleStateChange2} items={items2} />
//         </div>
//     );
// }

// // SorceriesTable and IncantationTable components remain the same as before

// // Example usage:
// ReactDOM.render(<ParentComponent />, document.getElementById('root'));
