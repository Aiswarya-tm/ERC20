import React,{useEffect} from "react";

export default function Input(props){

    return(
    <React.Fragment>
        <input
        type={props.type}
        value={props.valueName}
        placeholder={props.placeholder}
        onChange={props.handleFunction}
        ></input>
    </React.Fragment>
    )
}