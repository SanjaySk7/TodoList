import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import Additem from './Additem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
    const API_URL='http://localhost:3500/items';
    const[items, setItems]=useState([]);
    const [newItem,setNewItem]=useState('');
    const [search,setSearch]=useState('');
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(true)
   
    useEffect(()=>{
        const fetchItems=async()=>{
            try{
                const response=await fetch(API_URL)
                if(!response.ok) throw Error ("Data not recieved");
                const listItems=await response.json()
                setItems(listItems)
                setError(null)
            }catch(err){
                setError(err.message) 
            }
            finally{
                setLoading(false)
            }
        }
        setTimeout(()=>{
        (async()=>await fetchItems())()
        },2000)
    },[])

    const addItem=async(item)=>{
        const id=items.length ? items[items.length-1].id+1 : 1;
        const addNewItem={id,checked:false,item}
        const listItems=[...items,addNewItem]
        setItems(listItems)

        const postOptions={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(addNewItem)
        }
        const result= await apiRequest(API_URL,postOptions)
        if(result) setError(result)
    }

    const handlecheck=async (id)=>{
    const listitems=items.map((item)=>
    item.id===id ? {...item, checked:! item.checked}: item);
    setItems(listitems);
    const myItems=listitems.filter((item)=>item.id===id)
    const updateOptions={
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({checked:myItems[0].checked})
    }
    const reqUrl=`${API_URL}/${id}`
    const result=await apiRequest(reqUrl,updateOptions)
    if(result) setError(result)
    }
const handleclick=async (id)=>{
    const listitems=items.filter((item)=>
    item.id!==id)
    setItems(listitems)
    const deleteOptions={
        method:'DELETE'
    }
    const reqUrl=`${API_URL}/${id}`
    const result=await apiRequest(reqUrl,deleteOptions)
    if(result) setError(result)
    }
const handlesubmit=(e)=>{
    e.preventDefault()
    console.log("submited")
    addItem(newItem)
    //addtolist
    setNewItem('')
}
  
  return (
   <div className='App'>
    <Header title="My Todo List" />
    <Additem 
        newItem={newItem}
        setNewItem={setNewItem}
        handlesubmit={handlesubmit}
    /> 
    <SearchItem  
        search={search}
        setSearch={setSearch}
        
    />
    <main>
        {loading && <p>Data is Loading!!</p>}
        {error && <p>{`Error: ${error}`}</p>}
        {!loading && !error && <Content 
            items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handlecheck={handlecheck}
            handleclick={handleclick}
        
        />}
    </main>
    <Footer 
    length={items.length}
    />
   </div>
  );
}

export default App;
