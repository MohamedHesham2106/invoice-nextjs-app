import classes from "./NewInvoice.module.css";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
const EditInvoice = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);

  // add product items
  const addItemHandler = () => {
    setItems([...items, { itemName: "", quantity: 0, price: 0, total: 0 }]);
    console.log(items);
  };
  const changeHandler = (event, i) => {
    const { name, value } = event.target;
    const list = [...items];
    list[i][name] = value;
    list[i]["total"] = list[i]["quantity"] * list[i]["price"];
    setItems(list);
  };
  const deleteItemHandler = (i) => {
    const inputData = [...items];
    inputData.splice(i, 1);
    setItems(inputData);
  };
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className={classes.invoice}>
      <div className={classes.header}>
        <h3>Edit #RT5840</h3>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes.body}>
          <div className={classes["bill_from"]}>
            <p className={classes["bill_title"]}>Bill from</p>
            <div className={classes["form_group"]}>
              <label htmlFor="address">Street Address</label>
              <input type="text" name="address" />
            </div>
            <div
              className={`${classes["form_group"]} ${classes["inline_form-group"]}`}
            >
              <div>
                <label htmlFor="city">City</label>
                <input type="text" name="city" />
              </div>
              <div>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" name="postal" />
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <input type="text" name="country" />
              </div>
            </div>
          </div>
          <div className={classes["bill_to"]}>
            <p className={classes["bill_title"]}>Bill to</p>
            <div className={classes["form_group"]}>
              <label htmlFor="client">Client Name</label>
              <input type="text" name="client" />
            </div>
            <div className={classes["form_group"]}>
              <label htmlFor="email">Client Email</label>
              <input type="email" name="email" />
            </div>
            <div className={classes["form_group"]}>
              <label htmlFor="cAddress">Street Address</label>
              <input type="text" name="cAddress" />
            </div>
            <div
              className={`${classes["form_group"]} ${classes["inline_form-group"]}`}
            >
              <div>
                <label htmlFor="clientCity">City</label>
                <input type="text" name="clientCity" />
              </div>
              <div>
                <label htmlFor="clientPostal">Postal Code</label>
                <input type="text" name="clientPostal" />
              </div>
              <div>
                <label htmlFor="clientCountry">Country</label>
                <input type="text" name="clientCountry" />
              </div>
            </div>

            <div
              className={`${classes["form_group"]} ${classes["inline_form-group"]}`}
            >
              <div className={classes.inline}>
                <label htmlFor="date">Invoice Date</label>
                <input type="date" name="date" />
              </div>
              <div className={classes.inline}>
                <label htmlFor="terms">Payment Terms</label>
                <input type="text" name="terms" />
              </div>
            </div>
            <div className={classes["form_group"]}>
              <label htmlFor="description">Project Description</label>
              <input type="text" name="description" />
            </div>
          </div>

          <div className={classes.items}>
            <h3>Item List</h3>
            {items?.map((item, i) => (
              <div className={classes.item} key={i}>
                <div
                  className={`${classes["form_group"]} ${classes["inline_form-group"]}`}
                >
                  <div>
                    <label htmlFor="itemName">Item Name</label>
                    <input
                      type="text"
                      name="itemName"
                      onChange={(e) => changeHandler(e, i)}
                    />
                  </div>
                  <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      onChange={(e) => changeHandler(e, i)}
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      name="price"
                      onChange={(e) => changeHandler(e, i)}
                    />
                  </div>
                  <div>
                    <p>Total</p>
                    <h4>${item.total}</h4>
                  </div>
                  <button className="edit_btn" onClick={deleteItemHandler}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className={classes.add} onClick={addItemHandler}>
            Add New Item
          </button>
          <div
            className={classes["new_invoice-btns"]}
            style={{ justifyContent: "end" }}
          >
            <div>
              <button
                className="draft_btn"
                onClick={() => router.push(`/invoice/id`)}
              >
                Cancel
              </button>
              <button className="mark_as-btn">Save Change</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditInvoice;
