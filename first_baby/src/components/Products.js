import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { CartContext } from "../global/CartContext";
import { ProductsContext } from "../global/ProductsContext";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/Config";
import { useAlert } from "react-alert";
import { getUserInfo } from "../localStorage";

export const Products = () => {
  const alert = useAlert();
  const { products } = useContext(ProductsContext);
  const [categories, setCategory] = useState([]);
  const [productDic, setProductDic] = useState([]);
  const {_id} = getUserInfo()
  useEffect(() => {
    products.forEach((product) => {
      const key = product.category;
      const preCategory = categories;
      preCategory.push(key);
      setCategory(preCategory);
    });
    const uniqueCategory = categories.filter((val, id, array) => {
      return array.indexOf(val) === id;
    });
    setCategory(uniqueCategory);
    uniqueCategory.forEach((key) => {
      const preProductDic = productDic;
      const preproducts = products.filter((x) => x.category === key);
      preProductDic[key] = preproducts;
      setProductDic(preProductDic);
    });
  },[]);
  // const { dispatch } = useContext(CartContext);
  const addToCart = (e) => {
    let productId = e.target.value;

    if (_id === '') {
      window.location = "/login";
    } else {
      db.collection("basket")
        .where("userId", "==", _id)
        .where("productId", "==", productId)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            const data = snapshot.docs.map((doc) => doc.data());
            const docId = data[0].id;
            const qty = data[0].productQty + 1;
            db.collection("basket").doc(docId).update({ productQty: qty });
            alert.success("product add to your cart");
          } else {
            const basketId = uuidv4();
            db.collection("basket").doc(basketId).set({
              id: basketId,
              userId: _id,
              productId: productId,
              productQty: 1,
            });
            alert.success("product add to your cart");
          }
        });
    }
  };
  return (
    <div>
      {categories && categories.sort().map((category) => (
        <div  key={category}>
        <h2>{category}</h2>
        <ul className="products">
        {productDic[category] && productDic[category].sort((a,b)=> (a.productId > b.productId ? 1 : -1))
        .map((product)=>(
          <li key={product.productId}>
                <div className="product">
                  <Link to={{ pathname: `/products/${product.productId}` }}>
                    <img src={product.productImg} alt={product.ProductName} />
                  </Link>

                  <div className="product-info">
                    <div className="product-name">{product.productName}</div>
                    <div className="product-price">${product.productPrice}</div>
                  </div>

                  <div>
                    <button
                      className="fw"
                      value={product.productId}
                      onClick={addToCart}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
        ))}
        </ul>
        <hr></hr>
        </div>
      ))}
    </div>
  );
};
