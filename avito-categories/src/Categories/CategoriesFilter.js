import React from "react";
import {Categories} from "./Categories";

// descendants
function getDescendants(categories, id) {
  const {childrenIds} = categories[id];

  const descendants = [];

  descendants.push(...childrenIds);
  childrenIds.forEach((childrenId) => {
    descendants.push(...getDescendants(categories, childrenId));
  });

  return descendants;
}

// ancestors
function getAncestors(categories, id, selectedIds) {
  const {parentId} = categories[id];
  const ancestors = [];
  if (parentId === null) {
    return ancestors;
  }
  const siblings = categories[parentId].childrenIds
    .filter((item) => item !== id);
  if (siblings.every((sibling) => selectedIds.includes(sibling))) {
    ancestors.push(parentId, ...getAncestors(categories, parentId, selectedIds));
  }

  return ancestors;
}


export function CategoriesFilter({categories, selectedIds, onChange}) {
  //   console.log(categories);
  function toggleId(id) {
    console.log(">>>", id);
    console.log(getAncestors(categories, id, selectedIds));
    const idWithChildrenIds = [
      id,
      ...getDescendants(categories, id),
      ...getAncestors(categories, id, selectedIds),
    ];
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => !idWithChildrenIds.includes(item)));
    } else {
      onChange([...selectedIds, ...idWithChildrenIds]);
    }
  }

  const topLevelIds = Object.keys(categories).filter(
    (id) => categories[id].parentId === null
  );

  return (
    <Categories
      categories={categories}
      ids={topLevelIds}
      selectedIds={selectedIds}
      toggleId={toggleId}
    />
  );
}
