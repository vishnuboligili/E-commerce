import React, { useContext } from 'react'
import "./CartItems.css";
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'
export const CartItems = () => {
    const{getTotalAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id]>0){
                return(
                    <div>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={e.image} alt="" className='cartitems-product-icon'/>
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <p>${e.new_price*cartItems[e.id]}</p>
                        <img src={remove_icon} className='cartitems-remove-icon' alt="" onClick={()=>{removeFromCart(e.id)}}/>
                    </div>
                    <hr />
                </div>
                )
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalAmount()}</h3>
                    </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="caritems-promobox">
                    <input type="text" placeholder='promocode'/>
                    <button>submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
