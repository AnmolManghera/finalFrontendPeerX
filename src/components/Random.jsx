import React from 'react'
import { useItems } from '../hooks'

const Random = () => {
  const getItems = useItems();
  const items = getItems?.data;
  return (
    <div>Random</div>
  )
}

export default Random