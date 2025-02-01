import "./hotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Booking from "../../components/booking/Booking";

const Hotel = () => {
  const [showBooking, SetShowBooking] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const params = useParams();

  const [hotelDetail, setHotelDetail] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_ADMIN}/hotels/hotel/${params.id}`)
      .then((res) => {
        setHotelDetail(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <>
      {open && (
        <div className="slider">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="close"
            onClick={() => setOpen(false)}
          />
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="arrow"
            onClick={() => handleMove("l")}
          />
          <div className="sliderWrapper">
            <img
              src={hotelDetail.photos[slideNumber]}
              alt=""
              className="sliderImg"
            />
          </div>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className="arrow"
            onClick={() => handleMove("r")}
          />
        </div>
      )}
      <div className="hotelWrapper">
        <h1 className="hotelTitle">{hotelDetail.name}</h1>
        <div className="hotelAddress">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{hotelDetail.address}</span>
        </div>
        <span className="hotelDistance">
          Excellent location – {hotelDetail.distance}m from center
        </span>
        <span className="hotelPriceHighlight">
          Book a stay over ${hotelDetail.cheapestPrice} at this property and get
          a free airport taxi
        </span>
        <div className="hotelImages">
          {hotelDetail?.photos?.map((photo, i) => (
            <div className="hotelImgWrapper" key={i}>
              <img
                onClick={() => handleOpen(i)}
                src={photo}
                alt=""
                className="hotelImg"
              />
            </div>
          ))}
        </div>
        <div className="hotelDetails">
          <div className="hotelDetailsTexts">
            <h1 className="hotelTitle">{hotelDetail.name}</h1>
            <p className="hotelDesc">{hotelDetail.desc}</p>
          </div>
          <div className="hotelDetailsPrice">
            <h1>Perfect for a 9-night stay!</h1>
            <h2>
              <b>${hotelDetail.cheapestPrice}</b> (1 nights)
            </h2>
            <button
              onClick={() => {
                SetShowBooking((prevState) => !prevState);
              }}
            >
              Reserve or Book Now!
            </button>
          </div>
        </div>
      </div>
      {showBooking && <Booking idHotel={hotelDetail["_id"]} />}
    </>
  );
};

export default Hotel;
