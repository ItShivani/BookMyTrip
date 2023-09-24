import React,{useState} from 'react'
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import "./list.css";
import { useLocation} from 'react-router-dom';
import {format} from 'date-fns'; 
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from "../../hooks/useFetch.js"

const List = () => {
  const location = useLocation()
  console.log(location)
  const [destination,setDestination] = useState(location.state.destination);
  const[date,setDate] = useState(location.state.date);
  const [openDate,setOpenDate] = useState(false);
  const [specs,setSpecs] = useState(location.state.specs)
  const [min,setMin] = useState(undefined);
  const [max,setMax] = useState(undefined);
  const { data, loading,error,reFetch} = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
  const handleClick =  () => {
    reFetch();
  }
  console.log("info i got ")
  console.log(data)
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
          <div className="listWrapper">
              <div className="listSearch">
                  <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input type="text" placeholder={destination}/>
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={()=>setOpenDate(!openDate)}>
                  {`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}
                </span>
                {openDate && <DateRange onChange={item=>setDate([item.selection])} minDate={new Date()} ranges={date}/>}
              </div>
              <div className="lsItem">
                <label>Filter</label>
                <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min Price <small>per night</small></span>
                  <input type="number" className="lsOptionInput" onChange={e=>setMin(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max Price <small>per night</small></span>
                  <input type="number" className="lsOptionInput" onChange={e=>setMax(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={specs.adult}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input type="number" min={0} className="lsOptionInput" placeholder={specs.children}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={specs.room}/>
                </div>
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
              </div>
              <div className="listResult">
                {loading ? "Loading" : 
                <>
                {data.map((item)=>(<SearchItem item={item} key={item._id}/>
                ))}
                </>}
              </div>
          </div>
      </div>
    </div>
  )
}

export default List
