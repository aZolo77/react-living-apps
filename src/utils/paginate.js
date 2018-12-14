import _ from 'lodash';

// props: [arrayOfItems], [currentPageNumber], [itemsOnThePage]
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // sliced array of needed size
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
