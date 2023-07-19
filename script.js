let myMain = document.querySelector("main")

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let enterButton = document.getElementById("enter-Button")
let userInput = document.getElementById("search-input")
let IPAdress = document.getElementById("result-IP")
let IPlocation = document.getElementById("result-loc")
let timezone = document.getElementById("result-time")
let ISP = document.getElementById("result-ISP")
function getStateAbbreviation(fullStateName) {
    const states = {
        Alabama: 'AL',
        Alaska: 'AK',
        Arizona: 'AZ',
        Arkansas: 'AR',
        California: 'CA',
        Colorado: 'CO',
        Connecticut: 'CT',
        Delaware: 'DE',
        Florida: 'FL',
        Georgia: 'GA',
        Hawaii: 'HI',
        Idaho: 'ID',
        Illinois: 'IL',
        Indiana: 'IN',
        Iowa: 'IA',
        Kansas: 'KS',
        Kentucky: 'KY',
        Louisiana: 'LA',
        Maine: 'ME',
        Maryland: 'MD',
        Massachusetts: 'MA',
        Michigan: 'MI',
        Minnesota: 'MN',
        Mississippi: 'MS',
        Missouri: 'MO',
        Montana: 'MT',
        Nebraska: 'NE',
        Nevada: 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        Ohio: 'OH',
        Oklahoma: 'OK',
        Oregon: 'OR',
        Pennsylvania: 'PA',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        Tennessee: 'TN',
        Texas: 'TX',
        Utah: 'UT',
        Vermont: 'VT',
        Virginia: 'VA',
        Washington: 'WA',
        'West Virginia': 'WV',
        Wisconsin: 'WI',
        Wyoming: 'WY'
    };

    const formattedStateName = fullStateName.trim();
    return states[formattedStateName] || 'Invalid State';
}

window.addEventListener("load", function () {
    if (localStorage.getItem("IPAdress") && localStorage.getItem("IPAdress") !== undefined){
        IPAdress.textContent = localStorage.getItem("IPAdress")
        IPlocation.textContent = localStorage.getItem("Location")
        timezone.textContent = localStorage.getItem("Timezone")
        ISP.textContent = localStorage.getItem("ISP")
    }
    
})
enterButton.addEventListener("click", function () {
    let domainNameURL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_lx3Nkrli6RUwnOdcpcD78sf74bS13&ipAddress=8.8.8.8&domain=${userInput.value}`
    fetch(domainNameURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {



            console.log(data)
            console.log(data.ip)
           
            console.log(data.location.city)
            
            localStorage.setItem("IPAdress", data.ip)
            console.log(data.location.country)
            console.log(data.location.postalCode)
            console.log(data.location.region)
            let twoLetterRegion = getStateAbbreviation(data.location.region)
            localStorage.setItem("Location", `${data.location.city},${twoLetterRegion} ${data.location.postalCode}`)


            console.log(data.location.timezone)
            localStorage.setItem("Timezone", `UTC${data.location.timezone}`)
            console.log(data.isp)
            localStorage.setItem("ISP", data.isp)

        })
        .then(function () {
            IPAdress.textContent = localStorage.getItem("IPAdress")
            IPlocation.textContent = localStorage.getItem("Location")
            timezone.textContent = localStorage.getItem("Timezone")
            ISP.textContent = localStorage.getItem("ISP")

        })


})




