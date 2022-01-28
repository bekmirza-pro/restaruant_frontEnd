import React, { useContext, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/RestaruantBar";
import DeviceList from "../components/FoodList";
// import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { observer } from "mobx-react-lite";
import { LOGIN_ROUTE } from "../utils/consts";
import { useHistory } from "react-router-dom";
import { Context } from "../index";
import { fetchBrands, fetchFoods, fetchTypes } from "../http/foodAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { device, user } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchFoods(null, null, 1, 2).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchFoods(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      2
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  return (
    <Container>
      <Row className="mt-2">
        {user._isAuth ? (
          <>
            <Col md={3}>
              <TypeBar />
            </Col>
            <Col md={9}>
              <BrandBar />
              <DeviceList />
              <Pages />
            </Col>
          </>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(LOGIN_ROUTE)}>
              {" "}
              Authorization
            </Button>{" "}
          </Nav>
        )}{" "}
      </Row>
    </Container>
  );
});

export default Shop;
