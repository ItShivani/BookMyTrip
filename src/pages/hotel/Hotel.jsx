import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import "./hotel.css"
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { useState,useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch"
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [slideNumber,setSlideNumber] = useState(0);
  const [open,setOpen] = useState(false);
  const [openModal,setOpenModal] = useState(false)
  const {data,loading,error} = useFetch(`http://localhost:8800/api/hotels/find/${id}`)
  const { date,specs } = useContext(SearchContext);
  console.log(date)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(date[0].endDate, date[0].startDate);

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

  const handleClick = () => {
    if(user){
      setOpenModal(true)
    }
    else{
      navigate("/login")
    }
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
                  <h1>Perfect Stay for a {days}-night stay</h1>
                    <span>Located in the heart of the city this hotel has a rating of 8.9!</span>
                    <h2><b>${days*data.cheapestPrice*specs.room} </b>({days} nights)</h2>
                    <button onClick={handleClick}>Book now!</button>
              </div>
            </div>
          </div>
        </div>}
        <MailList/>
        <Footer/>
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel
