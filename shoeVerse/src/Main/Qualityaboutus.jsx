import React from 'react'
import { FaTshirt, FaCalendarAlt, FaGift, FaLeaf } from "react-icons/fa";

function Qualityaboutus() {
     const features = [
    {
      icon: <FaTshirt className="text-black text-4xl" />,
      title: "Free returns",
      desc: "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
    },
    {
      icon: <FaCalendarAlt className="text-black text-4xl" />,
      title: "Same day delivery",
      desc: "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
    },
    {
      icon: <FaGift className="text-black text-4xl" />,
      title: "All year discount",
      desc: "Looking for a deal? You can use the code 'ALLYEAR' at checkout and get money off all year round.",
    },
    {
      icon: <FaLeaf className="text-black text-4xl" />,
      title: "For the planet",
      desc: "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
    },
  ];
  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-4">{item.icon}</div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Qualityaboutus