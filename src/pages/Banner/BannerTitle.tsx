import React from 'react'
import '../Banner/BannerTitle.scss'
import { Link } from 'react-router-dom';
export default function BannerTitle() {
  return (
    <>
      <div className="containertitle">
        <Link to="/Promotion1" className="title">
          <img
            src="https://cdn.lotteria.vn/media/mageplaza/blog/post/resize/353x208/c/o/combo_11_1.jpg"
            alt=""
          />
          <h4 className="dete">Ưu đãi cuối tuần trên Shopee Food</h4>
          <div className="dete">13/03/2024</div>
          <hr />
          <div className="click_title">
            <p>XEM THÊM</p>
          </div>
        </Link>
        <Link to="/Promotion2" className="title">
          <img
            src="https://cdn.lotteria.vn/media/mageplaza/blog/post/resize/353x208/n/s/nsp_chao_thang_cua_nang-01_2_.jpg"
            alt=""
          />
          <h4 className="dete">CHÀO THÁNG CỦA "NÀNG"</h4>
          <div className="dete">01/03/2024</div>
          <hr />
          <div className="click_title">
            <p>XEM THÊM</p>
          </div>
        </Link>
        <Link to="/Promotion3" className="title">
          <img
            src="https://cdn.lotteria.vn/media/mageplaza/blog/post/resize/353x208/b/a/banner_popup-_1070x750-05_1_.jpg"
            alt=""
          />
          <h4 className="dete">TẢI APP LIỀN TAY NHẬN NGAY GÀ RÁN</h4>
          <div className="dete">01/01/2024</div>
          <hr />
          <div className="click_title">
            <p>XEM THÊM</p>
          </div>
        </Link>
        <Link to="/Promotion4" className="title">
          <img
            src="https://cdn.lotteria.vn/media/mageplaza/blog/post/resize/353x208/1/0/1070x750_mua_3_c_5_1.jpg"
            alt=""
          />
          <h4 className="dete">CHÀO THÁNG 03 - BAO LA ƯU ĐÃI</h4>
          <div className="dete">24/02/2024</div>
          <hr />
          <div className="click_title">
            <p>XEM THÊM</p>
          </div>
        </Link>
      </div>
    </>
  );
}
