import React, { useState, useEffect } from "react";
import Button from "../../Button";
import Image from "../../Image";
import ErrorBoundary from "../../ErrorBoundary";
import "./styles.css";

// Get cute pictures from reddit!
const POSTS_URL = "https://www.reddit.com/r/dogswithjobs/.json?limit=10";

export default function Carousel() {
  const [data, setData] = useState(null);
  const [thumbnailsArr, setThumbnailsArr] = useState([]);
  const [count, setCount] = useState(0);
  const [currentItem, setCurrentItem] = useState({
    itemData: {
      thumbnailURL: null,
      altTag: null,
      id: null
    }
  });

  const getThumbnails = input => {
    const arrayOfObjects = input.data.children;
    // console.log(arrayOfObjects)
    setThumbnailsArr(
      arrayOfObjects
        .filter(
          item =>
            item.data.thumbnail !== undefined && item.data.thumbnail.length > 10
        )
        .map((item, index) => {
          return {
            itemData: {
              thumbnailURL: item.data.thumbnail,
              altTag: item.data.link_flair_text,
              id: item.data.author_fullname
            }
          };
        })
    );
    setCurrentItem(thumbnailsArr[0]);
    // console.log(thumbnailsArr[0]);
    // console.log(thumbnailsArr);
  };

  async function getData() {
    await fetch(POSTS_URL)
      .then(data => data.json())
      .then(async response => {
        await setData(response);
        await getThumbnails(response);
        // console.log(currentItem);
      });
  }

  const getNextPhoto = e => {
    // console.log(e.target.tagName.toLowerCase() === "button");
    // if (e.target.type)
    if (e.target.tagName.toLowerCase() === "button") {
      // let itemCount = count;
      console.log("Before function: ", count);

      if (e.target.classList.contains("left")) {
        if (count === 0) {
          setCount(thumbnailsArr.length - 1);
          console.log("ItemCount: ", count);
        } else {
          setCount(count - 1);
        }
        console.log("Hit Left button");
      } else if (e.target.classList.contains("right")) {
        if (count === thumbnailsArr.length - 1) {
          setCount(0);
          console.log("ItemCount: ", count);
        } else {
          setCount(count + 1);
        }
        console.log("Hit Right button");
      }
      setCurrentItem(thumbnailsArr[count]);
      console.log("After function: ", count);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ErrorBoundary>
      <h1>Pearson Coding Challenge</h1>
      <h2>Can you build an image slide show for us?</h2>
      <Button direction="left" getNextPhoto={getNextPhoto} />
      {currentItem && <Image itemData={currentItem} />}
      {/* <img src={currentItem.thumbnailURL} alt={currentItem.altTag} /> */}
      <Button direction="right" getNextPhoto={getNextPhoto} />
    </ErrorBoundary>
  );
}
