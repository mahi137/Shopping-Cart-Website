import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addItem } from '../Redux/Actions/cartAction';

import Swal from 'sweetalert2' // for sweet msg alerts

const Items = ({product}) => {
    const dispatch = useDispatch();
    const data = useSelector(state=>state.cart);
    const addItemInCart = ()=>{
      let add = true;
        data.forEach(element => {
          if(element.id === product.id){
            add = false;
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Item already added',
              showConfirmButton: false,
              timer: 1200
            });
          } 
        });
        if(add){
          dispatch(addItem(product));
          if(localStorage.getItem('cart-items')){
            const tempArr = JSON.parse(localStorage.getItem('cart-items'));
            localStorage.setItem('cart-items',JSON.stringify([...tempArr,product]));
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your item is added to the cart',
              showConfirmButton: false,
              timer: 1200
            });

          }else{
            localStorage.setItem('cart-items',JSON.stringify([product]));
          }
        }
    }
  return (
    <div className="items">
                <img src={product.thumbnail} alt={product.title} loading='lazy'/>
                <div>
                    <p>Title : {product.title}</p>
                    <p>Price : $ {product.price}</p>
                </div>
                <button onClick={addItemInCart}>Add To Cart</button>
            </div>
  )
}

export default Items
