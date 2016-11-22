import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class CustomPicker extends React.Component {
 constructor(props){
   super(props)
   this.state = {
     color: props.color
   }
 }
 render() {
  return (
       <div>
         <SketchPicker color={ this.props.color } onChangeComplete={ this.props.onChange } />
      </div>
    )
  }
}

export default CustomPicker

