import classes from "./InvoiceItem.module.css";
const InvoiceItem = () => {
  return (
    <section className={classes.item}>
      <ul className={classes.list}>
        <li className={classes["list_item"]}>
          <p className={classes["item_name"]}>Item Name</p>
          <p className={classes["item_box"]}>Qty</p>
          <p className={classes["item_box"]}>Price</p>
          <p className={classes["item_box"]}>Total</p>
        </li>

        <li className={classes["list_item"]}>
          <div className={classes["item_name"]}>
            <h5>Ecommerce Website</h5>
          </div>
          <div className={classes["item_box"]}>
            <p>2</p>
          </div>
          <div className={classes["item_box"]}>
            <p>$250</p>
          </div>
          <div className={classes["item_box"]}>
            <h5>$500</h5>
          </div>
        </li>
        
      </ul>
    </section>
  );
};

export default InvoiceItem;
