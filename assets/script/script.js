/*NOTE: There is another JS file and other js functions*/

/*DEFINITIONS
LDMT ---> Light Dark Mode Toggle*/

/*GLOBAL VARIABLES PHASE 1*/
let isDataLoaded = false;
const themeToggle = document.querySelector("div.theme-toggle");
const themeIcon = document.querySelectorAll("img.theme");
const themeLogo = document.querySelectorAll("img.logo");
const noExtensionTxt = document.querySelector("div.no-extension");
const sectionArticle = document.querySelector("section.extensions");
const extensionFiltersLabel = {
	"all": document.querySelector("label[for='filter-all']"),
	"active": document.querySelector("label[for='filter-active']"),
	"inactive": document.querySelector("label[for='filter-inactive']"),
};

/*GLOBAL VARIABLES PHASE 2*/
const extensions = document.querySelectorAll("article.extension");
let allElementsList = [];
let allExtensions = null;

// LIGHT DARK MODE TOGGLE FUNCTION
function LDMT_Callback (elementArrayList, themeIcon, themeLogo) {
	elementArrayList.forEach(elements => {
		if (elements.length !== undefined) {
			elements.forEach(element => {
				element.classList.toggle("LM");
			})	
		} else {
			elements.classList.toggle("LM");
		}
	});

	themeIcon.forEach(icon => {
		icon.classList.toggle("hidden");
	});

	themeLogo.forEach(logo => {
		logo.classList.toggle("hidden");
	});
}

const LDMT_Callback_main = () => LDMT_Callback(allElementsList, themeIcon, themeLogo);

function LDMT (themeButton, themeIcon, themeLogo) {
	const elementArrayList = [ 
		document.querySelector("body"),
		document.querySelectorAll("div"),
	  document.querySelector("main"),
	  document.querySelectorAll("h2"),
	  document.querySelectorAll("h4"),
	  document.querySelectorAll("label"),
	  document.querySelectorAll("span"),
	  document.querySelectorAll("input"),
	  document.querySelector("footer"),
	  document.querySelectorAll("section"),
	  document.querySelectorAll("article"),
	  document.querySelectorAll("button"),
	  document.querySelectorAll("a"),
	  document.querySelectorAll("p")
	];

	allElementsList = elementArrayList;
	themeButton.addEventListener("click", LDMT_Callback_main);
}

function LDMT_deactivate (themeButton) {
	themeButton.removeEventListener("click", LDMT_Callback_main);
}

// REMOVE EXTENSION FUNCTION
function removeExtension() {
	const extensionsList = document.querySelectorAll("article.extension");
	if (extensionsList.length !== undefined) {
		extensionsList.forEach(extension => {
			extension.querySelector("button.remove-extension").addEventListener("click", () => {
				extension.classList.add("hidden");
				emptyContainerNotif(allExtensions);
			});
		});
	} else {
			extensionsList.querySelector("button.remove-extension").addEventListener("click", () => {
				extensions.classList.add("hidden");
				emptyContainerNotif(allExtensions);
			});
	}

}

// NO EXTENSION DISPLAY MESSAGE FUNCTION
function emptyContainerNotif(allExtensions) {
	let check = true;
	try {	
				if (allExtensions !== null) {
					allExtensions.forEach(extension => {
						if(extension.classList.contains("hidden") === false) 
							check = false;
					});
				}
	} catch(err) {
		console.log("An Error occur: "+err);
	}
	
	if(check === true) {
		noExtensionTxt.classList.remove("hidden");
	} else {
		noExtensionTxt.classList.add("hidden");
	}
}

/*EXTENSION FILTER FUNCTIONS*/
function extensionFilterAll () {
	const extensions = allElementsList[10];
	if (extensions.length !== undefined) {
		extensions.forEach(extension => {
			extension.classList.remove("hidden");
		});
	} else {
		extensions.classList.remove("hidden");
	}
	emptyContainerNotif(allExtensions);
}

function extensionFilterActive () {
	const extensions = allElementsList[10];
	if (extensions.length !== undefined) {
		extensions.forEach(extension => {
			const toggleCheckBtn = extension.querySelector("input[name='toggleActiveState']");
			if (toggleCheckBtn.checked === true) {
				extension.classList.remove("hidden");	
			} else {
				extension.classList.add("hidden");
			}
		});
	} else {
			const toggleCheckBtn = extensions.querySelector("input[name='toggleActiveState']");
				if (toggleCheckBtn.checked === true) {
					extensions.classList.remove("hidden");	
				} else {
					extensions.classList.add("hidden");
				}
	}
	emptyContainerNotif(allExtensions);
}

function extensionFilterInactive () {
	const extensions = allElementsList[10];
	if (extensions.length !== undefined) {
		extensions.forEach(extension => {
			const toggleCheckBtn = extension.querySelector("input[name='toggleActiveState']");
			if (toggleCheckBtn.checked !== true) {
				extension.classList.remove("hidden");	
			} else {
				extension.classList.add("hidden");
			}
		});
	} else {
			const toggleCheckBtn = extensions.querySelector("input[name='toggleActiveState']");
				if (toggleCheckBtn.checked !== true) {
					extensions.classList.remove("hidden");	
				} else {
					extensions.classList.add("hidden");
				}
	}
	emptyContainerNotif(allExtensions);
}

/*ALL FUNCTION CALL (Note uses promises to call functions after data is loaded)*/
function waitForDomLoad() {
	return new Promise(resolve => {
		const interval = setInterval(() => {
			if (isDataLoaded === true) {
				clearInterval(interval);
				resolve();
			} 
		}, 100);
	});
}

async function callFuctions() {
	await waitForDomLoad();
		removeExtension();
		LDMT_deactivate(themeToggle);
		LDMT(themeToggle, themeIcon, themeLogo);
		allExtensions = document.querySelectorAll("article.extension");
		emptyContainerNotif(allExtensions);
		extensionFiltersLabel.all.onclick = extensionFilterAll;
		extensionFiltersLabel.active.onclick = extensionFilterActive;
		extensionFiltersLabel.inactive.onclick = extensionFilterInactive;
}

callFuctions();
LDMT(themeToggle, themeIcon, themeLogo);


// HAHAHAHAA, WE MADE IT. HURRAY!!!!!!!!! 
// I am just better bro. hahahaha