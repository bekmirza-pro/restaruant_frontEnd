import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form } from "react-bootstrap";
import { Context } from "../../index";
import { createOrder, fetchBrands, fetchTypes } from "../../http/foodAPI";

import { observer } from "mobx-react-lite";

const CreateOrder = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [count, setCount] = useState(0);
  const [address, setAddress] = useState("");
  const [tell, setTell] = useState(+9989);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const addDevice = () => {
    const formData = new FormData();
    formData.append("restaruant", device.selectedBrand.name);
    formData.append("type", device.selectedType.name);
    formData.append("food", device.selectedFood.name);
    formData.append("count", Number(`${count}`));
    formData.append("address", `${address}`);
    formData.append("tell", Number(`${tell}`));
    createOrder(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Order food</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType.name || "Select type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedBrand.name || "Select type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}>
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedFood.name || "Select type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.devices.map((food) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedFood(food)}
                  key={food.id}>
                  {food.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="mt-3"
            required
            placeholder="Enter the count"
            type="number"
          />
          <Form.Control
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-3"
            required
            placeholder="Enter the address"
            type="text"
          />
          <Form.Control
            value={tell}
            onChange={(e) => setTell(Number(e.target.value))}
            className="mt-3"
            required
            placeholder="Enter the tell"
            type="number"
          />
        </Form>

        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Close
          </Button>
          <Button variant="outline-success" type="button" onClick={addDevice}>
            Add
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
});

export default CreateOrder;
