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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/components/DefaultDisplay.module.scss */ \"./styles/components/DefaultDisplay.module.scss\");\n/* harmony import */ var _styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar _jsxFileName = \"/Users/aidanterlizzi/Desktop/Main/Coding/SummarizerWeb/client/components/LoggedHome/PostSettings.tsx\",\n    _s = $RefreshSig$();\n\n\n\n\n\nfunction PostSettings(_ref) {\n  _s();\n\n  var bundleResult = _ref.bundleResult;\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n      showOptions = _useState[0],\n      setShowOptions = _useState[1];\n\n  var _useState2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n      addToBundle = _useState2[0],\n      setAddToBundle = _useState2[1];\n\n  var node = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n  console.log(bundleResult);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    var checkIfClickedOutside = function checkIfClickedOutside(e) {\n      if (showOptions && node.current && !node.current.contains(e.target)) {\n        setShowOptions(false);\n        setAddToBundle(false);\n      }\n    };\n\n    document.addEventListener(\"click\", checkIfClickedOutside);\n    return function () {\n      document.removeEventListener(\"click\", checkIfClickedOutside);\n    };\n  }, [setShowOptions, showOptions, setAddToBundle]);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"section\", {\n    className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().postSettings),\n    onClick: function onClick() {\n      return setShowOptions(true);\n    },\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().circle)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 30,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().circle)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 31,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().circle)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 32,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"aside\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().options),\n      ref: node,\n      style: showOptions ? {\n        display: \"block\"\n      } : null,\n      children: !addToBundle ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().optionContainer),\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n          className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().option),\n          children: \"Bundles\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 40,\n          columnNumber: 13\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 39,\n        columnNumber: 11\n      }, this) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().optionContainer),\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n          className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().option),\n          onClick: function onClick() {\n            return setAddToBundle(true);\n          },\n          children: \"Add to Bundle\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 44,\n          columnNumber: 13\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 43,\n        columnNumber: 11\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 33,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 26,\n    columnNumber: 5\n  }, this);\n}\n\n_s(PostSettings, \"X80+e0e3H+1mUfGHFxER2oqGZgY=\");\n\n_c = PostSettings;\n/* harmony default export */ __webpack_exports__[\"default\"] = (PostSettings);\n\nvar _c;\n\n$RefreshReg$(_c, \"PostSettings\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0xvZ2dlZEhvbWUvUG9zdFNldHRpbmdzLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUVBLFNBQVNLLFlBQVQsT0FBd0M7QUFBQTs7QUFBQSxNQUFoQkMsWUFBZ0IsUUFBaEJBLFlBQWdCOztBQUN0QyxrQkFBc0NILCtDQUFRLENBQUMsS0FBRCxDQUE5QztBQUFBLE1BQU9JLFdBQVA7QUFBQSxNQUFvQkMsY0FBcEI7O0FBQ0EsbUJBQXNDTCwrQ0FBUSxDQUFDLEtBQUQsQ0FBOUM7QUFBQSxNQUFPTSxXQUFQO0FBQUEsTUFBb0JDLGNBQXBCOztBQUVBLE1BQU1DLElBQUksR0FBR1QsNkNBQU0sQ0FBQyxJQUFELENBQW5CO0FBRUFVLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUCxZQUFaO0FBRUFMLEVBQUFBLGdEQUFTLENBQUMsWUFBTTtBQUNkLFFBQU1hLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQ0MsQ0FBRCxFQUFPO0FBQ25DLFVBQUlSLFdBQVcsSUFBSUksSUFBSSxDQUFDSyxPQUFwQixJQUErQixDQUFDTCxJQUFJLENBQUNLLE9BQUwsQ0FBYUMsUUFBYixDQUFzQkYsQ0FBQyxDQUFDRyxNQUF4QixDQUFwQyxFQUFxRTtBQUNuRVYsUUFBQUEsY0FBYyxDQUFDLEtBQUQsQ0FBZDtBQUNBRSxRQUFBQSxjQUFjLENBQUMsS0FBRCxDQUFkO0FBQ0Q7QUFDRixLQUxEOztBQU1BUyxJQUFBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DTixxQkFBbkM7QUFDQSxXQUFPLFlBQU07QUFDWEssTUFBQUEsUUFBUSxDQUFDRSxtQkFBVCxDQUE2QixPQUE3QixFQUFzQ1AscUJBQXRDO0FBQ0QsS0FGRDtBQUdELEdBWFEsRUFXTixDQUFDTixjQUFELEVBQWlCRCxXQUFqQixFQUE4QkcsY0FBOUIsQ0FYTSxDQUFUO0FBYUEsc0JBQ0U7QUFDRSxhQUFTLEVBQUVOLG1HQURiO0FBRUUsV0FBTyxFQUFFO0FBQUEsYUFBTUksY0FBYyxDQUFDLElBQUQsQ0FBcEI7QUFBQSxLQUZYO0FBQUEsNEJBSUU7QUFBSyxlQUFTLEVBQUVKLDZGQUFhbUI7QUFBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUpGLGVBS0U7QUFBSyxlQUFTLEVBQUVuQiw2RkFBYW1CO0FBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFMRixlQU1FO0FBQUssZUFBUyxFQUFFbkIsNkZBQWFtQjtBQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBTkYsZUFPRTtBQUNFLGVBQVMsRUFBRW5CLDhGQURiO0FBRUUsU0FBRyxFQUFFTyxJQUZQO0FBR0UsV0FBSyxFQUFFSixXQUFXLEdBQUc7QUFBRWtCLFFBQUFBLE9BQU8sRUFBRTtBQUFYLE9BQUgsR0FBMEIsSUFIOUM7QUFBQSxnQkFLRyxDQUFDaEIsV0FBRCxnQkFDQztBQUFLLGlCQUFTLEVBQUVMLHNHQUFoQjtBQUFBLCtCQUNFO0FBQUcsbUJBQVMsRUFBRUEsNkZBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREQsZ0JBS0M7QUFBSyxpQkFBUyxFQUFFQSxzR0FBaEI7QUFBQSwrQkFDRTtBQUFHLG1CQUFTLEVBQUVBLDZGQUFkO0FBQTZCLGlCQUFPLEVBQUU7QUFBQSxtQkFBTU0sY0FBYyxDQUFDLElBQUQsQ0FBcEI7QUFBQSxXQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFWSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUEyQkQ7O0dBaERRTDs7S0FBQUE7QUFrRFQsK0RBQWVBLFlBQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9Mb2dnZWRIb21lL1Bvc3RTZXR0aW5ncy50c3g/MmNhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi8uLi9zdHlsZXMvY29tcG9uZW50cy9EZWZhdWx0RGlzcGxheS5tb2R1bGUuc2Nzc1wiO1xuXG5mdW5jdGlvbiBQb3N0U2V0dGluZ3MoeyBidW5kbGVSZXN1bHQgfSkge1xuICBjb25zdCBbc2hvd09wdGlvbnMsIHNldFNob3dPcHRpb25zXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FkZFRvQnVuZGxlLCBzZXRBZGRUb0J1bmRsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3Qgbm9kZSA9IHVzZVJlZihudWxsKTtcblxuICBjb25zb2xlLmxvZyhidW5kbGVSZXN1bHQpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY2hlY2tJZkNsaWNrZWRPdXRzaWRlID0gKGUpID0+IHtcbiAgICAgIGlmIChzaG93T3B0aW9ucyAmJiBub2RlLmN1cnJlbnQgJiYgIW5vZGUuY3VycmVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgc2V0U2hvd09wdGlvbnMoZmFsc2UpO1xuICAgICAgICBzZXRBZGRUb0J1bmRsZShmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hlY2tJZkNsaWNrZWRPdXRzaWRlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoZWNrSWZDbGlja2VkT3V0c2lkZSk7XG4gICAgfTtcbiAgfSwgW3NldFNob3dPcHRpb25zLCBzaG93T3B0aW9ucywgc2V0QWRkVG9CdW5kbGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uXG4gICAgICBjbGFzc05hbWU9e3N0eWxlcy5wb3N0U2V0dGluZ3N9XG4gICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93T3B0aW9ucyh0cnVlKX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNpcmNsZX0+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNpcmNsZX0+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNpcmNsZX0+PC9kaXY+XG4gICAgICA8YXNpZGVcbiAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMub3B0aW9uc31cbiAgICAgICAgcmVmPXtub2RlfVxuICAgICAgICBzdHlsZT17c2hvd09wdGlvbnMgPyB7IGRpc3BsYXk6IFwiYmxvY2tcIiB9IDogbnVsbH1cbiAgICAgID5cbiAgICAgICAgeyFhZGRUb0J1bmRsZSA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm9wdGlvbkNvbnRhaW5lcn0+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5vcHRpb259PkJ1bmRsZXM8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5vcHRpb25Db250YWluZXJ9PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzdHlsZXMub3B0aW9ufSBvbkNsaWNrPXsoKSA9PiBzZXRBZGRUb0J1bmRsZSh0cnVlKX0+XG4gICAgICAgICAgICAgIEFkZCB0byBCdW5kbGVcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvYXNpZGU+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBQb3N0U2V0dGluZ3M7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsInN0eWxlcyIsIlBvc3RTZXR0aW5ncyIsImJ1bmRsZVJlc3VsdCIsInNob3dPcHRpb25zIiwic2V0U2hvd09wdGlvbnMiLCJhZGRUb0J1bmRsZSIsInNldEFkZFRvQnVuZGxlIiwibm9kZSIsImNvbnNvbGUiLCJsb2ciLCJjaGVja0lmQ2xpY2tlZE91dHNpZGUiLCJlIiwiY3VycmVudCIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInBvc3RTZXR0aW5ncyIsImNpcmNsZSIsIm9wdGlvbnMiLCJkaXNwbGF5Iiwib3B0aW9uQ29udGFpbmVyIiwib3B0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/LoggedHome/PostSettings.tsx\n");

/***/ })

});