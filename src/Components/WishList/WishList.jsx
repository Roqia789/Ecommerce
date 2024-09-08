import { useContext } from "react";
import { wishListContext } from "../../Context/WishListContext";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";

export default function WishList() {

  const { getLoggedUserWishlist, deleteWishlistItem, wishlistInfo } =
  useContext(wishListContext);
const [wishlistDetails, setWishlistDetails] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [isLoadingForRemove, setIsLoadingForRemove] = useState(false);
const [currentId, setCurrentId] = useState(0);
const wishlistIsLoading = wishlistInfo.isLoading;
const { addProductToCart, setNumOfItems} =
  useContext(cartContext);
const [cartLoading, setCartLoading] = useState(false);

const getWishlistItem = useCallback(async () => {
  setIsLoading(true);
  const response = await getLoggedUserWishlist();
  if (response.data?.status === "success") {
    setWishlistDetails(response.data.data);
  }
  setIsLoading(false);
}, [getLoggedUserWishlist]);

const deleteItem = useCallback(
  async (id) => {
    setCurrentId(id);
    setIsLoadingForRemove(true);
    const response = await deleteWishlistItem(id);
    if (response.data.status === "success") {
      setWishlistDetails((prevDetails) =>
        prevDetails.filter((item) => item.id !== id)
      );
    } else {
      toast.error("Error removing item");
    }
    setIsLoadingForRemove(false);
  },
  [deleteWishlistItem]
);

async function addProduct(id) {
  const response = await addProductToCart(id);
  if (response.data.status === "success") {
    setNumOfItems(response.data.numOfCartItems);
    toast.success(response.data.message);
     // Remove the item from the wishlist
     await deleteWishlistItem(id);

     // Update the wishlist details state to remove the item
     setWishlistDetails((prevDetails) =>
       prevDetails.filter((item) => item.id !== id)
     );
 
     setCartLoading(false);
  }else{
    toast.error(response.data.message);
    setCartLoading(false);
  }
}

useEffect(() => {
  getWishlistItem();
}, [getWishlistItem]);

if (wishlistIsLoading || isLoading) {
  return <div className="spinner"></div>;
}

  return (
    <section className="py-8">
      <div className=" md:w-[80%] xs:w-[70%] mx-auto bg-slate-100 p-5">
        <h1 className="text-3xl my-3 ms-2">My wish List</h1>
        <> {wishlistDetails?.length > 0 ? (
          <div>
            {wishlistDetails.map((product) => ( 
        <div  key={product.id} className="flex flex-wrap justify-center items-center border-b-2 border-gray-300">
         
          <div className="w-1/6 p-5">
          <img src= {product.imageCover} className="w-full" alt={product.title || "Product Image"} />
          
          </div>
          <div className="w-4/6 p-5">
          <h2 className="mb-1 mt-3 text-1xl font-semibold"> 
            {product.title?.split(" ").slice(0, 2).join(" ") || "No Title"}
            </h2>
          <h2 className="mb-2 text-1xl text-lime-600">{product.price} EGP</h2>
          <button         
          onClick={() => deleteItem(product.id)}
              type="button"
              className=" text-red-600 font-medium text-sm pe-5 py-2.5 mb-2"
           >
            <i className="fa-solid fa-trash me-1"></i>
            {isLoadingForRemove && currentId === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Remove"
                  )}
            </button>
          </div>
          <div className="w-1/6 p-5">
          <div className="flex justify-between items-center">
          <button
                      type="button"
                      onClick={() => addProduct(product.id)}
                      className="focus:outline-none w-39 mt-4 text-gray-900 ring-2 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 ring-lime-500"
                    >
                       {cartLoading && currentId === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                    </button>
          </div>
          </div>
        </div>
         ))}
        </div> 
        
        ) : (
          <h1 className="text-1xl text-red-800 font-bold text-center my-8">
            There are no products to show
          </h1>
      )}
      </>

      </div>
    </section>
  );
}