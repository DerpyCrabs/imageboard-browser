import React from 'react'
import { A } from 'hookrouter'

const Pagination = ({ current, total }) => {
  const PageLink = ({ to, children }) => (
    <A className="pagination-link" href={to.toString()}>
      {children}
    </A>
  )
  return (
    <nav className="pagination is-centered">
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
    </nav>
  )
}

export default Pagination
