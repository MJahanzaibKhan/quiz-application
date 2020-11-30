import React from 'react';

export const Button = (props) => {
  return (
    <button className={props?._className} onClick={props?.onClick} style={props.style} disabled={props?.isDisable} >{props?.btnTitle}</button>
  )
}