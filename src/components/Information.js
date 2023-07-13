import React from 'react'
import { useState } from 'react';
import { Line } from "react-chartjs-2";

import "../assets/Information.css"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { setDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Information(props) {
  const [chartData, setChartData]=useState({
    
  });
  const [stock_amount,setStock_amount]=useState(0);
  const labels =props.label ;
  const options={
    plugins: {  
      title: {
        display: true,
        text: `${props.search} stock 12 month`,
        color: 'white',
        font:{
          size:15
        }
      },
      legend: {
        display: false

      }
    },
    scales: {
      y: {
        ticks: {
          color: 'white',
          font: {
            size: 15,
          }
        }
      },
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 15
          }
        }
      }
    }
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: props.data,
        borderColor: 'rgb(119, 237, 150)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      }
    ],
  };
  function check_stock(stock_name){
    if(props.stocklist.length<1){
      return [false,null];
    }
    for(let i=0;i<props.stocklist.length;i++){
      console.log("stock",props.stocklist[i].stock_name);
      if(props.stocklist[i].stock_name==stock_name){
        return [true,i];
      }
    }
    return [false,null];
  }
  function stock_purchase(){
    if(props.search==""|| props.search.length==0){
      console.log("empty search.");
      alert("non-existent stock searched");
      return;
    }
    if(stock_amount<=0){
      console.log("invalid");
      alert("need a whole number");
      return;
    }
    let fund=props.balance;
    let remaining=fund-(props.value*stock_amount);
    // console.log("fund:",fund,props.value,stock_amount,props*stock_amount);
    // console.log("remainin",remaining);
    if(remaining<0){
      alert("insufficient balance");
    }
    else{
      
      props.information_call_back(remaining);
      const docRef=doc(db,"stock",props.search);
      const dataset={
        stock_name:props.search,
        stock_amount:Number(stock_amount),
        stock_per:Number(props.value)
      }


      //Could check by getdoc instead of checking usestate but its better to not constantly read when you have data saved locally.
      const check_results=check_stock(props.search);
      if(check_results[0]){

        const new_stock_amount=props.stocklist[check_results[1]].stock_amount+Number(stock_amount);
        console.log("amnt,",props.stocklist[check_results[1]].stock_amount,stock_amount);
        const new_stock_per=((props.stocklist[check_results[1]].stock_per*props.stocklist[check_results[1]].stock_amount)+(stock_amount*props.value))/new_stock_amount;
        console.log("math.",props.stocklist[check_results[1]].stock_per*props.stocklist[check_results[1]].stock_amount,(stock_amount*props.value))
        updateDoc(doc(db,"stock",props.search),{
          stock_amount:new_stock_amount,
          stock_per:new_stock_per,
        })
      }
      else{
        try{
          setDoc(docRef,dataset)
        }
        catch(err){
          console.log("err!l",err);
        }
      }
      try{
        updateDoc(doc(db,"balance","amount"),{
          current_balance:remaining
        })
      }
      catch(err){
        console.log("bal",err);
      }
    }
  }
  return (
    <div>

      <div className="information_container">
        <div className='linechartcontainer'>

          <Line options={options} data={data}
            className="linechart"
          />
        </div>
        <div className="buy_container">
          <h1>{props.search} Stock</h1>
          <h3>Current Stock Price: {props.value}</h3>
          <h3>Balance: {props.balance}</h3>
          <div className="buy_second_container">
            
            <input className="buy_input" type="number" min="1" placeholder='' onChange={(e)=>{setStock_amount(e.target.value)}}></input>
            <button id="buy_button" onClick={()=>{
              stock_purchase();

            }}>
              Buy Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
