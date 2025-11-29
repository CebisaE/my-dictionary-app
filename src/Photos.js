import React from "react";
import "./Photos.css";

export default function Photos(props) {
  if (props.photos) {
    return (
      <section className="Photos">
        <div className="photos-grid">
          {props.photos.map((photo, index) => {
            return (
              <a
                href={photo.src.original}
                target="_blank"
                rel="noreferrer"
                key={index}
              >
                <img
                  src={photo.src.landscape}
                  className="photo-img"
                  alt={photo.src.photographer}
                />
              </a>
            );
          })}
        </div>
      </section>
    );
  } else {
    return null;
  }
}


