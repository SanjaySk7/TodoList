import React from 'react'
import LineItems from './LineItems'
const ItemsList = ({items,handlecheck,handleclick}) => {
  return (
    <ul>
         {items.map((item)=>(
          <LineItems 
          item={item}
          key={item.id}
          handlecheck={handlecheck}
          handleclick={handleclick}
          />
        ))}
       </ul>
  )
}

export default ItemsList