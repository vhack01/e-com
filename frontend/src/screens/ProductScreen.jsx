import "../css/productScreen.css";
import { Link, useParams } from "react-router-dom";
import { BiCartAlt, BiSolidCreditCardFront } from "react-icons/bi";
import { useGetProductsDetailsQuery } from "../slices/productsApiSlice";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addItem } from "../slices/cartSlice";
import IconButton from "../components/IconButton";
import Rating from "../components/Rating";
import RoundButton from "../components/RoundButton";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: currentProduct,
    isLoading,
    error,
  } = useGetProductsDetailsQuery(productId);

  console.log("product: ", currentProduct);

  const handleCounter = (action) => {
    switch (action) {
      case "DECREASE":
        if (qty > 0) setQty(qty - 1);
        break;
      case "INCREASE":
        if (qty < currentProduct.countInStock) setQty(qty + 1);
        break;
      default:
        return;
    }
  };

  const handleAddToCart = () => {
    console.log("qty : ", qty);
    dispatch(addItem({ ...currentProduct, qty }));
    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant="danger">{error?.data.message}</ErrorMessage>
      ) : (
        <div className="main--container">
          <div className="product__detail">
            <div className="product__back">
              <Link to={`/`}>
                <IconButton />
              </Link>
            </div>

            {/* product details  */}
            <div className="pd_container">
              <div className="pd_imageContainer">
                <div className="pd__primaryImageContainer">
                  <img
                    src={currentProduct.image}
                    alt="product image"
                    className="pd__primaryImageContainer-img"
                  />
                </div>
                <div className="pd__galleryImageContainer">
                  <div className="pd_galleryImageWrapper">
                    <img
                      src={currentProduct.image}
                      alt=""
                      className="pd__gallery-items"
                    />
                  </div>
                  <div className="pd_galleryImageWrapper">
                    <img
                      src={currentProduct.image}
                      alt=""
                      className="pd__gallery-items"
                    />
                  </div>
                </div>
              </div>

              <div className="pd_detailContainer">
                <div className="pdd__detailWrapper">
                  <div className="pdd__title">{currentProduct.name}</div>
                  <div className="pdd__brand text--round">
                    {currentProduct.brand}
                  </div>
                  <div className="pdd__rating">
                    <Rating
                      value={currentProduct.rating}
                      text={currentProduct.numReviews}
                    />
                  </div>
                  <div className="pdd__price">${currentProduct.price}</div>

                  {/* Quantity */}
                  {currentProduct.countInStock > 0 ? (
                    <div>
                      <div className="qtyContainer">
                        <div className="qtyContainer__sub">
                          <div className="qtyText">Quantity</div>
                          <div className="qtyCounterContainer">
                            <div className="qtyCounter">
                              <button
                                className="btn btn--icon"
                                onClick={() => handleCounter("DECREASE")}
                              >
                                <BiMinus />
                              </button>
                              <div className="qtyLabel">{qty}</div>
                              <button
                                className="btn btn--icon"
                                onClick={() => handleCounter("INCREASE")}
                              >
                                <BiPlus />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <p className="pdd__description">
                    {currentProduct.description}
                  </p>

                  {currentProduct.countInStock ? (
                    <div className="pdd__btn">
                      <RoundButton
                        text="Add to cart"
                        icon={<BiCartAlt />}
                        theme="dark"
                        classes="btn--mr2"
                        onClick={handleAddToCart}
                      />
                      <RoundButton
                        text="Add Review"
                        icon={<BiSolidCreditCardFront />}
                        theme="dark"
                        classes="bgcolor--orange"
                      />
                    </div>
                  ) : (
                    <h1 className="pd__outOfStock">Out of stock !</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
