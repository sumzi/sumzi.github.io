import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import CategoryItem from "./CategoryItem"

const CategoryList = ({ category, setCategory }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
        totalCount
      }
    }
  `)
  const { group: cateList } = data.allMarkdownRemark
  return (
    <div>
      <ul>
        <CategoryItem
          category={category}
          setCategory={setCategory}
          item={{
            fieldValue: "All",
            totalCount: data.allMarkdownRemark.totalCount,
          }}
        />
        {cateList.map(cateItem => {
          const { fieldValue } = cateItem
          return (
            <CategoryItem
              category={category}
              setCategory={setCategory}
              key={fieldValue}
              item={cateItem}
            />
          )
        })}
      </ul>
    </div>
  )
}
export default CategoryList
