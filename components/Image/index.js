import React from "react";
import "./styles.css";

// Get cute pictures from reddit!

export default function Image({ itemData }) {
  const { thumbnailURL, id, altTag } = itemData["itemData"];
  // console.log(thumbnailURL, id, altTag);
  // console.log("ItemData: ", itemData);
  return <img src={thumbnailURL} key={id} alt={altTag} />;
}
