import axios from "axios";

console.log('Hallo daar!');

// Get request https://restcountries.com/v2/all

//  1. Installeer dependency axios
//  2. Documentatie REST Countries API doornemen
//  3. Informatie over alle landen ophalen en welke endpoints heb je hiervoor nodig?
//  4. Asynchrone (niet gelijktijdig) functie schrijven
//  5. Log de response in de console en hoe de data is opgebouwd
//  6. Get request (aanvragen) maken met axios
//  7. Try / catch blok om de errors af te vangen
//  8. In HTML een element maken o.a. <ul> tag die je als referentie kan gebruiken in je JavaScript bestand
//  9. Vanuit JS refereren (verwijzen) opslaan
// 10. Data toevoegen (map methoden)

// Uitwerking opdracht
//  1. Data ophalen over alle landen en deze weergeven in een lijst op de pagina.
//  2. Weergeven: Naam van het land, vlag van het land en de zin "has a population of [amount] people".
//  3. Landen gesorteerd op populatie van laag naar hoog.
//  4. Land namen weergeven in een kleur die overeenkomt met het continent waar het land in ligt.
//     Land ligt meestal in één van de volgende vijf continenten, uitzonderingen kunnen voorkomen.
//  -  Africa:    blauw
//  -  Americas:  groen
//  -  Asia:      rood
//  -  Europe:    geel
//  -  Oceania:   paars

const countryList = document.getElementById ('countries');
const errorMessage = document.getElementById('error');

function createElementWithId() {
    const unorderedList = document.createElement ('ul');
    unorderedList.setAttribute ('id', 'countryList');
    document.body.appendChild (unorderedList);
    return unorderedList;
}

async function fetchCountries() {
    try {
        // het request maken
        const response = await axios.get ('https://restcountries.com/v2/all');
        // console.log(response.data[0].languages[1].name);

        countryList.innerHTML = `    
         <li> Eén van de talen is: ${response.data[0].languages[1].name} </li>
        `;


        // Creëer een unordered list om de landen in te plaatsen
        createULElementWithId ();

        // Array aanmaken met landnamen

        const country = response.data.map ((country) => {
            return country;
        });

        // Landen sorteren op aantal inwoners
        country.sort ((a, b) => {
            return b.population - a.population;
        });

        // Lijst element aan document object model (DOM) verbinden
        let countryList = document.getElementById ('countryList');

        // Schrijf een aparte functie voor elk regionaam en deze regio de correcte kleur teruggeeft als string.
        country.forEach ((country) => {
            const continent = country.region;
            const textColor = setContinentColor (continent);

            // voor ieder land de vlag url op halen.
            const obj = country.flags;
            const flagUrl = Object.values (obj)[1];
            console.log (flagUrl);

            // De url van de vlag afbeelding weergeven door middel van img-tag en de naam die bij de vlag hoort weergeven.
            const imgTag = document.createElement ('img');
            imgTag.setAttribute ('src', flagUrl);
            imgTag.setAttribute ('alt', country.name + 'Flag');
            imgTag.setAttribute ('class', 'flagImages');

            const newLine = document.createElement ('br');
            console.log (imgTag);
            // const newline = document.createElement('br);
            // console.log(imgTag);

            const listItem = document.createElement ('li');

            listItem.appendChild (imgTag);

            const countryName = document.createElement ('h3');
            countryName.setAttribute ('class', textColor);
            countryName.textContent = `${country.name}`;

            const textNodePopulation = document.createTextNode (`Has a population of ${country.population}`);
            listItem.appendChild (countryName);
            listItem.appendChild (newLine);
            //listItem.appendChild(newline);
            listItem.appendChild (textNodePopulation);

            countryList.appendChild (listItem);
        });


    } catch (e) {
        // de errors afvangen
        console.error (e);
    }


    // de errors communiceren in de UI
    if (e.response.status === 500) {
        errorMessage.textContent = "Er ging iets mis in de server";
    } else if (e.response.status === 404) {
        errorMessage.textContent = "Het verzoek is mislukt";
    }


    function setContinentColor(countryRegion) {
        switch (countryRegion) {
            case 'Africa':
                return 'blue';
                break;
            case 'Americas':
                return 'green';
                break;
            case 'Asia' :
                return 'red';
                break;
            case 'Europe' :
                return 'yellow';
                break;
            case 'Oceania':
                return 'purple';
                break;
            default:
                return 'gray';
        }
    }


    fetchCountries ();
}



