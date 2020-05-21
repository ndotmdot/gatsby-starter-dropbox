import React from "react"
import Img from "gatsby-image"

const Image = ({fixed, fluid}) => {
  const imgFluid = fluid?.localFile?.childImageSharp?.fluid;
  const imgFixed = fixed?.localFile?.childImageSharp?.fixed;

  return <Img fluid={imgFluid} fixed={imgFixed} />
}

export default Image
