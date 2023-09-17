import "./header.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faB, faBed,faCar,faPlane,faTaxi,faCalendarDays,faPerson} from "@fortawesome/free-solid-svg-icons";
import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {useState} from 'react';
import {format} from 'date-fns';
import {useNavigate} from 'react-router-dom';


const Header = ({type}) => {
    const [destination,setDestination] = useState("");
    const [openDate,setOpenDate] = useState(false);
    const [date,setDate] = useState([
        {
            startDate:new Date(),
            endDate:new Date(),
            key:'selection'
        }
    ]);
    const [openSpecs,setOpenSpecs] = useState(false);
    const[specs,setSpecs] = useState({
        adult:1,
        children:0,
        room:1
    })

    const handleSpec = (name,operation) => {
        setSpecs((prev) => {
            return{
                ...prev,
                [name]:operation=="i"? specs[name]+1:specs[name]-1,
            };
        });
    };

    const navigate = useNavigate();
    const handleSearch=()=>{
        navigate("/hotels",{state:{destination,date,specs}})
    }
  return (
    <div className="header">
        <div className={type==="list"?"headerContainer listMode":"headerContainer"}>
        <div className="headerList">
            <div className="headerListItem active">
                <FontAwesomeIcon icon={faBed}/>
                <span>Hotels</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />
                <span>Flights</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />
                <span>Car rentals</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={faBed} />
                <span>What to do</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={faTaxi} />
                <span>Cabs</span>
            </div>
        </div>
        {type !="list" && 
        <>
        <h1 className="headerTitle">Save up with our discounts on your upcoming trip!</h1>
        <p className="headerDesc">Sign up today for an additional 10% off your booking</p>
        <button className="headerBtn">Sign in/Sign up</button>
        <div className="headerSearch">
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                <input type="text" placeholder="Place" className="headerSearchInput" onChange={e=>setDestination(e.target.value)}/>
            </div>
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
                {openDate && <DateRange editableDateInputs={true} onChange={item=>setDate([item.selection])} moveRangeOnFirstSelection={false} ranges={date} className="date" minDate={new Date()}/>}
            </div>
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                <span onClick={()=>setOpenSpecs(!openSpecs)} className="headerSearchText">{`${specs.adult} adult | ${specs.children} children | ${specs.room} room`}</span>
                {openSpecs && <div className="options">
                    <div className="optionItem">
                        <span className="optionText">Adult</span>
                        <div className="optionCounter">
                            <button disabled={specs.adult<=1} className="optionCounterButton" onClick={()=>handleSpec("adult","d")}>-</button>
                            <span className="optionCounterNumber">{specs.adult}</span>
                            <button className="optionCounterButton" onClick={()=>handleSpec("adult","i")}>+</button>
                        </div>
                    </div>
                    <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div className="optionCounter">
                            <button disabled={specs.children==0} className="optionCounterButton" onClick={()=>handleSpec("children","d")}>-</button>
                            <span className="optionCounterNumber">{specs.children}</span>
                            <button className="optionCounterButton" onClick={()=>handleSpec("children","i")}>+</button>
                        </div>
                    </div>
                    <div className="optionItem">
                        <span className="optionText">Room</span>
                        <div className="optionCounter">
                            <button disabled={specs.room<=1} className="optionCounterButton" onClick={()=>handleSpec("room","d")}>-</button>
                            <span className="optionCounterNumber">{specs.room}</span>
                            <button className="optionCounterButton" onClick={()=>handleSpec("room","i")}>+</button>
                        </div>
                    </div>
                </div>}
            </div>
            <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>Search</button>
            </div>
        </div>
        </>}
        </div>
    </div>
  )
}

export default Header
