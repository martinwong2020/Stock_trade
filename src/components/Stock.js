import React from 'react'
import { db } from '../config/firebase'
import { useState, useEffect } from 'react';

import { getDocs, collection, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import "../assets/Stock.css"
export default function Stock(props) {
  const [stocklist,setStocklist]=useState([]);
  const [balanceinfo,setBalanceinfo]=useState([]);
  const [currency,setCurrency]=useState();
  const [stocksellamount,setStocksellamount]=useState();
  const stocklistcollection = collection(db,"stock");

  const [stocksellvalue,setStocksellvalue]=useState([]);

  const balanceinfocollection = collection(db,"balance");

  const getStockList= async ()=>{

    try{
      const data=await getDocs(stocklistcollection);
      const filtered=data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id,
      }))
      setStocklist(filtered);
      
    }
    catch(error){
      console.error(error);
    }
  }
  const getBalanceInfo = async ()=>{
    try{
      const balance=await getDocs(balanceinfocollection);
      const filtered=balance.docs.map((doc)=>({
        ...doc.data(),
        // id: doc.id,
      }))
      setBalanceinfo(filtered);
      // console.log("bala:",balanceinfo);
    }
    catch(error){
      console.error(error);
    }
  }
  useEffect(()=>{

    getStockList();
    getBalanceInfo();
    
  },[]);
  useEffect(()=>{
    console.log("right",stocklist);
  },[stocklist])
  
  useEffect(()=>{
    props.stocklist_call_back(stocklist)
  },[stocklist])
  useEffect(()=>{
    console.log("bala]",balanceinfo[0]);
    if(balanceinfo.length!=0){
      setCurrency(balanceinfo[0]["current_balance"]);
      props.balance_call_back(balanceinfo[0]["current_balance"]);
    }
    
  },[balanceinfo]);
  
  // async function check(){
  //   const docRef=doc(db,"stock","aapl");
  //   const docTem=await getDoc(docRef);
  //   if(docTem.exists()){
  //     console.log("Doc:",docTem.data());
  //   }
  //   else{
  //     console.log("dne");
  //   }
  // }
  async function updating_doc(value){
    
    await updateDoc(doc(db,"balance","amount"),{
      current_balance:value,
    })
  }

  async function update_balance(stock_amount,stock_name){

    let current;
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_Monthly&symbol=${stock_name}&interval=5min&apikey=${process.env.REACT_APP_STOCK_KEY}`)
    .then(response =>{
      return response.json()
    })
    .then(data=>{
      let count=0;

      let month;
      for(month in data["Monthly Time Series"]){
        current=data["Monthly Time Series"][month]["4. close"]
        if (count==0){
          break;
        }
      }
      let value=Number(stock_amount)*Number(current)+Number(currency);
      console.log("value_check",Number(stock_amount),Number(current),Number(currency));
      updating_doc(value).then(()=>{
        console.log("should update");
        getBalanceInfo();
      })
    })

  }
  async function sell_stock(stock,index,e){
    // console.log("value",e.currentTarget.parentNode.firstChild.value);
    e.currentTarget.parentNode.firstChild.value="";
    console.log("here:",stocksellamount);
    if(stocksellamount==null){
      alert("Enter amount");
      return;
    }
    if(stocksellamount[index].id!=stock){
      
      return;
    }
    if(stocksellamount[index].id==stock){
      if(stocksellamount[index].sell_amount==null){

        alert("Reenter stock amount");
        return;
      }
    }
    if(stocksellamount[index].stock_amount<stocksellamount[index].sell_amount){
      alert("too many stocks");
      console.log("stklt",stocklist);
      return;
    }

    if(stocksellamount[index].stock_amount-stocksellamount[index].sell_amount==0){
      await deleteDoc(doc(db,"stock",stock))
      .then(()=>{
        update_balance(stocksellamount[index].sell_amount,stock)

      })
    }else{
      const stocks_leftover=stocksellamount[index].stock_amount-stocksellamount[index].sell_amount;
      await updateDoc(doc(db,"stock",stock),{
        stock_amount:stocks_leftover,
      })
      .then(()=>{
        update_balance(stocksellamount[index].sell_amount,stock);
      })
      console.log("inerd");
    }
    
    getStockList();
    setStocksellamount(stocklist);
    

    console.log("atlst",stocksellamount);
  }
  useEffect(()=>{
    console.log("handl",stocklist);
  },[stocklist])

  function handle_stock_amount(e,index){
    console.log("herei",stocklist);
    // const stocks=[...stocklist];
    //to hard copy the data
    if(e.target.value<0){
      alert("enter valid number");
      return;
    }
    const stocks=JSON.parse(JSON.stringify(stocklist));
    stocks[index].sell_amount=Number(e.target.value);
    setStocksellamount(stocks);
    console.log("after",stocklist);

    // const stocks=[...stocklist];
    // const out=stocks.map((x)=>{
    //   if(x.id===id){
    //     x.value=e.target.value;
    //     return x;
    //   }
    // })
    // setStocksellamount(out);
    
  }
  return (
    <div>
        <div id="balance_container">
          <h1 className='text' id="balance_text">Balance: ${currency}</h1>
        </div>
        <div id="stock_parent_container">
          {stocklist.map((stock,index)=>(
            <div className="stock_container" key={stock.id}>
              <div className="stock_text_container">
                <h1 className='text'>Stock Name: {stock.stock_name}</h1>
              </div>
              <div className="stock_text_container">
                <h3 className='text'>Stock Amount: {stock.stock_amount}</h3>
              </div>
              <div className="stock_text_container">
                <h3 className='text'>Avg Stock Price Bought: {stock.stock_per}</h3>
              </div>
              <div className="stock_text_container">
                <input className="stock_input" type="number" min="1" key={index} onChange={(e)=>{handle_stock_amount(e,index)}}></input>
                <button className="sell_button" onClick={(e)=>{sell_stock(stock.id,index,e);}}>
                  <span className="letter_flicker_one">S</span>
                  <span className="letter_flicker_two">e</span>
                  <span className="letter_flicker_one">l</span>
                  <span className="letter_flicker_two">l</span></button>
              </div>
            </div>
          ))}
        </div>
        {/* <button onClick={()=>{
          check();
        }}>[][]</button>
         */}
    </div>
  )
}
