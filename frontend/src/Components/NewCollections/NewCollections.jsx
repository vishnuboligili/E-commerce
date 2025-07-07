import React, { useEffect, useState } from 'react'
import "./NewCollections.css";
// import new_collections from '../Assets/new_collections';
import { Item } from '../Items/Item'
export const NewCollections = () => {
  const[new_collections,setNew_collection]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/newcollection').then((respone)=>respone.json()).then((data)=>setNew_collection(data));
  },[])
  return (
    <div className='new-collections'>   
        <h1>NEW COLLECTIONS</h1>
        <div className="line"></div>
        <div className="collections">
            {new_collections.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>;
            })}
        </div>
    </div>
  )
}
