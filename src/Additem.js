import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

const Additem = ({newItem,setNewItem,handlesubmit}) => {
  const inpRef=useRef()
  return (
    <form className='addForm' onSubmit={handlesubmit}>
        <label htmlFor='addItem'>Add Item</label>
        <input
        autoFocus
        ref={inpRef}
        id='addItem'
        type="text"
        placeholder='Add Item'
        required
        value={newItem}
        onChange={(e)=>setNewItem(e.target.value)}
        />
        <button 
        type='submit'
        aria-label='Add Item'
        onClick={()=>inpRef.current.focus()}
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default Additem