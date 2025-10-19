import React from "react";
import CustomSlider from "../CustomSlider";
import style from "./index.module.scss";

const JobTypeCard = async () => {

  const NEXT_URL = 'http://localhost:5500';

  const res = await fetch(`${NEXT_URL}/api/section?page=1&limit=10`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch sections");
    return null;
  }

  const data = await res.json();
  const cardList = data?.data?.map((item, index) => ({
    id: index + 1,
    title: item?.display_name,
    imgUrl: `${NEXT_URL}${item?.img_url}`,
    url: `/${item?.url}`,
  })) || [];

  const sliderSetting = {
    slidesToShow: 7,
    infinite: true,
    arrows: false,
  };
  return (
    <div className={style.jobMainWrap}>
        {cardList?.map((item, index) => {
          return (
            <div className={style.jobTypeCardWrap} key={index}>
              <a href={item.url}>
                <div className={style.iconWrap}>
                  <img src={item.imgUrl} alt={item.title} />
                </div>
                <h4>{item.title}</h4>
              </a>
            </div>
          );
        })}
    </div>
  );
};

export default JobTypeCard;
