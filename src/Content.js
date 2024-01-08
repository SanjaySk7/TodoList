import React from 'react'
import ItemsList from './ItemsList';
const Content = ({items,handlecheck,handleclick}) => {
    return (
    <>
        {(items.length) ? ( 
            <ItemsList
            items={items}
            handlecheck={handlecheck}
            handleclick={handleclick}
            />
   ) : (
    <p>Your List is Empty!!!</p>
   )}

    </>
  )
}

export default Content