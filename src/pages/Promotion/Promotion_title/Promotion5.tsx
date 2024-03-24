import React, { useEffect } from 'react'
import Heatder from '../../../components/Heatder/Heatder';
import FooterPage from '../../../components/Foodter/FooterPage';
import { BiLeftArrowAlt } from 'react-icons/bi';
import "./Promotion.scss";
import { useNavigate } from 'react-router-dom';

export default function Promotion5() {
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
          src="https://cdn.lotteria.vn/media/mageplaza/blog/post/z/a/zalo_oa_b_nh_chi_n-01.jpg"
          alt=""
        />
        <h2>BÁNH "NÓNG" CHO MÙA ĐÔNG</h2>
        <h3>
          Lấy cảm hứng từ Bánh mì Pháp, kết hợp cùng những nguyên liệu đậm chất Châu Á,
        </h3>
        <p>
          Nhà Gà mời bạn đến với chuyến giao thoa ẩm thực đầy thú vị khi thưởng thức
        </p>
        <p>Bánh chiên - "K-Croquette” với 2 sự lựa chọn:</p>
        <p>- Bánh Chiên Nhân Kim Chi với thịt heo cùng Kim chi cải thảo, hai vị chua-cay hoà quyện, đậm đà khó cưỡng</p>
        <p>- Bánh Chiên Nhân Xá xíu với thịt xá xíu đủ vị mặn-ngọt-nồng cùng nấm đông cô dai ngon, ăn rồi chỉ muốn ăn thêm…</p>
        <p>Giá dùng thử chỉ 39.000đ/cái</p>
        <h3>
          Combo tiết kiệm: 1 Bánh chiên (Nhân Kim Chi/Xá Xíu) + Milkis/Micho Sparkling giá chỉ 55.000đ - lựa chọn hoàn hảo để bắt đầu một ngày mới
        </h3>
        <h4>Bánh Chiên - "K-Croquette" đã lên kệ tại Lotteria từ hôm nay 15/12/2023, cùng đến thưởng thức nhé các bạn ơi!</h4>
      
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
