import React from 'react'
import Image from 'next/image'

const thanks = () => {
  return (
    <>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "10rem" }}>
            <h1>Gracias por completar el formulario!!! </h1>
        </div>   
        <div style={{ display: "flex", justifyContent: "center" }}><Image
            src="/Circle-Check.png"
            alt="Circle-Check"
            width="197"
            height="255"
            />
        </div>
    </>
  )
}

export default thanks