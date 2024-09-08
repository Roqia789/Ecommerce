import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {

  const {products,totalPrice,updateCount,deleteItem,clearCart} = useContext(cartContext);

  return (
    <section className="py-8">
      <div className=" md:w-[80%] xs:w-[70%] mx-auto bg-slate-100 p-5">
        <h1 className="text-3xl my-3 ms-2">Cart Shop</h1>
        {products?.length !=0 ? (<>
          <div className="flex flex-wrap justify-between">
          <h2 className="text-lime-500 ms-2 mt-3 text-1xl font-mono"><span className="text-black">
          totalPrice:</span> {totalPrice}{" "}
          </h2>
          <Link
                     to="/payment"
                      className="focus:outline-none w-39 mt-4 text-white ring-2 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 bg-blue-900"
                    >
                      Check Out
                    </Link>
          </div>
       {products?.map((item, idx) => <>
        <div key={idx} className="flex flex-wrap justify-center items-center border-b-2 border-gray-300">
          <div className="w-1/6 p-5">
          <img src= {item.product.imageCover} className="w-full" alt="" />
          </div>
          <div className="w-4/6 p-5">
          <h2 className="mb-1 mt-3 text-1xl font-semibold">{item.product.title}</h2>
          <h2 className="mb-2 text-1xl text-lime-600">{item.price} EGP</h2>
          <button
          onClick={() => deleteItem(item.product.id)}
              type="button"
              className=" text-red-600 font-medium text-sm pe-5 py-2.5 mb-2"
           >
            <i className="fa-solid fa-trash me-1"></i>
            Remove
            </button>
          </div>
          <div className="w-1/6 p-5">
          <div className="flex justify-between items-center">
          <button
              type="button"
              onClick={() => updateCount( item.product.id, item.count +1 )}
              className="focus:outline-none w-8 mt-4 text-black ring-2 font-medium rounded-lg text-sm py-2 my-2 ring-lime-500"
           >
            +  
            </button>
            <h2 className="mx-2">{ item.count }</h2>
            <button
              type="button"
              onClick={() => updateCount( item.product.id, item.count -1)}
              disabled = {item.count == 0 ? true : false}
              className={`${item.count == 0 ? "disabled:opacity-25" : ""} focus:outline-none w-8 mt-4 text-black ring-2 font-medium rounded-lg text-sm py-2 my-2 ring-lime-500`}
           >
            -
            </button>
          </div>
          </div>
        </div>
       </>)}
        </>):(<div>
          <h2 className="text-3xl my-3 ms-2 text-gray-500">Your cart is empty</h2>
        </div>)}
       <div className="flex flex-wrap justify-center items-center mt-2">
       <button
                      type="button"
                      onClick={clearCart}
                      className="focus:outline-none w-39 mt-4 text-gray-900 ring-2 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 ring-lime-500"
                    >
                      Clear Your Cart
                    </button>
       </div>
      </div>
    </section>
  );
}