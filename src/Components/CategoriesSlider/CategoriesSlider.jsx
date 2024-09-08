import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

function CategorySlider() {

    async function getAllCategory(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    const {data} = useQuery("categorySlider",getAllCategory)
    console.log(data);
    

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay:false,
    arrows:false,
  };
  return (
    <div className="slider-container my-5 ">
      <Slider {...settings}>
        {data?.data.data.map(function (item,idx) {
            return <div key={idx}>
                <div className="overflow-hidden h-[200px]">
                <img src={item.image} className="w-full" alt="img" />
                </div>
                <h1 className="text-2xl font-semibold text-zinc-800">{item.name}</h1>
            </div>
        })}   
      </Slider>
    </div>
  );


}

export default CategorySlider;