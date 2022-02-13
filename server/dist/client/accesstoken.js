"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = exports.setAccessToken = void 0;
let accessToken = "";
const setAccessToken = (s) => {
    accessToken = s;
};
exports.setAccessToken = setAccessToken;
const getAccessToken = () => {
    return accessToken;
};
exports.getAccessToken = getAccessToken;
//# sourceMappingURL=accesstoken.js.map