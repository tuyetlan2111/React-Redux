import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, fetchSearch } from '../../reducers/ProductReducer';
import { fetchListName } from '../../reducers/Listname';
import PaginationProduct from './Pagination';
import Slide from './Slide';

const CategoryList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useLocation().search;

  const { categrories } = useSelector(state => state.categrories);
  const { product } = useSelector(state => state.products);
  const [input, setInput] = useState('')
  const { searchProduct } = useSelector(state => state.products);
  const [dataFilter, setFilter] = useState(product);
  const [pagesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const test = useSelector(state => state);
  console.log('state', test);

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchListName());
    dispatch(fetchSearch(input))
  }, [dispatch, input])


  const inputSearchParams = new URLSearchParams(search).get('search');

  console.log('inputSearchParams', inputSearchParams);

  const filterCategory = (type) => {
    if (type === 'all') {
      setFilter(product)
    }
    else {
      let productFilter = product.filter(cate => cate.type === type);
      setFilter(productFilter)
      navigate(`/product?category=${type}`)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value) {
      setInput(e.target.value)
    }
  }

  const submitSearch = () => {
    if (input.length > 0) {
      const action = fetchSearch(input);
      dispatch(action);
      setFilter(searchProduct)
      // navigate(`/product?search=${input}`);
    }
    else{
      setFilter(dataFilter)
    }
  }

  const indexOfLastProduct = currentPage * pagesPerPage;
  const indexOfFirstProduct = indexOfLastProduct - pagesPerPage;
  const currentProduct = [...dataFilter].slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  // const handleSearch = (e) => {
  //   setInput(e.target.value)
  // }

  // const submitSearch = () => {
  //   console.log('input', input);
  //   if (input !== '') {
  //     const itemSearch = product.filter(item => item.title.toLowerCase().includes(input));
  //     setFilter(itemSearch)
  //     navigate(`/product?search=${input}`)
  //   }
  //   else {
  //     setFilter(product)
  //   }
  // }


  return (
    <React.Fragment>
      <Slide />

      <div className='form-search'>
        <fieldset className="field-container">
          <input type="text" placeholder="Search..." className="field" onChange={handleSearch} />
          <button className='btn btn-submit' type='button' onClick={submitSearch}>Tìm kiếm</button>
          {/* <div className="icons-container">
            <div className="icon-search"></div>
            <div className="icon-close">
              <div className="x-up"></div>
              <div className="x-down"></div>
            </div>
          </div> */}
        </fieldset>
      </div>

      <div className='list-category'>

        <div className='list-category_left'>
          <h2>QUY TRÌNH CHĂM SÓC DA</h2>
          <div className='list-category_name'>
            {categrories && categrories.map(name => (
              <div className='item' key={name.id} onClick={() => filterCategory(name.type)}>
                <a href='#'>{name.name}</a>
              </div>
            ))}
          </div>
        </div>

        <div className='list-category_right'>
          <div className='list-category_right_list'>
            {currentProduct && currentProduct.map(cate => (
              <div className='list-category_right_item' key={cate.id}>
                <a href={`product/${cate.id}`}>
                  <img src={`/${cate.image}`} alt='' />
                  <p className='product-price'>{cate.price} đ</p>
                  <h3 className='product-name'>{cate.title}</h3>
                  <div className='progress'></div>
                </a>
              </div>
            ))}
            {currentProduct && (
              <PaginationProduct
                count={dataFilter.length}
                paginate={paginate}
                pagesPerPage={pagesPerPage}
                currentPage={currentPage}
              />
            )}
          </div>

        </div>

      </div>
    </React.Fragment>
  )
}

export default CategoryList

