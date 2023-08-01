

export const updateObjectInArray = (items:any[], itemID:any, objectPropName:string, newObjProps:any) => {
  return  items.map(t => t[objectPropName] === itemID ? {...t, ...newObjProps} : t)
}
