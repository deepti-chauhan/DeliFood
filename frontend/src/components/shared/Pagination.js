import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div>
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Prev
      </button>
      {range(1, totalPages).map(pageNumber => (
        <button key={pageNumber} onClick={() => onPageChange(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
