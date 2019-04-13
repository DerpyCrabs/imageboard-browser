import React from 'react'
import { A } from 'hookrouter'

const Pagination = React.memo(({ current, total }) => {
  const PageLink = ({ to, children }) => (
    <A href={to.toString()} className="pagination-link">
      {children}
    </A>
  )
  return (
    <div className="pagination is-centered">
      <A
        className="pagination-previous"
        disabled={current === 1}
        href={(current - 1).toString()}
      >
        Previous page
      </A>
      <A
        className="pagination-next"
        disabled={current === total}
        href={(current + 1).toString()}
      >
        Next page
      </A>
      <ul className="pagination-list">
        <li>
          <PageLink to={1}>First</PageLink>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <PageLink to={current}>
            {current.toString()} of {total}
          </PageLink>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <PageLink to={total}>Last</PageLink>
        </li>
      </ul>
    </div>
  )
})

export default Pagination
