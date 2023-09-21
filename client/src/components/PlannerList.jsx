import { useState, useEffect } from "react";
import React from "react";
import '../styles/PlannerList.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const PlannerList = () => {
    const [notesListArray, setNotesListArray] = useState([])

    
const currentDate = new Date()
const month = currentDate.toLocaleString('default', { month: 'long' });
const day = currentDate.getDate()
const [dataValue, setDataValue] = useState(day + ' '+month)

    
    const addEntry = ()=>{
        setNotesListArray(prev=>[...prev, <PlannerListItem/>])
    }


  return (
    <>
        <div style={{marginTop: "5%"}} className="container">

<div className="row">
    <div className="col-md-10 col-lg-10 col-sm-12 z-3 mx-auto">
        <div  id="planner-list-card">
            <div className="card-body">


                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="title-animation" id="planner-list-date">
                        {dataValue}
                    </h1>

                    <button onClick={addEntry} type="button"
                        className="btn btn-primary position-relative button">
                        + <span className="position-absolute top-0 start-100  rounded-pill"></span>
                    </button>
                    
                    

                </div>






                <ul id="notes-list" className="list-group">
                    {notesListArray}
                </ul>
                
                
            </div>


            
        </div>

        



    </div>

    
    
</div>



</div>
    </>
  )
};


const PlannerListItem = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [text, setText] = useState('');
  
    const handleCheck = () => {
      setIsChecked(!isChecked);
    };
  
    const handleKeyUp = (event) => {
        console.log(event.target.value);
      setText(event.target.value);
    };
  
    const handleDelete = () => {
      // Implement the delete functionality here
      // You can use props.onDelete or another appropriate method
    };
  
    return (
      <li  className="list-group-item">
        <div className="input-group">
          <div className="entry-checkbox">
            {/* <label className="container"> */}
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheck}
              />
              <div className="checkmark"></div>
            {/* </label> */}
          </div>
          <textarea
            className="form-control entry-text"
            placeholder="Enter text"
            onChange={handleKeyUp}
            value={text}
            id={`task${props.id}`}
          />

                        <div className=" p-2 bg-transparent d-flex align-items-center justify-content-center">
                <div
                  onClick={handleDelete}
                  className="trash-bin"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
        </div>
      </li>
    );
  };

export default PlannerList;
