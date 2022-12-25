import React from 'react'

const Pagination = ({campaignPerPage, totalPosts, paginate}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / campaignPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
        <div className='d-flex justify-content-center align-items-center mt-4'>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pageNumbers.map((number) => (
                        <li className="page-item">
                            <a onClick={() => paginate(number)} className="page-link" href="#">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination