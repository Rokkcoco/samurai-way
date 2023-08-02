import React, {useState} from 'react';
import s from "./Paginator.module.css"
import cn from "classnames";

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}
const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged ,portionSize = 10}: PaginatorPropsType) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = pagesCount / portionSize
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return <div className={s.paginator}>
        {portionNumber > 1 && <button onClick={()=> setPortionNumber(portionNumber-1)}>PREV</button>}
                {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(t => {
                    return <span key={t} className={cn({[s.selectedPage]: currentPage === t}, s.pageNumber)}
                                 onClick={(e) => onPageChanged(t)}>{t}</span>
                })}
        {portionCount > portionNumber && <button onClick={()=> setPortionNumber(portionNumber+1)}>NEXT</button>}
            </div>
}

export default Paginator;