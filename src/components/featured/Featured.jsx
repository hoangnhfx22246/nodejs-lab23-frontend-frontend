import "./featured.css";

const Featured = ({ data }) => {
  const countHaNoi = data.find((i) => i["_id"] === "Ha Noi")?.count || 0;
  const countHCM = data.find((i) => i["_id"] === "Ho Chi Minh")?.count || 0;
  const countDaNang = data.find((i) => i["_id"] === "Da Nang")?.count || 0;

  return (
    <div className="featured">
      <div className="featuredItem">
        <img src="/images/Ha_Noi.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{countHaNoi} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src="/images/HCM.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{countHCM} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="/images/Da_Nang.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{countDaNang} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
