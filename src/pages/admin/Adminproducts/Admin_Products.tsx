import React, { useEffect, useRef } from "react";
import "../Adminuser/ADMIN.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import imgsa from "../../../../public/img/Logo2.jpg";
import { useState } from "react";

import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { Pagination } from "antd";
import axios from "axios";
import { errorNoti, successNoti } from "../../../utils/notifycation.js";
import publicAxios from "../../../components/Heatder/config/publicAxios.js";
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
interface Admin_Category {
  idCategory: number;
  nameCategory: string;
  img: string;
}
export default function Admin_Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState([]);
  const [imgUpload, setImgUpload] = useState(null);
  const [co, setCo] = useState(false);

  const [selectedMedia, setSelectedMedia] = useState("");
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  let [products, setProducts] = useState([]);
  // const handleGetProducts = async () => {
  //   const response = await axios.get("http://localhost:3000/api/v1/product/list");
  //   console.log("producs", response);
  //   setProducts(response.data.products);
  // };
  const handleGetProducts = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/product/list"
    );
    // console.log("producs",response);
    setProducts(response.data);
  };
  const [urlImage, setUrlImage]: any = useState(null);
  const handlOnchangeADMIN = (e: any) => {
    setSearch(e.target.value.toLowerCase());
  };
  const hanlsearch = async () => {
    try {
      const response = await publicAxios.get(
        `/api/v1/product/search?key=${search}`
      );
      console.log(response.data);

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeImage = (e: any) => {
    setSelectedMedia(e.target.files[0]);
    // xem trước media
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e: any) {
      setUrlImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const renderProducts = () => {
    return products?.filter((item) => item);
  };
  const newArr = renderProducts();
  const itemsPerPage = 6;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts: Admin_Product[] = newArr?.slice(
    startIndex,
    endIndex
  );
  const navigate = useNavigate();

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  let [data, setData]: any = useState([]);

  const handleGetCategory = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/categories/list"
    );

    setData(response.data);
  };
  const [newproducst, setNewproducst]: any = useState({
    nameProducts: "",
    price: "",
    categoryId: "",
    stock: "",
    description: "",
  });

  const onADDproducst = (e: any) => {
    setNewproducst({ ...newproducst, [e.target.name]: e.target.value });
  };
  const handleAdd = async () => {
    try {
      if (newproducst.categoryId === "") {
        errorNoti("vui lòng chọn tên categoryId");
        return;
      }
      if (newproducst.nameProducts === "") {
        errorNoti("vui lòng nhập tên sản phẩm");
        return;
      }
      if (!selectedMedia) {
        errorNoti("vui lòng chọn hình ảnh");
        return;
      }
      if (newproducst.price === "") {
        errorNoti("vui lòng nhập giá");
        return;
      }
      if (newproducst.stock === "") {
        errorNoti("vui lòng nhập số lượng");
        return;
      }

      if (newproducst.description === "") {
        errorNoti("vui lòng nhập mô tả");
        return;
      }
      if (newproducst.price < 0) {
        errorNoti("giá lớn hơn 0");
        return;
      }
      if (newproducst.stock < 0) {
        errorNoti("số lượng lớn hơn 0");
        return;
      }

      if (newproducst.stock > 1000) {
        errorNoti("số lượng không quá 1000");
        return;
      }

      const check = products.find(
        (item: any) =>
          item.nameProducts.toLowerCase() ===
          newproducst.nameProducts.trim().toLowerCase()
      );
      if (check) {
        errorNoti("Sản Phẩm Đã Tồn Tại");
        return;
      }
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "upload_img");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dbmomoyqd/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      const response = await publicAxios.post("/api/v1/product/addProduct", {
        ...newproducst,
        imgs: media,
      });
      successNoti(response.data.message);
      // setProducts(response.data.products);
      setNewproducst({
        nameProduct: "",
        price: 0,
        stock: 0,
        img: null,
        description: "",
      });
      setUrlImage(null);
      setShow(false);
      setCo(!co);
    } catch (error: any) {
      successNoti(error.response.data.message);
    }
  };

  // let [isEditing, setIsEditing] = useState([]);
  const handleEditStart = (product: any) => {
    window.scrollTo(0, 0);
    handleShow();
    setNewproducst({
      ...product,
    });
    setUrlImage(product.imgs);

    // setIsEditing(true);
  };
  const handleEdit = async () => {
    const updateProduct = {
      ...newproducst,
      category: {
        ...newproducst.category,
        idCategory: newproducst.categoryId,
      },
    };

    if (selectedMedia) {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "upload_img");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dbmomoyqd/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      const response = await axios.put(
        `http://localhost:3000/api/v1/product/edit/${updateProduct.idProducts}`,
        { ...updateProduct, imgs: media }
      );
      setProducts(response.data.products);
    } else {
      const response = await axios.put(
        `http://localhost:3000/api/v1/product/edit/${updateProduct.idProducts}`,
        updateProduct
      );
      setProducts(response.data.products);
    }
    handleClose();

    setNewproducst({
      name: "",
      category: "",
      price: "",
      quantity: "",
      image: "",
      description: "",
    });
    setUrlImage(null);
    setCo(!co);
  };

  const handleDelete = async (idproducts: number) => {
    let confirma = window.confirm("Bạn có muốn xóa không?");
    if (confirma) {
      try {
        const res = await publicAxios.delete(`/api/v1/product/${idproducts}`);

        successNoti(res.data.message);
        setCo(!co);
        // setProducts(res.data.products);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem("username");
    // successNoti("Đã Đăng Xuất");
    navigate("/");
  };

  useEffect(() => {
    handleGetProducts();
    handleGetCategory();
  }, [co]);
  const handleShow = () => {
    setShow(true);
  };
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStatus(true);
    }, 1100);
  }, [status]);

  return (
    <>
      <>
        <div>
          {" "}
          <header className="headeradmin">
            <div className="logo_admin">
              <div className="logoADMIN">
                <img src={imgsa} alt="" />
              </div>
            </div>
            <div className="title1-header">
              <h2>Quản Lí Sản Phẩm</h2>
            </div>
          </header>
          <main className="main--">
            <div id="banner1">
              <h3>
                <Button onClick={handleLogoutAdmin}>Đăng xuất</Button>
              </h3>
              <div className="menu1">
                <div
                  className="menu-one1"
                  style={{ backgroundColor: "whitesmoke", borderRadius: 20 }}
                >
                  <Link to="/AdminProduct">
                    <i className="fa-brands fa-codepen" />
                  </Link>
                  <Link to="/AdminProduct">
                    <h2>Quản lí sản phẩm</h2>
                  </Link>
                </div>
                <div className="menu-one1">
                  <Link to="/AdminUser">
                    <i className="fa-solid fa-user" />
                  </Link>
                  <Link to="/AdminUser">
                    <h2>Quản lí người dùng</h2>
                  </Link>
                </div>
                <div className="menu-one1">
                  <Link to="/AdminManagement">
                    <i className="fa-solid fa-cart-shopping" />
                  </Link>
                  <Link to="/AdminManagement">
                    <h2>Quản lí đơn hàng</h2>
                  </Link>
                </div>
                <div className="menu-one1">
                  <Link to="/AdminCategory">
                    <i className="fa-brands fa-stack-overflow" />
                  </Link>
                  <Link to="/AdminCategory">
                    <h2>Phân loại sản phẩm</h2>
                  </Link>
                </div>
              </div>
            </div>
            <div className="main-content98">
              <h3>Giao diện</h3>
              <div className="tititiit">
                <input
                  type="text"
                  onChange={handlOnchangeADMIN}
                  className="input_searchProducts"
                  placeholder="Tìm kiếm"
                />
                <button onClick={hanlsearch} className="btn_search">
                  search
                </button>
                <h3>Thông tin sản phẩm:</h3>
                <div className="crud">
                  <p className="input-Erorr" />
                  <p className="" />
                  <p className="input-Erorr" />
                  <p className="input-Erorr" />
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    className="btn_bootraps"
                    style={{ backgroundColor: "#ff5b6a" }}
                  >
                    Thêm Sản Phẩm
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Sản Phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <table
                        style={{
                          fontSize: 20,
                          color: "#000000",
                        }}
                        className="table-title"
                      >
                        <tbody>
                          <tr>
                            <td style={{ paddingBottom: 20 }}>
                              Loại sản phẩm:
                            </td>
                            <td style={{ paddingBottom: 20 }}>
                              <select
                                id="categorySelect"
                                onChange={onADDproducst}
                                name="categoryId"
                                value={
                                  newproducst.categoryId ||
                                  newproducst?.category?.idCategory
                                }
                              >
                                <option>Loại Sản Phẩm</option>
                                {data.map((item: any, index: number) => {
                                  return (
                                    <option key={index} value={item.idCategory}>
                                      {item.nameCategory}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ paddingBottom: 20 }}>Tên sản phẩm:</td>
                            <td style={{ paddingBottom: 20 }}>
                              <input
                                type="text"
                                id="nameProducts"
                                name="nameProducts"
                                value={newproducst.nameProducts}
                                onChange={onADDproducst}
                                style={{
                                  outline: "none",
                                  padding: "2px 10px",
                                  fontSize: "15px",

                                  border: "1px solid black",
                                }}
                                className="input_admin"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label htmlFor="imgProduct">Ảnh sản phẩm</label>
                            </td>
                            <td style={{ paddingBottom: 20 }}>
                              <input
                                type="file"
                                // hidden=""
                                id="imgProduct"
                                name="img"
                                style={{ outline: "none", display: "none" }}
                                onChange={changeImage}
                              />{" "}
                              <br />
                              <img
                                id="image"
                                src={urlImage}
                                alt=""
                                width="100px"
                                height="100px"
                                style={{ border: "1px solid black" }}
                              />
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td style={{ paddingBottom: 20 }}>Giá sản phẩm:</td>
                            <td style={{ paddingBottom: 20 }}>
                              <input
                                type="number"
                                id="priceProduct"
                                name="price"
                                value={newproducst.price}
                                onChange={onADDproducst}
                                style={{
                                  outline: "none",
                                  padding: "2px 10px",
                                  fontSize: "15px",
                                  border: "1px solid black",
                                }}
                                className="input_admin"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ paddingBottom: 20 }}>Số lượng:</td>
                            <td style={{ paddingBottom: 20 }}>
                              <input
                                type="text"
                                id="sl"
                                name="stock"
                                value={newproducst.stock}
                                onChange={onADDproducst}
                                className="input_admin"
                                style={{
                                  outline: "none",
                                  padding: "2px 10px",
                                  fontSize: "15px",
                                  border: "1px solid black",
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ paddingBottom: 20 }}>Thông tin</td>
                            <td style={{ paddingBottom: 20 }}>
                              <input
                                type="text"
                                id="sl"
                                name="description"
                                value={newproducst.description}
                                onChange={onADDproducst}
                                className="input_admin"
                                style={{
                                  outline: "none",
                                  padding: "2px 10px",
                                  fontSize: "15px",
                                  border: "1px solid black",
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="buttonSave">
                        <button onClick={handleAdd}>Save</button>
                        <button onClick={handleEdit}>Chỉnh sửa</button>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              {status ? (
                <div className="product">
                  <div className="productAdded">
                    <h3>Sản phẩm đã được thêm</h3>
                    <table
                      id="tableAdded-Products"
                      style={{ textAlign: "center" }}
                    >
                      <thead>
                        <tr>
                          <th className="td1PROduct">id</th>
                          <th className="td1PROduct">Tên</th>
                          <th className="td1PROduct">Ảnh</th>
                          <th className="td1PROduct">Giá</th>
                          <th className="td1PROduct">ID Category</th>
                          <th className="td1PROduct">Số Lượng</th>
                          <th className="td1PROduct">Chức Năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedProducts
                          // .filter((item:any) =>
                          //   item.name.toLowerCase().includes(search)
                          // )
                          ?.map((item: any, index) => {
                            return (
                              <tr>
                                <td className="td1PROduct">
                                  {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="td1PROduct">
                                  {item.nameProducts}
                                </td>
                                <td className="td1PROduct">
                                  <img src={item.imgs} alt="" />
                                </td>
                                <td className="td1PROduct">
                                  {VND.format(item.price)}
                                </td>
                                <td className="td1PROduct">
                                  {item.category?.idCategory}
                                </td>
                                <td className="td1PROduct">{item.stock}</td>
                                <td className="td1PROduct_btn">
                                  <button onClick={() => handleEditStart(item)}>
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDelete(item.idProducts)
                                    }
                                  >
                                    DELETE
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    <Pagination
                      current={currentPage}
                      onChange={onPageChange}
                      pageSize={itemsPerPage}
                      total={newArr?.length}
                      className="phantrangproductsadmins"
                    />
                  </div>
                </div>
              ) : (
                <ReactLoading
                  type={"spin"}
                  color={"red"}
                  height={"5%"}
                  width={"5%"}
                  className="loadingProductsAdmin"
                />
              )}
            </div>
          </main>
        </div>
      </>
    </>
  );
}
