import React from 'react';
import s from "./Paginator.module.css"

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}
const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}: PaginatorPropsType) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
                {pages.map(t => {
                    return <span className={currentPage === t ? s.selectedPage : ""}
                                 onClick={(e) => onPageChanged(t)}>{t}</span>
                })}
            </div>
}

export default Paginator;