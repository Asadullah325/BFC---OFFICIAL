import React from 'react'

const InputContainer = ({label , children}) => {
  return (
    <>
        <div className="flex flex-col gap-2">
            <label htmlFor={label} className='font-semibold text-amber-800'>{label} :</label>
            <div>{children}</div>
        </div>
    </>
  )
}

export default InputContainer