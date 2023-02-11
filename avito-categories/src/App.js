import React, {useState} from "react";
import './App.css';
import data from "./categories.json";
// import { Categories } from "./Categories/Categories";
import { CategoriesFilter } from "./Categories/CategoriesFilter";

const dataWithChildrenId = {};
for (const { id, ...rest } of data) {
    dataWithChildrenId[id] = {
        ...rest,
        parentId: rest.parentId === undefined ? null : rest.parentId.toString(),
        childrenIds: [],
    } 
}

for (const id in dataWithChildrenId) {
    const { parentId } = dataWithChildrenId[id];
    if (parentId !== null){
        dataWithChildrenId[parentId].childrenIds.push(id); 
    }
}

export function App() {
    const [selectedIds, setSelectedIds] = useState(["12401", "12402"]);
    // console.log(selectedIds);
    return (
        <div>
            <ul style={{ display: "flex" }}>
                {selectedIds.map(id => <li>{dataWithChildrenId[id].name}</li>)}
            </ul>
            <hr />
            <CategoriesFilter 
                categories={dataWithChildrenId}
                selectedIds={selectedIds}
                onChange={setSelectedIds}
            />
        </div>
    )
}

