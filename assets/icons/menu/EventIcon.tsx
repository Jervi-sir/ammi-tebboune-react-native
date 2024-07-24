import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const EventIcon = ({ isActive = false }) => {
  return (
    <Svg
      width={42}
      height={42}
      viewBox="0 0 42 42"
    >
      <Path
        d="M27.615 10.194v1H29.967a1.71 1.71 0 011.702 1.703v18.917a1.71 1.71 0 01-1.702 1.703H11.049a1.702 1.702 0 01-1.702-1.703s0 0 0 0l.013-18.916v-.001a1.69 1.69 0 011.69-1.703h2.35V8.492h.703v2.702h12.81V8.492h.702v1.702zm2.352 22.62h1V17.302H10.049v15.512h19.918zM14.752 22.707v-.703h.702v.703h-.702zm6.107 0h-.702v-.703h.702v.703zm5.405 0h-.702v-.703h.702v.703zm-11.512 5.405v-.703h.702v.703h-.702zm6.107 0h-.702v-.703h.702v.703zm5.405 0h-.702v-.703h.702v.703z"
        stroke="#000"
        strokeWidth={2}
        fill={isActive ? "#000" : "transparent"}
      />
    </Svg>
  )
}
