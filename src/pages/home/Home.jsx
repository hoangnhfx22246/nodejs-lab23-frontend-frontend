import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [hotels, setHotels] = useState({
    hotelsByCity: [],
    hotelsByType: [],
    topRatedHotels: [],
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_ADMIN}/hotels/homepage-info`)
      .then((response) => {
        setHotels({
          hotelsByCity: response.data.hotelsByCity,
          hotelsByType: response.data.hotelsByType,
          topRatedHotels: response.data.topRatedHotels,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />

      <Featured data={hotels.hotelsByCity} />
      <h1 className="homeTitle">Browse by property type</h1>
      <PropertyList data={hotels.hotelsByType} />
      <h1 className="homeTitle">Homes guests love</h1>
      <FeaturedProperties data={hotels.topRatedHotels} />
    </>
  );
};

export default Home;
