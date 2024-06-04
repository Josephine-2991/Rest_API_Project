const search_filter = document.querySelector('#search-input')
const countrycardContainer = document.querySelector('.countrycardContainer')
const section = document.querySelector('.section')
const flag = document.querySelector('.flag')
const filter_search = document.querySelector('.filter_search')
const filter = document.querySelector('.filter')
let countriesData = []

const createCountry = (src, country, population, region, capital) => {
  let div = document.createElement('div')
  div.classList.add("country-card")

  div.innerHTML = `
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



const fetchCountryData = async () => {

  const get = await fetch('https://restcountries.com/v3.1/all')
  return get.json()
}

const displayUI = (countriesData) => {
  countrycardContainer.innerHTML=""
  for (let countryData of countriesData) {
    let name = countryData.name.official
    let population = Intl.NumberFormat('en-US').format(countryData.population)
    let src = countryData.flags.png
    let region = countryData.region
    let capital = Array.isArray(countryData.capital) ? countryData.capital[0] : countryData.capital
    let country = createCountry(src, name, population, region, capital)
    countrycardContainer.appendChild(country)
  }


}
//search countries by name
const filterData=(e)=>{
  let inputedValue = e?.target?.value?.trim()?.toLowerCase()
  
  if(inputedValue==''){
    displayUI(countriesData) 

  }
  else{
    const filteredData = countriesData.filter((country) => country.name.official.toLowerCase().trim().startsWith(inputedValue))
     displayUI(filteredData) 
  
  }
}
search_filter.addEventListener("change", filterData)
 
//filter countries by region
const selectedRegion=(e)=>{
  let selectedValue = e?.target?.value?.trim()?.toLowerCase()
  console.log(selectedValue)

  if (selectedValue == 'all') {
    displayUI(countriesData)

  }
  else {
    const selectedRegionData = countriesData.filter((country) => country.region.toLowerCase().trim() == selectedValue)
    displayUI(selectedRegionData)
    
  }
}
filter.addEventListener("click", selectedRegion)


fetchCountryData()
  .then(data => {
    countriesData = data

    displayUI(countriesData)


  })
  .catch(error => { console.error(`Looks like an error occurred ${error.message}`) }); 

  
