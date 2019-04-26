import React from 'react'

const TableGroup = props => {
  const data = props.data
  return (
    <table scrollY maxHeight="20vh" small striped bordered hover data={data} />
  )
}

export default TableGroup
