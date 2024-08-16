import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './index.css'
import { RiDeleteBin5Line } from "react-icons/ri";
import { baseUrl } from "../config";


const EmployeAttendance = () => {
  const [employe,setEmploye] = useState([])
  const [attendanceData,setAttendanceData] = useState([])
  const [everyDayAttendanceData, setEveryDayAttendanceData] = useState([])
  const [btnStatus, setBtnStatus] = useState("Employe Attendance")
  const [empId, setEmpId] = useState()
  const [empName, setEmpName] = useState()
  const [empData, setEmpData] = useState()
  

  //GET EMPLOYE DATA
  useEffect(()=>{
    axios.get(`${baseUrl}employedata`)
    .then(res => setEmploye(res.data))
    .catch(err => console.log(err));
  },[])

  //GET TODAY ATTENDANCE DATA
  useEffect(()=>{
    axios.get(`${baseUrl}empattendancetoday`)
    .then(res => setAttendanceData(res.data))
    .catch(err=>console.log(err));
  },[])

//GET TOTAL ATTENDANCE
  useEffect(()=>{
    axios.get(`${baseUrl}empattendanceeveryday`)
    .then(res => setEveryDayAttendanceData(res.data))
    .catch(err=>console.log(err));
  },[])

  //GET EMPLOYE ATTENDENCE DATA WITH THEIR ID
  useEffect(() => {
    axios.get(`${baseUrl}emp-details`, {
        params: {
            empId: empId,
        },
    })
    .then(res => setEmpData(res.data))
    .catch(err => console.log(err));
}, [empId])

const onClickDeleteEmployee = async (id) => {
  try{
    await axios.delete(`${baseUrl}delete-employee/${id}`)
    window.location.reload()
  }catch(err){
    alert(err)
  }
}


  const renderEmployeDetails = () => {
    let sum = 0 
    for (let i of empData){
      sum = sum + parseInt(`${i.timeout.slice(0,2)}.${i.timeout.slice(2,4)}`) - parseInt(`${i.timein.slice(0,2)}.${i.timein.slice(2,4)}`)
    }
      return <div  className='emp-view-data-table'>
            <div className='emp-work-hrs-container'>
            <p className='work-data-name'><span className='work-data-value'>{`${empName}`}</span></p>
              <p className='work-data-name'>Total Working Days: <span className='work-data-value'>{`${empData.length}`}</span></p>
              <p className='work-data-name'>Total Working Hours: <span className='work-data-value'>{sum}</span></p>
            </div>
            <table  className='tables'>
            <tr>
                <th className="db-item-name1">Check</th>
                <th className="db-item-name1">Date</th>
                <th className="db-item-name1">Employee Id</th>
                <th className="db-item-name1">Time In</th>
                <th className="db-item-name1">Time Out</th>
                <th className="db-item-name1">Hours of Working</th>
              </tr>
              {empData.map((each) => {
        return (
            <tr  className="table">
              <td><button type="button" className="edit-button-check"><input className="checkbox-ele" type="checkbox"/></button></td>
              <td  className="db-item-name">{each.date.slice(0,10)}</td>
              <td  className="db-item-name">{each.employeid}</td>
              <td  className="db-item-name">{each.timein.slice(0,8)}</td>
              <td  className="db-item-name">{each.timeout.slice(0,8)}</td>
              <td  className="db-item-name">{parseInt(`${each.timeout.slice(0,2)}.${each.timeout.slice(2,4)}`) - parseInt(`${each.timein.slice(0,2)}.${each.timein.slice(2,4)}`)}</td>
            </tr>
        )
      })}
      </table>
      </div>
  }


  const renderEmployeData = () => {
    if (btnStatus === "Employe Attendance"){
      return (
        <div className='emp-data-view-container'>
          <ul className='emp-data-view-list'>
              {employe.map((eachEmploye) => {
                return(
                  <button onClick={() => {
                    setEmpId(eachEmploye.employeid)
                    setEmpName(eachEmploye.name)
                    }} type="button" className='emp-list-item-btn'>
                    <li className="emp-list-item" style={{backgroundColor: eachEmploye.randomcolor}}>
                      <h1 className="emp-list-name">{eachEmploye.name}</h1>
                    </li>
                </button>)
              })}
          </ul>
          {empId ? renderEmployeDetails() : null}
          </div>
      )
    }else if(btnStatus === "Today Present"){
      return (
          <table className='emp-work-hrs-container'>
        <tr className="table1">
          <th className="db-item-name">Check</th>
          <th className="db-item-name">Name</th>
          <th className="db-item-name">Employee Id</th>
          <th className="db-item-name">Time Out</th>
          <th className="db-item-name">Time In</th>
        </tr>
      {attendanceData.map((data)=>(
        <tr  className="table1">
          <td className="db-item-name"><button type="button" className="edit-button-check"><input className="checkbox-ele" type="checkbox"/></button></td>
          <td className="db-item-name">{data.name}</td>
          <td className="db-item-name">{data.employeid}</td>
          <td className="db-item-name">{data.timein.slice(0,8)}</td>
          <td className="db-item-name">{data.timeout.slice(0,8)}</td>
        </tr>
      ))}
      </table>
      )
    }else if(btnStatus === "Attandance Data"){
      return (
          <table className='emp-work-hrs-container'>
            <tr className="table1">
              <th  className="db-item-name1">Check</th>
              <th  className="db-item-name1">Date</th>
              <th  className="db-item-name1">Name</th>
              <th  className="db-item-name1">Employee Id</th>
              <th  className="db-item-name1">Time In</th>
              <th  className="db-item-name1">Time Out</th>
            </tr>
            {everyDayAttendanceData.map((data)=>(
            <tr  className="table1">
              <td><button type="button" className="edit-button-check"><input className="checkbox-ele" type="checkbox"/></button></td>
              <td  className="db-item-name">{data.date.slice(0,10)}</td>
              <td  className="db-item-name">{data.name}</td>
              <td  className="db-item-name">{data.employeid}</td>
              <td  className="db-item-name">{data.timein.slice(0,8)}</td>
              <td  className="db-item-name">{data.timeout.slice(0,8)}</td>
            </tr>
            ))}
          </table>
      )
    }else if(btnStatus === "Employe Details"){
      return(
        <table className='emp-work-hrs-container'>
        <tr className="table1">
          <th  className="db-item-name1">Check</th>
          <th   className="db-item-name1">Name</th>
          <th  className="db-item-name1">Employee Id</th>
          <th  className="db-item-name1">Job Position</th>
          <th  className="db-item-name1">Location</th>
          <th  className="db-item-name1">DateOfBirth</th>
          <th  className="db-item-name1">Email</th>
          <th  className="db-item-name1">Numebr</th>
          <th  className="db-item-name1">Address</th>
        </tr>
      {employe.map((data)=>(
        <tr className="table1">
          <td  className="db-item-name1"><button type="button" className="edit-button-check"><input className="checkbox-ele" type="checkbox"/></button></td>
          <td  className="db-item-name1">{data.name}</td>
          <td  className="db-item-name1">{data.employeid}</td>
          <td  className="db-item-name1">{data.position}</td>
          <td  className="db-item-name1">{data.location}</td>
          <td  className="db-item-name1">{data.dob.slice(0,10)}</td>
          <td  className="db-item-name1">{data.email}</td>
          <td  className="db-item-name1">{data.phoneno}</td>
          <td  className="db-item-name1">{data.address}</td>
          <td><button type="button" className="delete-button" onClick={e => onClickDeleteEmployee(data.id)}><RiDeleteBin5Line /></button></td>
        </tr>
      ))}
      </table>
      )
    }
  }

  return (
   <>
    <div className='attendance-container'>
      <h1 className='Hre-head1'>EMPLOYEE ATTENDACE DATA</h1>
      <div className='Hre-card1'>
        <button onClick={() => setBtnStatus("Employe Attendance")} className='Hre-button1'>Employee Wise Attendance</button>
        <button onClick={() => setBtnStatus("Today Present")} className='Hre-button1'>Today Present<p>{attendanceData.length}</p></button>
        <button onClick={() => setBtnStatus("Attandance Data")} className='Hre-button1'>Total Attendance Data<p>{everyDayAttendanceData.length}</p></button>
        <button onClick={() => setBtnStatus("Employe Details")} className='Hre-button1'>Employee Details<p>{employe.length}</p></button>
      </div>    
          <h1 className='emp-bt-status-name'>{btnStatus + " :"}</h1>
          <div className='att-table-container'>
            {renderEmployeData()}
          </div>
    </div>
  </>)
}

export default EmployeAttendance