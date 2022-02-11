/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core/styles.css */ \"./node_modules/@fortawesome/fontawesome-svg-core/styles.css\");\n/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ \"@fortawesome/fontawesome-svg-core\");\n/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! urql */ \"urql\");\n/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(urql__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _urql_exchange_multipart_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @urql/exchange-multipart-fetch */ \"@urql/exchange-multipart-fetch\");\n/* harmony import */ var _urql_exchange_multipart_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_urql_exchange_multipart_fetch__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _urql_exchange_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @urql/exchange-auth */ \"@urql/exchange-auth\");\n/* harmony import */ var _urql_exchange_auth__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_urql_exchange_auth__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _utils_getAuth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getAuth */ \"./utils/getAuth.ts\");\n/* harmony import */ var _utils_addAuthToOperation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/addAuthToOperation */ \"./utils/addAuthToOperation.ts\");\n/* harmony import */ var _utils_didAuthError__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/didAuthError */ \"./utils/didAuthError.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _utils_willAuthError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/willAuthError */ \"./utils/willAuthError.ts\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__);\nvar _jsxFileName = \"/Users/aidanterlizzi/Desktop/Main/Coding/SummarizerWeb/client/pages/_app.tsx\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_2__.config.autoAddCss = false;\n\n\n\n\n\n\n\n\n\n\nfunction MyApp({\n  Component,\n  pageProps,\n  isLoggedIn\n}) {\n  const getLayout = Component.getLayout || (page => page);\n\n  const client = (0,react__WEBPACK_IMPORTED_MODULE_9__.useMemo)(() => {\n    return (0,urql__WEBPACK_IMPORTED_MODULE_3__.createClient)({\n      url: \"http://localhost:4000/graphql\",\n      exchanges: [urql__WEBPACK_IMPORTED_MODULE_3__.dedupExchange, (0,_urql_exchange_auth__WEBPACK_IMPORTED_MODULE_5__.authExchange)({\n        getAuth: _utils_getAuth__WEBPACK_IMPORTED_MODULE_6__.getAuth,\n        addAuthToOperation: _utils_addAuthToOperation__WEBPACK_IMPORTED_MODULE_7__.addAuthToOperation,\n        didAuthError: _utils_didAuthError__WEBPACK_IMPORTED_MODULE_8__.didAuthError,\n        willAuthError: _utils_willAuthError__WEBPACK_IMPORTED_MODULE_10__.willAuthError\n      }), _urql_exchange_multipart_fetch__WEBPACK_IMPORTED_MODULE_4__.multipartFetchExchange],\n      fetchOptions: {\n        credentials: \"include\"\n      }\n    });\n  }, []);\n  return getLayout( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(urql__WEBPACK_IMPORTED_MODULE_3__.Provider, {\n    value: client,\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 38,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 37,\n    columnNumber: 5\n  }, this));\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBQSxnRkFBQSxHQUFvQixLQUFwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLFNBQVNZLEtBQVQsQ0FBZTtBQUFFQyxFQUFBQSxTQUFGO0FBQWFDLEVBQUFBLFNBQWI7QUFBd0JDLEVBQUFBO0FBQXhCLENBQWYsRUFBcUQ7QUFDbkQsUUFBTUMsU0FBUyxHQUFHSCxTQUFTLENBQUNHLFNBQVYsS0FBeUJDLElBQUQsSUFBVUEsSUFBbEMsQ0FBbEI7O0FBRUEsUUFBTUMsTUFBTSxHQUFHUiw4Q0FBTyxDQUFDLE1BQU07QUFDM0IsV0FBT1Isa0RBQVksQ0FBQztBQUNsQmlCLE1BQUFBLEdBQUcsRUFBRSwrQkFEYTtBQUVsQkMsTUFBQUEsU0FBUyxFQUFFLENBQ1RqQiwrQ0FEUyxFQUVURyxpRUFBWSxDQUFDO0FBQ1hDLFFBQUFBLE9BRFc7QUFFWEMsUUFBQUEsa0JBRlc7QUFHWEMsUUFBQUEsWUFIVztBQUlYRSxRQUFBQSxhQUFhQSxrRUFBQUE7QUFKRixPQUFELENBRkgsRUFRVE4sa0ZBUlMsQ0FGTztBQVlsQmdCLE1BQUFBLFlBQVksRUFBRTtBQUNaQyxRQUFBQSxXQUFXLEVBQUU7QUFERDtBQVpJLEtBQUQsQ0FBbkI7QUFnQkQsR0FqQnFCLEVBaUJuQixFQWpCbUIsQ0FBdEI7QUFtQkEsU0FBT04sU0FBUyxlQUNkLCtEQUFDLDBDQUFEO0FBQVUsU0FBSyxFQUFFRSxNQUFqQjtBQUFBLDJCQUNFLCtEQUFDLFNBQUQsb0JBQWVKLFNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFEYyxDQUFoQjtBQUtEOztBQUNELGlFQUFlRixLQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vcGFnZXMvX2FwcC50c3g/NzIxNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuLi9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcbmltcG9ydCBcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZS9zdHlsZXMuY3NzXCI7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlXCI7XG5jb25maWcuYXV0b0FkZENzcyA9IGZhbHNlO1xuaW1wb3J0IHsgY3JlYXRlQ2xpZW50LCBkZWR1cEV4Y2hhbmdlLCBQcm92aWRlciB9IGZyb20gXCJ1cnFsXCI7XG5pbXBvcnQgeyBtdWx0aXBhcnRGZXRjaEV4Y2hhbmdlIH0gZnJvbSBcIkB1cnFsL2V4Y2hhbmdlLW11bHRpcGFydC1mZXRjaFwiO1xuaW1wb3J0IHsgYXV0aEV4Y2hhbmdlIH0gZnJvbSBcIkB1cnFsL2V4Y2hhbmdlLWF1dGhcIjtcbmltcG9ydCB7IGdldEF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZ2V0QXV0aFwiO1xuaW1wb3J0IHsgYWRkQXV0aFRvT3BlcmF0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2FkZEF1dGhUb09wZXJhdGlvblwiO1xuaW1wb3J0IHsgZGlkQXV0aEVycm9yIH0gZnJvbSBcIi4uL3V0aWxzL2RpZEF1dGhFcnJvclwiO1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgd2lsbEF1dGhFcnJvciB9IGZyb20gXCIuLi91dGlscy93aWxsQXV0aEVycm9yXCI7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMsIGlzTG9nZ2VkSW4gfSkge1xuICBjb25zdCBnZXRMYXlvdXQgPSBDb21wb25lbnQuZ2V0TGF5b3V0IHx8ICgocGFnZSkgPT4gcGFnZSk7XG5cbiAgY29uc3QgY2xpZW50ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGNyZWF0ZUNsaWVudCh7XG4gICAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL2dyYXBocWxcIixcbiAgICAgIGV4Y2hhbmdlczogW1xuICAgICAgICBkZWR1cEV4Y2hhbmdlLFxuICAgICAgICBhdXRoRXhjaGFuZ2Uoe1xuICAgICAgICAgIGdldEF1dGgsXG4gICAgICAgICAgYWRkQXV0aFRvT3BlcmF0aW9uLFxuICAgICAgICAgIGRpZEF1dGhFcnJvcixcbiAgICAgICAgICB3aWxsQXV0aEVycm9yLFxuICAgICAgICB9KSxcbiAgICAgICAgbXVsdGlwYXJ0RmV0Y2hFeGNoYW5nZSxcbiAgICAgIF0sXG4gICAgICBmZXRjaE9wdGlvbnM6IHtcbiAgICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiBnZXRMYXlvdXQoXG4gICAgPFByb3ZpZGVyIHZhbHVlPXtjbGllbnR9PlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgIDwvUHJvdmlkZXI+XG4gICk7XG59XG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcbiJdLCJuYW1lcyI6WyJjb25maWciLCJhdXRvQWRkQ3NzIiwiY3JlYXRlQ2xpZW50IiwiZGVkdXBFeGNoYW5nZSIsIlByb3ZpZGVyIiwibXVsdGlwYXJ0RmV0Y2hFeGNoYW5nZSIsImF1dGhFeGNoYW5nZSIsImdldEF1dGgiLCJhZGRBdXRoVG9PcGVyYXRpb24iLCJkaWRBdXRoRXJyb3IiLCJ1c2VNZW1vIiwid2lsbEF1dGhFcnJvciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiaXNMb2dnZWRJbiIsImdldExheW91dCIsInBhZ2UiLCJjbGllbnQiLCJ1cmwiLCJleGNoYW5nZXMiLCJmZXRjaE9wdGlvbnMiLCJjcmVkZW50aWFscyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./utils/addAuthToOperation.ts":
/*!*************************************!*\
  !*** ./utils/addAuthToOperation.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addAuthToOperation\": () => (/* binding */ addAuthToOperation)\n/* harmony export */ });\n/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! urql */ \"urql\");\n/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urql__WEBPACK_IMPORTED_MODULE_0__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nconst addAuthToOperation = ({\n  authState,\n  operation\n}) => {\n  if (!authState || !authState.accessToken) return operation;\n  const fetchOptions = typeof operation.context.fetchOptions === \"function\" ? operation.context.fetchOptions() : operation.context.fetchOptions || {};\n  return (0,urql__WEBPACK_IMPORTED_MODULE_0__.makeOperation)(operation.kind, operation, _objectSpread(_objectSpread({}, operation.context), {}, {\n    fetchOptions: _objectSpread(_objectSpread({}, fetchOptions), {}, {\n      headers: _objectSpread(_objectSpread({}, fetchOptions.headers), {}, {\n        Authorization: `Bearer ${authState.accessToken}`\n      }),\n      credentials: \"include\"\n    })\n  }));\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9hZGRBdXRoVG9PcGVyYXRpb24udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFFTyxNQUFNQyxrQkFBa0IsR0FBRyxDQUFDO0FBQUVDLEVBQUFBLFNBQUY7QUFBYUMsRUFBQUE7QUFBYixDQUFELEtBQThCO0FBQzlELE1BQUksQ0FBQ0QsU0FBRCxJQUFjLENBQUNBLFNBQVMsQ0FBQ0UsV0FBN0IsRUFBMEMsT0FBT0QsU0FBUDtBQUMxQyxRQUFNRSxZQUFZLEdBQ2hCLE9BQU9GLFNBQVMsQ0FBQ0csT0FBVixDQUFrQkQsWUFBekIsS0FBMEMsVUFBMUMsR0FDSUYsU0FBUyxDQUFDRyxPQUFWLENBQWtCRCxZQUFsQixFQURKLEdBRUlGLFNBQVMsQ0FBQ0csT0FBVixDQUFrQkQsWUFBbEIsSUFBa0MsRUFIeEM7QUFLQSxTQUFPTCxtREFBYSxDQUFDRyxTQUFTLENBQUNJLElBQVgsRUFBaUJKLFNBQWpCLGtDQUNmQSxTQUFTLENBQUNHLE9BREs7QUFFbEJELElBQUFBLFlBQVksa0NBQ1BBLFlBRE87QUFFVkcsTUFBQUEsT0FBTyxrQ0FDRkgsWUFBWSxDQUFDRyxPQURYO0FBRUxDLFFBQUFBLGFBQWEsRUFBRyxVQUFTUCxTQUFTLENBQUNFLFdBQVk7QUFGMUMsUUFGRztBQU1WTSxNQUFBQSxXQUFXLEVBQUU7QUFOSDtBQUZNLEtBQXBCO0FBV0QsQ0FsQk0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi91dGlscy9hZGRBdXRoVG9PcGVyYXRpb24udHM/M2VhYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYWtlT3BlcmF0aW9uIH0gZnJvbSBcInVycWxcIjtcblxuZXhwb3J0IGNvbnN0IGFkZEF1dGhUb09wZXJhdGlvbiA9ICh7IGF1dGhTdGF0ZSwgb3BlcmF0aW9uIH0pID0+IHtcbiAgaWYgKCFhdXRoU3RhdGUgfHwgIWF1dGhTdGF0ZS5hY2Nlc3NUb2tlbikgcmV0dXJuIG9wZXJhdGlvbjtcbiAgY29uc3QgZmV0Y2hPcHRpb25zID1cbiAgICB0eXBlb2Ygb3BlcmF0aW9uLmNvbnRleHQuZmV0Y2hPcHRpb25zID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gb3BlcmF0aW9uLmNvbnRleHQuZmV0Y2hPcHRpb25zKClcbiAgICAgIDogb3BlcmF0aW9uLmNvbnRleHQuZmV0Y2hPcHRpb25zIHx8IHt9O1xuXG4gIHJldHVybiBtYWtlT3BlcmF0aW9uKG9wZXJhdGlvbi5raW5kLCBvcGVyYXRpb24sIHtcbiAgICAuLi5vcGVyYXRpb24uY29udGV4dCxcbiAgICBmZXRjaE9wdGlvbnM6IHtcbiAgICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLi4uZmV0Y2hPcHRpb25zLmhlYWRlcnMsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthdXRoU3RhdGUuYWNjZXNzVG9rZW59YCxcbiAgICAgIH0sXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgfSxcbiAgfSk7XG59O1xuIl0sIm5hbWVzIjpbIm1ha2VPcGVyYXRpb24iLCJhZGRBdXRoVG9PcGVyYXRpb24iLCJhdXRoU3RhdGUiLCJvcGVyYXRpb24iLCJhY2Nlc3NUb2tlbiIsImZldGNoT3B0aW9ucyIsImNvbnRleHQiLCJraW5kIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJjcmVkZW50aWFscyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/addAuthToOperation.ts\n");

/***/ }),

/***/ "./utils/didAuthError.ts":
/*!*******************************!*\
  !*** ./utils/didAuthError.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"didAuthError\": () => (/* binding */ didAuthError)\n/* harmony export */ });\nconst didAuthError = ({\n  error\n}) => {\n  return error.graphQLErrors.some(e => e.message === \"Not authenticated.\");\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9kaWRBdXRoRXJyb3IudHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLE1BQU1BLFlBQVksR0FBRyxDQUFDO0FBQUVDLEVBQUFBO0FBQUYsQ0FBRCxLQUFlO0FBQ3pDLFNBQU9BLEtBQUssQ0FBQ0MsYUFBTixDQUFvQkMsSUFBcEIsQ0FBMEJDLENBQUQsSUFBT0EsQ0FBQyxDQUFDQyxPQUFGLEtBQWMsb0JBQTlDLENBQVA7QUFDRCxDQUZNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vdXRpbHMvZGlkQXV0aEVycm9yLnRzP2ZlMGMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGRpZEF1dGhFcnJvciA9ICh7IGVycm9yIH0pID0+IHtcbiAgcmV0dXJuIGVycm9yLmdyYXBoUUxFcnJvcnMuc29tZSgoZSkgPT4gZS5tZXNzYWdlID09PSBcIk5vdCBhdXRoZW50aWNhdGVkLlwiKTtcbn07XG4iXSwibmFtZXMiOlsiZGlkQXV0aEVycm9yIiwiZXJyb3IiLCJncmFwaFFMRXJyb3JzIiwic29tZSIsImUiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/didAuthError.ts\n");

/***/ }),

/***/ "./utils/getAuth.ts":
/*!**************************!*\
  !*** ./utils/getAuth.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getAuth\": () => (/* binding */ getAuth)\n/* harmony export */ });\nconst getAuth = async ({\n  authState\n}) => {\n  if (!authState) {\n    let accessToken = localStorage.getItem(\"accessToken\");\n    if (accessToken) return {\n      accessToken\n    }; // if you have a cookie but not an accessToken\n\n    if (!accessToken) {\n      const token = await handleRefreshToken();\n\n      if (token) {\n        return token;\n      }\n    }\n\n    return null;\n  } //   handle refresh token logic if access token becomes expired.\n\n\n  const tokens = await handleRefreshToken();\n  if (tokens) return tokens; //   handle logout if refresh token logic fails.\n\n  localStorage.clear(); //   log user out.\n\n  await handleLogout();\n  return null;\n};\n\nconst handleRefreshToken = async () => {\n  const url = \"http://localhost:4000/refresh_token\";\n  const response = await fetch(url, {\n    method: \"POST\",\n    credentials: \"include\"\n  });\n\n  if (response) {\n    const data = await response.json();\n\n    if (data.ok) {\n      localStorage.setItem(\"accessToken\", data.accessToken);\n      return {\n        accessToken: data.accessToken\n      };\n    }\n  }\n\n  return false;\n};\n\nconst handleLogout = async () => {\n  const query = `mutation Logout() {\n        logout()\n      }`;\n  const logoutBody = JSON.stringify({\n    query\n  });\n  await fetch(\"http://localhost:4000/graphql\", {\n    headers: {\n      \"content-type\": \"application/json\"\n    },\n    method: \"POST\",\n    body: logoutBody\n  });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9nZXRBdXRoLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxNQUFNQSxPQUFPLEdBQUcsT0FBTztBQUFFQyxFQUFBQTtBQUFGLENBQVAsS0FBeUI7QUFDOUMsTUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQ2QsUUFBSUMsV0FBVyxHQUFHQyxZQUFZLENBQUNDLE9BQWIsQ0FBcUIsYUFBckIsQ0FBbEI7QUFDQSxRQUFJRixXQUFKLEVBQWlCLE9BQU87QUFBRUEsTUFBQUE7QUFBRixLQUFQLENBRkgsQ0FJZDs7QUFDQSxRQUFJLENBQUNBLFdBQUwsRUFBa0I7QUFDaEIsWUFBTUcsS0FBSyxHQUFHLE1BQU1DLGtCQUFrQixFQUF0Qzs7QUFDQSxVQUFJRCxLQUFKLEVBQVc7QUFDVCxlQUFPQSxLQUFQO0FBQ0Q7QUFDRjs7QUFDRCxXQUFPLElBQVA7QUFDRCxHQWI2QyxDQWU5Qzs7O0FBQ0EsUUFBTUUsTUFBTSxHQUFHLE1BQU1ELGtCQUFrQixFQUF2QztBQUNBLE1BQUlDLE1BQUosRUFBWSxPQUFPQSxNQUFQLENBakJrQyxDQW1COUM7O0FBQ0FKLEVBQUFBLFlBQVksQ0FBQ0ssS0FBYixHQXBCOEMsQ0FxQjlDOztBQUNBLFFBQU1DLFlBQVksRUFBbEI7QUFFQSxTQUFPLElBQVA7QUFDRCxDQXpCTTs7QUEyQlAsTUFBTUgsa0JBQWtCLEdBQUcsWUFBWTtBQUNyQyxRQUFNSSxHQUFHLEdBQUcscUNBQVo7QUFDQSxRQUFNQyxRQUFRLEdBQUcsTUFBTUMsS0FBSyxDQUFDRixHQUFELEVBQU07QUFDaENHLElBQUFBLE1BQU0sRUFBRSxNQUR3QjtBQUVoQ0MsSUFBQUEsV0FBVyxFQUFFO0FBRm1CLEdBQU4sQ0FBNUI7O0FBSUEsTUFBSUgsUUFBSixFQUFjO0FBQ1osVUFBTUksSUFBSSxHQUFHLE1BQU1KLFFBQVEsQ0FBQ0ssSUFBVCxFQUFuQjs7QUFDQSxRQUFJRCxJQUFJLENBQUNFLEVBQVQsRUFBYTtBQUNYZCxNQUFBQSxZQUFZLENBQUNlLE9BQWIsQ0FBcUIsYUFBckIsRUFBb0NILElBQUksQ0FBQ2IsV0FBekM7QUFDQSxhQUFPO0FBQUVBLFFBQUFBLFdBQVcsRUFBRWEsSUFBSSxDQUFDYjtBQUFwQixPQUFQO0FBQ0Q7QUFDRjs7QUFDRCxTQUFPLEtBQVA7QUFDRCxDQWREOztBQWdCQSxNQUFNTyxZQUFZLEdBQUcsWUFBWTtBQUMvQixRQUFNVSxLQUFLLEdBQUk7QUFDakI7QUFDQSxRQUZFO0FBR0EsUUFBTUMsVUFBVSxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUNoQ0gsSUFBQUE7QUFEZ0MsR0FBZixDQUFuQjtBQUdBLFFBQU1QLEtBQUssQ0FBQywrQkFBRCxFQUFrQztBQUMzQ1csSUFBQUEsT0FBTyxFQUFFO0FBQUUsc0JBQWdCO0FBQWxCLEtBRGtDO0FBRTNDVixJQUFBQSxNQUFNLEVBQUUsTUFGbUM7QUFHM0NXLElBQUFBLElBQUksRUFBRUo7QUFIcUMsR0FBbEMsQ0FBWDtBQUtELENBWkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi91dGlscy9nZXRBdXRoLnRzP2VmYjQiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldEF1dGggPSBhc3luYyAoeyBhdXRoU3RhdGUgfSkgPT4ge1xuICBpZiAoIWF1dGhTdGF0ZSkge1xuICAgIGxldCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYWNjZXNzVG9rZW5cIik7XG4gICAgaWYgKGFjY2Vzc1Rva2VuKSByZXR1cm4geyBhY2Nlc3NUb2tlbiB9O1xuXG4gICAgLy8gaWYgeW91IGhhdmUgYSBjb29raWUgYnV0IG5vdCBhbiBhY2Nlc3NUb2tlblxuICAgIGlmICghYWNjZXNzVG9rZW4pIHtcbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgaGFuZGxlUmVmcmVzaFRva2VuKCk7XG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vICAgaGFuZGxlIHJlZnJlc2ggdG9rZW4gbG9naWMgaWYgYWNjZXNzIHRva2VuIGJlY29tZXMgZXhwaXJlZC5cbiAgY29uc3QgdG9rZW5zID0gYXdhaXQgaGFuZGxlUmVmcmVzaFRva2VuKCk7XG4gIGlmICh0b2tlbnMpIHJldHVybiB0b2tlbnM7XG5cbiAgLy8gICBoYW5kbGUgbG9nb3V0IGlmIHJlZnJlc2ggdG9rZW4gbG9naWMgZmFpbHMuXG4gIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAvLyAgIGxvZyB1c2VyIG91dC5cbiAgYXdhaXQgaGFuZGxlTG9nb3V0KCk7XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBoYW5kbGVSZWZyZXNoVG9rZW4gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3JlZnJlc2hfdG9rZW5cIjtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgfSk7XG4gIGlmIChyZXNwb25zZSkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgaWYgKGRhdGEub2spIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYWNjZXNzVG9rZW5cIiwgZGF0YS5hY2Nlc3NUb2tlbik7XG4gICAgICByZXR1cm4geyBhY2Nlc3NUb2tlbjogZGF0YS5hY2Nlc3NUb2tlbiB9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBoYW5kbGVMb2dvdXQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHF1ZXJ5ID0gYG11dGF0aW9uIExvZ291dCgpIHtcbiAgICAgICAgbG9nb3V0KClcbiAgICAgIH1gO1xuICBjb25zdCBsb2dvdXRCb2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIHF1ZXJ5LFxuICB9KTtcbiAgYXdhaXQgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjQwMDAvZ3JhcGhxbFwiLCB7XG4gICAgaGVhZGVyczogeyBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgYm9keTogbG9nb3V0Qm9keSxcbiAgfSk7XG59O1xuIl0sIm5hbWVzIjpbImdldEF1dGgiLCJhdXRoU3RhdGUiLCJhY2Nlc3NUb2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0b2tlbiIsImhhbmRsZVJlZnJlc2hUb2tlbiIsInRva2VucyIsImNsZWFyIiwiaGFuZGxlTG9nb3V0IiwidXJsIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwiZGF0YSIsImpzb24iLCJvayIsInNldEl0ZW0iLCJxdWVyeSIsImxvZ291dEJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsImJvZHkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./utils/getAuth.ts\n");

/***/ }),

/***/ "./utils/willAuthError.ts":
/*!********************************!*\
  !*** ./utils/willAuthError.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"willAuthError\": () => (/* binding */ willAuthError)\n/* harmony export */ });\n/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jwt-decode */ \"jwt-decode\");\n/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_0__);\n\nconst willAuthError = ({\n  authState,\n  operation\n}) => {\n  if (!authState) {\n    // Detect our login mutation and let this operation through:\n    return !(operation.kind === \"mutation\" && // Here we find any mutation definition with the \"login\" field\n    operation.query.definitions.some(definition => {\n      return definition.kind === \"OperationDefinition\" && definition.selectionSet.selections.some(node => {\n        // The field name is just an example, since signup may also be an exception\n        return node.kind === \"Field\" && (node.name.value === \"verifyUser\" || node.name.value === \"verifyGoogleUser\");\n      });\n    }));\n  } else if (localStorage.getItem(\"accessToken\")) {\n    const token = localStorage.getItem(\"accessToken\");\n    const {\n      exp\n    } = jwt_decode__WEBPACK_IMPORTED_MODULE_0___default()(token);\n    if (Date.now() >= exp * 1000) return true;\n  }\n\n  return false;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy93aWxsQXV0aEVycm9yLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBRU8sTUFBTUMsYUFBYSxHQUFHLENBQUM7QUFBRUMsRUFBQUEsU0FBRjtBQUFhQyxFQUFBQTtBQUFiLENBQUQsS0FBOEI7QUFDekQsTUFBSSxDQUFDRCxTQUFMLEVBQWdCO0FBQ2Q7QUFDQSxXQUFPLEVBQ0xDLFNBQVMsQ0FBQ0MsSUFBVixLQUFtQixVQUFuQixJQUNBO0FBQ0FELElBQUFBLFNBQVMsQ0FBQ0UsS0FBVixDQUFnQkMsV0FBaEIsQ0FBNEJDLElBQTVCLENBQWtDQyxVQUFELElBQWdCO0FBQy9DLGFBQ0VBLFVBQVUsQ0FBQ0osSUFBWCxLQUFvQixxQkFBcEIsSUFDQUksVUFBVSxDQUFDQyxZQUFYLENBQXdCQyxVQUF4QixDQUFtQ0gsSUFBbkMsQ0FBeUNJLElBQUQsSUFBVTtBQUNoRDtBQUNBLGVBQ0VBLElBQUksQ0FBQ1AsSUFBTCxLQUFjLE9BQWQsS0FDQ08sSUFBSSxDQUFDQyxJQUFMLENBQVVDLEtBQVYsS0FBb0IsWUFBcEIsSUFDQ0YsSUFBSSxDQUFDQyxJQUFMLENBQVVDLEtBQVYsS0FBb0Isa0JBRnRCLENBREY7QUFLRCxPQVBELENBRkY7QUFXRCxLQVpELENBSEssQ0FBUDtBQWlCRCxHQW5CRCxNQW1CTyxJQUFJQyxZQUFZLENBQUNDLE9BQWIsQ0FBcUIsYUFBckIsQ0FBSixFQUF5QztBQUM5QyxVQUFNQyxLQUFLLEdBQUdGLFlBQVksQ0FBQ0MsT0FBYixDQUFxQixhQUFyQixDQUFkO0FBQ0EsVUFBTTtBQUFFRSxNQUFBQTtBQUFGLFFBQVVqQixpREFBVSxDQUFDZ0IsS0FBRCxDQUExQjtBQUNBLFFBQUlFLElBQUksQ0FBQ0MsR0FBTCxNQUFjRixHQUFHLEdBQUcsSUFBeEIsRUFBOEIsT0FBTyxJQUFQO0FBQy9COztBQUVELFNBQU8sS0FBUDtBQUNELENBM0JNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vdXRpbHMvd2lsbEF1dGhFcnJvci50cz9kYmVhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3RfZGVjb2RlIGZyb20gXCJqd3QtZGVjb2RlXCI7XG5cbmV4cG9ydCBjb25zdCB3aWxsQXV0aEVycm9yID0gKHsgYXV0aFN0YXRlLCBvcGVyYXRpb24gfSkgPT4ge1xuICBpZiAoIWF1dGhTdGF0ZSkge1xuICAgIC8vIERldGVjdCBvdXIgbG9naW4gbXV0YXRpb24gYW5kIGxldCB0aGlzIG9wZXJhdGlvbiB0aHJvdWdoOlxuICAgIHJldHVybiAhKFxuICAgICAgb3BlcmF0aW9uLmtpbmQgPT09IFwibXV0YXRpb25cIiAmJlxuICAgICAgLy8gSGVyZSB3ZSBmaW5kIGFueSBtdXRhdGlvbiBkZWZpbml0aW9uIHdpdGggdGhlIFwibG9naW5cIiBmaWVsZFxuICAgICAgb3BlcmF0aW9uLnF1ZXJ5LmRlZmluaXRpb25zLnNvbWUoKGRlZmluaXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBkZWZpbml0aW9uLmtpbmQgPT09IFwiT3BlcmF0aW9uRGVmaW5pdGlvblwiICYmXG4gICAgICAgICAgZGVmaW5pdGlvbi5zZWxlY3Rpb25TZXQuc2VsZWN0aW9ucy5zb21lKChub2RlKSA9PiB7XG4gICAgICAgICAgICAvLyBUaGUgZmllbGQgbmFtZSBpcyBqdXN0IGFuIGV4YW1wbGUsIHNpbmNlIHNpZ251cCBtYXkgYWxzbyBiZSBhbiBleGNlcHRpb25cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIG5vZGUua2luZCA9PT0gXCJGaWVsZFwiICYmXG4gICAgICAgICAgICAgIChub2RlLm5hbWUudmFsdWUgPT09IFwidmVyaWZ5VXNlclwiIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5uYW1lLnZhbHVlID09PSBcInZlcmlmeUdvb2dsZVVzZXJcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSBlbHNlIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFjY2Vzc1Rva2VuXCIpKSB7XG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFjY2Vzc1Rva2VuXCIpO1xuICAgIGNvbnN0IHsgZXhwIH0gPSBqd3RfZGVjb2RlKHRva2VuKSBhcyBhbnk7XG4gICAgaWYgKERhdGUubm93KCkgPj0gZXhwICogMTAwMCkgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuIl0sIm5hbWVzIjpbImp3dF9kZWNvZGUiLCJ3aWxsQXV0aEVycm9yIiwiYXV0aFN0YXRlIiwib3BlcmF0aW9uIiwia2luZCIsInF1ZXJ5IiwiZGVmaW5pdGlvbnMiLCJzb21lIiwiZGVmaW5pdGlvbiIsInNlbGVjdGlvblNldCIsInNlbGVjdGlvbnMiLCJub2RlIiwibmFtZSIsInZhbHVlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInRva2VuIiwiZXhwIiwiRGF0ZSIsIm5vdyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/willAuthError.ts\n");

/***/ }),

/***/ "./node_modules/@fortawesome/fontawesome-svg-core/styles.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-svg-core/styles.css ***!
  \*******************************************************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@fortawesome/fontawesome-svg-core":
/*!****************************************************!*\
  !*** external "@fortawesome/fontawesome-svg-core" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/fontawesome-svg-core");

/***/ }),

/***/ "@urql/exchange-auth":
/*!**************************************!*\
  !*** external "@urql/exchange-auth" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@urql/exchange-auth");

/***/ }),

/***/ "@urql/exchange-multipart-fetch":
/*!*************************************************!*\
  !*** external "@urql/exchange-multipart-fetch" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@urql/exchange-multipart-fetch");

/***/ }),

/***/ "jwt-decode":
/*!*****************************!*\
  !*** external "jwt-decode" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("jwt-decode");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "urql":
/*!***********************!*\
  !*** external "urql" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("urql");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();