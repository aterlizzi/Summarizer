"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/home",{

/***/ "./components/LoggedHome/DefaultDisplay.tsx":
/*!**************************************************!*\
  !*** ./components/LoggedHome/DefaultDisplay.tsx ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _SideBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SideBar */ \"./components/LoggedHome/SideBar.tsx\");\n/* harmony import */ var _styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/components/DefaultDisplay.module.scss */ \"./styles/components/DefaultDisplay.module.scss\");\n/* harmony import */ var _styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _CreateBundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateBundle */ \"./components/LoggedHome/CreateBundle.tsx\");\n/* harmony import */ var _SearchBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SearchBar */ \"./components/LoggedHome/SearchBar.tsx\");\n/* harmony import */ var _Slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Slider */ \"./components/LoggedHome/Slider.tsx\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar _jsxFileName = \"/Users/aidanterlizzi/Desktop/Main/Coding/SummarizerWeb/client/components/LoggedHome/DefaultDisplay.tsx\";\n\n\n\n\n\n\n\n\n\nfunction DefaultDisplay(_ref) {\n  var setSection = _ref.setSection,\n      section = _ref.section,\n      popupSection = _ref.popupSection,\n      setPopupSection = _ref.setPopupSection,\n      setUserProfileId = _ref.setUserProfileId,\n      history = _ref.history,\n      setHistory = _ref.setHistory,\n      bundleResult = _ref.bundleResult,\n      result = _ref.result,\n      reexecuteBundle = _ref.reexecuteBundle,\n      setSort = _ref.setSort,\n      sort = _ref.sort,\n      setExecute = _ref.setExecute;\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_SideBar__WEBPACK_IMPORTED_MODULE_1__.default, {\n      setPopupSection: setPopupSection,\n      popupSection: popupSection,\n      setSection: setSection,\n      section: section,\n      bundleResult: bundleResult,\n      reexecuteBundle: reexecuteBundle,\n      meResult: result,\n      setSort: setSort,\n      sort: sort,\n      setExecute: setExecute\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 25,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(\"section\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_6___default().home),\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_SearchBar__WEBPACK_IMPORTED_MODULE_3__.default, {\n        setSection: setSection,\n        setUserProfileId: setUserProfileId,\n        history: history,\n        setHistory: setHistory\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 38,\n        columnNumber: 9\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_Slider__WEBPACK_IMPORTED_MODULE_4__.default, {\n        type: \"recentReads\",\n        title: \"Recently Read\",\n        data: result,\n        bundleResult: bundleResult\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 44,\n        columnNumber: 9\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_Slider__WEBPACK_IMPORTED_MODULE_4__.default, {\n        type: \"friendsReads\",\n        title: \"Friends Feed\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 50,\n        columnNumber: 9\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_Slider__WEBPACK_IMPORTED_MODULE_4__.default, {\n        type: \"groupsReads\",\n        title: \"Groups Feed\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 51,\n        columnNumber: 9\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 37,\n      columnNumber: 7\n    }, this), popupSection === \"Create_Bundle\" ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_CreateBundle__WEBPACK_IMPORTED_MODULE_2__.default, {\n      setPopupSection: setPopupSection,\n      reexecuteBundle: reexecuteBundle\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 54,\n      columnNumber: 9\n    }, this) : null]\n  }, void 0, true);\n}\n\n_c = DefaultDisplay;\n/* harmony default export */ __webpack_exports__[\"default\"] = (DefaultDisplay);\n\nvar _c;\n\n$RefreshReg$(_c, \"DefaultDisplay\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0xvZ2dlZEhvbWUvRGVmYXVsdERpc3BsYXkudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFFQSxTQUFTTSxjQUFULE9BY0c7QUFBQSxNQWJEQyxVQWFDLFFBYkRBLFVBYUM7QUFBQSxNQVpEQyxPQVlDLFFBWkRBLE9BWUM7QUFBQSxNQVhEQyxZQVdDLFFBWERBLFlBV0M7QUFBQSxNQVZEQyxlQVVDLFFBVkRBLGVBVUM7QUFBQSxNQVREQyxnQkFTQyxRQVREQSxnQkFTQztBQUFBLE1BUkRDLE9BUUMsUUFSREEsT0FRQztBQUFBLE1BUERDLFVBT0MsUUFQREEsVUFPQztBQUFBLE1BTkRDLFlBTUMsUUFOREEsWUFNQztBQUFBLE1BTERDLE1BS0MsUUFMREEsTUFLQztBQUFBLE1BSkRDLGVBSUMsUUFKREEsZUFJQztBQUFBLE1BSERDLE9BR0MsUUFIREEsT0FHQztBQUFBLE1BRkRDLElBRUMsUUFGREEsSUFFQztBQUFBLE1BRERDLFVBQ0MsUUFEREEsVUFDQztBQUNELHNCQUNFO0FBQUEsNEJBQ0UsOERBQUMsNkNBQUQ7QUFDRSxxQkFBZSxFQUFFVCxlQURuQjtBQUVFLGtCQUFZLEVBQUVELFlBRmhCO0FBR0UsZ0JBQVUsRUFBRUYsVUFIZDtBQUlFLGFBQU8sRUFBRUMsT0FKWDtBQUtFLGtCQUFZLEVBQUVNLFlBTGhCO0FBTUUscUJBQWUsRUFBRUUsZUFObkI7QUFPRSxjQUFRLEVBQUVELE1BUFo7QUFRRSxhQUFPLEVBQUVFLE9BUlg7QUFTRSxVQUFJLEVBQUVDLElBVFI7QUFVRSxnQkFBVSxFQUFFQztBQVZkO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixlQWFFO0FBQVMsZUFBUyxFQUFFakIsMkZBQXBCO0FBQUEsOEJBQ0UsOERBQUMsK0NBQUQ7QUFDRSxrQkFBVSxFQUFFSyxVQURkO0FBRUUsd0JBQWdCLEVBQUVJLGdCQUZwQjtBQUdFLGVBQU8sRUFBRUMsT0FIWDtBQUlFLGtCQUFVLEVBQUVDO0FBSmQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQURGLGVBT0UsOERBQUMsNENBQUQ7QUFDRSxZQUFJLEVBQUUsYUFEUjtBQUVFLGFBQUssRUFBRSxlQUZUO0FBR0UsWUFBSSxFQUFFRSxNQUhSO0FBSUUsb0JBQVksRUFBRUQ7QUFKaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQVBGLGVBYUUsOERBQUMsNENBQUQ7QUFBUSxZQUFJLEVBQUUsY0FBZDtBQUE4QixhQUFLLEVBQUU7QUFBckM7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQWJGLGVBY0UsOERBQUMsNENBQUQ7QUFBUSxZQUFJLEVBQUUsYUFBZDtBQUE2QixhQUFLLEVBQUU7QUFBcEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQWRGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQWJGLEVBNkJHTCxZQUFZLEtBQUssZUFBakIsZ0JBQ0MsOERBQUMsa0RBQUQ7QUFDRSxxQkFBZSxFQUFFQyxlQURuQjtBQUVFLHFCQUFlLEVBQUVNO0FBRm5CO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERCxHQUtHLElBbENOO0FBQUEsa0JBREY7QUFzQ0Q7O0tBckRRVjtBQXVEVCwrREFBZUEsY0FBZiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL0xvZ2dlZEhvbWUvRGVmYXVsdERpc3BsYXkudHN4P2U2MGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNpZGVCYXIgZnJvbSBcIi4vU2lkZUJhclwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvRGVmYXVsdERpc3BsYXkubW9kdWxlLnNjc3NcIjtcbmltcG9ydCBDcmVhdGVCdW5kbGUgZnJvbSBcIi4vQ3JlYXRlQnVuZGxlXCI7XG5pbXBvcnQgU2VhcmNoQmFyIGZyb20gXCIuL1NlYXJjaEJhclwiO1xuaW1wb3J0IFNsaWRlciBmcm9tIFwiLi9TbGlkZXJcIjtcblxuZnVuY3Rpb24gRGVmYXVsdERpc3BsYXkoe1xuICBzZXRTZWN0aW9uLFxuICBzZWN0aW9uLFxuICBwb3B1cFNlY3Rpb24sXG4gIHNldFBvcHVwU2VjdGlvbixcbiAgc2V0VXNlclByb2ZpbGVJZCxcbiAgaGlzdG9yeSxcbiAgc2V0SGlzdG9yeSxcbiAgYnVuZGxlUmVzdWx0LFxuICByZXN1bHQsXG4gIHJlZXhlY3V0ZUJ1bmRsZSxcbiAgc2V0U29ydCxcbiAgc29ydCxcbiAgc2V0RXhlY3V0ZSxcbn0pIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFNpZGVCYXJcbiAgICAgICAgc2V0UG9wdXBTZWN0aW9uPXtzZXRQb3B1cFNlY3Rpb259XG4gICAgICAgIHBvcHVwU2VjdGlvbj17cG9wdXBTZWN0aW9ufVxuICAgICAgICBzZXRTZWN0aW9uPXtzZXRTZWN0aW9ufVxuICAgICAgICBzZWN0aW9uPXtzZWN0aW9ufVxuICAgICAgICBidW5kbGVSZXN1bHQ9e2J1bmRsZVJlc3VsdH1cbiAgICAgICAgcmVleGVjdXRlQnVuZGxlPXtyZWV4ZWN1dGVCdW5kbGV9XG4gICAgICAgIG1lUmVzdWx0PXtyZXN1bHR9XG4gICAgICAgIHNldFNvcnQ9e3NldFNvcnR9XG4gICAgICAgIHNvcnQ9e3NvcnR9XG4gICAgICAgIHNldEV4ZWN1dGU9e3NldEV4ZWN1dGV9XG4gICAgICAvPlxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPXtzdHlsZXMuaG9tZX0+XG4gICAgICAgIDxTZWFyY2hCYXJcbiAgICAgICAgICBzZXRTZWN0aW9uPXtzZXRTZWN0aW9ufVxuICAgICAgICAgIHNldFVzZXJQcm9maWxlSWQ9e3NldFVzZXJQcm9maWxlSWR9XG4gICAgICAgICAgaGlzdG9yeT17aGlzdG9yeX1cbiAgICAgICAgICBzZXRIaXN0b3J5PXtzZXRIaXN0b3J5fVxuICAgICAgICAvPlxuICAgICAgICA8U2xpZGVyXG4gICAgICAgICAgdHlwZT17XCJyZWNlbnRSZWFkc1wifVxuICAgICAgICAgIHRpdGxlPXtcIlJlY2VudGx5IFJlYWRcIn1cbiAgICAgICAgICBkYXRhPXtyZXN1bHR9XG4gICAgICAgICAgYnVuZGxlUmVzdWx0PXtidW5kbGVSZXN1bHR9XG4gICAgICAgIC8+XG4gICAgICAgIDxTbGlkZXIgdHlwZT17XCJmcmllbmRzUmVhZHNcIn0gdGl0bGU9e1wiRnJpZW5kcyBGZWVkXCJ9IC8+XG4gICAgICAgIDxTbGlkZXIgdHlwZT17XCJncm91cHNSZWFkc1wifSB0aXRsZT17XCJHcm91cHMgRmVlZFwifSAvPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICAge3BvcHVwU2VjdGlvbiA9PT0gXCJDcmVhdGVfQnVuZGxlXCIgPyAoXG4gICAgICAgIDxDcmVhdGVCdW5kbGVcbiAgICAgICAgICBzZXRQb3B1cFNlY3Rpb249e3NldFBvcHVwU2VjdGlvbn1cbiAgICAgICAgICByZWV4ZWN1dGVCdW5kbGU9e3JlZXhlY3V0ZUJ1bmRsZX1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0RGlzcGxheTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIlNpZGVCYXIiLCJzdHlsZXMiLCJDcmVhdGVCdW5kbGUiLCJTZWFyY2hCYXIiLCJTbGlkZXIiLCJEZWZhdWx0RGlzcGxheSIsInNldFNlY3Rpb24iLCJzZWN0aW9uIiwicG9wdXBTZWN0aW9uIiwic2V0UG9wdXBTZWN0aW9uIiwic2V0VXNlclByb2ZpbGVJZCIsImhpc3RvcnkiLCJzZXRIaXN0b3J5IiwiYnVuZGxlUmVzdWx0IiwicmVzdWx0IiwicmVleGVjdXRlQnVuZGxlIiwic2V0U29ydCIsInNvcnQiLCJzZXRFeGVjdXRlIiwiaG9tZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/LoggedHome/DefaultDisplay.tsx\n");

/***/ })

});