import { BiLeftArrowAlt } from "react-icons/bi"; 
import React, { useEffect } from "react";
import Heatder from "../../../components/Heatder/Heatder";
import FooterPage from "../../../components/Foodter/FooterPage";
import "./Promotion.scss"
import { useNavigate } from "react-router-dom";
export default function Promotion1() {
     useEffect(() => {
       window.scrollTo(0, 0);
     }, []);
    const navigate = useNavigate();
    const hanldclicktoup=() => {
          navigate("/Produc");
    }
  return (
      <>
          <Heatder></Heatder>
          <div className="Promtion">
              <div >
                  <img
          src="https://cdn.lotteria.vn/media/mageplaza/blog/post/c/o/combo_11.jpg"
          alt=""
        />
              </div>
        
        <h2>ƯU ĐÃI CUỐI TUẦN TRÊN SHOPEE FOOD</h2>
        <p>
          Lotteria khao lớn trên ShopeeFood  TẶNG 2 gà rán MIỄN PHÍ khi mua combo
        </p>
        <p>
         Combo Happy Weekend: 02 Gà sốt HS + Khoai tây lắc + 02 Pepsi (M) giá 149.000đ nhận 2 gà rán miễn phí. Yeah Yeah Yeah
        </p>
        <p>
          ** Chỉ áp dụng thứ Bảy, Chủ Nhật từ ngày 01.03 đến 31.03.2024 tại Shopee Food
        </p>
        <p>
         ** Bạn nhấn vào link để đặt hàng nhé. Chúc bạn cuối tuần vui vẻ
        </p>
        <p>
          Link: https://shopeefoodvn.onelink.me/fKtZ/LotteriaBD
        </p>
              <div className="btn_protionss">
                  <button className="byn_promtion" onClick={hanldclicktoup}><BiLeftArrowAlt />Mua Ngay</button>
        </div>
        <hr />
          </div>
          <FooterPage></FooterPage>
    </>
  );
}
