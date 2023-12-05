import { memo } from 'react';

function Pagination({ totalPage = 0, onchangePage, currentPage, onchangePrevPage, onchangeNextPage }) {
    const handleChangePage = (page) => {
        onchangePage(page);
        // setCurrentPage(page);
    };
    const handlePage = () => {
        let arrTotalPage = [];
        if (totalPage > 0 && totalPage < 6) {
            for (let i = 1; i <= totalPage; ++i) {
                arrTotalPage.push(i);
            }

            return arrTotalPage?.map((item, i) => (
                <li
                    onClick={() => {
                        handleChangePage(item);
                    }}
                    key={i}
                    // className={Number(item) === Number(currentPage) ? 'pagination-active' : ''}
                    className={`cursor-pointer bg-red-100 p-3 mr-1 rounded-xl text-sm ${Number(item) === Number(currentPage) ? 'bg-red-600' : ''}`}
                >
                    {item}
                </li>
            ));
        }
        if (totalPage > 4 && currentPage <= totalPage) {
            if (currentPage <= 3) {
                for (let i = 2; i < 4; ++i) {
                    arrTotalPage = [...arrTotalPage, i];
                }
            }
            if (currentPage > 3 && currentPage <= totalPage - 3) {
                for (let i = currentPage - 1; i <= currentPage + 1; ++i) {
                    arrTotalPage = [...arrTotalPage, i];
                }
            }
            if (currentPage > totalPage - 3 && totalPage > 5) {
                for (let i = totalPage - 2; i < totalPage; ++i) {
                    arrTotalPage = [...arrTotalPage, i];
                }
            }

            return (
                <>
                    <li
                        onClick={() => {
                            handleChangePage(1);
                        }}
                        className={Number(currentPage) === 1 ? 'pagination-active' : ''}
                    >
                        1
                    </li>
                    {currentPage > 3 && <li>...</li>}

                    {arrTotalPage?.map((item, i) => (
                        <li
                            onClick={() => {
                                handleChangePage(item);
                            }}
                            key={i}
                            className={Number(item) === Number(currentPage) ? 'pagination-active' : ''}
                        >
                            {item}
                        </li>
                    ))}
                    {totalPage > 4 && currentPage < totalPage - 1 && currentPage <= totalPage - 3 && <li>...</li>}
                    <li
                        onClick={() => {
                            handleChangePage(totalPage);
                        }}
                        className={Number(currentPage) === Number(totalPage) ? 'pagination-active' : ''}
                    >
                        {totalPage}
                    </li>
                </>
            );
        }
    };
    const handelPrevPage = () => {
        onchangePrevPage();
    };
    const handelNextPage = () => {
        onchangeNextPage();
    };
    return (
        <div className="pagination">
            <div className="pagination-item">
                <ul className='flex'>
                    {totalPage > 0 && (
                        <li className='cursor-pointer bg-rose-200 p-3 flex items-center mr-5 rounded-xl' disabled={currentPage <= 1} onClick={handelPrevPage}>
                            <i style={{height:14}} className="fi fi-rr-angle-small-left"></i>
                        </li>
                    )}
                    {handlePage()}
                    {totalPage > 0 && (
                        <li className='cursor-pointer bg-rose-200 p-3 flex items-center ml-5 rounded-xl' disabled={Number(currentPage) === Number(totalPage)} onClick={handelNextPage}>
                            <i style={{height:14}} className="fi fi-rr-angle-small-right"></i>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default memo(Pagination);
