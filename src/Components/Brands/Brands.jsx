import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";

const Brands = () => {

    function getAllBrands() {
        const options = {
          method: "GET",
          url: "https://ecommerce.routemisr.com/api/v1/brands",
        };
        return axios.request(options);
      }

    let { data, isLoading } = useQuery({
        queryKey: ["brands"],
        queryFn: getAllBrands,
        staleTime: 50000,
        gcTime: 10000,         
      });    console.log(data);

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
        <div className="w-full md:w-[70%] m-auto">
            <h1 className="text-green-600 text-4xl font-semibold text-center mb-4">All Brands</h1>
          <div className="flex flex-wrap justify-center items-center">
            {data?.data.data.map((brands, idx) => (
              <>
                <div
                  key={idx}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                >
                <div className="hover:shadow-md hover:duration-[1000ms] hover:shadow-green-900">
                  <div className="mt-2 overflow-hidden relative h-[240px] border border-gray-300">
                    <img
                      src={brands.image}
                      alt="img"
                      className="w-[100%]"
                    />
                    
                    <div className="bg-white h-[70px] absolute bottom-0 start-0 end-0">
                        <h2 className="text-center pt-6">
                      {brands.name}
                    </h2>
                    </div>

                  </div>
</div>
                  
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
     );
}

export default Brands;