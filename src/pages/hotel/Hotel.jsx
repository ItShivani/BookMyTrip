import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import "./hotel.css"
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch"


const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [slideNumber,setSlideNumber] = useState(0);
  const [open,setOpen] = useState(false);

  const {data,loading,error} = useFetch(`http://localhost:8800/api/hotels/find/${id}`)

  const handleOpen =(i) => {
    setSlideNumber(i);
    setOpen(true);
  }

  const handleMove =(direction) => {
    let newSlideNumber;
    if(direction==="l"){
      newSlideNumber = slideNumber === 0 ? 2 : slideNumber - 1;
    }
    else{
      newSlideNumber = slideNumber === 2 ? 0 : slideNumber+1;
    }
    setSlideNumber(newSlideNumber);
  }
  return (
    <div>
        <Navbar/>
        <Header type="list"/>
        {loading ? "Loading" : <div className="hotelContainer">
          {open && <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")}/>
          </div>}
          <div className="hotelWrapper">
            <button className="bookNow">Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot}/>
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">{data.distance}</span>
            <span className="hotelPriceHighlight">Book now for ${data.cheapestPrice}!</span>
            <div className="hotelImages">
              {data.photos?.map((photo,i)=>(
                <div className="hotelImgWrapper">
                  <img onClick={()=>handleOpen(i)} src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails"> 
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                  <h1>Perfect Stay</h1>
                    <span>Located in the heart of the city this hotel has a rating of 8.9!</span>
                    <h2><b>$550 </b>(3 nights)</h2>
                    <button>Book now!</button>
              </div>
            </div>
          </div>
        </div>}
        <MailList/>
        <Footer/>
    </div>
  )
}

export default Hotel
