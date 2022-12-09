import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { addToCart } from '../../reducers/CartReducer'

const ProductDetail = () => {
  const dispatch = useDispatch();

  const [detail, setDetail] = useState([]);
  const [submited, setSubmited] = useState(false);
  const { cart } = useSelector(state => state.carts);

  console.log('cartsss', cart);

  // Get ID from URL
  const params = useParams();
  let { id } = params;

  useEffect(() => {
    const getDetail = () => {
      axios.get(`http://localhost:3000/products/${id}`).then(res => {
        setDetail(res.data)
      }).catch(error => console.log(error))
    }
    getDetail();
  }, [id])

  // const addProductToCart = () => {
  //   const action = ;
  //   dispatch(action);
  //   // navigate("/cart", { replace: true });
  // }

  const infor = detail && detail.infor;

  return (
    <div className='product-detail '>
      <div className='container'>
        {
          submited && (
            <div className='success-modal'>
              <img src='assets/images/success-icon.png' alt='success-icon'/>
              <p>Product successfully added to the cart</p>
            </div>
          )
        }

        <div className='product-detail_top flex'>
          <div className='product-detail_left'>
            <img className='detail_img' src={`/${detail.image}`} alt='img' />
          </div>
          <div className='product-detail_right'>
            <h3 className='detail_name'>{detail.title}</h3>
            <p className='detail_price'>{detail.price} d</p>

            <div className='detail_cart' onClick={() => dispatch(addToCart(detail))}>
              <button>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>Giỏ hàng</span>
              </button>
            </div>

          </div>
        </div>
        <div className='product-detail_bottom'>
          <div className='tab_sub_info hr'>
            <ul>
              <li><a href='#detail_des'>Thông tin sản phẩm</a></li>
              <li><a href='#detail_infor'>Thông số sản phẩm</a></li>
              <li><a href='#detail_ingredient'>Thành phẩn sản phẩm</a></li>
              <li><a href='#detail_use'>Hướng dẫn sử dụng</a></li>
            </ul>
          </div>
          <p className='detail_des' id='detail_des'>{detail.descripe}</p>
          <div className='detail_infor' id="detail_infor">
            <h6>Thông số sản phẩm</h6>
            {
              infor &&
              <table>
                <tbody>
                  <tr>
                    <td>Barcode</td>
                    <td>{infor.barcode}</td>
                  </tr>
                  <tr>
                    <td>Thương Hiệu</td>
                    <td>{infor.brand}</td>
                  </tr>
                  <tr>
                    <td>Nơi sản xuất</td>
                    <td>{infor.country}</td>
                  </tr>
                  <tr>
                    <td>Loại da</td>
                    <td>{infor.skinType}</td>
                  </tr>
                  <tr>
                    <td>Giới tính</td>
                    <td>{infor.sex}</td>
                  </tr>
                  <tr>
                    <td>Đặc Tính</td>
                    <td>{infor.characteristic}</td>
                  </tr>
                </tbody>
              </table>
            }
            <div className='detail_ingredient' id="detail_ingredient">
              <h6>Thành phẩm sản phẩm</h6>
              <p>{detail.Ingredient}</p>
            </div>
            <div className='detail_use' id="detail_use">
              <h6>Hướng dẫn sử dụng</h6>
              <div dangerouslySetInnerHTML={{ __html: detail.use }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
