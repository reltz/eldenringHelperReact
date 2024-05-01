import { toast } from "react-toastify";
import Toast from "./toast";
import { useState } from "react";

export interface TableProps {
    items: Item[];
    save: (items: Item[]) => void;
    handleStateChange: (itemID: string, checked: boolean) => void
    handleCommentChanged: (itemID: string, comment: string) => void
}

export interface Item {
    id: string;
    name: string;
    image?: string;
    checked: boolean;
    comment: string;
}

export interface ItemWithRequirements extends Item {
    faith?: number;
    intelligence?: number;
    arcane?: number;
}


export function Table(props: TableProps) {
    const { items, handleStateChange, handleCommentChanged } = props;

    const handleCheckboxChange = (id: string) => {
        handleStateChange(id, !items.find(item => item.id === id)?.checked);
    };

    const handleSaveClick = () => {
        props.save(items);
        toast.success('Items saved successfully');
    }

    // Sort toggle
    const [sortOrder, setSortOrder] = useState<'checked' | 'unchecked'>('checked');

    const toggleSortOrder  = () => {
        setSortOrder(sortOrder === 'checked' ? 'unchecked' : 'checked');
    };

    // Filter items based on the current sort order
    const sortedItems = sortOrder === 'checked' ? items.filter(item => item.checked) : items.filter(item => !item.checked);
    // end of sort

    return (
            <div>
              <div className="button-container">
                <button className="action-button save-button" onClick={handleSaveClick}>SAVE</button>
                <button onClick={toggleSortOrder} className="action-button show-checked">
                  {sortOrder === 'checked' ? 'Show Unchecked' : 'Show Checked'}
                </button>
              </div>
          
              <div className='table-container'>
                <table aria-label="simple table" className='items-table'>
                  <thead className="table-header">
                    <tr>
                      <td>Name</td>
                      <td>Image</td>
                      <td>Owned</td>
                      <td>Comments</td>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedItems.map((row, index) => (
                      <tr key={row.id}>
                        <td scope="row">{row.name}</td>
                        <td align="right" className="img-container">
                          <img src={row.image ? row.image : ''} alt="potato" />
                        </td>
                        <td align="right">
                          <div className="checkbox-container">
                            <input
                              type="checkbox"
                              id={row.id}
                              className="checkbox-custom"
                              checked={row.checked || false}
                              onChange={() => handleCheckboxChange(row.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <textarea
                            value={row.comment}
                            onChange={(e) => handleCommentChanged(row.id, e.target.value)}
                            className="comment-input"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
}
// \<input
// type="text"
// value={row.comment} // Make sure this is correctly bound to the comment in the state
// onChange={(e) => handleCommentChange(row.id, e.target.value)} // Ensure this updates the state with the new comment value
// className="comment-input"
// />