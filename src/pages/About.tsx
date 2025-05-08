import React from "react";
import { assets } from "../assets/assets";

const aboutSections = [
  {
    title: "Pushing The Comfort Zone",
    text: "Welcome to Online-Shop, your one-stop shop for quality, convenience, and unbeatable service. We're passionate about curating exceptional products and delivering them to your door, fast and affordably.",
    img: assets.about_image1,
  },
  {
    title: "Who We Are",
    text: "Rainydays was born out of a deep passion for the great outdoors. Our founders are nature enthusiasts who, like you, crave the exhilaration of hiking, exploring, skiing, camping, and canoeing. We understand the joy that comes from immersing oneself in the beauty of Mother Nature. But we also understand the unpredictability of weather conditions and the importance of being prepared for whatever adventure comes your way.",
    img: assets.about_image2,
  },
  {
    title: "Our Commitment",
    text: "Rainydays is committed to keeping you comfortable during your outdoor escapades. Our mid-range priced jackets are designed with a focus on durability, functionality, and style. We are driven by the belief that every outdoor enthusiast deserves to experience the beauty of nature without compromising on comfort and protection.",
    img: assets.about_image3,
  },
  {
    title: "Quality Meets Affordability",
    text: "We understand the importance of balancing quality with affordability. Our rain jackets are crafted with the finest materials, ensuring they withstand the rigors of outdoor life, while still remaining accessible to a wide range of adventure seekers. We want you to invest in a rain jacket that lasts for years, accompanying you on countless journeys through the wilderness.",
    img: assets.about_image4,
  },
  {
    title: "Join Our Community",
    text: "We invite you to join the Rainydays community - a community of like-minded individuals who share your passion for the outdoors. Here, you'll find tips, inspiration, and stories from fellow adventurers. We encourage you to share your own experiences and connect with others who understand the joy of exploring the world. Thank you for choosing Rainydays - where nature and comfort come together.",
    img: assets.about_image5,
  },
];

const About = () => {
  return (
    <div className="max-w-6xl mx-auto py-10  bg-neutral/20">
      <div className="text-2xl my-4 mx-auto  p-4 bg-primary text-text">
        <p>
          ABOUT <span className="text-background font-medium">US</span>
        </p>
      </div>
      {aboutSections.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-8 mb-12 ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <img
            src={section.img}
            alt={section.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg"
          />
          <div className="md:w-1/2 px-4 ">
            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
            <p className="text-text md:text-lg ">{section.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
