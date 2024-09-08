import Slider from "react-slick";
import slide1 from "../../Imgs/home component/slide1.jpg";
import slide2 from "../../Imgs/home component/slide2.jpg";
import slide3 from "../../Imgs/home component/slide3.jpg";
import slide4 from "../../Imgs/home component/slide4.jpg";
import slide5 from "../../Imgs/home component/slide5.jpg";

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
  };
  return (
   <section className="container pb-5 px-4 w-2/3 m-auto">
     <div className="flex flex-wrap justify-center items-center">
      <div className="w-1/3">
      <Slider {...settings}>
      <div>
        <img src={slide1} className="w-full h-[490px]" alt="img" />
      </div>
      <div>
        <img src={slide2} className="w-full h-[290px]" alt="img" />
      </div>
      <div>
        <img src={slide3} className="w-full h-[400px]" alt="img" />
      </div>
    </Slider>
      </div>
      <div className="w-1/3">
      <div>
        <img src={slide4} className="w-full h-[250px]" alt="img" />
      </div>
      <div>
        <img src={slide5} className="w-full h-[250px]" alt="img" />
      </div>
      </div>
     </div>
   </section>
  );
}