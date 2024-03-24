import React, { Component } from "react";

import "../Banner/Banner_product.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default class AutoPlayMethods extends Component {

  render() {
const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };
    return (
      <div style={{ overflow: "hidden", width: "80%", margin: "0 auto" }}>
        <div className='slider_home'>
            <Slider {...settings}>
              <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/m/e/menu_99k.jpg"
                alt=""
              />
            </div>
            <div className="title">
              <h2>Combo 99k</h2> <hr />
              <h4>03 Gà rán </h4>
              <h4>01 Burger Bulgogi</h4>
            </div>
          </Link>
          <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/m/e/menu_99k_burger.jpg"
                alt=""
              />
            </div>
            <div className="title">
              <h2>Combo 99k berger</h2> <hr />
              <h4>01 Gà rán </h4>
              <h4> 01 Mì ý (cỡ vừa)</h4>
            </div>
          </Link>
          <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/m/e/menu_169k_xa_xiu.jpg"
                alt=""
              />
            </div>
            <div className="title">
              <h2>CB 169K XÁ XÍU</h2>
              <hr />
              <h4>02 Gà rán </h4>
              <h4>01 Burger tôm </h4>
            </div>
          </Link>
          <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/m/e/menu_169k_xa_xiu_burger.jpg"
                alt=""
              />
            </div>
            <div className="title">
              <h2>CB 169K XÁ XÍU + Burger</h2> <hr />
              <h4>02 Gà rán</h4>
              <h4>01 Burger tôm</h4>
            </div>
          </Link>
          <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/m/e/menu_219k.jpg"
                alt=""
              />
            </div>
            <div className="title">
              <h2>CB 219K</h2> <hr />
              <h4>02 Gà rán </h4>
              <h4>01 K-sauce chicken </h4>
            </div>
          </Link>
          <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/p/i/pizza-01.png"
                alt=""
              />
            </div>
            <div className="title">
              <h2>Pizza Chicken Teriyaki</h2>
              <hr />
              <h4>02 Gà rán (mua them)</h4>
              <h4>01 K-sauce chicken(mua them)</h4>
            </div>
          </Link>
                </Slider>
            </div>
      </div>
    );
  }
}
