import React from "react";
import PlannerList from "../components/PlannerList";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Planner = () => {

    useEffect(()=>{
        alert('Page still under development')
    },[])



  return (
  
  <>
  <Navbar/>
            <div className="my-4 text-center">
                    <h1  className=" display-4" id="title">To Do planner</h1>
            </div>

            <div  className="d-flex justify-content-center align-items-center">

  <PlannerList/>
            </div>
  </>
    )
};

export default Planner;
