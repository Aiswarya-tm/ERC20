import React,{useEffect} from "react";
import "./connect.css";

export default function Connect(props){

    return(
        <React.Fragment>
        <button className="button-for-connect" onClick={props.handleConnect}>{props.message}</button>
        </React.Fragment>
    )
}