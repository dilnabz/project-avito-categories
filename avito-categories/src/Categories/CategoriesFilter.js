import React from "react";
import { Categories } from "./Categories";


// descendants
function getChildrenIds(categories, id) {
  const { childrenIds } = categories[id];

  const allChildrenIds = [];

  allChildrenIds.push(...childrenIds);
  childrenIds.forEach(childrenId => {
    allChildrenIds.push(...getChildrenIds(categories, childrenId));
  });

  return allChildrenIds;
}

// ancestors
function getAncestors(categories, id, selectedIds) {
    const { parentId } = categories[id];
    const siblings = categories[parentId].childrenIds.filter(item => item !== id);
    if (siblings.every(id => selectedIds.includes(id))) {
        return [parentId];
    }
    return [];
}
// function removeChildrenIds(categories, id, selectedIds, idsToExclude = []) {
//     const { childrenIds } = categories[id];
//     idsToExclude.push(...childrenIds, id);
//     if(childrenIds.length !== 0) {
//         childrenIds.forEach(childrenId => getChildrenIds(categories, childrenId, idsToExclude, selectedIds));
//     }
//     return selectedIds.filter(item => !idsToExclude.includes(item));
// }

export function CategoriesFilter({
    categories,
    selectedIds,
    onChange
}) {
//   console.log(categories);
  function toggleId(id) {
    console.log(">>>", id);
    console.log(getAncestors(categories, id, selectedIds));
    const idWithChildrenIds = [id, ...getChildrenIds(categories, id), ...getAncestors(categories, id, selectedIds)];
    if(selectedIds.includes(id)) {
        onChange(selectedIds.filter(item => !idWithChildrenIds.includes(item)));
    } else{
        onChange([...selectedIds, ...idWithChildrenIds]);
    }
  }

  const topLevelIds = Object.keys(categories)
    .filter(id => categories[id].parentId === null);

    console.log(Object.keys(categories), {topLevelIds});

    return (
      <Categories 
        categories={categories} 
        ids={topLevelIds} 
        selectedIds={selectedIds}
        toggleId={toggleId}
      />
    )
}