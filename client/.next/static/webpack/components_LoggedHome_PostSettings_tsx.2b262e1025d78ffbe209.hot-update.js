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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/components/DefaultDisplay.module.scss */ \"./styles/components/DefaultDisplay.module.scss\");\n/* harmony import */ var _styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar _jsxFileName = \"/Users/aidanterlizzi/Desktop/Main/Coding/SummarizerWeb/client/components/LoggedHome/PostSettings.tsx\",\n    _s = $RefreshSig$();\n\n\n\n\n\nfunction PostSettings(_ref) {\n  _s();\n\n  var _this = this;\n\n  var bundleResult = _ref.bundleResult;\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n      showOptions = _useState[0],\n      setShowOptions = _useState[1];\n\n  var _useState2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n      addToBundle = _useState2[0],\n      setAddToBundle = _useState2[1];\n\n  var node = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n  console.log(bundleResult);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    var checkIfClickedOutside = function checkIfClickedOutside(e) {\n      if (showOptions && node.current && !node.current.contains(e.target)) {\n        setShowOptions(false);\n      }\n    };\n\n    document.addEventListener(\"click\", checkIfClickedOutside);\n    return function () {\n      document.removeEventListener(\"click\", checkIfClickedOutside);\n    };\n  }, [setShowOptions, showOptions]);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"section\", {\n    className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().postSettings),\n    onClick: function onClick() {\n      return setShowOptions(true);\n    },\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().circle)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 29,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().circle)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 30,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().circle)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 31,\n      columnNumber: 7\n    }, this), addToBundle ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"aside\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().options),\n      style: {\n        display: \"block\"\n      },\n      ref: node,\n      children: addToBundle ? bundleResult.data && bundleResult.data.returnBundles && bundleResult.data.returnBundles.length > 0 ? bundleResult.data.returnBundles.map(function (bundle) {\n        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n          className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().optionContainer),\n          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n            className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().option),\n            children: bundle.title\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 45,\n            columnNumber: 21\n          }, _this)\n        }, bundle.id, false, {\n          fileName: _jsxFileName,\n          lineNumber: 44,\n          columnNumber: 19\n        }, _this);\n      }) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().optionContainer),\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n          className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().option),\n          children: \"Bundles\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 51,\n          columnNumber: 17\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 50,\n        columnNumber: 15\n      }, this) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().optionContainer),\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n          className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().option),\n          children: \"Create a bundle first.\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 56,\n          columnNumber: 15\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 55,\n        columnNumber: 13\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 33,\n      columnNumber: 9\n    }, this) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"aside\", {\n      className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().options),\n      ref: node,\n      style: showOptions ? {\n        display: \"block\"\n      } : null,\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().optionContainer),\n        onClick: function onClick() {\n          return setAddToBundle(true);\n        },\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n          className: (_styles_components_DefaultDisplay_module_scss__WEBPACK_IMPORTED_MODULE_2___default().option),\n          children: \"Add to Bundle\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 70,\n          columnNumber: 13\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 66,\n        columnNumber: 11\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 61,\n      columnNumber: 9\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 25,\n    columnNumber: 5\n  }, this);\n}\n\n_s(PostSettings, \"X80+e0e3H+1mUfGHFxER2oqGZgY=\");\n\n_c = PostSettings;\n/* harmony default export */ __webpack_exports__[\"default\"] = (PostSettings);\n\nvar _c;\n\n$RefreshReg$(_c, \"PostSettings\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0xvZ2dlZEhvbWUvUG9zdFNldHRpbmdzLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUVBLFNBQVNLLFlBQVQsT0FBd0M7QUFBQTs7QUFBQTs7QUFBQSxNQUFoQkMsWUFBZ0IsUUFBaEJBLFlBQWdCOztBQUN0QyxrQkFBc0NILCtDQUFRLENBQUMsS0FBRCxDQUE5QztBQUFBLE1BQU9JLFdBQVA7QUFBQSxNQUFvQkMsY0FBcEI7O0FBQ0EsbUJBQXNDTCwrQ0FBUSxDQUFDLEtBQUQsQ0FBOUM7QUFBQSxNQUFPTSxXQUFQO0FBQUEsTUFBb0JDLGNBQXBCOztBQUVBLE1BQU1DLElBQUksR0FBR1QsNkNBQU0sQ0FBQyxJQUFELENBQW5CO0FBRUFVLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUCxZQUFaO0FBRUFMLEVBQUFBLGdEQUFTLENBQUMsWUFBTTtBQUNkLFFBQU1hLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQ0MsQ0FBRCxFQUFPO0FBQ25DLFVBQUlSLFdBQVcsSUFBSUksSUFBSSxDQUFDSyxPQUFwQixJQUErQixDQUFDTCxJQUFJLENBQUNLLE9BQUwsQ0FBYUMsUUFBYixDQUFzQkYsQ0FBQyxDQUFDRyxNQUF4QixDQUFwQyxFQUFxRTtBQUNuRVYsUUFBQUEsY0FBYyxDQUFDLEtBQUQsQ0FBZDtBQUNEO0FBQ0YsS0FKRDs7QUFLQVcsSUFBQUEsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixPQUExQixFQUFtQ04scUJBQW5DO0FBQ0EsV0FBTyxZQUFNO0FBQ1hLLE1BQUFBLFFBQVEsQ0FBQ0UsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0NQLHFCQUF0QztBQUNELEtBRkQ7QUFHRCxHQVZRLEVBVU4sQ0FBQ04sY0FBRCxFQUFpQkQsV0FBakIsQ0FWTSxDQUFUO0FBWUEsc0JBQ0U7QUFDRSxhQUFTLEVBQUVILG1HQURiO0FBRUUsV0FBTyxFQUFFO0FBQUEsYUFBTUksY0FBYyxDQUFDLElBQUQsQ0FBcEI7QUFBQSxLQUZYO0FBQUEsNEJBSUU7QUFBSyxlQUFTLEVBQUVKLDZGQUFhbUI7QUFBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUpGLGVBS0U7QUFBSyxlQUFTLEVBQUVuQiw2RkFBYW1CO0FBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFMRixlQU1FO0FBQUssZUFBUyxFQUFFbkIsNkZBQWFtQjtBQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBTkYsRUFPR2QsV0FBVyxnQkFDVjtBQUNFLGVBQVMsRUFBRUwsOEZBRGI7QUFFRSxXQUFLLEVBQUU7QUFBRXFCLFFBQUFBLE9BQU8sRUFBRTtBQUFYLE9BRlQ7QUFHRSxTQUFHLEVBQUVkLElBSFA7QUFBQSxnQkFLR0YsV0FBVyxHQUNWSCxZQUFZLENBQUNvQixJQUFiLElBQ0FwQixZQUFZLENBQUNvQixJQUFiLENBQWtCQyxhQURsQixJQUVBckIsWUFBWSxDQUFDb0IsSUFBYixDQUFrQkMsYUFBbEIsQ0FBZ0NDLE1BQWhDLEdBQXlDLENBRnpDLEdBR0V0QixZQUFZLENBQUNvQixJQUFiLENBQWtCQyxhQUFsQixDQUFnQ0UsR0FBaEMsQ0FBb0MsVUFBQ0MsTUFBRCxFQUFZO0FBQzlDLDRCQUNFO0FBQUssbUJBQVMsRUFBRTFCLHNHQUFoQjtBQUFBLGlDQUNFO0FBQUcscUJBQVMsRUFBRUEsNkZBQWQ7QUFBQSxzQkFBOEIwQixNQUFNLENBQUNHO0FBQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixXQUE2Q0gsTUFBTSxDQUFDSSxFQUFwRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURGO0FBS0QsT0FORCxDQUhGLGdCQVdFO0FBQUssaUJBQVMsRUFBRTlCLHNHQUFoQjtBQUFBLCtCQUNFO0FBQUcsbUJBQVMsRUFBRUEsNkZBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBWlEsZ0JBaUJWO0FBQUssaUJBQVMsRUFBRUEsc0dBQWhCO0FBQUEsK0JBQ0U7QUFBRyxtQkFBUyxFQUFFQSw2RkFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF0Qko7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURVLGdCQTZCVjtBQUNFLGVBQVMsRUFBRUEsOEZBRGI7QUFFRSxTQUFHLEVBQUVPLElBRlA7QUFHRSxXQUFLLEVBQUVKLFdBQVcsR0FBRztBQUFFa0IsUUFBQUEsT0FBTyxFQUFFO0FBQVgsT0FBSCxHQUEwQixJQUg5QztBQUFBLDZCQUtFO0FBQ0UsaUJBQVMsRUFBRXJCLHNHQURiO0FBRUUsZUFBTyxFQUFFO0FBQUEsaUJBQU1NLGNBQWMsQ0FBQyxJQUFELENBQXBCO0FBQUEsU0FGWDtBQUFBLCtCQUlFO0FBQUcsbUJBQVMsRUFBRU4sNkZBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQXBDSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQW9ERDs7R0F4RVFDOztLQUFBQTtBQTBFVCwrREFBZUEsWUFBZiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL0xvZ2dlZEhvbWUvUG9zdFNldHRpbmdzLnRzeD8yY2ExIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uL3N0eWxlcy9jb21wb25lbnRzL0RlZmF1bHREaXNwbGF5Lm1vZHVsZS5zY3NzXCI7XG5cbmZ1bmN0aW9uIFBvc3RTZXR0aW5ncyh7IGJ1bmRsZVJlc3VsdCB9KSB7XG4gIGNvbnN0IFtzaG93T3B0aW9ucywgc2V0U2hvd09wdGlvbnNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWRkVG9CdW5kbGUsIHNldEFkZFRvQnVuZGxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBub2RlID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnNvbGUubG9nKGJ1bmRsZVJlc3VsdCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjaGVja0lmQ2xpY2tlZE91dHNpZGUgPSAoZSkgPT4ge1xuICAgICAgaWYgKHNob3dPcHRpb25zICYmIG5vZGUuY3VycmVudCAmJiAhbm9kZS5jdXJyZW50LmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICBzZXRTaG93T3B0aW9ucyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hlY2tJZkNsaWNrZWRPdXRzaWRlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoZWNrSWZDbGlja2VkT3V0c2lkZSk7XG4gICAgfTtcbiAgfSwgW3NldFNob3dPcHRpb25zLCBzaG93T3B0aW9uc10pO1xuXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb25cbiAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnBvc3RTZXR0aW5nc31cbiAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dPcHRpb25zKHRydWUpfVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY2lyY2xlfT48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY2lyY2xlfT48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY2lyY2xlfT48L2Rpdj5cbiAgICAgIHthZGRUb0J1bmRsZSA/IChcbiAgICAgICAgPGFzaWRlXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMub3B0aW9uc31cbiAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBcImJsb2NrXCIgfX1cbiAgICAgICAgICByZWY9e25vZGV9XG4gICAgICAgID5cbiAgICAgICAgICB7YWRkVG9CdW5kbGUgPyAoXG4gICAgICAgICAgICBidW5kbGVSZXN1bHQuZGF0YSAmJlxuICAgICAgICAgICAgYnVuZGxlUmVzdWx0LmRhdGEucmV0dXJuQnVuZGxlcyAmJlxuICAgICAgICAgICAgYnVuZGxlUmVzdWx0LmRhdGEucmV0dXJuQnVuZGxlcy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICBidW5kbGVSZXN1bHQuZGF0YS5yZXR1cm5CdW5kbGVzLm1hcCgoYnVuZGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMub3B0aW9uQ29udGFpbmVyfSBrZXk9e2J1bmRsZS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGVzLm9wdGlvbn0+e2J1bmRsZS50aXRsZX08L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5vcHRpb25Db250YWluZXJ9PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGVzLm9wdGlvbn0+QnVuZGxlczwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMub3B0aW9uQ29udGFpbmVyfT5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzdHlsZXMub3B0aW9ufT5DcmVhdGUgYSBidW5kbGUgZmlyc3QuPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9hc2lkZT5cbiAgICAgICkgOiAoXG4gICAgICAgIDxhc2lkZVxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLm9wdGlvbnN9XG4gICAgICAgICAgcmVmPXtub2RlfVxuICAgICAgICAgIHN0eWxlPXtzaG93T3B0aW9ucyA/IHsgZGlzcGxheTogXCJibG9ja1wiIH0gOiBudWxsfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMub3B0aW9uQ29udGFpbmVyfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWRkVG9CdW5kbGUodHJ1ZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzdHlsZXMub3B0aW9ufT5BZGQgdG8gQnVuZGxlPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2FzaWRlPlxuICAgICAgKX1cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvc3RTZXR0aW5ncztcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZVN0YXRlIiwic3R5bGVzIiwiUG9zdFNldHRpbmdzIiwiYnVuZGxlUmVzdWx0Iiwic2hvd09wdGlvbnMiLCJzZXRTaG93T3B0aW9ucyIsImFkZFRvQnVuZGxlIiwic2V0QWRkVG9CdW5kbGUiLCJub2RlIiwiY29uc29sZSIsImxvZyIsImNoZWNrSWZDbGlja2VkT3V0c2lkZSIsImUiLCJjdXJyZW50IiwiY29udGFpbnMiLCJ0YXJnZXQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicG9zdFNldHRpbmdzIiwiY2lyY2xlIiwib3B0aW9ucyIsImRpc3BsYXkiLCJkYXRhIiwicmV0dXJuQnVuZGxlcyIsImxlbmd0aCIsIm1hcCIsImJ1bmRsZSIsIm9wdGlvbkNvbnRhaW5lciIsIm9wdGlvbiIsInRpdGxlIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/LoggedHome/PostSettings.tsx\n");

/***/ })

});