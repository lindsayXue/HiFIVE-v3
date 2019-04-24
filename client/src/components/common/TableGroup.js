import React from 'react'
import { MDBDataTable } from 'mdbreact'

const TableGroup = props => {
  const data = props.data
  return (
    <MDBDataTable
      scrollY
      maxHeight="20vh"
      small
      striped
      bordered
      hover
      data={data}
    />
  )
}

export default TableGroup
