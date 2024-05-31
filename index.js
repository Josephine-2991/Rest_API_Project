
const search_filter=document.querySelector('#search-input')
const flower= document.querySelector('.flower')
const section = document.querySelector('.section')
const flag = document.querySelector('.flag')



const createCountry=(src,country, population, region, capital)=>{
    let div=document.createElement('div')
  div.classList.add("country-card")
  div.innerHTML=`
        <img src='${src}' alt="flag of ${country}" class='flag'>
        <div class="card-text">
        <h4 class='countryName'>${country}</h4>
         <p>Population: ${population}</p>
         <p>Region: ${region}</p>
         <p>Capital:${capital}</p>
       </div>
      
    `
    return div
           
 }


let countriesData=[]
const fetchCountryData = async() =>{

const get = await fetch('https://restcountries.com/v3.1/all')
     return get.json()
 }
 fetchCountryData()
.then(data=>{ countriesData=data
 for(let countryData of countriesData){
let name=countryData.name.official
 let population = Intl.NumberFormat('en-US').format(countryData.population)  
      let src = countryData.flags.png
    let region = countryData.region
    let capital = countryData.capital[0]
    let country = createCountry(src,name, population, region, capital)

    section.appendChild(flower)
    flower.appendChild(country)

   }

  })

//  .catch(error=>
//   {console.error(`Looks like an error occurred ${error.message}`)}); 



const displayCountries=()=>{
  let result=search_filter.value.toLowercase()
  if(result){
    let filteredCountries = countriesData.filter(country =>country.name.common.toLowercase().includes(result))
  }
  }
  
 

 flag.addEventListener('click',()=> {
  windows.location.href="info.html?name=${country.name.common}";
 })
 
        