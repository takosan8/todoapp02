import React from "react";

export const Header = () =>{
    const today = new Date;

    // console.log(today);
    return (
        <div className="header">
            
            <h1>{today.getFullYear() + "/" +  (today.getMonth()+1) + "/"+ today.getDate()  + "/"}</h1>
        </div>
    )
}