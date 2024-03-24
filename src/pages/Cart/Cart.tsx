import { AiFillDelete } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Heatder from "../../components/Heatder/Heatder";
import "../Cart/Cart.scss";
import FooterPage from "../../components/Foodter/FooterPage";
import { Link, useNavigate } from "react-router-dom";
import { errorNoti, successNoti } from "../../utils/notifycation";
import apiProduct from "../../service/api.product";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveCart } from "../../store/redux-toolkit/cartSlice";
import { message } from "antd";
import publicAxios from "../../components/Heatder/config/publicAxios";
import { getCart } from "../../store/redux-toolkit/cart";
interface Cart {
  idCart: number;
  idUser: number;
  ProductsID: number;
  quantity: number;
}
export default function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("username") || "{}");
  const [dataCity, setDataCity]: any = useState([]);
  const [dataDistrict, setDataDistrict]: any = useState([]);
  const [dataWard, setDataWard]: any = useState([]);
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [cart, setCart] = useState<Cart[]>([]);
  const [phone, setPhone] = useState<string>("");

  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();
  const handleOrderCart = async () => {
    let address = city + "," + district + "," + ward;
    if (cart.length == 0) {
      errorNoti("Chưa Có Sản Phẩm Để Thanh Toán");
      return;
    }
    if (city == "" || district == "" || ward == "") {
      errorNoti("Địa Chỉ Không Được Để Trống");
      return;
    }
    const regexPhone = /^(0|\+84)\d{9,10}$/;
    if (phone == "") {
      errorNoti("Số Điện Thoại Không Được Để Trống");
      return;
    }

    if (!regexPhone.test(phone)) {
      errorNoti("Số Điện Thoại Phải Có 10 Số,Đầu 09 ");
      return;
    }

    const orders = {
      userID: currentUser.idUser,
      user_name: currentUser.username,
      address,
      phone,

      // // orderDetails: cart,
      status: "Đang Chờ",
      total,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/bill/createOrder",
        orders
      );

      await Promise.all(
        cart.map(async (item: any) => {
          const datadetail = {
            order_id: response.data.idBill,
            productsId: item.productsId,
            quantity: item.quantity,
          };

          await axios.post(
            "http://localhost:3000/api/v1/bill-details/createBillDetails",
            datadetail
          );
        })
      );
      await axios.delete(
        `http://localhost:3000/api/v1/cart/all/${currentUser.idUser}`
      );
      setCart([]);
      successNoti("Đã Thanh Toán");
      dispatch(getCart(currentUser?.idUser));
      navigate(`/titleoder/${currentUser.idUser}`);
    } catch (error) {
      console.log(error);
    }
  };

  // let newOrder = {
  //   user_id: currentUser.id,
  //   user_name: currentUser.name,
  //   address,
  //   phone,
  //   orderDetails: cart,
  //   status: "Wait",
  //   total,
  // };
  // apiProduct.updateStocks(cart);
  // await axios.post("http://localhost:8000/bills", newOrder);
  // setCart([]);
  // //dua cart tren local ve rong
  // let getCart = JSON.parse(localStorage.getItem("userLogin"));
  // getCart.cart = [];
  // localStorage.setItem("userLogin", JSON.stringify(getCart));
  // dispatch(saveCart([]));
  // successNoti("Thanh Toán Thành Công");
  // navigate(`/titleoder/${currentUser.id}`);
  // };
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const Btn_addtoCartspolist = () => {
    navigate("/Produc");
  };

  const renderCart = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/cart/getCartByUserId/${currentUser?.idUser}`
    );

    setCart(response.data);
  };
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    renderCart();
  }, [flag]);
  const handleTotalCart = () => {
    let result = cart?.reduce((acc: number, item: any) => {
      return acc + item.productsId.price * item.quantity;
    }, 0);
    setTotal(result);
  };
  const handleProvinces = async () => {
    let data = await axios.get(` https://vapi.vnappmob.com/api/province/`);
    setDataCity(data.data.results);
  };
  const handleCity = async (e: any) => {
    let idCity = e.target.value;
    const nameCity = dataCity.find((item: any) => item.province_name == idCity);
    const cityname = +nameCity.province_id;
    console.log(cityname);

    let data = await axios.get(
      ` https://vapi.vnappmob.com/api/province/district/${cityname}`
    );
    setCity(nameCity.province_name);

    setDataDistrict(data.data.results);
  };
  const handleDistrict = async (e: any) => {
    let idDistrict = e.target.value;
    const nameDistrict = dataDistrict.find(
      (item: any) => item.district_name == idDistrict
    );
    const districtName = +nameDistrict.district_id;
    let data = await axios.get(
      `https://vapi.vnappmob.com/api/province/ward/${districtName}`
    );
    setDistrict(nameDistrict.district_name);

    setDataWard(data.data.results);
  };

  //xoa

  const handlDelete = async (id: number) => {
    const confimr = confirm("bạn có muốn xóa không");
    if (confimr) {
      const result = await axios.delete(
        `http://localhost:3000/api/v1/cart/deleteProducts/${id}`
      );
      dispatch(getCart(currentUser?.idUser));

      renderCart();
    }
  };

  // giam sl
  const handleDecre = async (item: any) => {
    try {
      if (item.quantity <= 1) {
        handlDelete(item.idCart);
        dispatch(getCart(currentUser?.idUser));
      } else {
        await publicAxios.put(`/api/v1/cart/updateQuantitygiam`, item);
        setFlag(!flag);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleIncre = async (item: any) => {
    try {
      if (item.quantity >= item.productsId.stock) {
        errorNoti("Không Đủ Số Lượng Trong Kho");
        return;
      }

      await publicAxios.put(`/api/v1/cart/updateQuantityTang`, item);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  // const handlePlus = async (index) => {
  //   const response = await axios.put(
  //     `http://localhost:8888/api/v1/cartMinus/${index}}`
  //   );

  //   if (response.data[index].quantity > response.data[index].stock) {
  //     errorNoti("Không Đủ Số Lượng Trong Kho");
  //     return;
  //   }
  //   setCart([...response.data]);
  // };
  const numberCart: any = 0;
  useEffect(() => {
    // localStorage.setItem("username", JSON.stringify({ ...currentUser, cart }));
    handleTotalCart();
  }, [cart]);
  useEffect(() => {
    handleProvinces();
    handleCity(dataCity);
    handleDistrict(dataDistrict);
  }, [dataDistrict, dataWard]);
  return (
    <>
      <Heatder></Heatder>
      <div className="Cart_producsts">
        <hr />
        <h2>GIỎ HÀNG</h2>
        <hr />
      </div>
      <main className="mani_Cart">
        <div id="Contact_Cart">
          <table className="table_Cart">
            <thead className="theat_Cart">
              <tr>
                <th>Hình Ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Tổng Cộng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="table_body_addtoCart">
              {!cart?.length == numberCart ? (
                <>
                  {cart?.map((item: any) => (
                    <tr>
                      <td>
                        <img src={item.productsId.imgs} alt="" />
                      </td>
                      <td>
                        <p>{item.productsId.nameProducts}</p>
                      </td>
                      <td>
                        <p>{VND.format(item.productsId.price)}</p>
                      </td>
                      <td>
                        <div className="div_btn_toCart">
                          <button onClick={() => handleDecre(item)}>-</button>
                          <p>{item.quantity}</p>
                          <button onClick={() => handleIncre(item)}>+</button>
                        </div>
                      </td>
                      <td>
                        <p>
                          {VND.format(item.quantity * item.productsId.price)}
                        </p>
                      </td>
                      <td>
                        <button
                          className="btn_AddtoCartlitsto"
                          onClick={() => handlDelete(item.idCart)}
                        >
                          <AiFillDelete style={{ fontSize: 20 }} />
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <div className="divcarts">
                  <h2 className="h2Carts">
                    Chưa có sản phẩm nào trong giỏ hàng...!!!
                  </h2>
                  <img
                    style={{ width: 200, height: 120 }}
                    src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
                    alt=""
                  />
                </div>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <Link to="/Produc">
                    <button
                      className="Btn_addtoCartspolist"
                      onClick={Btn_addtoCartspolist}
                    >
                      <AiOutlineArrowLeft />
                      Tiếp Tục xem sản phẩm
                      <AiOutlineArrowRight />
                    </button>
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="the_payable_amount">
            <h2 className="h2Cart">Tổng Thanh Toán</h2>
            <div className="payable_amount">
              <div className="total_Address_Phone">
                <p>Tổng Cộng: {VND.format(total)}</p>
                <p id="total_price_1" />
              </div>
              <div className="total_Address_Phone">
                <p>Địa chỉ:</p>
                <div>
                  <div className="address_Cart">
                    <select onChange={handleCity} id="city_Cart">
                      <option>Chọn tỉnh thành</option>
                      {dataCity.map((item: any, index: any) => (
                        <option value={item.code} key={index}>
                          {item.province_name}
                        </option>
                      ))}
                    </select>
                    <select onChange={handleDistrict} id="district_Cart">
                      <option value="" defaultValue="">
                        Chọn quận huyện
                      </option>
                      {dataDistrict.map((item: any, index: any) => (
                        <option key={index} value={item.code}>
                          {item.district_name}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={(e) => setWard(e.target.value)}
                      id="ward_Cart"
                    >
                      <option>Chọn phường xã</option>
                      {dataWard.map((item: any, index: any) => (
                        <option key={index} value={item.code}>
                          {item.ward_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p id="Erorr_Cart" />
                </div>
              </div>
              <div className="total_Address_Phone">
                <p>SDT:</p>
                <div>
                  <p>
                    <input
                      id="phone_Cart"
                      type="number"
                      placeholder="Nhập Số Điện Thoại"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </p>
                  <p id="phoneError_Cart" />
                </div>
              </div>
              <div className="total_Address_Phone">
                <p>Tổng Số Tiền: {VND.format(total)}</p>
                <p id="total_price" />
              </div>
              <button type="button" onClick={handleOrderCart}>
                Tiến Hành Thanh Toán
              </button>
            </div>
          </div>
        </div>
      </main>

      <FooterPage></FooterPage>
    </>
  );
}
