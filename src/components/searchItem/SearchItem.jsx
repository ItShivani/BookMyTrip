import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
    <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}</span>
        <span className="siTaxiOp">Taxis available</span>
        <span className="siSubstitle">Double Bed with Air conditioning</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">Get this deal today!</span>
    </div>
    <div className="siDetails">
        {item.rating && <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
            <span className="siPrice">${item.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and other fees</span>
            <Link tp={`/hotels/${item._id}`}>
              <button className="siCheckButton">Check availability</button>
            </Link>
        </div>
    </div>
    </div>
  )
}

export default SearchItem
