import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategoriesSlider/CategoriesSlider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";

function Home() {

  const {addProductToCart} = useContext(cartContext);
  let { addProductToWishlist, getLoggedUserWishlist } =
  useContext(wishListContext);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await getLoggedUserWishlist();
        if (response.data?.status === "success") {
          const ids = response.data.data.map((item) => item.id);
          setWishlistIds(ids); // Set the wishlistIds state with fetched IDs
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }
    fetchWishlist();
  }, [getLoggedUserWishlist]);

  async function addToWishlist(id) {
    setCurrentId(id);
    setWishlistLoading(true);
    let response = await addProductToWishlist(id);

    if (response.data.status === "success") {
      setWishlistIds([...wishlistIds, id]); // Add new item to the wishlistIds state
      toast.success(response.data.message);
      setWishlistLoading(false);
    } else {
      toast.error(response.data.message);
      setWishlistLoading(false);
    }
  }

  async function addProduct(id) {
  const data = await addProductToCart(id);
  if (data) {
    toast.success(data.message);
  }else{
    toast.error("error")
  }
  }

  function getAllProducts() {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/products",
    };
    return axios.request(options);
  }

  //isFetching
  //error
  let { data, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: getAllProducts,
    staleTime: 50000,
    gcTime: 10000,
  });
  // const [data, isLoading] = useQuery("products", getAllProducts, {
  //   // refetchOnMount:false
  //   // refetchInterval:2000
  //   // cacheTime:500
  //   enabled: true,
  // });

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-slate-200">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <>
      <section className="py-8">
        <div>
          <HomeSlider />
          <CategorySlider />
         
            <form className="w-[70%] mx-auto py-5">
              <label
                to="default-search"
                className="mb-2 text-sm font-medium text-gray-400 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-full h-3 text-gray-400 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full h-8 p-4 ps-10 text-sm text-white-900 border border-white-300 rounded-lg bg-white-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search....."
                  required
                />
              </div>
            </form>
         

          <div className="w-[70%] mx-auto flex flex-wrap justify-center items-center">
            {data?.data.data.map((product, idx) => (
              <>
                <div
                  key={idx}
                  className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4"
                >
                 
                 <div className="p-4 hover:shadow-sm hover:duration-[1000ms] hover:shadow-green-900">
                  <Link to={`/details/${product.id}`}>
                    <img
                      src={product.imageCover}
                      alt="img"
                      className="w-full"
                    />
                    <h2 className="text-green-600 mt-2 mb-2">
                      {product.category.name}
                    </h2>
                    <h2 className="text-sm mt-1">
                      {product.title.split("").slice(0, 13).join("")}
                    </h2>
                    <div className="flex flex-wrap justify-between items-center text-sm mt-1">
                      <div>
                        <h4>{product.price} EGP</h4>
                      </div>
                      <div>
                        <h4>
                          {" "}
                          <i className="fa-solid fa-star text-yellow-400 mr-2"></i>{" "}
                          {product.ratingsAverage}
                        </h4>
                      </div>
                    </div>
                    </Link>
                    <div className="relative mb-3">
                    <h4 className="absolute top-0 end-0">
                        <i  onClick={() => addToWishlist(product.id)} className={`${
                         wishlistIds.includes(product.id)
                          ? "fa-solid text-red-600 fa-heart"
                          : "fa-regular fa-heart"
                      }`}></i>
                        </h4>
                    </div>
                    <button
                    onClick={() => addProduct(product.id)}
                      type="button"
                      className="focus:outline-none w-full mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default Home;
