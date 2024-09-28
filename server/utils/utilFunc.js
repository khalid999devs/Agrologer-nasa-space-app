function mergeArraysToObjKey(array1, array2, keyName) {
  const merged = {};

  const addOrMerge = (obj) => {
    if (merged[obj[keyName]]) {
      merged[obj[keyName]] = { ...merged[obj[keyName]], ...obj };
    } else {
      merged[obj[keyName]] = obj;
    }
  };

  array1.forEach(addOrMerge);
  array2.forEach(addOrMerge);

  return merged;
}

function areArraysEqualSet(arr1, arr2) {
  return (
    new Set(arr1).size === new Set(arr2).size &&
    new Set(arr1.concat(arr2)).size === new Set(arr1).size
  );
}

function fromArrayToObjId(arr, idName) {
  const object = arr.reduce((obj, item) => {
    obj[item[idName]] = item;
    return obj;
  }, {});
  return object;
}

function fromArrayToObjIdArr(arr, idName) {
  const object = arr.reduce((obj, item) => {
    let prevObj = obj[item[idName]];
    prevObj = prevObj || [];
    prevObj.push(item);
    obj[item[idName]] = prevObj;
    return obj;
  }, {});
  return object;
}

module.exports = {
  areArraysEqualSet,
  fromArrayToObjId,
  mergeArraysToObjKey,
  fromArrayToObjIdArr,
};
