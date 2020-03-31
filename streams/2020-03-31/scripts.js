var allCountries;

// Retrieve a list of all countries from COVID19 API
function loadCountries() {
	console.log("Attempting to load countries..");
	fetch("https://api.covid19api.com/summary")
	    .then(function(response) {
            return response.json();
        }).then(function(data) {
        	allCountries = data.Countries;
            console.log("All countries loaded:");
            console.log(allCountries);

            var rawHTML = "<option value=\"\">Please select</option>";

            for (var i = 0; i < allCountries.length; i++) {
				var country = allCountries[i];
				if (country.Country === "") {
					continue;
				}
				rawHTML = rawHTML + "<option value=\""+country.Slug+"\">"+country.Country+"</option>";
            }

            var selectbox = document.getElementById("countries");
            selectbox.innerHTML = rawHTML;
        });
}

// When user selects a country, get extra info about it from REST Countries API
function selectCountry(event) {
	var slug = event.target.value.trim();
	console.log(slug);

	var country;
    for (var i = 0; i < allCountries.length; i++) {
        var c = allCountries[i];
        if (c.Slug === slug) {
            country = c;
            break;
        }
    }

    var s = country.Country.toLowerCase()
    var u = "https://restcountries.eu/rest/v2/name/" + s;
    fetch(u)
        .then(function(response) {
            return response.json();
        }).then(function(data) {

        	var summary = data[0];

            for (var i = 0; i < data.length; i++) {
                if (data[i].name.toLowerCase() === s || data[i].alpha2Code.toLowerCase() === s) {
                    summary = data[i];
                    break
                }
            }

        	console.log(summary);

        	var percentConfirmed = ((country.TotalConfirmed / summary.population) * 100).toFixed(6);

		    var table = "<table>";
		    table += "<tr><td><b>Capital: </b></td><td>"+summary.capital+"</td></tr>";
            table += "<tr><td><b>Population: </b></td><td>"+summary.population.toLocaleString("en")+"</td></tr>";
		    table += "<tr><td><b>Percent Confirmed: </b></td><td>"+percentConfirmed+"%</td></tr>";
		    table += "<tr><td><b>Total Confirmed: </b></td><td>"+country.TotalConfirmed.toLocaleString("en")+"</td></tr>";
		    table += "<tr><td><b>Total Recovered: </b></td><td>"+country.TotalRecovered.toLocaleString("en")+"</td></tr>";
		    table += "<tr><td><b>Total Deaths: </b></td><td>"+country.TotalDeaths.toLocaleString("en")+"</td></tr>";
		    table += "</table>";
		    var casesHeader = document.getElementById("confirmedcases");
		    casesHeader.innerHTML = table;

			var countryflag = document.getElementById("countryflag");
		    countryflag.src = summary.flag;
            countryflag.style.display = "inline";

			var iframeOuter = document.getElementById("iframeouter");
            iframeOuter.style.display = "inline";
            iframeOuter.innerHTML = "<iframe src=\"https://apnews.com/" + country.Country.replace(" ", "") + "\"/>";
        });
}

function load() {
	console.log("ready and loaded");

	loadCountries();

	var countriesDropdown = document.getElementById("countries");
    countriesDropdown.addEventListener("change", selectCountry);
}

// Once the page loads this runs
window.addEventListener("load", load);