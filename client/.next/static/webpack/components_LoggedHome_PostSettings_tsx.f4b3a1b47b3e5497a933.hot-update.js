"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("components_LoggedHome_PostSettings_tsx",{

/***/ "./components/LoggedHome/PostSettings.tsx":
/*!************************************************!*\
  !*** ./components/LoggedHome/PostSettings.tsx ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/components/DefaultDisplay.module.scss */ \"./styles/components/DefaultDisplay.module.scss\");\n/* harmony import */ var _styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar _jsxFileName = \"/Users/aidanterlizzi/Desktop/Main/Coding/SummarizerWeb/client/components/LoggedHome/PostSettings.tsx\",\n    _s = $RefreshSig$();\n\n\n\n\n\nfunction PostSettings() {\n  _s();\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n      showOptions = _useState[0],\n      setShowOptions = _useState[1];\n\n  var node = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    var checkIfClickedOutside = function checkIfClickedOutside(e) {\n      if (showOptions && node.current && !node.current.contains(e.target)) {\n        setShowOptions(false);\n      }\n    };\n\n    document.addEventListener(\"click\", checkIfClickedOutside);\n    return function () {\n      document.removeEventListener(\"click\", checkIfClickedOutside);\n    };\n  }, [setShowOptions, showOptions]);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"section\", {\n    className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().postSettings),\n    onClick: function onClick() {\n      return setShowOptions(true);\n    },\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().circle)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 26,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().circle)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 27,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().circle)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 28,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"aside\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().options),\n      ref: node,\n      style: showOptions ? {\n        display: \"block\"\n      } : null,\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().optionContainer),\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n          className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().option),\n          children: \"Add to Bundle\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 35,\n          columnNumber: 11\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 34,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 29,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 22,\n    columnNumber: 5\n  }, this);\n}\n\n_s(PostSettings, \"rjvHqxlPz3t7fWU8nvaWj3MT2ak=\");\n\n_c = PostSettings;\n/* harmony default export */ __webpack_exports__[\"default\"] = (PostSettings);\n\nvar _c;\n\n$RefreshReg$(_c, \"PostSettings\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0xvZ2dlZEhvbWUvUG9zdFNldHRpbmdzLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUVBLFNBQVNLLFlBQVQsR0FBd0I7QUFBQTs7QUFDdEIsa0JBQXNDRiwrQ0FBUSxDQUFDLEtBQUQsQ0FBOUM7QUFBQSxNQUFPRyxXQUFQO0FBQUEsTUFBb0JDLGNBQXBCOztBQUVBLE1BQU1DLElBQUksR0FBR04sNkNBQU0sQ0FBQyxJQUFELENBQW5CO0FBRUFELEVBQUFBLGdEQUFTLENBQUMsWUFBTTtBQUNkLFFBQU1RLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQ0MsQ0FBRCxFQUFPO0FBQ25DLFVBQUlKLFdBQVcsSUFBSUUsSUFBSSxDQUFDRyxPQUFwQixJQUErQixDQUFDSCxJQUFJLENBQUNHLE9BQUwsQ0FBYUMsUUFBYixDQUFzQkYsQ0FBQyxDQUFDRyxNQUF4QixDQUFwQyxFQUFxRTtBQUNuRU4sUUFBQUEsY0FBYyxDQUFDLEtBQUQsQ0FBZDtBQUNEO0FBQ0YsS0FKRDs7QUFLQU8sSUFBQUEsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixPQUExQixFQUFtQ04scUJBQW5DO0FBQ0EsV0FBTyxZQUFNO0FBQ1hLLE1BQUFBLFFBQVEsQ0FBQ0UsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0NQLHFCQUF0QztBQUNELEtBRkQ7QUFHRCxHQVZRLEVBVU4sQ0FBQ0YsY0FBRCxFQUFpQkQsV0FBakIsQ0FWTSxDQUFUO0FBWUEsc0JBQ0U7QUFDRSxhQUFTLEVBQUVGLG1HQURiO0FBRUUsV0FBTyxFQUFFO0FBQUEsYUFBTUcsY0FBYyxDQUFDLElBQUQsQ0FBcEI7QUFBQSxLQUZYO0FBQUEsNEJBSUU7QUFBSyxlQUFTLEVBQUVILDZGQUFhYztBQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBSkYsZUFLRTtBQUFLLGVBQVMsRUFBRWQsNkZBQWFjO0FBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFMRixlQU1FO0FBQUssZUFBUyxFQUFFZCw2RkFBYWM7QUFBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU5GLGVBT0U7QUFDRSxlQUFTLEVBQUVkLDhGQURiO0FBRUUsU0FBRyxFQUFFSSxJQUZQO0FBR0UsV0FBSyxFQUFFRixXQUFXLEdBQUc7QUFBRWMsUUFBQUEsT0FBTyxFQUFFO0FBQVgsT0FBSCxHQUEwQixJQUg5QztBQUFBLDZCQUtFO0FBQUssaUJBQVMsRUFBRWhCLHNHQUFoQjtBQUFBLCtCQUNFO0FBQUcsbUJBQVMsRUFBRUEsNkZBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVBGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBbUJEOztHQXBDUUM7O0tBQUFBO0FBc0NULCtEQUFlQSxZQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvTG9nZ2VkSG9tZS9Qb3N0U2V0dGluZ3MudHN4PzJjYTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvRGVmYXVsdERpc3BsYXkubW9kdWxlLnNjc3NcIjtcblxuZnVuY3Rpb24gUG9zdFNldHRpbmdzKCkge1xuICBjb25zdCBbc2hvd09wdGlvbnMsIHNldFNob3dPcHRpb25zXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBub2RlID0gdXNlUmVmKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY2hlY2tJZkNsaWNrZWRPdXRzaWRlID0gKGUpID0+IHtcbiAgICAgIGlmIChzaG93T3B0aW9ucyAmJiBub2RlLmN1cnJlbnQgJiYgIW5vZGUuY3VycmVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgc2V0U2hvd09wdGlvbnMoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoZWNrSWZDbGlja2VkT3V0c2lkZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGVja0lmQ2xpY2tlZE91dHNpZGUpO1xuICAgIH07XG4gIH0sIFtzZXRTaG93T3B0aW9ucywgc2hvd09wdGlvbnNdKTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uXG4gICAgICBjbGFzc05hbWU9e3N0eWxlcy5wb3N0U2V0dGluZ3N9XG4gICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93T3B0aW9ucyh0cnVlKX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNpcmNsZX0+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNpcmNsZX0+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNpcmNsZX0+PC9kaXY+XG4gICAgICA8YXNpZGVcbiAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMub3B0aW9uc31cbiAgICAgICAgcmVmPXtub2RlfVxuICAgICAgICBzdHlsZT17c2hvd09wdGlvbnMgPyB7IGRpc3BsYXk6IFwiYmxvY2tcIiB9IDogbnVsbH1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5vcHRpb25Db250YWluZXJ9PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGVzLm9wdGlvbn0+QWRkIHRvIEJ1bmRsZTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2FzaWRlPlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9zdFNldHRpbmdzO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlUmVmIiwidXNlU3RhdGUiLCJzdHlsZXMiLCJQb3N0U2V0dGluZ3MiLCJzaG93T3B0aW9ucyIsInNldFNob3dPcHRpb25zIiwibm9kZSIsImNoZWNrSWZDbGlja2VkT3V0c2lkZSIsImUiLCJjdXJyZW50IiwiY29udGFpbnMiLCJ0YXJnZXQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicG9zdFNldHRpbmdzIiwiY2lyY2xlIiwib3B0aW9ucyIsImRpc3BsYXkiLCJvcHRpb25Db250YWluZXIiLCJvcHRpb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/LoggedHome/PostSettings.tsx\n");

/***/ })

});