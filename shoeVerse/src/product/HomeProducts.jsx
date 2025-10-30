import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const products = [
  {
    id: 1,
    title: "Organized Desk Collection",
    desc: "Your desk will look neat and stylish with this collection.",
    img: "https://rukminim2.flixcart.com/image/704/844/xif0q/shoe/q/s/n/-original-imah25hq9y8t3ukf.jpeg?q=90&crop=false",
  },,
  {
    id: 2,
    title: "Organized Desk Collection",
    desc: "Your desk will look neat and stylish with this collection.",
    img: "https://redtape.com/cdn/shop/files/RLL0186_1_1324e335-513d-4206-8e5b-afcfa232da72.jpg?v=1754286442",
  },
  {
    id: 3,
    title: "Focus Collection",
    desc: "Be more productive with just the right tools for focus.",
    img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/91aefeeb-0efb-4387-b516-5fc4d9ed5709/WMNS+AIR+JORDAN+1+LOW.png",
  },
  {
    id: 4,
    title: "Minimalist Collection",
    desc: "Sleek, simple, and stylish designs that go with everything.",
    img: "https://image.made-in-china.com/202f0j00OTUYfsbSHBzk/Injection-New-Branded-Shoes-Women-Ins-Flyknit-Fashion-Casual-Sneakers.webp",
  },
];

export default function ProductCarousel() {
  return (
    <div className="w-full bg-white py-15 ">
      <h2 className="text-2xl font-bold text-center mb-10">
        Shop by Collection
      </h2>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        spaceBetween={20}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        loop={true}
        className="px-6"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition m-3">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600 text-sm">{product.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

