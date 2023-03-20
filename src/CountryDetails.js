import s from "./css/country.module.css"
import {useEffect, useState} from "react";
import Layout from "./Layout";
import { useParams, useNavigate } from 'react-router-dom';

function Details (){
    const { code } = useParams();
    const navigate = useNavigate();
    const [containerForStats,setContainerForStats] = useState([])
    const [containerForCountries, setContainerForCountries] = useState([]);
    let [activePage, setActivePage] = useState("A");

    useEffect(()=>{
      getStats()
      },[code])

    const getStats =()=> {

    fetch(`https://covid-193.p.rapidapi.com/statistics?country=${code}`,{
    "method": 'GET',
    "headers": {
    'X-RapidAPI-Key': '3567354036mshd4bb10dd86f6d97p179845jsn17d926c83028',
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
    }).then(response => { return response.json()})
    .then(data =>{setContainerForStats(data.response)})
    .catch(err => console.error(err));
    }
  
  function filterItems(arr, number) {
    return arr.filter((num) => num.slice(0,1).includes(number.toUpperCase()));
   }


  return (
  <Layout title={"Covid-19 statistics"}>
  <div className={s.wrapper}>
     <div>
    
    </div>

    <section className={s.countriesLinks}>
      <div>
        {filterItems(containerForCountries,activePage).map(el=><div className={s.link} onClick={()=>{getStats(el)}}>{el}  </div> )}
                </div>
    </section>
     <div className={s.wrapper}>
        {containerForStats.map(home => <>
        <h2 className={s.country}>{home.country}</h2>
        <div className={s.criteria}>
        <span className={s.item}>Continent:</span>
        <span className={s.item}>{home.continent}</span>
        </div>

        <div className={s.criteria}>
        <span className={s.item}>Population:</span>
        <span className={s.item}>{home.population}</span>
        </div>

        <div className={s.statisticsContainer}>
        <div className={s.list}>
        <div className={s.criteria}>
        <span className={s.itemMain}>Sick:</span>
        <span className={s.itemMain}>{home.cases.total}</span>
        </div>

        <div className={s.criteria}>
        <span className={s.itemGray}>{home.cases["1M_pop"]}</span>
        <span className={s.itemGray}>/1 mln. population</span>
        </div>

        <div className={s.criteria}>
        <span className={s.item}>New cases:</span>
        <span className={s.itemRed}>{home.cases.new || 0}</span>
        </div>

        <div className={s.criteria}>
        <span className={s.item}>Getting sick on active stage:</span>
        <span className={s.item}>{home.cases.active || 0}</span>
        </div>

        <div className={s.criteria}>
        <span className={s.item}>Critically sick:</span>
        <span className={s.item}>{home.cases.critical || 0}</span>
        </div>

        <div className={s.criteria}>
        <span className={s.item}>Recovered:</span>
        <span className={s.item}>{home.cases.recovered || 0}</span>
        </div>

        </div>
        <div className={s.list}>
        <div className={s.criteria}>
        <span className={s.itemMain}>Deaths:</span>
        <span className={s.itemMain}>{home.deaths.total}</span>
        </div>

        <div className={s.criteria}>
        <span className={s.itemGray}>{home.deaths["1M_pop"]}</span>
        <span className={s.itemGray}>/1 mln. population</span>
        </div>

        <div className={s.criteria}>
        <span className={s.item}>New cases:</span>
        <span className={s.itemRed}>{home.deaths.new || 0}</span>
        </div>

        </div>
        <div className={s.list}>
        <div className={s.criteria}>
        <span className={s.itemMain}>Tests:</span>
        <span className={s.itemMain}>{home.tests.total}</span>
        </div>

        <div className={s.criteria}>
        <span className={s.itemGray}>{home.tests["1M_pop"]}</span>
        <span className={s.itemGray}>/1 mln. population</span>
        </div>
        </div>
        </div>
        </>)}
        </div>    
        <button className={s.backButton} onClick={() => navigate(-1)}>Back</button>
        </div>
            
        </Layout>
       
    )
}


export default Details;