import { AiFillCarryOut } from "react-icons/ai";
import React, { useEffect } from "react";
import Heatder from "../../components/Heatder/Heatder";
import FooterPage from "../../components/Foodter/FooterPage";
import "../titleoder/Title_Oder.scss";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pagination } from "antd";
import publicAxios from "../../components/Heatder/config/publicAxios";

export default function Title_Oder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const { user_id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem("username") || "{}");
  const [bills, setBills] = useState([]);
  const handleGetbills = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/bill/getBillById/${currentUser.idUser}`
    );

    setBills(response.data);
  };
  useEffect(() => {
    handleGetbills();
  }, []);
  const [flag, setFlag] = useState(true);
  const [show, setShow] = useState(false);
  const [infoDetail, setInfoDetails]: any = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = async (idBill: number) => {
    setShow(true);
    try {
      const response = await publicAxios.get(`/api/v1/bill-details/${idBill}`);

      setInfoDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changStatus = async (id: number, status: any) => {
    let accept = window.confirm("Bạn muốn thực hiện hành đông không");
    if (accept) {
      await publicAxios.patch(`/api/v1/bill/statusCancel/${id}`, {
        status: status,
      });
    }
    handleGetbills();
    setFlag(!flag);
  };

  const itemsPerPage = 3;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts: any = bills?.slice(startIndex, endIndex);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    handleGetbills();
  }, [flag]);
  const numbers: any = 0;

  return (
    <>
      <Heatder></Heatder>
      <div>
        <div className="OderTitle">
          <hr />
          <h2>Thông Tin Đơn Hàng</h2>
          <hr />
        </div>
        <div>
          {!displayedProducts?.length == numbers ? (
            <div>
              <table className="table_titleoder">
                <thead className="table_titleoder_thtbd">
                  <th className="td19">ID Đơn Hàng</th>
                  <th className="td19">Địa Chỉ</th>
                  <th className="td19">SĐT</th>
                  <th className="td19">Thông Tin Sản Phẩm</th>
                  <th className="td19">Tổng Tiền</th>
                  <th className="td19">Tình Trạng</th>
                  <th className="td19">Hành Động</th>
                </thead>
                <tbody className="table_titleoder_thtbd">
                  <>
                    {displayedProducts.map((item: any, index: number) => {
                      return (
                        <tr className="tr19">
                          <td className="td19">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="td19">{item.address}</td>
                          <td className="td19">{item.phone_number}</td>
                          <td className="td19">
                            <Button
                              variant="primary"
                              onClick={() => handleShow(item.idBill)}
                              className="btn_bootraps"
                            >
                              Xem Chi Tiết
                            </Button>
                          </td>
                          <td className="td19">{VND.format(item.total)}</td>
                          <td className="td19">
                            {item.status === "Đang Chờ" ? (
                              <span style={{ color: "green" }}>Đang Chờ</span>
                            ) : item.status === "Xác Nhận" ? (
                              <span style={{ color: "blue" }}>Xác nhận</span>
                            ) : (
                              <span style={{ color: "red" }}>Từ chối</span>
                            )}
                          </td>
                          <td className="td19">
                            {item.status === "Đang Chờ" ? (
                              <button
                                onClick={() =>
                                  changStatus(item.idBill, "Đá Hủy")
                                }
                              >
                                Hủy
                              </button>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                </tbody>
              </table>
              <Pagination
                current={currentPage}
                onChange={onPageChange}
                pageSize={itemsPerPage}
                total={bills?.length}
                className="phantrangs"
              />
            </div>
          ) : (
            <div className="divcarts2">
              <h2 className="h2Carts" style={{}}>
                Chưa có đơn hàng nào được thanh toán...!!!
              </h2>
              <img
                src="https://c7.alamy.com/thumbs/2apffam/a-funny-cartoon-character-of-shopping-basket-with-a-menu-2apffam.jpg"
                alt=""
              />
            </div>
          )}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sản Phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {Array.isArray(infoDetail) &&
                infoDetail.length > 0 &&
                infoDetail?.map((item: any) => (
                  <div className="titles_produsctsx">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>Tên:{item.ProductsId.nameProducts}</p>
                        <p>Số Lượng:{item.quantity}</p>
                        <p>Giá Sản Phẩm:{VND.format(item.ProductsId.price)}</p>
                      </div>
                      <p>
                        <img src={item.ProductsId.imgs} alt="" />
                      </p>
                    </div>
                    <hr />
                  </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <FooterPage></FooterPage>
    </>
  );
}
