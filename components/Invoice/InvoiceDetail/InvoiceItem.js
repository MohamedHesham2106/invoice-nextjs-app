import classes from "./InvoiceItem.module.css";
const InvoiceItem = ({ items }) => {
  console.log(items);
  return (
    <section className={classes.item}>
      <ul className={classes.list}>
        <li className={classes["list_item"]}>
          <p className={classes["item_name"]}>Item Name</p>
          <p className={classes["item_box"]}>Qty</p>
          <p className={classes["item_box"]}>Price</p>
          <p className={classes["item_box"]}>Total</p>
        </li>

        {items?.map((item) => (
          <li className={classes["list_item"]} key={item.id}>
            <div className={classes["item_name"]}>
              <h5>{item.name}</h5>
            </div>
            <div className={classes["item_box"]}>
              <p>{item.quantity}</p>
            </div>
            <div className={classes["item_box"]}>
              <p>${item.price}</p>
            </div>
            <div className={classes["item_box"]}>
              <h5>${item.total}</h5>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default InvoiceItem;
