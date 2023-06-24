import { Link } from "react-router-dom";
import "./card.scss";
import { StarIcon } from "@heroicons/react/20/solid";
const Card = ({ item }) => {
  return (
    <Link
      to={`/products/product/${item._id}`}
      style={{ overflow: "hidden" }}
      className="border border-gray-400 p-1 rounded-md"
    >
      <div className="card">
        <div className="image">
          {/* {item.discountPercentage && (
            <span>{discountPercentage}% discount</span>
          )} */}
          <img src={item.images[0].url} alt="mainImg" className="mainImg" />
          <img src={item.images[1].url} alt="secondImg" className="secondImg" />
        </div>
        <h2 className="min-h-[45px]">{item.title}</h2>
        <div className="flex justify-between items-center">
          <div>
            <h3
              style={{ fontSize: "15px" }}
              className="line-through text-gray-500"
            >
              ${item.price}
            </h3>
            <h3 className="text-xl">
              ${Math.round(item.price * (1 - item.discountPercentage / 100))}
            </h3>
          </div>
          <span className="flex-col justify-center items-center gap-1">
            <StarIcon className="w-6 h-6 text-gray-500" />
            <s className="text-sm">{item.rating}</s>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
