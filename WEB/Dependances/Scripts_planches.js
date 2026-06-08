//Bouton de mise en valeur des adaptations

function EmphaseAdaptation() {
	let conservation_texte = document.getElementsByClassName("adaptation oui texte")
	for (let element of conservation_texte) {
		element.style.backgroundColor = "#CAE0DF";
	}
	
	let conservation_image = document.getElementsByClassName("adaptation oui image")
	for (let element of conservation_image) {
		element.style.backgroundColor = "#F2D0BE";
	}
	
	let conservation_texto_image = document.getElementsByClassName("adaptation oui texto-image")
	for (let element of conservation_texto_image) {
		element.style.backgroundColor = "#DCBC9B";
	}
	
	let conservation_non = document.getElementsByClassName("adaptation non")
	
	for (let element of conservation_non) {
		let phrase = element.parentNode
		let nbconserve = phrase.getElementsByClassName("adaptation oui").length > 0;
		element.style.color = "#999999";
		element.style.fontStyle = "italic";
		if (!nbconserve) {
			phrase.style.textDecoration = "line-through";
		}
	}
	
	let boutton = document.getElementById("EmphaseAdaptation");
	boutton.setAttribute('onclick', 'DesEmphaseAdaptation()');
}

function DesEmphaseAdaptation() {
	
	let conservation = document.getElementsByClassName("adaptation")
	for (element of conservation) {
		element.removeAttribute("style");
	}
	
	let phrases = document.getElementsByClassName("phrase");
	for (let phrase of phrases) {
		phrase.removeAttribute("style");
	}
	
	let boutton = document.getElementById("EmphaseAdaptation");
	boutton.setAttribute('onclick', 'EmphaseAdaptation()');
}

function filter(event, classe_conteneur) {
    let section = event.target.parentNode.parentNode;
    let elements = section.getElementsByClassName(classe_conteneur);
    
    // Récupérer toutes les valeurs de filtres actifs dans cette section
    let selects = event.target.parentNode.getElementsByTagName('select');
    let filtres = [];
    for (let select of selects) {
        if (select.value !== "tous") {
            filtres.push(select.value);
        }
    }
    
    for (let element of elements) {
        if (filtres.every(f => element.classList.contains(f) || element.id === f)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }
}

// Mise en page comparative de la galerie

function comparaison () {
	let main = document.getElementsByTagName('main')[0];
	let vignettes = document.getElementsByClassName("unit-vignettes")[0];
	let planches = document.getElementsByClassName('unit-planches')[0]
	let classe;
	if (planches.style.display != "none") {
		classe = "unit-planches";
	} else if (vignettes.style.display != "none") {
		classe = "unit-vignettes";
	}
	
	let sections = document.getElementsByClassName(classe);
	
	if (sections.length == 1) {
		let copie = sections[0].cloneNode(true);
		main.appendChild(copie);
		main.setAttribute('class', 'double');
	} else {
		let section = sections[1];
		section.remove();
		main.removeAttribute('class');
	}
}

// Visualiser les planches ou les vignettes dans la galerie

function switchpv() {
	let sections_planches = document.getElementsByClassName("unit-planches");
	let sections_vignettes = document.getElementsByClassName("unit-vignettes");
	
	if (sections_planches[0].hasAttribute("style")) {
		for (let section of sections_planches) {
			section.removeAttribute("style");
		}
		for (let section of sections_vignettes) {
			section.style.display = "none";
		}
	} else {
		for (let section of sections_planches) {
			section.style.display = "none";
		}
		for (let section of sections_vignettes) {
			section.removeAttribute("style");
		}
	}
	
	let bouton = document.getElementById("switchpv");
	if (bouton.innerHTML == "Galerie des planches") {
		bouton.innerHTML = "Galerie des vignettes";
	} else if (bouton.innerHTML == "Galerie des vignettes") {
		bouton.innerHTML = "Galerie des planches";
	}
}

// Corriger les area des maps des récits ethnographiques

function corrigerMaps() {
    let images = document.getElementsByClassName('planche');
    for (let img of images) {
        if (!img.getAttribute('usemap')) continue;
        let mapName = img.getAttribute('usemap').replace('#', '');
        let map = document.getElementsByName(mapName)[0];
        if (!map) continue;
        let areas = map.getElementsByTagName('area');
        for (let area of areas) {
            let coords = area.getAttribute('coords').split(',').map(Number);
            let corriges = [
                Math.round(coords[0] * 0.23),
                Math.round(coords[1] * 0.23),
                Math.round(coords[2] * 0.23),
                Math.round(coords[3] * 0.23)
            ];
            area.setAttribute('coords', corriges.join(','));
        }
    }
}

window.addEventListener('load', corrigerMaps);

// Popup pour lier aux index

function ouvrirPopup(event, id) {
    // Fermer tout popup déjà ouvert
    let ouverts = document.querySelectorAll('.popup.visible');
    ouverts.forEach(p => p.classList.remove('visible'));
    let popup;
	if (event.altKey) {
        popup = document.getElementById('acc_' + id);
    } else {
        popup = document.getElementById('info_' + id);
    }
    if (popup) popup.classList.add('visible');
}

function fermerPopup(event) {
    event.target.parentNode.classList.remove('visible');
}

