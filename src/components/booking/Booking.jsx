import { DateRange } from "react-date-range";
import styled from "./Booking.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { format, differenceInDays } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Booking({ idHotel }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_URL_ADMIN}/rooms/available-room-by-date`, {
        idHotel,
        startDate: format(date[0].startDate, "yyyy-MM-dd"),
        endDate: format(date[0].endDate, "yyyy-MM-dd"),
      })
      .then((res) => {
        setRooms(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date, idHotel]);

  const handlerCheckRoomNumber = (roomNumber) => {
    setRoomNumbers((prevState) => {
      const existingRoomIndex = prevState.indexOf(roomNumber);

      if (existingRoomIndex !== -1) {
        // Xóa phần tử tại vị trí 'existingRoomIndex'
        return [
          ...prevState.slice(0, existingRoomIndex),
          ...prevState.slice(existingRoomIndex + 1),
        ];
      } else {
        // Thêm 'roomNumber' vào mảng nếu nó chưa có
        return [...prevState, roomNumber];
      }
    });
  };
  // tính toán totalBill
  // Nếu startDate và endDate là cùng một ngày, mặc định totalDays sẽ là 1
  const totalDays = differenceInDays(date[0].endDate, date[0].startDate) || 1;
  const totalBill = rooms.reduce((sum, room) => {
    sum += room.roomNumbers.reduce((s, rn) => {
      if (roomNumbers.includes(rn)) {
        s += room.price * totalDays;
      }
      return s;
    }, 0);

    return sum;
  }, 0);
  console.log(rooms, roomNumbers);

  // * submitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (roomNumbers.length === 0 || totalBill === 0) {
      alert("Please select room number!!");
      return;
    }
    axios
      .post("${process.env.REACT_APP_URL_ADMIN}/transaction/add-new", {
        user: {
          _id: user["_id"],
          fullName: formData.get("fullName"),
          phoneNumber: formData.get("phoneNumber"),
          email: formData.get("email"),
        },
        hotel: idHotel,
        room: [...roomNumbers],
        dateStart: format(date[0].startDate, "yyyy-MM-dd"),
        dateEnd: format(date[0].endDate, "yyyy-MM-dd"),
        price: totalBill,
        payment: formData.get("paymentMethod"),
      })
      .then((res) => {
        navigate("/transactions");
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className={styled["booking-container"]} onSubmit={submitHandler}>
      <div className={styled["booking-form"]}>
        <div>
          <div className={styled["booking-title"]}>Dates</div>
          <div>
            <DateRange
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              ranges={date}
            />
          </div>
        </div>
        <div className={styled["booking-form__input"]}>
          <div className={styled["booking-title"]}>Reserve Info</div>
          <div>
            <label htmlFor="fullName">Your Full Name:</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              defaultValue={user.fullName}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              defaultValue={user.email}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Your Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              defaultValue={user.phoneNumber}
              required
            />
          </div>
          <div>
            <label htmlFor="cartNumber">Your Identity Card Number:</label>
            <input
              type="text"
              name="cartNumber"
              id="cartNumber"
              placeholder="Card Number"
            />
          </div>
        </div>
      </div>
      <div className={styled["booking-rooms"]}>
        <div className={styled["booking-title"]}>Select Rooms</div>
        <div className={styled["booking-rooms__rooms"]}>
          {rooms.length > 0 &&
            rooms.map((room) => (
              <div className={styled["booking-rooms__room"]} key={room["_id"]}>
                <div>
                  <div className={styled["booking-rooms__room__name"]}>
                    {room.title}
                  </div>
                  <div className={styled["booking-rooms__room__desc"]}>
                    {room.desc}
                  </div>
                  <div className={styled["booking-rooms__room__peoples"]}>
                    Max people: <span>{room.maxPeople}</span>
                  </div>
                  <div className={styled["booking-rooms__room__price"]}>
                    ${room.price}
                  </div>
                </div>
                <div>
                  {room.roomNumbers.length > 0 &&
                    room.roomNumbers.map((rn) => (
                      <div key={rn}>
                        <label htmlFor={rn}>{rn}</label>
                        <input
                          type="checkbox"
                          name={rn}
                          value={rn}
                          id={rn}
                          onChange={(e) => {
                            handlerCheckRoomNumber(Number(e.target.value));
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={styled["booking-actions"]}>
        <div className={styled["booking-title"]}>Total Bill: ${totalBill}</div>
        <div>
          <select name="paymentMethod" id="paymentMethod" required>
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <button>Reserve Now</button>
        </div>
      </div>
    </form>
  );
}
