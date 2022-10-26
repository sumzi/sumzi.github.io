import * as React from "react"

const CategoryItem = ({ category, setCategory, item }) => {
  const { fieldValue } = item
  return (
    <div
      onClick={() => setCategory(fieldValue)}
      className={`category-button ${category === fieldValue ? "selected" : ""}`}
    >
      {fieldValue}
    </div>
  )
}
export default CategoryItem
