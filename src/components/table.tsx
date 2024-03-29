export interface TableProps {
    items: Item[];
    save: (items: Item[]) => void;
    handleStateChange: (itemID: string, checked: boolean) => void
}

export interface Item {
    id: string;
    name: string;
    image?: string;
    checked: boolean;
    faith?: number;
    intelligence?: number;
    arcane?: number;
}


export function Table(props: TableProps) {
    const { items, handleStateChange } = props;

    const handleCheckboxChange = (id: string) => {
        handleStateChange(id, !items.find(item => item.id === id)?.checked);
    };

    const handleSaveClick = () => {
        props.save(items);
    }


    return (
        <div className='table-container' >
            <button onClick={handleSaveClick}>SAVE</button>
            <table aria-label="simple table" className='items-table'>
                <thead className="table-header">
                    <tr>
                        <td>
                            Name
                        </td>
                        {/* <td>
                            Faith Requirement
                        </td>
                        <td>
                            Int Requirement
                        </td>
                        <td>
                            Arcane Requirement
                        </td> */}
                        <td>
                            Image
                        </td>
                        <td>
                            Owned
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {props.items.map((row, index) => (
                        <tr key={row.id}>
                            <td scope="row">
                                {row.name}
                            </td>
                            {/* <td>
                                {row.faith ?? 0}
                            </td>
                            <td>
                                {row.intelligence ?? 0}
                            </td>
                            <td>
                                {row.arcane ?? 0}
                            </td> */}
                            <td align="right" className="img-container">
                                <img src={row.image ? row.image : ''} alt="potato" />
                            </td>
                            <td align="right">
                                <input
                                    type="checkbox"
                                    checked={row.checked || false}
                                    onChange={() => handleCheckboxChange(row.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}