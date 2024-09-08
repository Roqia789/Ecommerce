import axios from "axios";
import { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

function Details() {
  const [loader, setLoader] = useState(false)

  const {addProductToCart} = useContext(cartContext);
  
  async function addProduct() {
    setLoader(true);
  const data = await addProductToCart(id);
  if (data) {
    toast.success(data.message);
    setLoader(false)
  }else{
    toast.error("error")
    setLoader(false)
  }
  }
  


    const {id} = useParams();
    async function getProduct(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const {data, isLoading} = useQuery(`product${id}`,getProduct)
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
        <section className="py-8">
            <div className="w-full md:w-[80%] mx-auto">
                <div className="flex flex-wrap justify-center items-center">
                    <div className="md:w-1/3 w-full p-5">
                    <img src={data?.data.data.imageCover} className="w-full" alt="" />
                    </div>
                    <div className="md:w-2/3 w-full p-5">
                    <div>
                        <h2 className="text-2xl mb-3 font-semibold">{data?.data.data.title}</h2>
                        <p className="text-1xl mb-3">{data?.data.data.description}</p>
                        <h2 className="text-1xl text-green-600 mb-3 font-mono">
                            {data?.data.data.category.name}
                            </h2>
                        <div className="flex flex-wrap justify-between items-center mt-3">
                      <div>
                        <h4>{data?.data.data.price} EGP</h4>
                      </div>
                      <div>
                        <h4>
                          {" "}
                          <i className="fa-solid fa-star text-yellow-400 mr-2"></i>{" "}
                          {data?.data.data.ratingsAverage}
                        </h4>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addProduct}
                      className="focus:outline-none w-full mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      {loader? (<i className="fa-solid fa-spinner fa-spin text-white"></i>) : ("Add to Cart")}
                    </button>
                    </div>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Details;