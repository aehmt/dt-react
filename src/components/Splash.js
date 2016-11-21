import React from 'react'
import { Link } from 'react-router'

const Splash = () => (
<div id="enter">
  Make art, not war <br />
  <Link to={'/rooms'}>Click to enter </Link>
</div>
)

export default Splash
