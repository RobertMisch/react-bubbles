import React, { useState, useEffect } from "react";
import axios from "axios";
import {axiosWithAuth} from '../utils/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  const getColors = ()=>{
    axiosWithAuth().get('/api/colors')
    .then(res =>{
      // console.log(res)
      setColorList(res.data)
    })
    .catch(err=>{console.log(err)})
  }

  useEffect(()=>{
    getColors()
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
