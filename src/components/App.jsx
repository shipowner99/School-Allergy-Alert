import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Diet from './Diet';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchData = async () => {
      try {
        const response = await axios.get("https://open.neis.go.kr/hub/mealServiceDietInfo", {
          params: {
            KEY: apiKey,
            Type: 'json',
            pIndex: 1,
            pSize: 5,
            ATPT_OFCDC_SC_CODE: 'T10',
            SD_SCHUL_CODE: '9290083',
          }
        });
        setDiets(response.data.mealServiceDietInfo[1].row);
        setLoading(false)
      } catch (error){
        console.log(error);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);
    console.log(diets)
  return (
  <div>
    {loading ? <h1>Loading...</h1>:
    <div>
      <h1>급식 알러지 알리미</h1>
      {diets.map(diet => (
        <Diet 
        diet={diet.DDISH_NM}
        />
      ))}
    </div>
}
    </div>)
}

export default App;
