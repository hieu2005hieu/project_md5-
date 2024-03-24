import React, { useEffect, useState } from "react";
import "../Adminuser/ADMIN.scss";
import imgsa from "../../../../public/img/Logo2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import axios from "axios";
import { Pagination, message } from "antd";
import Button from "react-bootstrap/Button";
import { errorNoti, successNoti } from "../../../utils/notifycation";
import publicAxios from "../../../components/Heatder/config/publicAxios";
import ReactLoading from "react-loading";

export default function Admin_Category() {
  const navigate = useNavigate();
  const handleLogoutAdmin = () => {
    localStorage.removeItem("username");
    // successNoti("Đã Đăng Xuất");
    navigate("/");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [imgUpload, setImgUpload]: any = useState(null);
  const [urlImage, setUrlImage]: any = useState(null);
  const [co, setCo] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [newproducst, setNewproducst]: any = useState({
    nameCategory: "",
  });
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
  // console.log(newproducst);
  const onADDproducst = (e: any) => {
    setNewproducst({ ...newproducst, [e.target.name]: e.target.value });
  };

  let [data, setData]: any = useState([]);
  // const handleGetCategory = async () => {
  //   const response = await axios.get("http://localhost:8888/api/v1/Category");
  //   console.log("category", response);
  //   setData(response.data.category);
  // };
  const handleGetCategory = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/categories/list"
    );
    // console.log(response.data,'dsfsfsfd');
    setData(response.data);
  };
  const ADDPRODUCSTs = async () => {
    try {
      if (!selectedMedia || !newproducst.nameCategory) {
        errorNoti("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      const check = data.find(
        (item: any) =>
          item.nameCategory.toLowerCase() ===
          newproducst.nameCategory.trim().toLowerCase()
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
      const response = await publicAxios.post(
        "/api/v1/categories/addCategory",
        {
          ...newproducst,
          img: media,
        }
      );

      setData(response.data.cates);
      successNoti(response.data.message);
      setNewproducst({
        nameCategory: "",
      });
      setUrlImage(null);
      setCo(!co);
    } catch (error) {
      console.log(error);
    }
  };
  // if (imgUpload == null) return;
  // const imageRef = ref(storage, `images/${imgUpload.name}`);

  // if (check) {
  //    errorNoti("Sản Phẩm Đã Tồn Tại");
  //   return;
  // }
  // else {
  //     uploadBytes(imageRef, imgUpload).then((snapshot) => {
  //       getDownloadURL(snapshot.ref).then(async (url) => {
  //         // Gửi yêu cầu POST đến API và lưu kết quả trả về
  //         const response = await axios.post("http://localhost:8000/category", {
  //           ...newproducst,
  //           category_name: url,
  //           name: newproducst.name,
  //         });
  //         // Cập nhật state để thêm sản phẩm mới vào danh sách
  //         setData((dataCurrent) => [...dataCurrent, response.data]);
  //         // Reset dữ liệu của sản phẩm mới
  //         setNewproducst({
  //           id: "",
  //           name: "",
  //           category_name: "",
  //         });
  //         setCo(!co);
  //         setImgUpload(null);
  //         setUrlImage(null);
  //       });
  //     });
  //   }
  // };
  let [isEditing, setIsEditing]: any = useState([]);
  const handleEditStart = (product: any) => {
    window.scrollTo(0, 0);
    setNewproducst({ ...product });
    setUrlImage(product.img);
    setIsEditing(true);
  };

  const handleEdit = async () => {
    let newProduct: any = { ...newproducst };
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
        `http://localhost:3000/api/v1/categories/edit/${newProduct.idCategory}`,
        { ...newProduct, imgs: media }
      );

      setData(response.data.products);
    } else {
      const response = await axios.put(
        `http://localhost:3000/api/v1/categories/edit/${newProduct.idCategory}`,
        newProduct
      );
      setData(response.data.products);
    }
    handleClose();
    setNewproducst({
      nameCategory: "",
    });
    setUrlImage(null);
    setCo(!co);
    successNoti("sửa thành công");
  };
  //   try {
  //     // Xử lý upload ảnh mới nếu có
  //     let updatedProduct = { ...newproducst };
  //     if (imgUpload) {
  //       const imageRef = ref(storage, `images/${imgUpload.name}`);
  //       await uploadBytes(imageRef, imgUpload);
  //       const url = await getDownloadURL(imageRef);
  //       updatedProduct.category_name = url;
  //     }

  //     // Gửi yêu cầu PUT
  //     const response = await axios.put(
  //       `http://localhost:8000/category/${updatedProduct.id}`,
  //       updatedProduct
  //     );

  //     // Cập nhật state
  //     setData((dataCurrent) =>
  //       dataCurrent.map((item) =>
  //         item.id === updatedProduct.id ? response.data : item
  //       )
  //     );
  //     setNewproducst({
  //       id: "",
  //       name: "",
  //       category_name: "",
  //     });
  //     setImgUpload(null);
  //     setUrlImage(null);
  //     setIsEditing(false);
  //     setCo(!co);
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //   }
  // };
  const handleDelete = async (idcategory: number) => {
    let confirma = window.confirm("Bạn có muốn xóa không?");
    if (confirma) {
      try {
        const res = await publicAxios.delete(
          `/api/v1/categories/${idcategory}`
        );

        successNoti(res.data.message);
        setCo(!co);

        // setData(res.data.products);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts: any = data?.slice(startIndex, endIndex);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    handleGetCategory();
  }, [co]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStatus(true);
    }, 1100);
  }, [status]);

  return (
    <>
      <>
        <header className="headeradmin">
          <div className="logo_admin">
            <div className="logoADMIN">
              <img src={imgsa} alt="" />
            </div>
          </div>
          <div className="title1-header">
            <h2>Phân loại sản phẩm</h2>
          </div>
        </header>
        <main className="main--">
          <div id="title9">
            <div id="banner1">
              <h3>
                <Button onClick={handleLogoutAdmin}>Đăng xuất</Button>
              </h3>
              <div className="menu1">
                <div className="menu-one1">
                  <Link to=" /AdminProduct">
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
                <div
                  className="menu-one1"
                  style={{ backgroundColor: "whitesmoke", borderRadius: 20 }}
                >
                  <Link to="/AdminCategory">
                    <i className="fa-brands fa-stack-overflow" />
                  </Link>
                  <Link to="/AdminCategory">
                    <h2>Phân loại sản phẩm</h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content98_cartegoey">
            <h3>Giao diện</h3>
            {status ? (
              <div id="category98_Category">
                <input
                  type="text"
                  id="categoryUsername"
                  name="nameCategory"
                  value={newproducst.nameCategory}
                  onChange={onADDproducst}
                  placeholder="userNameCategory"
                />
                <br />
                <label htmlFor="imgProduct">Ảnh sản phẩm</label>
                <input
                  type="file"
                  // hidden=""
                  id="imgProduct"
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
                <div className="btn98">
                  <button onClick={ADDPRODUCSTs}>Lưu</button>
                  <button onClick={handleEdit}>Chỉnh sửa</button>
                </div>
                <table
                  id="tableAdded_AdminCategory"
                  style={{ textAlign: "center", fontSize: 15 }}
                >
                  <thead>
                    <tr className="tr1">
                      <th className="td1">id</th>
                      <th className="td1">Tên</th>
                      <th className="td1">Ảnh</th>
                      <th className="td1">Chức Năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedProducts?.map((item: any) => {
                      return (
                        <tr className="tr1">
                          <td className="td1">{item.idCategory}</td>
                          <td className="td1">{item.nameCategory}</td>
                          <td className="td1_caetegorys">
                            <img src={item.img} alt="" />
                          </td>
                          <td className="td1 lllllll">
                            <button onClick={() => handleEditStart(item)}>
                              Sửa
                            </button>
                            <hr />
                            <button
                              onClick={() => handleDelete(item.idCategory)}
                            >
                              Xóa
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
                  total={data?.length}
                  className="phantrangadmincategory"
                />
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
      </>
    </>
  );
}
