import React from 'react'

const Container = (props) => (
  <div>
    <div id="header">
      <h1>Draw Together</h1>
    </div>
    {props.children}
  </div>
)

export default Container
