import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";

 const Payment = () => {
    
    const[city,setCity] = useState("")
    const[phone,setPhone] = useState("")
    const[details,setDetails] = useState("")
    const {cartId,setNumOfItems,setTotalPrice,setProducts} = useContext(cartContext)
    async function cashPayment() {
        const x = {
            shippingAddress:{
                details,
                phone,
                city,
                }
        };
        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                x,
                {
                    headers:{
                        token: localStorage.getItem("tkn"),
                    },
                }
            );
            setNumOfItems(0)
            setProducts([])
            setTotalPrice(0)
            toast.success(data.status);
        } catch (error) {
            toast.error("error in cash payment");
            console.log(error);
            
        }
    }

    async function onlinePayment() {
      
        const x = {
            shippingAddress:{
                details,
                phone,
                city,
                }
        };
        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
                x,
                {
                    headers:{
                        token: localStorage.getItem("tkn"),
                    },                 
                }
            );
           window.open(data.session.url)
            toast.success(data.status);
        } catch (error) {
            toast.error("error in cash payment");
            console.log(error);
            
        }   
    }

return(
<section className="py-10">
<div className="w-full md:w-[70%] mx-auto">
<div>
 {/* Details */}
 <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="details"
                id="details"
                className="block py-2 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-100 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                onChange={(e) => setDetails(e.target.value)}
              />
              <label
                htmlFor="details"
                className="peer-focus:font-medium absolute text-sm ps-2 pt-1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Details:
              </label>
            </div>
    {/* Phone */}
<div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block py-2 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-100 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setPhone(e.target.value)}
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm ps-2 pt-1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone:
              </label>
            </div>
    {/* City */}
<div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                name="city"
                id="city"
                className="block py-2 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-100 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                onChange={(e) => setCity(e.target.value)}
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm ps-2 pt-1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City:
              </label>
            </div> 

            <button
              type="button"
              onClick={cashPayment}
              className="focus:outline-none w-full mt-2 text-blue-900 ring-2 font-medium rounded-lg hover:text-black hover:bg-sky-200  px-5 py-1 me-2 mb-2 bg-white"
            >
             Pay now
            </button>
            <button
              type="button"
              onClick={onlinePayment}
              className="focus:outline-none w-full mt-2 hover:text-white ring-2 font-medium text-blue-900 rounded-lg px-5 py-1 me-2 mb-2 bg-slate-400 "
            >
             Online Pay
            </button>
            
</div>
</div>
</section>
)
};
export default Payment;