import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { format } from "date-fns";
import styled from "./transactionDashbroad.module.css";
import { useSearchParams } from "react-router-dom";

export default function TransactionDashboard() {
  const user = useSelector((state) => state.auth.user);
  const [transactions, setTransactions] = useState([]);

  // Trạng thái phân trang
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const pageSize = 20;

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL_ADMIN}/transaction/get-transactions?page=${page}&limit=${pageSize}`,
        {
          headers: {
            authorization: user["_id"],
          },
        }
      )
      .then((res) => {
        setTransactions(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [user, page, pageSize]);

  if (transactions.length === 0) {
    return <h2>No transactions available</h2>;
  }
  return (
    <div className={styled["transaction-container"]}>
      <div className={styled["transaction-title"]}>Your Transactions</div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, i) => (
            <tr key={transaction["_id"]}>
              <td>{(i + 1) / 10 >= 1 ? i + 1 : "0" + (i + 1)}</td>
              <td>{transaction.hotel.name}</td>
              <td>{transaction.room.join(", ")}</td>
              <td>
                {format(new Date(transaction.dateStart), "yyyy/MM/dd") +
                  " - " +
                  format(new Date(transaction.dateEnd), "yyyy/MM/dd")}
              </td>
              <td>{"$" + transaction.price}</td>
              <td>{transaction.payment}</td>
              <td>
                <span
                  className={
                    styled.tag + " " + styled[transaction.status.toLowerCase()]
                  }
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
