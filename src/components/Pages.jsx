import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination, Button } from "react-bootstrap";
import CreateOrder from "./modals/CreateOrder";

const Pages = observer(() => {
  const [foodVisible, setFoodVisible] = useState(false);

  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <>
      <Pagination className="mt-3">
        {pages.map((page) => (
          <Pagination.Item
            key={page}
            active={device.page === page}
            onClick={() => device.setPage(page)}>
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
      <Button
        variant={"outline-dark btn-lg btn-block"}
        onClick={() => setFoodVisible(true)}>
        Order food
      </Button>
      <CreateOrder show={foodVisible} onHide={() => setFoodVisible(false)} />
    </>
  );
});

export default Pages;
