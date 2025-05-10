/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ randomUUID });\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/native.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i);\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\nlet getRandomValues;\nconst rnds8 = new Uint8Array(16);\nfunction rng() {\n    if (!getRandomValues) {\n        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {\n            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n        }\n        getRandomValues = crypto.getRandomValues.bind(crypto);\n    }\n    return getRandomValues(rnds8);\n}\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\nconst byteToHex = [];\nfor (let i = 0; i < 256; ++i) {\n    byteToHex.push((i + 0x100).toString(16).slice(1));\n}\nfunction unsafeStringify(arr, offset = 0) {\n    return (byteToHex[arr[offset + 0]] +\n        byteToHex[arr[offset + 1]] +\n        byteToHex[arr[offset + 2]] +\n        byteToHex[arr[offset + 3]] +\n        '-' +\n        byteToHex[arr[offset + 4]] +\n        byteToHex[arr[offset + 5]] +\n        '-' +\n        byteToHex[arr[offset + 6]] +\n        byteToHex[arr[offset + 7]] +\n        '-' +\n        byteToHex[arr[offset + 8]] +\n        byteToHex[arr[offset + 9]] +\n        '-' +\n        byteToHex[arr[offset + 10]] +\n        byteToHex[arr[offset + 11]] +\n        byteToHex[arr[offset + 12]] +\n        byteToHex[arr[offset + 13]] +\n        byteToHex[arr[offset + 14]] +\n        byteToHex[arr[offset + 15]]).toLowerCase();\n}\nfunction stringify(arr, offset = 0) {\n    const uuid = unsafeStringify(arr, offset);\n    if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n        throw TypeError('Stringified UUID is invalid');\n    }\n    return uuid;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ \"./node_modules/uuid/dist/esm-browser/native.js\");\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\nfunction v4(options, buf, offset) {\n    if (_native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID && !buf && !options) {\n        return _native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID();\n    }\n    options = options || {};\n    const rnds = options.random ?? options.rng?.() ?? (0,_rng_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    if (rnds.length < 16) {\n        throw new Error('Random bytes length must be >= 16');\n    }\n    rnds[6] = (rnds[6] & 0x0f) | 0x40;\n    rnds[8] = (rnds[8] & 0x3f) | 0x80;\n    if (buf) {\n        offset = offset || 0;\n        if (offset < 0 || offset + 16 > buf.length) {\n            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);\n        }\n        for (let i = 0; i < 16; ++i) {\n            buf[offset + i] = rnds[i];\n        }\n        return buf;\n    }\n    return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\nfunction validate(uuid) {\n    return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/validate.js?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar GameObject = /** @class */ (function () {\n    function GameObject(x, y, width, height, speed) {\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n        this.speed = speed;\n    }\n    GameObject.prototype.collidesWith = function (object) {\n        return this.x < object.x + object.width &&\n            this.x + this.width > object.x &&\n            this.y < object.y + object.height &&\n            this.y + this.height > object.y;\n    };\n    return GameObject;\n}());\nvar Assets = /** @class */ (function () {\n    function Assets() {\n        this.invaderRed = new Image(40, 32);\n        this.invaderYellow = new Image(40, 32);\n        this.invaderGreen = new Image(40, 32);\n        this.invaderRed.src = '/static/assets/invaderRed.png';\n        this.invaderYellow.src = '/static/assets/invaderYellow.png';\n        this.invaderGreen.src = '/static/assets/invaderGreen.png';\n    }\n    return Assets;\n}());\nvar assets = new Assets();\nvar Player = /** @class */ (function (_super) {\n    __extends(Player, _super);\n    function Player(x, y) {\n        var _this = _super.call(this, x, y, 50, 20, 7) || this;\n        _this.bullets = [];\n        _this.maxBullets = 5;\n        _this.rightPressed = false;\n        _this.leftPressed = false;\n        _this.spacePressed = false;\n        return _this;\n    }\n    Player.prototype.draw = function (ctx) {\n        ctx.fillStyle = '#0f0';\n        ctx.fillRect(this.x, this.y, this.width, this.height);\n    };\n    Player.prototype.drawUI = function (ctx) { };\n    Player.prototype.update = function () {\n        if (this.rightPressed && this.x < canvas.width - this.width) {\n            this.x += this.speed;\n        }\n        if (this.leftPressed && this.x > 0) {\n            this.x -= this.speed;\n        }\n        if (this.spacePressed && this.bullets.length < this.maxBullets) {\n            this.bullets.push(new Bullet(this.x, this.y));\n        }\n    };\n    Player.prototype.needsDeletion = function () {\n        return false;\n    };\n    Player.prototype.keyHandler = function (event, isPressed) {\n        if (event.key === 'ArrowRight' || event.key === 'd') {\n            this.rightPressed = isPressed;\n        }\n        if (event.key === 'ArrowLeft' || event.key === 'a') {\n            this.leftPressed = isPressed;\n        }\n        if (event.code === 'Space') {\n            this.spacePressed = isPressed;\n        }\n    };\n    return Player;\n}(GameObject));\nvar Invader = /** @class */ (function (_super) {\n    __extends(Invader, _super);\n    function Invader(x, y, type) {\n        if (type === void 0) { type = 'green'; }\n        var _this = _super.call(this, x, y, Invader.invaderWidth, Invader.invaderHeight, 1) || this;\n        _this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        _this.type = type;\n        _this.health = Invader.healths[type];\n        return _this;\n    }\n    Invader.prototype.getId = function () {\n        return this.id;\n    };\n    Invader.prototype.draw = function (ctx) {\n        switch (this.type) {\n            case 'green': {\n                ctx.drawImage(assets.invaderGreen, this.x, this.y);\n                break;\n            }\n            case 'yellow': {\n                ctx.drawImage(assets.invaderYellow, this.x, this.y);\n                break;\n            }\n            case 'red': {\n                ctx.drawImage(assets.invaderRed, this.x, this.y);\n                break;\n            }\n        }\n    };\n    Invader.prototype.drawUI = function (ctx) {\n        var healthRatio = this.health / Invader.healths[this.type];\n        if (healthRatio === 1. || healthRatio <= 0) {\n            return;\n        }\n        var gradient = ctx.createLinearGradient(this.x, this.y - 2, this.x + this.width, this.y - 2);\n        gradient.addColorStop(0, 'green');\n        gradient.addColorStop(healthRatio, 'green');\n        gradient.addColorStop(healthRatio, 'black');\n        gradient.addColorStop(1, 'black');\n        ctx.fillStyle = gradient;\n        ctx.fillRect(this.x, this.y - 2 - Invader.healthbarHeight, this.width, Invader.healthbarHeight);\n        ctx.fillStyle = '#000';\n    };\n    Invader.prototype.update = function () {\n        this.x += this.speed;\n    };\n    Invader.prototype.needsDeletion = function () {\n        return this.health <= 0;\n    };\n    Invader.prototype.decreaseHealth = function (damage) {\n        this.health -= damage;\n    };\n    Invader.invaderWidth = 40;\n    Invader.invaderHeight = 32;\n    Invader.healthbarHeight = 4;\n    Invader.healths = {\n        green: 2,\n        yellow: 3,\n        red: 4,\n    };\n    return Invader;\n}(GameObject));\nvar Bullet = /** @class */ (function (_super) {\n    __extends(Bullet, _super);\n    function Bullet(x, y, damage, maxCollisions) {\n        if (damage === void 0) { damage = 1; }\n        if (maxCollisions === void 0) { maxCollisions = 1; }\n        var _this = _super.call(this, x - Bullet.bulletWidth / 2, y, Bullet.bulletWidth, 10, 7) || this;\n        _this.collidedWith = new Set();\n        _this.damage = damage;\n        _this.leftCollisions = maxCollisions;\n        return _this;\n    }\n    Bullet.prototype.draw = function (ctx) {\n        ctx.fillStyle = '#0ff';\n        ctx.fillRect(this.x, this.y, this.width, this.height);\n    };\n    Bullet.prototype.drawUI = function (ctx) { };\n    Bullet.prototype.update = function () {\n        this.y -= this.speed;\n        this.checkCollisions();\n    };\n    Bullet.prototype.needsDeletion = function () {\n        return this.leftCollisions == 0 || this.y < 0;\n    };\n    Bullet.prototype.checkCollisions = function () {\n        if (this.leftCollisions == 0) {\n            return;\n        }\n        for (var _i = 0, invaders_1 = invaders; _i < invaders_1.length; _i++) {\n            var invader = invaders_1[_i];\n            if (this.collidesWith(invader) && !this.collidedWith.has(invader.getId())) {\n                invader.decreaseHealth(this.damage);\n                this.collidedWith.add(invader.getId());\n                this.leftCollisions -= 1;\n                if (this.leftCollisions == 0) {\n                    break;\n                }\n            }\n        }\n    };\n    Bullet.bulletWidth = 5;\n    return Bullet;\n}(GameObject));\nvar canvas = document.getElementById('gameCanvas');\nvar ctx = canvas.getContext('2d');\nvar scoreElement = document.getElementById('score');\nvar score = 0;\nvar player = new Player(canvas.width / 2 - 25, canvas.height - 30);\nvar invaders = [];\nvar bullets = player.bullets;\n// Create invaders grid\nfor (var i = 0; i < 5; i++) {\n    for (var j = 0; j < 10; j++) {\n        invaders.push(new Invader(50 + j * 50, 50 + i * 40));\n    }\n}\ndocument.addEventListener('keydown', function (e) { return player.keyHandler(e, true); });\ndocument.addEventListener('keyup', function (e) { return player.keyHandler(e, false); });\nfunction gameLoop() {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    // Update objects\n    player.update();\n    invaders.forEach(function (invader, index) {\n        if (invader.needsDeletion()) {\n            invaders.splice(index, 1);\n        }\n        else {\n            invader.update();\n        }\n    });\n    bullets.forEach(function (bullet, index) {\n        if (bullet.needsDeletion()) {\n            bullets.splice(index, 1);\n        }\n        else {\n            bullet.update();\n        }\n    });\n    // Check invader wall collision\n    var changeDirection = false;\n    invaders.forEach(function (invader) {\n        if (invader.x <= 0 || invader.x + invader.width >= canvas.width) {\n            changeDirection = true;\n        }\n    });\n    if (changeDirection) {\n        invaders.forEach(function (invader) {\n            invader.speed *= -1;\n            invader.y += 20;\n        });\n    }\n    // Draw objects\n    player.draw(ctx);\n    invaders.forEach(function (invader) { return invader.draw(ctx); });\n    bullets.forEach(function (bullet) { return bullet.draw(ctx); });\n    invaders.forEach(function (invader) { return invader.drawUI(ctx); });\n    // Game over condition\n    if (invaders.some(function (invader) { return invader.y + invader.height >= player.y; })) {\n        ctx.fillStyle = '#fff';\n        ctx.font = '48px Arial';\n        ctx.fillText('GAME OVER', canvas.width / 2 - 120, canvas.height / 2);\n        return;\n    }\n    requestAnimationFrame(gameLoop);\n}\ngameLoop();\n\n\n//# sourceURL=webpack:///./src/game.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game.ts");
/******/ 	
/******/ })()
;