import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import Heatder from "../../../components/Heatder/Heatder";
import FooterPage from "../../../components/Foodter/FooterPage";
import { useEffect } from "react";
import "./Promotion.scss";
import { useNavigate } from "react-router-dom";

export default function Promotion3() {
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
          src="https://cdn.lotteria.vn/media/mageplaza/blog/post/b/a/banner_popup_app_1_.png"
          alt=""
        />
        <h2>TẢI APP LIỀN TAY NHẬN NGAY GÀ RÁN </h2>
        <h4>KHI BẠN ĐẶT ĐƠN ĐẦU TIÊN TẠI APP LOTTERIA, CHÚNG MÌNH DÀNH TẶNG BẠN 1 MIẾNG GÀ RÁN </h4>
        <p>Chỉ cần tải app bạn sẽ nhận được ưu đãi khủng và đừng quên gửi đánh giá 5 sao cho trải nghiệm App của mình nhé.</p>
        <p>
         Điều kiện áp dụng:
        </p>
        <li>Chương trình áp dụng từ ngày 01/1 đến hết 29/02/2024</li>
        <li>Chương trình áp dụng duy nhất cho đơn đầu tiên</li>
        <li>   Chỉ áp dụng đặt hàng qua App Lotteria</li>
      
        <h3> Chương trình áp dụng tại 1 số cửa hàng. Bạn có thể xem danh sách cửa hàng áp dụng "ƯU ĐÃI" tặng gà rán tại khu vực tìm kiếm cửa hàng bên dưới nhé

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
