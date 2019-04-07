import React, { useState, useEffect } from 'react'
import { Columns } from 'react-bulma-components/full'
import Thumb from './thumb'

const Thumbs = ({ thumbs }) => {
  return (
    <Columns>
      {thumbs.map(thumb => (
        <Thumb key={thumb.postUrl} thumb={thumb} />
      ))}
    </Columns>
  )
}

export default Thumbs
