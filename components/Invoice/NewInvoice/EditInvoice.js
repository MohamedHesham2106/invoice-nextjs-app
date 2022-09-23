import classes from "./NewInvoice.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const EditInvoice = ({ data }) => {
  const router = useRouter();
  const [items, setItems] = useState(data.items);

  const [status, setStatus] = useState("");
  const [senderStreet, setSenderStreet] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderPostalCode, setSenderPostalCode] = useState("");
  const [senderCountry, setSenderCountry] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientStreet, setClientStreet] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPostalCode, setClientPostalCode] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [description, setDescription] = useState("");
  const [paymentDue, setPaymentDue] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");

  const totalAmountHandler = items.reduce((acc, curr) => acc + curr.total, 0);
  // add product items
  const addItemHandler = () => {
    setItems([...items, { name: "", quantity: 0, price: 0, total: 0 }]);
  };
  const changeHandler = (event, i) => {
    const { name, value } = event.target;
    const list = [...items];
    list[i][name] = value;
    list[i]["total"] = list[i]["quantity"] * list[i]["price"];
    setItems(list);
  };
  const deleteItemHandler = async (i) => {
    const inputData = [...items];
    inputData.splice(i, 1);
    setItems(inputData);
  };
  const updateInvoiceHandler = async () => {
    try {
      const response = await fetch(
        `/api/invoice/edit/${router.query.invoiceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderStreet: senderStreet,
            senderCity: senderCity,
            senderPostalCode: senderPostalCode,
            senderCountry: senderCountry,
            clientName: clientName,
            clientEmail: clientEmail,
            clientStreet: clientStreet,
            clientCity: clientCity,
            clientPostalCode: clientPostalCode,
            clientCountry: clientCountry,
            description: description,
            paymentDue: paymentDue,
            paymentTerms: paymentTerms,
            status: status,
            items: items,
            total: totalAmountHandler,
          }),
        }
      );
      const data = await response.json();

      router.push(`/invoice/${router.query.invoiceId}`);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    setSenderCity(data.senderCity);
    setSenderStreet(data.senderStreet);
    setSenderPostalCode(data.senderPostalCode);
    setSenderCountry(data.senderCountry);

    setClientCity(data.clientCity);
    setClientStreet(data.clientStreet);
    setClientPostalCode(data.clientPostalCode);
    setClientCountry(data.clientCountry);

    setClientName(data.clientName);
    setClientEmail(data.clientEmail);
    setDescription(data.description);
    setPaymentDue(data.paymentDue);
    setPaymentTerms(data.paymentTerms);
    setStatus(data.status);
  }, [data]);
  return (
    <div className={classes.invoice}>
      <div className={classes.header}>
        <h3>Edit #{data.id.substr(0, 6).toUpperCase()}</h3>
      </div>

      <div className={classes.body}>
        <div className={classes["bill_from"]}>
          <p className={classes["bill_title"]}>Bill from</p>
          <div className={classes["form_group"]}>
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              name="address"
              value={senderStreet}
              onChange={(e) => setSenderStreet(e.target.value)}
            />
          </div>
          <div
            className={`${classes["form_group"]} ${classes["inline_form-group"]}`}
          >
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                value={senderCity}
                onChange={(e) => setSenderCity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="postal">Postal Code</label>
              <input
                type="text"
                name="postal"
                value={senderPostalCode}
                onChange={(e) => setSenderPostalCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                value={senderCountry}
                onChange={(e) => setSenderCountry(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={classes["bill_to"]}>
          <p className={classes["bill_title"]}>Bill to</p>
          <div className={classes["form_group"]}>
            <label htmlFor="client">Client Name</label>
            <input
              type="text"
              name="client"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className={classes["form_group"]}>
            <label htmlFor="email">Client Email</label>
            <input
              type="email"
              name="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
          </div>
          <div className={classes["form_group"]}>
            <label htmlFor="cAddress">Street Address</label>
            <input
              type="text"
              name="cAddress"
              value={clientStreet}
              onChange={(e) => setClientStreet(e.target.value)}
            />
          </div>
          <div
            className={`${classes["form_group"]} ${classes["inline_form-group"]}`}
          >
            <div>
              <label htmlFor="clientCity">City</label>
              <input
                type="text"
                name="clientCity"
                value={clientCity}
                onChange={(e) => setClientCity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="clientPostal">Postal Code</label>
              <input
                type="text"
                name="clientPostal"
                value={clientPostalCode}
                onChange={(e) => setClientPostalCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="clientCountry">Country</label>
              <input
                type="text"
                name="clientCountry"
                value={clientCountry}
                onChange={(e) => setClientCountry(e.target.value)}
              />
            </div>
          </div>

          <div
            className={`${classes["form_group"]} ${classes["inline_form-group"]}`}
          >
            <div className={classes.inline}>
              <label htmlFor="date">Invoice Date</label>
              <input
                type="date"
                name="date"
                value={paymentDue}
                onChange={(e) => setPaymentDue(e.target.value)}
              />
            </div>
            <div className={classes.inline}>
              <label htmlFor="terms">Payment Terms</label>
              <input
                type="text"
                name="terms"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
              />
            </div>
          </div>
          <div className={classes["form_group"]}>
            <label htmlFor="description">Project Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
                  <label htmlFor="name">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => changeHandler(e, i)}
                  />
                </div>
                <div>
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => changeHandler(e, i)}
                  />
                </div>
                <div>
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => changeHandler(e, i)}
                  />
                </div>
                <div>
                  <p>Total</p>
                  <h4>${item.total}</h4>
                </div>
                <button
                  className="edit_btn"
                  onClick={() => deleteItemHandler(i)}
                >
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
              onClick={() => router.push(`/invoice/${data.id}`)}
            >
              Cancel
            </button>
            <button className="mark_as-btn" onClick={updateInvoiceHandler}>
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvoice;
