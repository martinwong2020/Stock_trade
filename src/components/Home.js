import React, { useCallback, useEffect } from 'react'
import Search from './Search'
import Bottom_dash from './Bottom_dash'

import Information from './Information'

import Stock from './Stock'
import { useState } from 'react'
export default function Home(props) {
  const[stock_page,setStockpage]=useState(true);
  const[stockpricearr,setStockpricearr]=useState([]);
  const[montharr,setMontharr]=useState([]);
  const[search,setSearch]=useState("");
  const[balance,setBalance]=useState(10000);
  const[value,setValue]=useState(0);
  const[stocklist,setStocklist]=useState([]);
  function change_page_stock(){
    
    setStockpage(true);
  }
  function change_page_search(){
    setStockpage(false);
  }


  
  // useEffect(async()=>{

    
  // },[])
  function call_back(stock,month,search,value){
    // setStock_price_arr([...stock_price_arr,stock]);
    // setMonth_arr([...month_arr,month]);
    // setStock_price_arr(old=>[...old,stock]);
    // setMonth_arr(old=>[...old,month]);
    console.log("value",stock,month,stock[0]);
    // setStockpricearr([...stockpricearr,stock]);
    // setMontharr([...montharr,month]);
    setStockpricearr(stock);
    setMontharr(month);
    setSearch(search);
    setValue(value);
    // setTrial([1]);
    // console.log("wentbak",stockpricearr,montharr,trial);
    // console.log("wentbak",stockpricearr,montharr,trial);
  }
  function information_call_back(new_balance){
    setBalance(new_balance);
    console.log("balance",balance);
  }
  function balance_call_back(num){
    setBalance(num);
  }
  
  function stocklist_call_back(stocklist){
    setStocklist(stocklist);
  }
  // useEffect(()=>{
  //   console.log("stock",stockpricearr);
  //   console.log(value);
  // },[stockpricearr])
  // useEffect(()=>{
  //   console.log("month",montharr);
  // },[montharr])
  // const callBack=useCallback((val)=>{
  //   console.log("what.",val);
  //   setTrial((t)=>[...t,val]);
  //   console.log("trial",trial);
  // },[trial])
  
  return (
    <div>
      <Search change_page_search={change_page_search} call_back={call_back} />
      {stock_page ? <Stock balance_call_back={balance_call_back} stocklist_call_back={stocklist_call_back} />:
      <Information 
        label={montharr} 

        data={stockpricearr} 
        search={search} value={value} 
        balance={balance} 
        information_call_back={information_call_back} 
        stocklist={stocklist}
      />}
      
      <Bottom_dash change_page_stock={change_page_stock} change_page_search={change_page_search} sign_in_call_back={props.sign_in_call_back}/>
    </div>
  )
}
