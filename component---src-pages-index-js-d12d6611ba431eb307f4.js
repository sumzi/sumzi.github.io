"use strict";(self.webpackChunksumzi_github_io=self.webpackChunksumzi_github_io||[]).push([[678],{5939:function(e,t,l){l.r(t),l.d(t,{Head:function(){return m},default:function(){return s}});var n=l(7294),r=l(1082),a=l(8771),o=l(8678),i=l(9357),c=function(e){var t=e.category,l=e.setCategory,r=e.item.fieldValue;return n.createElement("div",{onClick:function(){return l(r)},className:"category-button "+(t===r?"selected":"")},r)},u=function(e){var t=e.category,l=e.setCategory,a=(0,r.useStaticQuery)("3613163384"),o=a.allMarkdownRemark.group;return n.createElement("div",null,n.createElement("ul",null,n.createElement(c,{category:t,setCategory:l,item:{fieldValue:"All",totalCount:a.allMarkdownRemark.totalCount}}),o.map((function(e){var r=e.fieldValue;return n.createElement(c,{category:t,setCategory:l,key:r,item:e})}))))},s=function(e){var t,l=e.data,i=e.location,c=n.useState("All"),s=c[0],m=c[1],d=(null===(t=l.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",f=l.allMarkdownRemark.nodes;return 0===f.length?n.createElement(o.Z,{location:i,title:d},n.createElement(a.Z,null),n.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):("All"!==s&&(f=f.filter((function(e){return e.frontmatter.category===s}))),n.createElement(o.Z,{location:i,title:d},n.createElement(a.Z,null),n.createElement(u,{category:s,setCategory:m}),n.createElement("ol",{style:{listStyle:"none"}},f.map((function(e){var t=e.frontmatter.title||e.fields.slug;return n.createElement("li",{key:e.fields.slug},n.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},n.createElement("header",null,n.createElement("h2",null,n.createElement(r.Link,{to:e.fields.slug,itemProp:"url"},n.createElement("span",{itemProp:"headline"},t))),n.createElement("small",null,e.frontmatter.date))))})))))},m=function(){return n.createElement(i.Z,{title:"All posts "})}}}]);
//# sourceMappingURL=component---src-pages-index-js-d12d6611ba431eb307f4.js.map