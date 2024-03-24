import React, { useEffect } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi';
import Heatder from '../../../components/Heatder/Heatder';
import FooterPage from '../../../components/Foodter/FooterPage';
import "./Promotion.scss";
import { useNavigate } from 'react-router-dom';

export default function Promotion2() {
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
          src="https://cdn.lotteria.vn/media/mageplaza/blog/post/n/s/nsp_chao_thang_cua_nang-02.jpg"
          alt=""
        />
        <h2>CHÀO THÁNG CỦA "NÀNG" </h2>
        <p>Cùng điểm qua loạt ưu đãi mà dành tặng các Fans trong tháng 3 này - Ưu đãi lên đến 25%</p>
        <p>
         Combo 143.000đ: 2 Gà rán + Burger Bulgogi + Bánh chiên nhân kim chi/ nhân xá xíu + 2 Pepsi (M) - tiết kiệm 45.000đ
        </p>
        <p>
          Combo 193.000đ: 2 Gà rán + 1 K-sauce chicken + Burger tôm + Khoai tây lắc vị hành + 3 Pepsi (M) - tiết kiệm đến 50.000đ
        </p>
        <p>
         Combo 83.000đ: Gà rán + Mì ý (cỡ vừa) + Khoai tây chiên (M) + Pepsi (M)
        </p>
        <p>
         Ưu đãi nhân đôi - Giảm thêm 50% khi mua kèm Gà rán, Khoai tây chiên, Mỳ Ý kèm các combo trên. (*)
        </p>
        <p>(*)Áp dụng 1 sản phẩm ưu đãi kèm 1 combo, chương trình diễn ra từ 01/03 đến 31/03/2024 tại các cửa hàng Lotteira tren toàn quốc.</p>
        
        <h3>
          Lưu ý: <br />
Không chỉ là combo ưu đãi, tháng 3 này Lotteira đặc biệt chuẩn bị cho các RIA Fans những món quà siêu bất ngờ và không kém phần lung linh, cùng chờ đón những niềm vui sắp tới trong tháng này nha!
        </h3>
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
