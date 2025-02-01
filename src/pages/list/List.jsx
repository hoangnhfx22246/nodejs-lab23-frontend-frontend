import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import axios from "axios";

const List = () => {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [destination, setDestination] = useState(
    location.state?.destination ? location.state.destination : ""
  );
  const [date, setDate] = useState(
    location.state?.date
      ? location.state.date
      : [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        ]
  );
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(
    location.state?.options
      ? location.state.options
      : {
          adult: 1,
          children: 0,
          room: 1,
        }
  );

  const handleSearch = async () => {
    const searchData = {
      destination,
      date: {
        startDate: format(date[0].startDate, "yyyy-MM-dd"),
        endDate: format(date[0].endDate, "yyyy-MM-dd"),
      },
      options,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_ADMIN}/hotels/search`,
        searchData
      );
      setHotels(response.data.results);

      // Xử lý kết quả tìm kiếm hoặc cập nhật state theo nhu cầu của bạn
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="listContainer">
      <div className="listWrapper">
        <div className="listSearch">
          <h1 className="lsTitle">Search</h1>
          <div className="lsItem">
            <label>Destination</label>
            <input
              placeholder={destination}
              type="text"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="lsItem">
            <label>Check-in Date</label>
            <span onClick={() => setOpenDate(!openDate)}>{`${format(
              date[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
            {openDate && (
              <DateRange
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
              />
            )}
          </div>
          <div className="lsItem">
            <label>Options</label>
            <div className="lsOptions">
              {/* <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min price <small>per night</small>
                </span>
                <input type="number" className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max price <small>per night</small>
                </span>
                <input type="number" className="lsOptionInput" />
              </div> */}
              <div className="lsOptionItem">
                <span className="lsOptionText">Adult</span>
                <input
                  type="number"
                  min={1}
                  className="lsOptionInput"
                  placeholder={options.adult}
                  onChange={(e) =>
                    setOptions((prevState) => ({
                      ...prevState,
                      adult: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Children</span>
                <input
                  type="number"
                  min={0}
                  className="lsOptionInput"
                  placeholder={options.children}
                  onChange={(e) =>
                    setOptions((prevState) => ({
                      ...prevState,
                      children: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Room</span>
                <input
                  type="number"
                  min={1}
                  className="lsOptionInput"
                  placeholder={options.room}
                  onChange={(e) =>
                    setOptions((prevState) => ({
                      ...prevState,
                      room: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="listResult">
          {hotels.map((hotel) => (
            <SearchItem
              key={hotel["_id"]}
              id={hotel["_id"]}
              name={hotel.name}
              distance={hotel.distance + "m"}
              type={hotel.type}
              description={hotel.desc}
              price={hotel.cheapestPrice}
              rate={hotel.rating}
              // rate_text={hotel.rating}
              img_url={hotel.photos[0]}
              // tag={hotel.address}
              tag={hotel.featured && "featured"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
