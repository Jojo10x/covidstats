import s from "./css/Home.module.css"
import {useEffect, useState} from "react";
import searchIcon from "./images/searchIcon.png";
import leftArrow from "./images/leftArrow.png";
import rightArrow from "./images/rightArrow.png";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";



function List (){

  const navigate = useNavigate();

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const [endPointForCountries,setEndPointForCountries] = useState('')
    const [finalPointForCountries,setFinalPointForCountries] = useState('')
    const [containerForCountries, setContainerForCountries] = useState([]);
    let [activePage, setActivePage] = useState("A");
    
    const nextPage = () => {
        let result;
        alphabet.forEach((value, index) => {
            if (value === activePage) {
                index === alphabet.length - 1 ? result = alphabet[0] : result = alphabet[index + 1];
            }
        })
        setActivePage(result);
    }
    
    const previousPage = () => {
        let result;
        alphabet.forEach((value, index) => {
            if (value === activePage) {
                index === 0 ? result = alphabet[alphabet.length - 1] : result = alphabet[index - 1];
            }
        })
        setActivePage(result);
    }

      useEffect(()=>{
        getCountries()
      },[finalPointForCountries])


  
          const getCountries =()=> {
  
  fetch(`https://covid-193.p.rapidapi.com/countries?=${endPointForCountries}`,{
    "method": 'GET',
    "headers": {
      'X-RapidAPI-Key': '3567354036mshd4bb10dd86f6d97p179845jsn17d926c83028',
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
    }).then(response => { return response.json()})
    .then(data =>{setContainerForCountries(data.response)})

    .catch(err => console.error(err));
    } 
           
  function filterItems(arr, number) {
    return arr.filter((num) => num.slice(0,1).includes(number.toUpperCase()));
   }


  return (
  <Layout title={"Covid-19 statistics"}>
    
  <div className={s.wrapper}>
   <div className={s.labelSearch}>Search by a country</div>
    <div className={s.inputContainer}>
     <input className={s.input} value={endPointForCountries} onChange={(e) => setEndPointForCountries(e.target.value)}
        placeholder={"Country..."}/>
          <span className={s.searchIcon}><img 
          
          onClick={() => {
           
            navigate(`/country/${endPointForCountries}`)
        }}
   
          src={searchIcon} alt={"search"}/></span>
            </div>
               <div>
    
    </div>
    <section className={s.countriesLinks}>
      <div>
            {filterItems(containerForCountries,activePage).map(el=><div className={s.link} 
            onClick={()=> {navigate(`/country/${el}`)}}> 
                    {el}  </div> )}



                </div>
    </section>
               
    <div className={s.navigation}>
      <div
       onClick={()=>{ previousPage()}} className={s.arrowNavL}><img src={leftArrow} alt={'arrow'}/></div>
          {alphabet.map(l => <span className={activePage === l ? s.activePageLetter : s.pageLetter} onClick={() => {     setActivePage(l)}}
            >{l}</span>)}
             <div onClick={()=>{nextPage()}}className={s.arrowNavR}><img alt={'arrow'} src={rightArrow}/></div>
                </div>
                  </div>
    <div><div className={s.wrapper}>
      
        </div>
      
        
        </div>
            
        </Layout>
       
    )
}


export default List;