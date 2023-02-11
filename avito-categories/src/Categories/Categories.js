import React, {useState} from "react";
import "./Categories.css";
import { Category } from "./Category/Category";

export function Categories({
    categories,
    ids,
    selectedIds,
    toggleId
}) {
    const [isOpen, setIsOpen] = useState(false);
    function handleChange(event) {
        const {value} = event.target;
        toggleId(value);
    }
    return (
        <ul>
            {ids.map(id => {
                const {childrenIds, name } = categories[id];

                return (
                    <li>
                        {childrenIds.length !== 0 && (
                            <button
                                onClick={() => setIsOpen(!isOpen)} 
                            >
                                {isOpen ? '↑' : '↓'}
                            </button>
                        )}
                        <input 
                            value={id}
                            type="checkbox" 
                            onChange={handleChange}
                            checked={selectedIds.includes(id)}
                        /> {name} [{id}]
                        {isOpen && childrenIds.length !== 0 && (
                            <Categories
                                categories={categories}
                                ids={childrenIds}
                                selectedIds={selectedIds}
                                toggleId={toggleId}
                            />
                        )}
                    </li>
                )
            })}
        </ul>
    )
}