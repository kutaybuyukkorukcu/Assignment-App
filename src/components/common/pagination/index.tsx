import React, { useMemo } from 'react';

interface Pagination {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPageIndex: number;
}

interface Props {
    onPageChange: (pageNumber: number) => any;
    totalCount: number;
    totalPageIndex: number;
    currentPage: number;
    pageSize: number;
}

const calculatePaginationList = (start, end): number[] => {
    let length = end - start + 1;
    return Array.from({ length }, (_, i) => i + start);
}

export const PaginationLogic = (pagination: Pagination) => {
    const paginationRange = useMemo(() => {

        const totalPageCount: number = Math.ceil(pagination.totalCount / pagination.pageSize);

        if (pagination.totalPageIndex >= totalPageCount) {
            return calculatePaginationList(1, totalPageCount);
        }

        const leftClosestPageIndex: number = Math.max(pagination.currentPage - pagination.totalPageIndex, 1);
        const rightClosestPageIndex: number = Math.min(pagination.currentPage + pagination.totalPageIndex, totalPageCount);

        const isLeftMostPageCloseToCurrentPage: boolean = leftClosestPageIndex > 2;
        const isRightMostPageCloseToCurrentPage: boolean = rightClosestPageIndex < totalPageCount - 2;

        const firstPageIndex: number = 1;
        const lastPageIndex: number = totalPageCount;

        if (!isLeftMostPageCloseToCurrentPage && isRightMostPageCloseToCurrentPage) {
            let leftMostPageCount = 2 * pagination.totalPageIndex + 3;
            let leftPageRange = calculatePaginationList(1, leftMostPageCount);

            return [ ...leftPageRange, '..' , lastPageIndex];
        }

        if (isLeftMostPageCloseToCurrentPage && !isRightMostPageCloseToCurrentPage) {
            let rightMostPageCount = 2 * pagination.totalPageIndex + 3;
            let rightPageRange = calculatePaginationList(totalPageCount - rightMostPageCount + 1, totalPageCount);

            return [firstPageIndex, '..', ...rightPageRange]
        }

        if (isLeftMostPageCloseToCurrentPage && isRightMostPageCloseToCurrentPage) {
            let midPageRange = calculatePaginationList(leftClosestPageIndex, rightClosestPageIndex);
        
            return [firstPageIndex, '..', pagination.totalPageIndex, '..', lastPageIndex];
        }

    }, [pagination.totalCount, pagination.pageSize, pagination.totalPageIndex, pagination.currentPage]);

    return paginationRange;
}

export const Pagination: React.FC<Props> = ({onPageChange, totalCount, totalPageIndex, currentPage, pageSize }) => {

    const pagination: Pagination = {
        currentPage,
        totalCount,
        totalPageIndex,
        pageSize
    };

    const paginationRange = PaginationLogic(pagination);

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const nextPage = () => {
        onPageChange(currentPage + 1);
    }

    const previousPage = () => {
        onPageChange(currentPage - 1);
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className="flex list-none">
            <li className="text-center flex box-border items-center checked:bg-blue-300" onClick={previousPage}>
                <div className=""> Previous</div>
            </li>
            {
                paginationRange.map(pageNumber => {
                    if (pageNumber == '..') {
                        return <li className="text-center flex box-border items-center checked:bg-blue-300"> .. </li>
                    }

                    return (
                        <li className="" onClick={() => onPageChange(Number(pageNumber))}>
                            {pageNumber}
                        </li>
                    )
                })
            }
            <li className="text-center flex box-border items-center checked:bg-blue-300" onClick={nextPage}>
                <div className=""> Next </div>
            </li>
        </ul>
    )
}
