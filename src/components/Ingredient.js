import React from 'react'

export default function ingredient({name , amount}) {
  return (
      <>
      <span>{name}</span>
      <span>{amount}</span>
      </>
  )
}
