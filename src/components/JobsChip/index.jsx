import React from "react";
import style from "./index.module.scss";

const JobsChip = ({ title, url }) => {
  return (
    <div className={style.chipWrapp}>
      <a href={url || "#"}>
        <p>{title || "UKPSC Pre Online Form 2025"}</p>
      </a>
    </div>
  );
};

export default JobsChip;
