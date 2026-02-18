data = [
	{
		"name":"Meeting with the CEO",
		"description":"A deeply corrupted recording of a conversationd between the EPA head and the CEO of Gidder Mining Co..",
		"thumbnail":"meeting",
		"filepath":"assets/data/Recordings.zip"
	},
	{
		"name":"Gopher data.",
		"description":"A brief description of the endangered gopher.",
		"thumbnail":"gopher",
		"filepath":"assets/data/Gopher Description.pdf"
	},
	{
		"name":"A Statement Condemming a Mining Company for Killing Gophers..",
		"description":"The Environmental Protection Agency condemms the company and explains its failings.",
		"thumbnail":"gopher",
		"filepath":"assets/data/Mining Company Lowers Gopher Population.pdf"
	},
	{
		"name":"An investigation",
		"description":"An investigation into the destruction of natural habitats.",
		"thumbnail":"investigation",
		"filepath":"assets/data/Investigation.pdf"
	},
	{
		"name":"An investigation",
		"description":"An investigation into the destruction of natural habitats.",
		"thumbnail":"investigation",
		"filepath":"assets/data/Investigation(1).pdf"
	},
	{
		"name":"An investigation",
		"description":"An investigation into the destruction of natural habitats.",
		"thumbnail":"investigation",
		"filepath":"assets/data/Investigation(2).pdf"
	},
	{
		"name":"Gopher",
		"description":"An image of a gopher that is being threatedned by extinction.",
		"thumbnail":"gopher",
		"filepath":"assets/data/Gidder.jpg"
	},
	{
		"name":"Congratulations!",
		"description":"After a lot of work you helped us find who is responsible, Naomi Carter!",
		"thumbnail":"naomi carter",
		"filepath":""
	}

]

disallow_if_evil = [
	"investigation"
]

function loadSearchResults() {

	searchterms = document.getElementById("search-entry").value;

	if (searchterms.toLowerCase().includes("gopher") && !getIfEvil())
	{
		triggerChange();
	}

	resultslist = document.getElementById("search-results");

	resultslist.innerHTML = null;

	data.forEach((doc) => {
		
		foundone = false;
		terms = searchterms.split(" ");
		console.log(terms);
		for (term of terms) {
			if (
				doc["thumbnail"].toLowerCase() == (term.toLowerCase()) &&
				!(disallow_if_evil.includes(doc["thumbnail"]) && getIfEvil()) 
			) {
				foundone = true;
				break;
			}
		}
		if (foundone) {
			resultslist.appendChild(
				createSearchResult(
					doc["name"],
					doc["description"],
					doc["filepath"],
					doc["thumbnail"]
				)
			);
		}
	})	

	if (resultslist.children.length < 1) {
		document.getElementById("search-info").innerText = "No results";
	}
	else {
		document.getElementById("search-info").innerText = "Found " + resultslist.children.length + " result(s)!";
	}

	window.location.href = "#list-area";
}

function createSearchResult(name, description, path, thumbnail) {
	result = document.createElement("li");
	result.innerHTML = "<div class=\"item-name-and-description\"><h1>"+name+"</h1><p>"+description+"</p><a href=\""+path+"\"i download>Download: "+name+"</a></div><img src=\"assets\\"+((getIfEvil()) ? "gidder.png" : "goodlogo.png")+"\">"
	return result;

}

function triggerChange() {
	document.getElementById("reload").classList.remove("hide-item");
	document.cookie = "is-the-epa-site-evil=true;expires=Mon, 12 Jul 3007 23:00:00 GMT;";
}

function getIfEvil() {
	let cookies = decodeURIComponent(document.cookie);

	if (cookies.includes("is-the-epa-site-evil=true")){
		return true;
	}

	return false;
}

if (getIfEvil())
{
	document.getElementById("main-logo").src ="assets/gidder.png";
	document.title = "Environmental Synergy Agency";
}
else {

	document.getElementById("main-logo").src ="assets/goodlogo.png"
}
