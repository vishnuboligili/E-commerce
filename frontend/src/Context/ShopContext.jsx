import React, { useEffect,createContext, useState } from "react";
// import all_product from "../Components/Assets/all_product";

export const ShopContext=createContext(null);

const getDefaultCart=()=>{
    let cart={};
    for(let index=0;index<300+1;index++){
        cart[index]=0;
    }
    return cart;
}

const ShopContextProvider=(props)=>{
    const[all_product,setAll_Product]=useState([]);
    
    const [cartItems,setCartItems]=useState(getDefaultCart());

    useEffect(()=>{
        if(localStorage.getItem('auth-toke')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/formdata',
                    'auth-toke':`${localStorage.getItem('auth-toke')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json()).then((data)=>setCartItems(data));
        }

        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json()).then((data)=>setAll_Product(data));
        
    },[]);
    // console.log(cartItems);

    const addToCart=(itemID)=>{
        
        // console.log(cartItems);

        if(localStorage.getItem('auth-toke')){
            setCartItems((prev)=>({...prev,[itemID]:prev[itemID]+1}));
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/formdata',
                    'auth-toke':`${localStorage.getItem('auth-toke')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemID}),
            }).then((response)=>response.json()).
            then((data)=>{console.log(data)});
        }
    }
    const removeFromCart=(itemID)=>{

        setCartItems((prev)=>({...prev,[itemID]:prev[itemID]-1}));
        if(localStorage.getItem('auth-toke')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/formdata',
                    'auth-toke':`${localStorage.getItem('auth-toke')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemID}),
            }).then((response)=>response.json()).
            then((data)=>{console.log(data)});
        }
    }
    const getTotalAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=all_product.find((product)=>product.id===Number(item));
                totalAmount+=itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }
    const getTotalItems=()=>{
        let totalItems=0;
        for(const item in cartItems){
            totalItems+=cartItems[item];
        }
        return totalItems;
    }
    const contextValue={all_product,cartItems,addToCart,removeFromCart,getTotalAmount,getTotalItems};


    return (
        <ShopContext.Provider value={contextValue}>
        {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;