import React from "react";
import { Carousel } from "antd";
import './Banner.scss'
const contentStyle:any = {
  height: "650px",
  color: "#fff",
  lineHeight: "650px",
  textAlign: "center",
  background: "#364d79",
};
const Banner = () => (
  <Carousel autoplay className="hhhhhh">
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://cdn.lotteria.vn/media/banner/b/a/banner_banner_web_14_.jpg"
          alt=""
          className="hhhha"
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://cdn.lotteria.vn/media/banner/b/a/banner_banner_web_1_.jpg"
          alt=""
          className="hhhha"
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://cdn.lotteria.vn/media/mageplaza/blog/post/z/a/zalo_oa_b_nh_chi_n-01.jpg"
          alt=""
          className="hhhha"
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://cdn.lotteria.vn/media/banner/b/a/banner-dli-01_2.jpg"
          alt=""
          className="hhhha"
        />
      </h3>
    </div>
  </Carousel>
);
export default Banner;

