import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface ImageProps {
  company_name: string;
}

const Image = ({ company_name }: ImageProps) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    let ticker = company_name.replace("&", "%26");
    let url = `http://localhost:8000/core/plot?ticker_code=${ticker}`;
    console.log("Requesting url", url);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      })
      .catch((error) => console.error("Error fetching image:", error));
  }, []);

  return (
    <div>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Plot not found"
          width="100%"
          height="100%"
          className="img-rounded"
        />
      )}
    </div>
  );
};

export default Image;
