import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";

const Category = () => {
  function getAllCategories() {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/categories",
    };
    return axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["Category"],
    queryFn: getAllCategories,
    staleTime: 50000,
    gcTime: 10000,
  });
  console.log(data);

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
        <div className="flex flex-wrap justify-center items-center">
          {data?.data.data.map((category, idx) => (
            <>
              <div key={idx} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
                <div className="hover:shadow-md hover:duration-[1000ms] hover:shadow-green-900">
                  <div className="overflow-hidden relative h-[400px] border border-gray-300">
                    <img src={category.image} alt="img" className="w-[100%]" />

                    <div className="bg-white h-[70px] absolute bottom-0 start-0 end-0">
                      <h2 className="text-green-700 text-center text-2xl font-semibold pt-3">
                        {category.name}
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
};

export default Category;
