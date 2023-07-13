import React, { useState } from 'react'
import "../assets/Search.css"
import search_icon from "../images/icons8-search-60.png"


export default function Search(props) {
  const[search,setSearch]=useState("");
  const[stockprice,setStockprice]=useState([]);
  const[monthslabel,setMonthslabel]=useState([]);
  function parse_data_month(){

  }
  function search_result(result){
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_Monthly&symbol=${result}&interval=5min&apikey=${process.env.REACT_APP_STOCK_KEY}`)
    .then(response =>{
      return response.json()
    })
    .then(data=>{
      console.log(data);
      console.log("here:", data["Monthly Time Series"]);
      let month;
      let count=0;
      let months_arr=[];
      let stock_value=[];
      let value;
      for(month in data["Monthly Time Series"]){
        if(count==12){
          break;
        } 
        if(count==0){
          value=data["Monthly Time Series"][month]["4. close"];
        }
        months_arr.push(month);
        stock_value.push(data["Monthly Time Series"][month]["4. close"]);
        count+=1;
      }

      months_arr=months_arr.reverse();
      stock_value=stock_value.reverse();
      props.call_back(stock_value,months_arr,search,value);
      // props.callBack(stock_value);
      // console.log("last1",data["Monthly Time Series"][month]);
      console.log("searc",stockprice,monthslabel);
    })
  }
  

  

  return (
    <div className="search_container">
        <h1 id="search_label">Search Stock Name</h1>
        <div id="search_bar_container">
          <input id="search_bar" type="text" placeholder='Tsla,aapl,krx' onChange={(e)=>{setSearch(e.target.value)}}></input>
          <button id="search_button" onClick={()=>{
            search_result(search);

            props.change_page_search();
          }}>
            <img src={search_icon} />
          </button>
        </div>
        
    </div>
  )
}
