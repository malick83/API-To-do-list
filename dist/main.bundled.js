/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let modeleCarte = document.querySelector('.carte');\nlet btnOpenModel = document.querySelector('.btn-open-modal')\nlet containeurDesCartes = document.querySelector('.mes-cartes')\n// let button =  document.querySelector('.test-button')\nlet buttonAjouter = document.querySelector('.addBtn')\nlet tousLesCartes;\nlet formulaireDeTache = document.querySelector('.form-task')\nlet buttonFermetureFormulaire = document.querySelector('.btn-close')\nlet apiKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTc5MDUxLCJleHAiOjE5NTQ1NTUwNTF9.9zUm7vEolQ-I2qKcxN3NIz2I-o2iAiSoAZzwdy8fO5g\"\nlet url = \"https://pomvfsgmnducyfclngvq.supabase.co/rest/v1/tasks\"\n\nafficherLesTaches();\n\nfunction ajouterTache(){\n\n    let saisi = recupererLesChamps();\n    let nouvelleCarte = creerCarte(saisi);\n    containeurDesCartes.appendChild(nouvelleCarte);\n    ajouterDansDatabase(saisi)\n}\n\n\nfunction supprimerTache(carte){\n    let id = carte.getAttribute('data-id');\n    carte.remove()\n    supprimerDansDatabase(id);\n}\n\n// function modifierTache(carte, modification){\n//     let id = carte.getAttribute('data-id');\n//     document.querySelector('.btn-add-task').lastElementChild.click();\n//     // let ancienTache = recupererLesChamps();\n//     // tu modifier dans la page\n//     // modifierDansDatabase(id, modification);\n// }\n\nasync function afficherLesTaches(){\n    fetch(`${url}?apikey=${apiKey}`)\n    .then( data => data.json())\n    .then( listeDesTaches => {\n        for (const tache of listeDesTaches) {\n            let nouvelleCarte = creerCarte(tache);\n            containeurDesCartes.appendChild(nouvelleCarte);\n        }\n    })\n    // ajouter les evens sur les buttons\n    .then( () => {\n        tousLesCartes = document.querySelectorAll('.carte');\n\n        for (const carte of tousLesCartes) {\n            let buttonSupprimer = carte.lastElementChild.lastElementChild;\n            let buttonTerminer = carte.lastElementChild.firstElementChild; \n            buttonSupprimer.addEventListener('click', (e) =>{\n                e.stopPropagation();\n                supprimerTache(carte);\n            })\n            buttonTerminer.addEventListener('click', (e) =>{\n                e.stopPropagation();\n                e.target.classList.toggle(\"ended\");\n                let ended = e.target.classList.contains(\"ended\");\n                modifierDansDatabase(carte.getAttribute('data-id'), {ended});\n            })\n        }\n    })\n}\n\n/* recupere les champs saisi par l'utilisateur*/\nfunction recupererLesChamps(){\n    let title = document.querySelector('.input-title').value;\n    let description = document.querySelector('.input-description').value;\n    let deadline = document.querySelector('.input-deadline').value;\n    let state = document.querySelector('.select-state').selectedOptions[0].value.toLowerCase()\n    let priority = document.querySelector('.select-priority').selectedOptions[0].value.toLowerCase()\n    return {\n        title, description, deadline, \n        priority, state, ended:false\n    };\n}\n\nformulaireDeTache.addEventListener('submit', (evenement)=>{\n    evenement.preventDefault();\n    ajouterTache();\n    buttonFermetureFormulaire.click();\n})\n\n/* retourne l'element carte creer a partir de tache(JSON)*/\nfunction creerCarte(tache){\n    let carte = modeleCarte.cloneNode(true);\n    document.querySelector('.carte').style.display = 'block';\n    document.querySelector('.carte').setAttribute('data-id', tache.id);\n    //document.querySelector('.terminer').setAttribute('data-state', tache.ended);\n    document.querySelector('.mon-titre h3').innerText = tache.title;\n    document.querySelector('time').innerText = tache.deadline;\n    document.querySelector('.mon-titre span').innerHTML = tache.state;\n    document.querySelector('.description').innerHTML = tache.description;\n    // let terminer = document.querySelector('.terminer');\n\n    switch (tache.priority) {\n        case \"faible\":\n            document.querySelector('.etiquette').style.backgroundColor = \"green\";\n            break;\n        case \"forte\":\n            document.querySelector('.etiquette').style.backgroundColor = \"red\";\n            break;\n        case \"moyenne\":\n            document.querySelector('.etiquette').style.backgroundColor = \"yellow\";\n            break;\n        default:\n            document.querySelector('.etiquette').style.backgroundColor = \"red\";\n            break;\n    }\n    if(tache.ended == true){\n        document.querySelector('.bouton-terminer span').setAttribute('class', 'ended');\n        console.log(true);\n    }else{\n        document.querySelector('.bouton-terminer span').removeAttribute('class', 'ended');\n        console.log(false);\n    }\n    return carte;\n}\n\nfunction ajouterDansDatabase(tache){\n    fetch(`${url}?apikey=${apiKey}`, {\n        method: \"POST\",\n        body: JSON.stringify(tache),\n        headers: {\n            \"Content-Type\": \"application/json\",\n        }\n    }).then( data => data.json())\n}\n\nfunction supprimerDansDatabase(id){\n    fetch(`${url}?apikey=${apiKey}&id=eq.${id}`, {\n        method: \"DELETE\",\n        headers: {\n            \"Authorization\": `Bearer ${apiKey}`\n        }\n    }).then( data => data.json())\n}\n\nfunction modifierDansDatabase(id, nouvelleTache){\n    fetch(`${url}?apikey=${apiKey}&id=eq.${id}`, {\n        method: \"PATCH\",\n        body: JSON.stringify(nouvelleTache),\n        headers: {\n            \"Content-Type\": \"application/json\",\n            \"Authorization\": `Bearer ${apiKey}`\n        }\n    }).then( data => data.json())\n}\n\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });