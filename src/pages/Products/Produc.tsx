import React from "react";
import Heatder from "../../components/Heatder/Heatder";
import FooterPage from "../../components/Foodter/FooterPage";
import { useState } from "react";
import { useEffect } from "react";
import "../Products/Produc.scss";
import { errorNoti, successNoti } from "../../utils/notifycation";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { saveCart } from "../../store/redux-toolkit/cartSlice";
import axios from "axios";
import { getCart } from "../../store/redux-toolkit/cart";
import ReactLoading from "react-loading";

interface Admin_Product {
  idProducts: number;
  nameProducts: string;
  stock: number;
  price: number;
  imgs: string;
  categoryId: number;
  description: string;
}
export default function Produc() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("username") || "{}");
  const [cart, setCart] = useState(currentUser?.cart);
  const [data, setData]:any = useState([]);
  const [products, setProducts]:any = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(7);
  const [flag,setFlag]=useState(false)
  const handleGetCategory = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/categories/list");
    // console.log(response.data,'dsfsfsfd');
    setData(response.data);
  };
  const handleGetProducts = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/product/list");
    // console.log("producs",response);
    setProducts(response.data);
  };
  useEffect(() => {
    handleGetCategory();
    handleGetProducts();
  }, [flag]);

  const handleClick_category = (id:number) => {
    setSelectedCategory(id);
  };

  const handlCLickAddtoCart = async (product:any) => {
  if (!(currentUser && currentUser.idUser)) {
    errorNoti("Cần Đăng Nhập Để Mua Hàng");
    return;
    }
    
    const cart = {
      userId: currentUser.idUser,
      product,
    };
    
    const response = await axios.post(
      "http://localhost:3000/api/v1/cart/addToCart",
      cart
    );
    dispatch(getCart(currentUser?.idUser));
    successNoti(response.data.message);
    setFlag(!flag)
  };
  
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStatus(true);
    }, 1100);
  }, [status]);
  
  return (
    <>
      <div >
 <Heatder></Heatder>
        <div className="category">
        {data?.map((item:any, index:number) => {
          return (
            <div
              style={{
                borderColor: `${
                  selectedCategory == item.idCategory ? "#ff5b6a" : ""
                }`,
                borderWidth: `${
                  selectedCategory == item.idCategory ? "3px" : "1px"
                }`,
              }}
              key={index}
              className="categpry_css"
              onClick={() => handleClick_category(item.idCategory)}
            >
              <img src={item.img} alt="" className="img_category" />
              <p>{item.nameCategory}</p>
            </div>
          );
        })}
      </div>
     {status ? <div className="products_category_scss">
        {products
          ?.filter((products:any) => products.category.idCategory == selectedCategory)
          .map((item:any) => (
            <>
              <div className="producsts_title" key={item.idProducts}>
                <Link to={`/details/${item.idProducts}`}>
                  <img src={item.imgs} alt="" />
                  <hr />
                </Link>
                <div className="titele_products">
                  <p>{item.nameProducts}</p>
                  <p>Trong cửa hàng còn:{item.stock ? item.stock : "Hết Hàng"}</p>
                  <p className="producst_price">{VND.format(item.price)}</p>

                  <button
                    className={`btn_category_producsts ${
                      item.stock === 0 ? "disabled" : ""
                    }`}
                    onClick={() => handlCLickAddtoCart(item)}
                    disabled={item.stock === 0 ? true : false }
                  >
                    Thêm Vào Giỏ Hàng
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>: <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="loadingProducts" />}
      <FooterPage></FooterPage> 
      </div> 
    
    </>
  );
}
