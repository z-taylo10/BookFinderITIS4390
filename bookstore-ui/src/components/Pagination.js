import React from 'react';
import { useTranslation } from 'react-i18next';
import '../stylesheets/Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const { t } = useTranslation();

  return (
    <div className="pagination">
      <img src="/left.png" alt="Left Arrow" onClick={() => onPageChange(currentPage - 1)} />
      <button className="page-link" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        {t('page')} 1
      </button>
      <div className="page-circles">
        {[...Array(totalPages).keys()].map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page + 1)}
            className={page + 1 === currentPage ? 'active' : ''}
          />
        ))}
      </div>
      <button className="page-link" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        {t('lastPage')}
      </button>
      <img src="/right.png" alt="Right Arrow" onClick={() => onPageChange(currentPage + 1)} />
    </div>
  );
}

export default Pagination;

