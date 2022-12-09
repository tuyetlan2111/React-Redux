import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '../../../reducers/CartReducer'
import { formatMoney } from '../../../utils/formatMoney';
import EmptyCart from './EmptyCart';

const Cart = () => {

  let { cart } = useSelector(state => state.carts);
  const [inputValue, setUpdateQty] = useState(1);
  const dispatch = useDispatch();

  const getTotal = () => {
    let totalPrice = 0;
    let totalQuantity = 0;
    cart?.forEach(item => {
      totalQuantity += item.qty;
      totalPrice += item.price * item.qty;
    })
    return { totalPrice, totalQuantity };
  }

  const handleChangeValue = (e) => {
    setUpdateQty(e.target.value)
  }


  return (
    <div className='cart'>
      {cart.length > 0 ? (
        <React.Fragment>
          <table className="table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Sản phẩm</th>
                <th>Giá tiền</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                cart.map(cartItem => (
                  <tr key={cartItem.id} className='cart_item'>
                    <td>
                      <div className='cart_img'>
                        <img src={cartItem.image} alt='img' />
                      </div>
                    </td>
                    <td>
                      <h3 className='product-name'>{cartItem.title}</h3>
                    </td>
                    <td>
                      <p>{formatMoney(cartItem.price)}</p>
                    </td>
                    <td>
                      <div className='cart__qty'>
                        <button onClick={() => dispatch(decrementQuantity(cartItem.id))}>-</button>
                        <input min={1} max={100} value={cartItem.qty} onChange={handleChangeValue} id='inputCart' />
                        <button onClick={() => dispatch(incrementQuantity(cartItem.id))}>+</button>
                      </div>
                    </td>
                    <td></td>
                    <td>
                    </td>
                    <td>
                      <p>{formatMoney(cartItem.price * cartItem.qty)}</p>
                    </td>
                    <td>
                      <button type='button' onClick={() => dispatch(removeItem(cartItem.id))}>
                        <img className='btncart-remove' src='assets/images/remove.png' alt='' />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className='cart_bottom'>
            <div className='total-item'>
              <div className='flex'>
                <p>Total Items</p>
                <span className='total-price'>{(getTotal().totalQuantity)}</span>
              </div>
              <div className='flex'>
                <p>Total Payment</p>
                <span className='total-price'>{formatMoney(getTotal().totalPrice)}</span>
              </div>
            </div>
            <div className='cart_checkout flex'>
              <div className="prev-shop">
                <a href='./product'>
                  <img src="assets/images/icon-back.svg" alt='back'/>
                  Tiếp tục mua hàng</a>
              </div>
              <div>
                <button className='checkout-btn cart-btn'>CHECKOUT</button>
                <button className='empty-cart cart-btn'>CLEAR</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <EmptyCart />
      )}
    </div>
  )
}

export default Cart
