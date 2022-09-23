import classes from "./NewInvoice.module.css";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
const NewInvoice = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);

  // sender
  const senderStreet = useRef("");
  const senderCity = useRef("");
  const senderPostal = useRef("");
  const senderCountry = useRef("");
  // client
  const clientName = useRef("");
  const clientEmail = useRef("");
  const clientStreet = useRef("");
  const clientCity = useRef("");
  const clientPostal = useRef("");
  const clientCountry = useRef("");
  const description = useRef("");
  const createdAt = useRef("");
  const payment = useRef("");

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
  const totalAmountHandler = items.reduce((acc, curr) => acc + curr.total, 0);
  const submitHandler = async (status) => {
    try {
      if (
        senderStreet.current.value === "" ||
        senderCity.current.value === "" ||
        senderPostal.current.value === "" ||
        senderCountry.current.value === "" ||
        clientName.current.value === "" ||
        clientEmail.current.value === "" ||
        clientStreet.current.value === "" ||
        clientCity.current.value === "" ||
        clientPostal.current.value === "" ||
        clientCountry.current.value === "" ||
        description.current.value === "" ||
        createdAt.current.value === "" ||
        items.length === 0
      ) {
        toast.warning("All fields are required.");
      } else {
        const response = await fetch("/api/invoice/add-new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderStreet: senderStreet.current.value,
            senderCity: senderCity.current.value,
            senderPostal: senderPostal.current.value,
            senderCountry: senderCountry.current.value,
            clientName: clientName.current.value,
            clientEmail: clientEmail.current.value,
            clientStreet: clientStreet.current.value,
            clientCity: clientCity.current.value,
            clientPostal: clientPostal.current.value,
            clientCountry: clientCountry.current.value,
            description: description.current.value,
            paymentDue: createdAt.current.value,
            paymentTerms: payment.current.value,
            status: status,
            items: items,
            total: totalAmountHandler,
          }),
        });
        const data = await response.json();

        toast.success(data.message);
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  return (
    <div className={classes.invoice}>
      <div className={classes.header}>
        <h3>New Invoice</h3>
      </div>
      <div className={classes.body}>
        <div className={classes["bill_from"]}>
          <p className={classes["bill_title"]}>Bill from</p>
          <div className={classes["form_group"]}>
            <label htmlFor="address">Street Address</label>
            <input type="text" name="address" ref={senderStreet} />
          </div>
          <div
            className={`${classes["form_group"]} ${classes["inline_form-group"]}`}
          >
            <div>
              <label htmlFor="city">City</label>
              <input type="text" name="city" ref={senderCity} />
            </div>
            <div>
              <label htmlFor="postal">Postal Code</label>
              <input type="text" name="postal" ref={senderPostal} />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <input type="text" name="country" ref={senderCountry} />
            </div>
          </div>
        </div>
        <div className={classes["bill_to"]}>
          <p className={classes["bill_title"]}>Bill to</p>
          <div className={classes["form_group"]}>
            <label htmlFor="client">Client Name</label>
            <input type="text" name="client" ref={clientName} />
          </div>
          <div className={classes["form_group"]}>
            <label htmlFor="email">Client Email</label>
            <input type="email" name="email" ref={clientEmail} />
          </div>
          <div className={classes["form_group"]}>
            <label htmlFor="cAddress">Street Address</label>
            <input type="text" name="cAddress" ref={clientStreet} />
          </div>
          <div
            className={`${classes["form_group"]} ${classes["inline_form-group"]}`}
          >
            <div>
              <label htmlFor="clientCity">City</label>
              <input type="text" name="clientCity" ref={clientCity} />
            </div>
            <div>
              <label htmlFor="clientPostal">Postal Code</label>
              <input type="text" name="clientPostal" ref={clientPostal} />
            </div>
            <div>
              <label htmlFor="clientCountry">Country</label>
              <input type="text" name="clientCountry" ref={clientCountry} />
            </div>
          </div>

          <div
            className={`${classes["form_group"]} ${classes["inline_form-group"]}`}
          >
            <div className={classes.inline}>
              <label htmlFor="date">Invoice Date</label>
              <input type="date" name="date" ref={createdAt} />
            </div>
            <div className={classes.inline}>
              <label htmlFor="terms">Payment Terms</label>
              <input type="text" name="terms" ref={payment} />
            </div>
          </div>
          <div className={classes["form_group"]}>
            <label htmlFor="description">Project Description</label>
            <input type="text" name="description" ref={description} />
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
        <div className={classes["new_invoice-btns"]}>
          <button className="edit_btn" onClick={() => router.push("/")}>
            Discard
          </button>
          <div>
            <button
              className="draft_btn"
              onClick={() => submitHandler("draft")}
            >
              Save as Draft
            </button>
            <button
              className="mark_as-btn"
              onClick={() => submitHandler("pending")}
            >
              Send & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewInvoice;
