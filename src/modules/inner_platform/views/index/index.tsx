import React, { useState, useEffect } from 'react'

const View = () => {
  const [count, setCount] = useState(20000000000000)

  useEffect(() => {
    setCount(1000)
  }, [])

  return <div>{count}</div>
}

export default View
