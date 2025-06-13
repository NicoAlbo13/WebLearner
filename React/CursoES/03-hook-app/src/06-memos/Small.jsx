import React from 'react'

export const SmallMine = React.memo(({value})=> {

    console.log('Re-run :(');
    

  return (
    <>
    <small>{value}</small>
    </>
  )
})
