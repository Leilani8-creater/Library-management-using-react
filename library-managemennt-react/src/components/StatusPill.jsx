// small coloured label that shows the stock level
function StatusPill({ quantity }) {
  // default is in stock
  let label = "In Stock"
  let color = "green"

  if (quantity === 0) {
    label = "Out of Stock"
    color = "red"
  } else if (quantity < 2) {
    label = "Low Stock"
    color = "orange"
  }

  return <span className={"pill " + color}>{label}</span>
}

export default StatusPill