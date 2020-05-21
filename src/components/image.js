import React from "react"
import Img from "gatsby-image"

const Image = ({fixed, fluid, className}) => {
  const imgFluid = fluid?.localFile?.childImageSharp?.fluid;
  const imgFixed = fixed?.localFile?.childImageSharp?.fixed;

  return (
  <Img
    className={className}
    fluid={imgFluid}
    fixed={imgFixed}
    />
  )
}

export default Image
