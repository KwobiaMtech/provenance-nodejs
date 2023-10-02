"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
exports.client = require("./services/provenance.service");
__exportStar(require("./types/provenance-wallet.type"), exports);
__exportStar(require("./types/provenance-transaction-details.type"), exports);
__exportStar(require("./config/config.provenance"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBd0Q7QUFDeEQsaUVBQStDO0FBQy9DLDhFQUE0RDtBQUM1RCw2REFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBhcyBjbGllbnQgZnJvbSBcIi4vc2VydmljZXMvcHJvdmVuYW5jZS5zZXJ2aWNlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90eXBlcy9wcm92ZW5hbmNlLXdhbGxldC50eXBlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90eXBlcy9wcm92ZW5hbmNlLXRyYW5zYWN0aW9uLWRldGFpbHMudHlwZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vY29uZmlnL2NvbmZpZy5wcm92ZW5hbmNlXCI7XG4iXX0=