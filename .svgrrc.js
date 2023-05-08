module.exports = {
  typescript: true,
  removeViewBox: false,
  // jsxRuntime: "automatic",
  replaceAttrValues: {
    "#222": "{props.color || '#222'}",
  },
  svgProps: {
    width: "{props.width || 24}",
    height: "{props.height || 24}"
  }
}