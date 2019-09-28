import React from 'react'

interface Props { }

const style = {
  height: '6px',
  width: '6px',
  borderRadius: '50%',
  background: 'black',
  marginRight: '3px'
}

export const Dot: React.FC<Props> = () => {
  return <div style={style}></div>
}
