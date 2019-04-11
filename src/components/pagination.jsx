import React from 'react'
import { navigate } from 'hookrouter'
import { Pagination } from 'bulma-styled-components'

const PaginationExp = React.memo(({ current, total }) => {
  const linkOnClick = e => {
    e.preventDefault()
    navigate(e.currentTarget.href)
  }
  const PageLink = ({ to, children }) => (
    <Pagination.Link href={to.toString()} onClick={linkOnClick}>
      {children}
    </Pagination.Link>
  )
  return (
    <Pagination className="is-centered">
      <Pagination.Previous
        disabled={current === 1}
        href={(current - 1).toString()}
        onClick={linkOnClick}
      >
        Previous page
      </Pagination.Previous>
      <Pagination.Next
        disabled={current === total}
        href={(current + 1).toString()}
        onClick={linkOnClick}
      >
        Next page
      </Pagination.Next>
      <Pagination.List>
        <li>
          <PageLink to={1}>First</PageLink>
        </li>
        <li>
          <Pagination.Ellipsis>&hellip;</Pagination.Ellipsis>
        </li>
        <li>
          <PageLink to={current}>
            {current.toString()} of {total}
          </PageLink>
        </li>
        <li>
          <Pagination.Ellipsis>&hellip;</Pagination.Ellipsis>
        </li>
        <li>
          <PageLink to={total}>Last</PageLink>
        </li>
      </Pagination.List>
    </Pagination>
  )
})

export default PaginationExp
