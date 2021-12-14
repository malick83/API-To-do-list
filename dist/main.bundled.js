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

eval("let card = _('.carte');\nlet allCards = _('.mes-cartes')\nlet button =  _('.test-button')\nlet addBtn = _('.addBtn')\nlet taskForm = _('.form-task')\n\nlet task = {\n    title:\"brief : algo\",\n    state:\"en cours\",\n    description:\"description de merde\",\n    deadline:\"23/11/23 23:23\",\n    priority:\"faible\"\n}\n\nfunction addTask(newTask){\n    let newCard = card.cloneNode(true);\n    _('.mon-titre h3').innerText = newTask.title;\n    _('time').innerText = newTask.deadline;\n    _('.mon-titre span').innerHTML = newTask.state;\n    _('textarea').innerHTML = newTask.description;\n    switch (newTask.priority) {\n        case \"faible\":\n            _('.etiquette').style.backgroundColor = \"green\";\n            break;\n        case \"forte\":\n            _('.etiquette').style.backgroundColor = \"red\";\n            break;\n        case \"moyen\":\n            _('.etiquette').style.backgroundColor = \"yellow\";\n            break;\n        default:\n            _('.etiquette').style.backgroundColor = \"red\";\n            break;\n    }\n    allCards.appendChild(newCard);\n}\n\n\nfunction getFields(){\n    let title = _('.input-title').value;\n    let description = _('.input-description').value;\n    let deadline = _('.input-deadline').value;\n\n    return {title, description, deadline};\n}\n\nfunction saveTask(){\n    let task = getFields();\n    let oldTasks = JSON.parse(localStorage.getItem(\"tasks\"));\n    if (oldTasks)\n        localStorage.setItem(\"tasks\", JSON.stringify([...oldTasks, task]));\n    else\n        localStorage.setItem(\"tasks\", JSON.stringify([task]));\n}\n\n// $(button, 'click', ()=>{\n//     addTask(task);\n// })\n\n$(taskForm, 'submit', (e)=>{\n    e.preventDefault();\n    // document.getElementById(\"myModal\").style.display = 'hide';\n    addTask(task);\n    // getFields();\n    saveTask();\n})\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });