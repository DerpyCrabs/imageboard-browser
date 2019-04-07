import React from 'react'

const Pagination = ({ current, total, navigateCallback }) => {
  const PageLink = ({ to, children }) => (
    <div
      className="pagination-link"
      onClick={() => navigateCallback(to.toString())}
    >
      {children}
    </div>
  )
  return (
    <nav className="pagination is-centered">
      <div className="pagination-previous">Previous page</div>
      <div className="pagination-next">Next page</div>
      <ul className="pagination-list">
        <li>
          <PageLink to={1}>1</PageLink>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <PageLink to={current - 1}>{(current - 1).toString()}</PageLink>
        </li>
        <li>
          <PageLink to={current}>{current.toString()}</PageLink>
        </li>
        <li>
          <PageLink to={current + 1}>{(current + 1).toString()}</PageLink>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <PageLink to={total}>{total.toString()}</PageLink>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
