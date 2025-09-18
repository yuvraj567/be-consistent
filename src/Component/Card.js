import React from 'react'
import { Tilt } from 'react-tilt';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import dateFormat from 'dateformat';


const Card = (props) => {
  const   plateformImg = props.plateformImg;
    const data = props.data;
  

return (
    <>
        <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 mt-3 mb-3 mx-3">
            
         
         
            {data.map((items, key) => (
                <Tilt>
                <div
               
                 className="w-full flex items-end  rounded-lg shadow-md lg:max-w-sm gradient1 " key={key}>

                    <div className="p-4">
                        <h4 className="text-2xl font-semibold text-blue-600">
                            {items.name}
                        </h4>
                        <div className='flex  justify-between gap-10 mt-4  text-left'>
                            <p className="mb-2 text-white leading-normal ">
                               Start: {dateFormat(items.start_time,"ddd, mmm dS,yyyy, h TT") }<br/>
                               End: {dateFormat(items.end_time,"ddd, mmm dS,yyyy, h TT")}
                            </p>

                           <div className='rounded-full text-white h-11 w-11 flex items-center  justify-center  text-center opacity-70 bg-red-600'>
                               {Math.round((items.duration/3600) * 10) / 10 }hr
                          </div>
                       </div>
                      
                       <div className='flex mt-3 justify-between'>
                                   
                       <a href={items.url}> <button className="rounded-full h-11 w-11 flex items-center justify-center  text-center bg-gray-100 opacity-70">
                               <img className="object-cover  rounded-lg " src={plateformImg} alt="image"/>
                           

                            </button>   </a>
                            {/* <button className="px-4 text-sm text-blue-100 bg-blue-500 rounded-lg shadow">
                                Calender
                            </button> */}
                            <div  className="px-4 text-sm   rounded-lg shadow">
                            <AddToCalendarButton 
                                    name= {items.name}
                                    startDate={dateFormat(items.start_time,"yyyy-mm-d")}
                                    options={'Google'}
                                    ></AddToCalendarButton>
                        
                            </div>
                            
                       </div>
                    </div>
                </div>
                </Tilt>
            ))}
        </div>
    </>
);

  
  }

export default Card
