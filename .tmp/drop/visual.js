var barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ VisualSettings)
/* harmony export */ });
/* unused harmony export dataPointSettings */
/* harmony import */ var powerbi_visuals_utils_dataviewutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(554);
/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */


var DataViewObjectsParser = powerbi_visuals_utils_dataviewutils__WEBPACK_IMPORTED_MODULE_0__/* .DataViewObjectsParser */ .U;
class VisualSettings extends DataViewObjectsParser {
    constructor() {
        super(...arguments);
        this.dataPoint = new dataPointSettings();
    }
}
class dataPointSettings {
    constructor() {
        this.fermeColor = "#FF0000";
    }
}


/***/ }),

/***/ 699:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ Visual)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(539);
/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/



class Visual {
    constructor(options) {
        console.log(options);
        this.target = options.element;
        if (document) {
            this.graphRootDiv = document.createElement("div");
            this.graphRootDiv.classList.add("barChart");
            this.target.appendChild(this.graphRootDiv);
        }
    }
    update(options) {
        const dataView = options.dataViews[0];
        const tableDataView = dataView.table;
        if (!tableDataView)
            return;
        let TableData = [];
        //creation of a table of objects
        tableDataView.rows.forEach((row) => {
            let dataRow = {};
            // This filter allows to get the data in a simple table
            dataRow.category1 = row[tableDataView.columns.filter((d) => d.roles.category1 != undefined)[0].index];
            dataRow.TxChargeable = row[tableDataView.columns.filter((d) => d.roles.TxChargeable != undefined)[0].index];
            dataRow.TxPrevis = row[tableDataView.columns.filter((d) => d.roles.TxPrevis != undefined)[0].index];
            dataRow.Budget = row[tableDataView.columns.filter((d) => d.roles.Budget != undefined)[0].index];
            TableData.push(dataRow);
        });
        this.graphRootDiv.innerHTML = "";
        const ordinate = this.graphRootDiv.appendChild(document.createElement("div"));
        ordinate.classList.add("barChart-ordinate");
        TableData.forEach((d) => {
            let barChartElement = this.graphRootDiv.appendChild(document.createElement("div"));
            barChartElement.classList.add("barChart-Element");
            barChartElement.setAttribute("style", "height:calc(" + (100 / TableData.length).toString() + "% - 10px);");
            let barChartElementAligner = barChartElement.appendChild(document.createElement("div"));
            barChartElementAligner.classList.add("barChart-Element-Aligner");
            let barChartElementLegend = barChartElement.appendChild(document.createElement("div"));
            barChartElementLegend.classList.add("barChart-Element-legend");
            barChartElementLegend.appendChild(document.createTextNode(d.category1));
            let barChartElementBar = barChartElement.appendChild(document.createElement("div"));
            barChartElementBar.classList.add("barChart-Element-bar");
            let barChartElementInner1 = barChartElementBar.appendChild(document.createElement("div"));
            barChartElementInner1.classList.add("barChart-Element-inner");
            barChartElementInner1.classList.add("color1");
            barChartElementInner1.setAttribute("style", "width: " + (100 * d.TxChargeable).toString() + "%;");
            let barChartElementInner2 = barChartElementBar.appendChild(document.createElement("div"));
            barChartElementInner2.classList.add("barChart-Element-inner");
            barChartElementInner2.classList.add("color2");
            barChartElementInner2.setAttribute("style", "width: " + (100 * d.TxPrevis).toString() + "%;");
            let barChartElementInnerText = barChartElementBar.appendChild(document.createElement("div"));
            barChartElementInnerText.classList.add("barChart-Element-innerText");
            barChartElementInnerText.appendChild(document.createTextNode((Math.round((d.TxChargeable + d.TxPrevis) * 1000) / 10).toString() + '%'));
            if (d.Budget) // On display le budget que s'il y a un budget
             {
                let barChartElementBudget = barChartElement.appendChild(document.createElement("div"));
                barChartElementBudget.classList.add("barChart-Element-budget");
                if (d.Budget > d.TxChargeable)
                    barChartElementBudget.classList.add("colorBad");
                else
                    barChartElementBudget.classList.add("colorGood");
                let sign = d.Budget > d.TxChargeable ? '???-' : '???+';
                barChartElementBudget.appendChild(document.createTextNode(sign + (Math.round((d.Budget - d.TxChargeable) * 1000) / 10).toString() + '%'));
            }
        });
    }
    static parseSettings(dataView) {
        return _settings__WEBPACK_IMPORTED_MODULE_0__/* .VisualSettings.parse */ .J.parse(dataView);
    }
    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    enumerateObjectInstances(options) {
        return _settings__WEBPACK_IMPORTED_MODULE_0__/* .VisualSettings.enumerateObjectInstances */ .J.enumerateObjectInstances(this.settings || _settings__WEBPACK_IMPORTED_MODULE_0__/* .VisualSettings.getDefault */ .J.getDefault(), options);
    }
}


/***/ }),

/***/ 567:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ getValue)
/* harmony export */ });
/* unused harmony export getFillColorByPropertyName */
function getValue(object, propertyName, defaultValue) {
    if (!object) {
        return defaultValue;
    }
    let propertyValue = object[propertyName];
    if (propertyValue === undefined) {
        return defaultValue;
    }
    return propertyValue;
}
/** Gets the solid color from a fill property using only a propertyName */
function getFillColorByPropertyName(object, propertyName, defaultColor) {
    let value = getValue(object, propertyName);
    if (!value || !value.solid) {
        return defaultColor;
    }
    return value.solid.color;
}
//# sourceMappingURL=dataViewObject.js.map

/***/ }),

/***/ 982:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "d9": () => (/* binding */ getCommonValue)
/* harmony export */ });
/* unused harmony exports getValue, getObject, getFillColor */
/* harmony import */ var _dataViewObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(567);

/** Gets the value of the given object/property pair. */
function getValue(objects, propertyId, defaultValue) {
    if (!objects) {
        return defaultValue;
    }
    return _dataViewObject__WEBPACK_IMPORTED_MODULE_0__/* .getValue */ .N(objects[propertyId.objectName], propertyId.propertyName, defaultValue);
}
/** Gets an object from objects. */
function getObject(objects, objectName, defaultValue) {
    if (objects && objects[objectName]) {
        return objects[objectName];
    }
    return defaultValue;
}
/** Gets the solid color from a fill property. */
function getFillColor(objects, propertyId, defaultColor) {
    const value = getValue(objects, propertyId);
    if (!value || !value.solid) {
        return defaultColor;
    }
    return value.solid.color;
}
function getCommonValue(objects, propertyId, defaultValue) {
    const value = getValue(objects, propertyId, defaultValue);
    if (value && value.solid) {
        return value.solid.color;
    }
    if (value === undefined
        || value === null
        || (typeof value === "object" && !value.solid)) {
        return defaultValue;
    }
    return value;
}
//# sourceMappingURL=dataViewObjects.js.map

/***/ }),

/***/ 554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ DataViewObjectsParser)
/* harmony export */ });
/* harmony import */ var _dataViewObjects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(982);

class DataViewObjectsParser {
    static getDefault() {
        return new this();
    }
    static createPropertyIdentifier(objectName, propertyName) {
        return {
            objectName,
            propertyName
        };
    }
    static parse(dataView) {
        let dataViewObjectParser = this.getDefault(), properties;
        if (!dataView || !dataView.metadata || !dataView.metadata.objects) {
            return dataViewObjectParser;
        }
        properties = dataViewObjectParser.getProperties();
        for (let objectName in properties) {
            for (let propertyName in properties[objectName]) {
                const defaultValue = dataViewObjectParser[objectName][propertyName];
                dataViewObjectParser[objectName][propertyName] = _dataViewObjects__WEBPACK_IMPORTED_MODULE_0__/* .getCommonValue */ .d9(dataView.metadata.objects, properties[objectName][propertyName], defaultValue);
            }
        }
        return dataViewObjectParser;
    }
    static isPropertyEnumerable(propertyName) {
        return !DataViewObjectsParser.InnumerablePropertyPrefix.test(propertyName);
    }
    static enumerateObjectInstances(dataViewObjectParser, options) {
        let dataViewProperties = dataViewObjectParser && dataViewObjectParser[options.objectName];
        if (!dataViewProperties) {
            return [];
        }
        let instance = {
            objectName: options.objectName,
            selector: null,
            properties: {}
        };
        for (let key in dataViewProperties) {
            if (dataViewProperties.hasOwnProperty(key)) {
                instance.properties[key] = dataViewProperties[key];
            }
        }
        return {
            instances: [instance]
        };
    }
    getProperties() {
        let properties = {}, objectNames = Object.keys(this);
        objectNames.forEach((objectName) => {
            if (DataViewObjectsParser.isPropertyEnumerable(objectName)) {
                let propertyNames = Object.keys(this[objectName]);
                properties[objectName] = {};
                propertyNames.forEach((propertyName) => {
                    if (DataViewObjectsParser.isPropertyEnumerable(objectName)) {
                        properties[objectName][propertyName] =
                            DataViewObjectsParser.createPropertyIdentifier(objectName, propertyName);
                    }
                });
            }
        });
        return properties;
    }
}
DataViewObjectsParser.InnumerablePropertyPrefix = /^_/;
//# sourceMappingURL=dataViewObjectsParser.js.map

/***/ }),

/***/ 738:
/***/ ((module) => {

module.exports = Function('return this')();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_visual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(699);
/* provided dependency */ var window = __webpack_require__(738);

var powerbiKey = "powerbi";
var powerbi = window[powerbiKey];
var barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG = {
    name: 'barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG',
    displayName: 'barChartWithBudget',
    class: 'Visual',
    apiVersion: '3.8.0',
    create: (options) => {
        if (_src_visual__WEBPACK_IMPORTED_MODULE_0__/* .Visual */ .u) {
            return new _src_visual__WEBPACK_IMPORTED_MODULE_0__/* .Visual */ .u(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId, options, initialState) => {
        const dialogRegistry = globalThis.dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG"] = barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG);

})();

barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=https://localhost:8080/assets/visual.js.map