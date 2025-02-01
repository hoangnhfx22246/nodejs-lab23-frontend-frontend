import { useNavigate } from "react-router-dom";
import "./featuredProperties.css";
import { Link } from "react-router-dom";

const FeaturedProperties = ({ data }) => {
  return (
    <div className="fp">
      {data.map((i) => (
        <div className="fpItem" key={i["_id"]}>
          <img src={i.photos[0]} alt="" className="fpImg" />
          <span className="fpName">
            <Link to={`/hotels/${i["_id"]}`}>{i.name}</Link>
          </span>
          <span className="fpCity">{i.city}</span>
          <span className="fpPrice">Starting from ${i.cheapestPrice}</span>
          {/* <div className="fpRating">
            <button>{i.rating}</button>
            <span>Excellent</span>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
