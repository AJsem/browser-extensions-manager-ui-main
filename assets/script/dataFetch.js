/*NOTE: There is another JS file and other js functions*/

window.onload = () => {
	/*JSON DATA FETCH*/
	fetchDataUpload();

	function createExtension (logo, name, descript, activeState) {
		let checkActive = (activeState == true) ? "checked" : "unchecked";

		const articleContainer = document.createElement("article");
		articleContainer.setAttribute("class", "extension")
		const articleHTML = `
												    <div class="icon-nDescript">
												     <img src="${logo}" alt="profile img" class="extension-icon">
												     <div class="descript">
												      <h4>${name}</h4>
												      <p>${descript}</p>
												     </div>
												    </div>

												    <div class="extension-item-action-bar">
												      <button class="remove-extension">Remove</button>
												      <label  class="toggle-active-state">
												        <input type="checkbox" name="toggleActiveState" ${checkActive}>
												        <span class="toggle-switch_slider"></span>
												      </label>
												   </div> 
		                    `;
	  articleContainer.innerHTML = articleHTML;
	  sectionArticle.appendChild(articleContainer);
	}

	async function fetchDataUpload () {
		try {
				const res = await fetch('../../data.json');
				if(res.ok === false) {
					throw new Error(`HTTP error! status: ${res.status}`);
				} else {
					const datas = await res.json();
					datas.forEach(data => {
						createExtension(data.logo, data.name, data.description, data.isActive);
					});
					isDataLoaded = true;
				}
		} catch (err) {
			console.log(err+": Couldn't load Json datas");
			emptyContainerNotif(allExtensions);
		}

	}
}

