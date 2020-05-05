import React, { useState, useEffect } from "react";
import "./styles.css";

// Get cute pictures from reddit!

export default function Button({ direction, getNextPhoto }) {
  return (
    <button className={direction} onClick={getNextPhoto}>
      {direction}
    </button>
  );
}
