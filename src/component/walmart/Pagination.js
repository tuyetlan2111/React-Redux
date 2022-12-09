import { Pagination } from 'react-bootstrap';
const PaginationProduct = ({
  count,
  paginate,
  pagesPerPage,
  currentPage
}) => {

  const pagesCount = Math.ceil(count / pagesPerPage);
  const onPageNumberClick = (i) => {
    paginate(i)
  }
  return (
    <Pagination>
      {[...new Array(pagesCount)].map((_, i) => (
        <Pagination.Item
          key={i}
          active={i + 1 === currentPage}
          onClick={() => onPageNumberClick(i + 1)}
          activeLabel=""
        >
          {i + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  )
}

export default PaginationProduct