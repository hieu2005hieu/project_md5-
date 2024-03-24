import React, { useEffect } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi';
import Heatder from '../../../components/Heatder/Heatder';
import FooterPage from '../../../components/Foodter/FooterPage';
import "./Promotion.scss";
import { useNavigate } from 'react-router-dom';

export default function Promotion4() {
     useEffect(() => {
       window.scrollTo(0, 0);
     }, []);
     const navigate = useNavigate();
     const hanldclicktoup = () => {
       navigate("/Produc");
     };
  return (
    <>
      <Heatder></Heatder>
      <div className="Promtion">
        <img
          src="https://cdn.lotteria.vn/media/mageplaza/blog/post/resize/353x208/1/0/1070x750_mua_3_c_5_1.jpg"
          alt=""
        />
        <h2>CHÀO THÁNG 03 - BAO LA ƯU ĐÃI</h2>
        <p>
         TẾT ĐẾN RỒI - RIA FANS ĐÃ LÊN LỊCH DU XUÂN CHƯA
        </p>
        <p>Cùng Lotteria khám phá Ưu đãi đón năm mới nhé</p>
        <p>Combo Tháng 2 - Vui Tết Việt tiết kiệm lên đến 77.000đ</p>
        <p>- Combo 1: Gà rán + Mì ý (cỡ lớn) + Khoai tây lắc vị hành + Pepsi (M) giá 99.000đ</p>
        <p>- Combo 2: 2 Gà rán + Burger tôm + Bánh chiên nhân kim chi/ nhân xá xíu + Khoai tây lắc vị hành + 2 Pepsi (M) giá 169.000đ - tiết kiệm 55.000đ</p>
        <p>- Combo 3: 2 Gà rán + 1 K-sauce chicken + Burger Bulgogi + Phô mai que + Khoai tây lắc vị hành + Kem Tornado (vị Trà Xanh/Chocolate/Dâu) hoặc Khoai tây chiên (M) + 3 Pepsi (M) giá chỉ 219.000đ - tiết kiệm đến 77.000đ</p>
        <li>Mua kèm những sản phẩm sau với Combo - Ưu đãi đến 50%</li>
        <li>Burger Bulgogi giá chỉ 23.000đ</li>
        <li>Pizza Teriyaki giá chỉ 19.000đ</li>
        <li>Micho Sparkling giá chỉ 12.000đ</li>
        <div className="btn_protionss">
          <button className="byn_promtion" onClick={hanldclicktoup}>
            <BiLeftArrowAlt />
            Mua Ngay
          </button>
        </div>
        <hr />
      </div>
      <FooterPage></FooterPage>
    </>
  );
}
