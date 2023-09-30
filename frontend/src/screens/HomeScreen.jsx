import "../css/homescreen.css";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import Product from "../components/Product";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <ErrorMessage variant="danger">{error?.data.message}</ErrorMessage>
      ) : (
        <div className="main--container">
          <h1>Latest Products</h1>
          <div className="product__container">
            <div className="product__grid grid--rx4 grid--rx3 grid--rx2 grid--rx1">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
