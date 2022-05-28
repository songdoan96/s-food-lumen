import { useState } from "react";
import { Card, ToggleButton } from "react-bootstrap";

const Filter = ({ handleFilter }) => {
  const [radioValue, setRadioValue] = useState(0);

  const radios = [
    { id: 0, name: "Tất cả", sort: "all" },
    { id: 1, name: "Giá tăng dần", sort: "price_asc" },
    { id: 2, name: "Giá giảm dần", sort: "price_desc" },
    { id: 3, name: "Tên A-Z", sort: "name_asc" },
    { id: 4, name: "Tên Z-A", sort: "name_desc" },
  ];

  return (
    <div className="px-3 border shadow-sm">
      <p className="h5 text-center text-uppercase py-3 border-bottom">Sắp xếp</p>
      {radios.map((radio) => (
        <div className="d-flex align-items-center py-3" key={radio.id}>
          <input
            name="filter"
            type="radio"
            value={radio.sort}
            id={radio.sort}
            checked={radioValue === radio.id}
            onChange={(e) => {
              setRadioValue(radio.id);
              handleFilter(radio.sort);
            }}
            className="me-2 "
          />
          <label
            htmlFor={radio.sort}
            className={`${
              radioValue === radio.id ? "h6 pb-2 text-primary border-bottom border-primary" : ""
            }`}
          >
            {radio.name}
          </label>
        </div>

        // <ToggleButton
        //   name="filter"
        //   key={radio.id}
        //   id={radio.id}
        //   type="radio"
        //   value={radio.sort}
        //   variant={
        //     radioValue === radio.id ? "outline-success" : "outline-primary"
        //   }
        //   checked={radioValue === radio.id}
        //   onChange={(e) => {
        //     setRadioValue(radio.id);
        //     handleFilter(radio.sort);
        //   }}
        // >
        //   {radio.name}
        // </ToggleButton>
      ))}
    </div>
  );
};

export default Filter;
