/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/esbuild/lib/main.d.ts"
/*!********************************************!*\
  !*** ./node_modules/esbuild/lib/main.d.ts ***!
  \********************************************/
() {

throw new Error("Module parse failed: Unexpected token (1:7)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> export type Platform = 'browser' | 'node' | 'neutral'\n| export type Format = 'iife' | 'cjs' | 'esm'\n| export type Loader = 'base64' | 'binary' | 'copy' | 'css' | 'dataurl' | 'default' | 'empty' | 'file' | 'js' | 'json' | 'jsx' | 'local-css' | 'text' | 'ts' | 'tsx'");

/***/ },

/***/ "./node_modules/esbuild/lib/main.js"
/*!******************************************!*\
  !*** ./node_modules/esbuild/lib/main.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
var __webpack_filename__ = "/index.js";
var __webpack_dirname__ = "/";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/npm/node.ts
var node_exports = {};
__export(node_exports, {
  analyzeMetafile: () => analyzeMetafile,
  analyzeMetafileSync: () => analyzeMetafileSync,
  build: () => build,
  buildSync: () => buildSync,
  context: () => context,
  default: () => node_default,
  formatMessages: () => formatMessages,
  formatMessagesSync: () => formatMessagesSync,
  initialize: () => initialize,
  stop: () => stop,
  transform: () => transform,
  transformSync: () => transformSync,
  version: () => version
});
module.exports = __toCommonJS(node_exports);

// lib/shared/stdio_protocol.ts
function encodePacket(packet) {
  let visit = (value) => {
    if (value === null) {
      bb.write8(0);
    } else if (typeof value === "boolean") {
      bb.write8(1);
      bb.write8(+value);
    } else if (typeof value === "number") {
      bb.write8(2);
      bb.write32(value | 0);
    } else if (typeof value === "string") {
      bb.write8(3);
      bb.write(encodeUTF8(value));
    } else if (value instanceof Uint8Array) {
      bb.write8(4);
      bb.write(value);
    } else if (value instanceof Array) {
      bb.write8(5);
      bb.write32(value.length);
      for (let item of value) {
        visit(item);
      }
    } else {
      let keys = Object.keys(value);
      bb.write8(6);
      bb.write32(keys.length);
      for (let key of keys) {
        bb.write(encodeUTF8(key));
        visit(value[key]);
      }
    }
  };
  let bb = new ByteBuffer();
  bb.write32(0);
  bb.write32(packet.id << 1 | +!packet.isRequest);
  visit(packet.value);
  writeUInt32LE(bb.buf, bb.len - 4, 0);
  return bb.buf.subarray(0, bb.len);
}
function decodePacket(bytes) {
  let visit = () => {
    switch (bb.read8()) {
      case 0:
        return null;
      case 1:
        return !!bb.read8();
      case 2:
        return bb.read32();
      case 3:
        return decodeUTF8(bb.read());
      case 4:
        return bb.read();
      case 5: {
        let count = bb.read32();
        let value2 = [];
        for (let i = 0; i < count; i++) {
          value2.push(visit());
        }
        return value2;
      }
      case 6: {
        let count = bb.read32();
        let value2 = {};
        for (let i = 0; i < count; i++) {
          value2[decodeUTF8(bb.read())] = visit();
        }
        return value2;
      }
      default:
        throw new Error("Invalid packet");
    }
  };
  let bb = new ByteBuffer(bytes);
  let id = bb.read32();
  let isRequest = (id & 1) === 0;
  id >>>= 1;
  let value = visit();
  if (bb.ptr !== bytes.length) {
    throw new Error("Invalid packet");
  }
  return { id, isRequest, value };
}
var ByteBuffer = class {
  constructor(buf = new Uint8Array(1024)) {
    this.buf = buf;
    this.len = 0;
    this.ptr = 0;
  }
  _write(delta) {
    if (this.len + delta > this.buf.length) {
      let clone = new Uint8Array((this.len + delta) * 2);
      clone.set(this.buf);
      this.buf = clone;
    }
    this.len += delta;
    return this.len - delta;
  }
  write8(value) {
    let offset = this._write(1);
    this.buf[offset] = value;
  }
  write32(value) {
    let offset = this._write(4);
    writeUInt32LE(this.buf, value, offset);
  }
  write(bytes) {
    let offset = this._write(4 + bytes.length);
    writeUInt32LE(this.buf, bytes.length, offset);
    this.buf.set(bytes, offset + 4);
  }
  _read(delta) {
    if (this.ptr + delta > this.buf.length) {
      throw new Error("Invalid packet");
    }
    this.ptr += delta;
    return this.ptr - delta;
  }
  read8() {
    return this.buf[this._read(1)];
  }
  read32() {
    return readUInt32LE(this.buf, this._read(4));
  }
  read() {
    let length = this.read32();
    let bytes = new Uint8Array(length);
    let ptr = this._read(bytes.length);
    bytes.set(this.buf.subarray(ptr, ptr + length));
    return bytes;
  }
};
var encodeUTF8;
var decodeUTF8;
var encodeInvariant;
if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
  let encoder = new TextEncoder();
  let decoder = new TextDecoder();
  encodeUTF8 = (text) => encoder.encode(text);
  decodeUTF8 = (bytes) => decoder.decode(bytes);
  encodeInvariant = 'new TextEncoder().encode("")';
} else if (typeof Buffer !== "undefined") {
  encodeUTF8 = (text) => Buffer.from(text);
  decodeUTF8 = (bytes) => {
    let { buffer, byteOffset, byteLength } = bytes;
    return Buffer.from(buffer, byteOffset, byteLength).toString();
  };
  encodeInvariant = 'Buffer.from("")';
} else {
  throw new Error("No UTF-8 codec found");
}
if (!(encodeUTF8("") instanceof Uint8Array))
  throw new Error(`Invariant violation: "${encodeInvariant} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
function readUInt32LE(buffer, offset) {
  return (buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24) >>> 0;
}
function writeUInt32LE(buffer, value, offset) {
  buffer[offset++] = value;
  buffer[offset++] = value >> 8;
  buffer[offset++] = value >> 16;
  buffer[offset++] = value >> 24;
}

// lib/shared/uint8array_json_parser.ts
var fromCharCode = String.fromCharCode;
function throwSyntaxError(bytes, index, message) {
  const c = bytes[index];
  let line = 1;
  let column = 0;
  for (let i = 0; i < index; i++) {
    if (bytes[i] === 10 /* Newline */) {
      line++;
      column = 0;
    } else {
      column++;
    }
  }
  throw new SyntaxError(
    message ? message : index === bytes.length ? "Unexpected end of input while parsing JSON" : c >= 32 && c <= 126 ? `Unexpected character ${fromCharCode(c)} in JSON at position ${index} (line ${line}, column ${column})` : `Unexpected byte 0x${c.toString(16)} in JSON at position ${index} (line ${line}, column ${column})`
  );
}
function JSON_parse(bytes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new Error(`JSON input must be a Uint8Array`);
  }
  const propertyStack = [];
  const objectStack = [];
  const stateStack = [];
  const length = bytes.length;
  let property = null;
  let state = 0 /* TopLevel */;
  let object;
  let i = 0;
  while (i < length) {
    let c = bytes[i++];
    if (c <= 32 /* Space */) {
      continue;
    }
    let value;
    if (state === 2 /* Object */ && property === null && c !== 34 /* Quote */ && c !== 125 /* CloseBrace */) {
      throwSyntaxError(bytes, --i);
    }
    switch (c) {
      // True
      case 116 /* LowerT */: {
        if (bytes[i++] !== 114 /* LowerR */ || bytes[i++] !== 117 /* LowerU */ || bytes[i++] !== 101 /* LowerE */) {
          throwSyntaxError(bytes, --i);
        }
        value = true;
        break;
      }
      // False
      case 102 /* LowerF */: {
        if (bytes[i++] !== 97 /* LowerA */ || bytes[i++] !== 108 /* LowerL */ || bytes[i++] !== 115 /* LowerS */ || bytes[i++] !== 101 /* LowerE */) {
          throwSyntaxError(bytes, --i);
        }
        value = false;
        break;
      }
      // Null
      case 110 /* LowerN */: {
        if (bytes[i++] !== 117 /* LowerU */ || bytes[i++] !== 108 /* LowerL */ || bytes[i++] !== 108 /* LowerL */) {
          throwSyntaxError(bytes, --i);
        }
        value = null;
        break;
      }
      // Number begin
      case 45 /* Minus */:
      case 46 /* Dot */:
      case 48 /* Digit0 */:
      case 49 /* Digit1 */:
      case 50 /* Digit2 */:
      case 51 /* Digit3 */:
      case 52 /* Digit4 */:
      case 53 /* Digit5 */:
      case 54 /* Digit6 */:
      case 55 /* Digit7 */:
      case 56 /* Digit8 */:
      case 57 /* Digit9 */: {
        let index = i;
        value = fromCharCode(c);
        c = bytes[i];
        while (true) {
          switch (c) {
            case 43 /* Plus */:
            case 45 /* Minus */:
            case 46 /* Dot */:
            case 48 /* Digit0 */:
            case 49 /* Digit1 */:
            case 50 /* Digit2 */:
            case 51 /* Digit3 */:
            case 52 /* Digit4 */:
            case 53 /* Digit5 */:
            case 54 /* Digit6 */:
            case 55 /* Digit7 */:
            case 56 /* Digit8 */:
            case 57 /* Digit9 */:
            case 101 /* LowerE */:
            case 69 /* UpperE */: {
              value += fromCharCode(c);
              c = bytes[++i];
              continue;
            }
          }
          break;
        }
        value = +value;
        if (isNaN(value)) {
          throwSyntaxError(bytes, --index, "Invalid number");
        }
        break;
      }
      // String begin
      case 34 /* Quote */: {
        value = "";
        while (true) {
          if (i >= length) {
            throwSyntaxError(bytes, length);
          }
          c = bytes[i++];
          if (c === 34 /* Quote */) {
            break;
          } else if (c === 92 /* Backslash */) {
            switch (bytes[i++]) {
              // Normal escape sequence
              case 34 /* Quote */:
                value += '"';
                break;
              case 47 /* Slash */:
                value += "/";
                break;
              case 92 /* Backslash */:
                value += "\\";
                break;
              case 98 /* LowerB */:
                value += "\b";
                break;
              case 102 /* LowerF */:
                value += "\f";
                break;
              case 110 /* LowerN */:
                value += "\n";
                break;
              case 114 /* LowerR */:
                value += "\r";
                break;
              case 116 /* LowerT */:
                value += "	";
                break;
              // Unicode escape sequence
              case 117 /* LowerU */: {
                let code = 0;
                for (let j = 0; j < 4; j++) {
                  c = bytes[i++];
                  code <<= 4;
                  if (c >= 48 /* Digit0 */ && c <= 57 /* Digit9 */) code |= c - 48 /* Digit0 */;
                  else if (c >= 97 /* LowerA */ && c <= 102 /* LowerF */) code |= c + (10 - 97 /* LowerA */);
                  else if (c >= 65 /* UpperA */ && c <= 70 /* UpperF */) code |= c + (10 - 65 /* UpperA */);
                  else throwSyntaxError(bytes, --i);
                }
                value += fromCharCode(code);
                break;
              }
              // Invalid escape sequence
              default:
                throwSyntaxError(bytes, --i);
                break;
            }
          } else if (c <= 127) {
            value += fromCharCode(c);
          } else if ((c & 224) === 192) {
            value += fromCharCode((c & 31) << 6 | bytes[i++] & 63);
          } else if ((c & 240) === 224) {
            value += fromCharCode((c & 15) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63);
          } else if ((c & 248) == 240) {
            let codePoint = (c & 7) << 18 | (bytes[i++] & 63) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63;
            if (codePoint > 65535) {
              codePoint -= 65536;
              value += fromCharCode(codePoint >> 10 & 1023 | 55296);
              codePoint = 56320 | codePoint & 1023;
            }
            value += fromCharCode(codePoint);
          }
        }
        value[0];
        break;
      }
      // Array begin
      case 91 /* OpenBracket */: {
        value = [];
        propertyStack.push(property);
        objectStack.push(object);
        stateStack.push(state);
        property = null;
        object = value;
        state = 1 /* Array */;
        continue;
      }
      // Object begin
      case 123 /* OpenBrace */: {
        value = {};
        propertyStack.push(property);
        objectStack.push(object);
        stateStack.push(state);
        property = null;
        object = value;
        state = 2 /* Object */;
        continue;
      }
      // Array end
      case 93 /* CloseBracket */: {
        if (state !== 1 /* Array */) {
          throwSyntaxError(bytes, --i);
        }
        value = object;
        property = propertyStack.pop();
        object = objectStack.pop();
        state = stateStack.pop();
        break;
      }
      // Object end
      case 125 /* CloseBrace */: {
        if (state !== 2 /* Object */) {
          throwSyntaxError(bytes, --i);
        }
        value = object;
        property = propertyStack.pop();
        object = objectStack.pop();
        state = stateStack.pop();
        break;
      }
      default: {
        throwSyntaxError(bytes, --i);
      }
    }
    c = bytes[i];
    while (c <= 32 /* Space */) {
      c = bytes[++i];
    }
    switch (state) {
      case 0 /* TopLevel */: {
        if (i === length) {
          return value;
        }
        break;
      }
      case 1 /* Array */: {
        object.push(value);
        if (c === 44 /* Comma */) {
          i++;
          continue;
        }
        if (c === 93 /* CloseBracket */) {
          continue;
        }
        break;
      }
      case 2 /* Object */: {
        if (property === null) {
          property = value;
          if (c === 58 /* Colon */) {
            i++;
            continue;
          }
        } else {
          object[property] = value;
          property = null;
          if (c === 44 /* Comma */) {
            i++;
            continue;
          }
          if (c === 125 /* CloseBrace */) {
            continue;
          }
        }
        break;
      }
    }
    break;
  }
  throwSyntaxError(bytes, i);
}

// lib/shared/common.ts
var quote = JSON.stringify;
var buildLogLevelDefault = "warning";
var transformLogLevelDefault = "silent";
function validateAndJoinStringArray(values, what) {
  const toJoin = [];
  for (const value of values) {
    validateStringValue(value, what);
    if (value.indexOf(",") >= 0) throw new Error(`Invalid ${what}: ${value}`);
    toJoin.push(value);
  }
  return toJoin.join(",");
}
var canBeAnything = () => null;
var mustBeBoolean = (value) => typeof value === "boolean" ? null : "a boolean";
var mustBeString = (value) => typeof value === "string" ? null : "a string";
var mustBeRegExp = (value) => value instanceof RegExp ? null : "a RegExp object";
var mustBeInteger = (value) => typeof value === "number" && value === (value | 0) ? null : "an integer";
var mustBeValidPortNumber = (value) => typeof value === "number" && value === (value | 0) && value >= 0 && value <= 65535 ? null : "a valid port number";
var mustBeFunction = (value) => typeof value === "function" ? null : "a function";
var mustBeArray = (value) => Array.isArray(value) ? null : "an array";
var mustBeArrayOfStrings = (value) => Array.isArray(value) && value.every((x) => typeof x === "string") ? null : "an array of strings";
var mustBeObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object";
var mustBeEntryPoints = (value) => typeof value === "object" && value !== null ? null : "an array or an object";
var mustBeWebAssemblyModule = (value) => value instanceof WebAssembly.Module ? null : "a WebAssembly.Module";
var mustBeObjectOrNull = (value) => typeof value === "object" && !Array.isArray(value) ? null : "an object or null";
var mustBeStringOrBoolean = (value) => typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean";
var mustBeStringOrObject = (value) => typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value) ? null : "a string or an object";
var mustBeStringOrArrayOfStrings = (value) => typeof value === "string" || Array.isArray(value) && value.every((x) => typeof x === "string") ? null : "a string or an array of strings";
var mustBeStringOrUint8Array = (value) => typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array";
var mustBeStringOrURL = (value) => typeof value === "string" || value instanceof URL ? null : "a string or a URL";
function getFlag(object, keys, key, mustBeFn) {
  let value = object[key];
  keys[key + ""] = true;
  if (value === void 0) return void 0;
  let mustBe = mustBeFn(value);
  if (mustBe !== null) throw new Error(`${quote(key)} must be ${mustBe}`);
  return value;
}
function checkForInvalidFlags(object, keys, where) {
  for (let key in object) {
    if (!(key in keys)) {
      throw new Error(`Invalid option ${where}: ${quote(key)}`);
    }
  }
}
function validateInitializeOptions(options) {
  let keys = /* @__PURE__ */ Object.create(null);
  let wasmURL = getFlag(options, keys, "wasmURL", mustBeStringOrURL);
  let wasmModule = getFlag(options, keys, "wasmModule", mustBeWebAssemblyModule);
  let worker = getFlag(options, keys, "worker", mustBeBoolean);
  checkForInvalidFlags(options, keys, "in initialize() call");
  return {
    wasmURL,
    wasmModule,
    worker
  };
}
function validateMangleCache(mangleCache) {
  let validated;
  if (mangleCache !== void 0) {
    validated = /* @__PURE__ */ Object.create(null);
    for (let key in mangleCache) {
      let value = mangleCache[key];
      if (typeof value === "string" || value === false) {
        validated[key] = value;
      } else {
        throw new Error(`Expected ${quote(key)} in mangle cache to map to either a string or false`);
      }
    }
  }
  return validated;
}
function pushLogFlags(flags, options, keys, isTTY2, logLevelDefault) {
  let color = getFlag(options, keys, "color", mustBeBoolean);
  let logLevel = getFlag(options, keys, "logLevel", mustBeString);
  let logLimit = getFlag(options, keys, "logLimit", mustBeInteger);
  if (color !== void 0) flags.push(`--color=${color}`);
  else if (isTTY2) flags.push(`--color=true`);
  flags.push(`--log-level=${logLevel || logLevelDefault}`);
  flags.push(`--log-limit=${logLimit || 0}`);
}
function validateStringValue(value, what, key) {
  if (typeof value !== "string") {
    throw new Error(`Expected value for ${what}${key !== void 0 ? " " + quote(key) : ""} to be a string, got ${typeof value} instead`);
  }
  return value;
}
function pushCommonFlags(flags, options, keys) {
  let legalComments = getFlag(options, keys, "legalComments", mustBeString);
  let sourceRoot = getFlag(options, keys, "sourceRoot", mustBeString);
  let sourcesContent = getFlag(options, keys, "sourcesContent", mustBeBoolean);
  let target = getFlag(options, keys, "target", mustBeStringOrArrayOfStrings);
  let format = getFlag(options, keys, "format", mustBeString);
  let globalName = getFlag(options, keys, "globalName", mustBeString);
  let mangleProps = getFlag(options, keys, "mangleProps", mustBeRegExp);
  let reserveProps = getFlag(options, keys, "reserveProps", mustBeRegExp);
  let mangleQuoted = getFlag(options, keys, "mangleQuoted", mustBeBoolean);
  let minify = getFlag(options, keys, "minify", mustBeBoolean);
  let minifySyntax = getFlag(options, keys, "minifySyntax", mustBeBoolean);
  let minifyWhitespace = getFlag(options, keys, "minifyWhitespace", mustBeBoolean);
  let minifyIdentifiers = getFlag(options, keys, "minifyIdentifiers", mustBeBoolean);
  let lineLimit = getFlag(options, keys, "lineLimit", mustBeInteger);
  let drop = getFlag(options, keys, "drop", mustBeArrayOfStrings);
  let dropLabels = getFlag(options, keys, "dropLabels", mustBeArrayOfStrings);
  let charset = getFlag(options, keys, "charset", mustBeString);
  let treeShaking = getFlag(options, keys, "treeShaking", mustBeBoolean);
  let ignoreAnnotations = getFlag(options, keys, "ignoreAnnotations", mustBeBoolean);
  let jsx = getFlag(options, keys, "jsx", mustBeString);
  let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
  let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
  let jsxImportSource = getFlag(options, keys, "jsxImportSource", mustBeString);
  let jsxDev = getFlag(options, keys, "jsxDev", mustBeBoolean);
  let jsxSideEffects = getFlag(options, keys, "jsxSideEffects", mustBeBoolean);
  let define = getFlag(options, keys, "define", mustBeObject);
  let logOverride = getFlag(options, keys, "logOverride", mustBeObject);
  let supported = getFlag(options, keys, "supported", mustBeObject);
  let pure = getFlag(options, keys, "pure", mustBeArrayOfStrings);
  let keepNames = getFlag(options, keys, "keepNames", mustBeBoolean);
  let platform = getFlag(options, keys, "platform", mustBeString);
  let tsconfigRaw = getFlag(options, keys, "tsconfigRaw", mustBeStringOrObject);
  let absPaths = getFlag(options, keys, "absPaths", mustBeArrayOfStrings);
  if (legalComments) flags.push(`--legal-comments=${legalComments}`);
  if (sourceRoot !== void 0) flags.push(`--source-root=${sourceRoot}`);
  if (sourcesContent !== void 0) flags.push(`--sources-content=${sourcesContent}`);
  if (target) flags.push(`--target=${validateAndJoinStringArray(Array.isArray(target) ? target : [target], "target")}`);
  if (format) flags.push(`--format=${format}`);
  if (globalName) flags.push(`--global-name=${globalName}`);
  if (platform) flags.push(`--platform=${platform}`);
  if (tsconfigRaw) flags.push(`--tsconfig-raw=${typeof tsconfigRaw === "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`);
  if (minify) flags.push("--minify");
  if (minifySyntax) flags.push("--minify-syntax");
  if (minifyWhitespace) flags.push("--minify-whitespace");
  if (minifyIdentifiers) flags.push("--minify-identifiers");
  if (lineLimit) flags.push(`--line-limit=${lineLimit}`);
  if (charset) flags.push(`--charset=${charset}`);
  if (treeShaking !== void 0) flags.push(`--tree-shaking=${treeShaking}`);
  if (ignoreAnnotations) flags.push(`--ignore-annotations`);
  if (drop) for (let what of drop) flags.push(`--drop:${validateStringValue(what, "drop")}`);
  if (dropLabels) flags.push(`--drop-labels=${validateAndJoinStringArray(dropLabels, "drop label")}`);
  if (absPaths) flags.push(`--abs-paths=${validateAndJoinStringArray(absPaths, "abs paths")}`);
  if (mangleProps) flags.push(`--mangle-props=${jsRegExpToGoRegExp(mangleProps)}`);
  if (reserveProps) flags.push(`--reserve-props=${jsRegExpToGoRegExp(reserveProps)}`);
  if (mangleQuoted !== void 0) flags.push(`--mangle-quoted=${mangleQuoted}`);
  if (jsx) flags.push(`--jsx=${jsx}`);
  if (jsxFactory) flags.push(`--jsx-factory=${jsxFactory}`);
  if (jsxFragment) flags.push(`--jsx-fragment=${jsxFragment}`);
  if (jsxImportSource) flags.push(`--jsx-import-source=${jsxImportSource}`);
  if (jsxDev) flags.push(`--jsx-dev`);
  if (jsxSideEffects) flags.push(`--jsx-side-effects`);
  if (define) {
    for (let key in define) {
      if (key.indexOf("=") >= 0) throw new Error(`Invalid define: ${key}`);
      flags.push(`--define:${key}=${validateStringValue(define[key], "define", key)}`);
    }
  }
  if (logOverride) {
    for (let key in logOverride) {
      if (key.indexOf("=") >= 0) throw new Error(`Invalid log override: ${key}`);
      flags.push(`--log-override:${key}=${validateStringValue(logOverride[key], "log override", key)}`);
    }
  }
  if (supported) {
    for (let key in supported) {
      if (key.indexOf("=") >= 0) throw new Error(`Invalid supported: ${key}`);
      const value = supported[key];
      if (typeof value !== "boolean") throw new Error(`Expected value for supported ${quote(key)} to be a boolean, got ${typeof value} instead`);
      flags.push(`--supported:${key}=${value}`);
    }
  }
  if (pure) for (let fn of pure) flags.push(`--pure:${validateStringValue(fn, "pure")}`);
  if (keepNames) flags.push(`--keep-names`);
}
function flagsForBuildOptions(callName, options, isTTY2, logLevelDefault, writeDefault) {
  var _a2;
  let flags = [];
  let entries = [];
  let keys = /* @__PURE__ */ Object.create(null);
  let stdinContents = null;
  let stdinResolveDir = null;
  pushLogFlags(flags, options, keys, isTTY2, logLevelDefault);
  pushCommonFlags(flags, options, keys);
  let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
  let bundle = getFlag(options, keys, "bundle", mustBeBoolean);
  let splitting = getFlag(options, keys, "splitting", mustBeBoolean);
  let preserveSymlinks = getFlag(options, keys, "preserveSymlinks", mustBeBoolean);
  let metafile = getFlag(options, keys, "metafile", mustBeBoolean);
  let outfile = getFlag(options, keys, "outfile", mustBeString);
  let outdir = getFlag(options, keys, "outdir", mustBeString);
  let outbase = getFlag(options, keys, "outbase", mustBeString);
  let tsconfig = getFlag(options, keys, "tsconfig", mustBeString);
  let resolveExtensions = getFlag(options, keys, "resolveExtensions", mustBeArrayOfStrings);
  let nodePathsInput = getFlag(options, keys, "nodePaths", mustBeArrayOfStrings);
  let mainFields = getFlag(options, keys, "mainFields", mustBeArrayOfStrings);
  let conditions = getFlag(options, keys, "conditions", mustBeArrayOfStrings);
  let external = getFlag(options, keys, "external", mustBeArrayOfStrings);
  let packages = getFlag(options, keys, "packages", mustBeString);
  let alias = getFlag(options, keys, "alias", mustBeObject);
  let loader = getFlag(options, keys, "loader", mustBeObject);
  let outExtension = getFlag(options, keys, "outExtension", mustBeObject);
  let publicPath = getFlag(options, keys, "publicPath", mustBeString);
  let entryNames = getFlag(options, keys, "entryNames", mustBeString);
  let chunkNames = getFlag(options, keys, "chunkNames", mustBeString);
  let assetNames = getFlag(options, keys, "assetNames", mustBeString);
  let inject = getFlag(options, keys, "inject", mustBeArrayOfStrings);
  let banner = getFlag(options, keys, "banner", mustBeObject);
  let footer = getFlag(options, keys, "footer", mustBeObject);
  let entryPoints = getFlag(options, keys, "entryPoints", mustBeEntryPoints);
  let absWorkingDir = getFlag(options, keys, "absWorkingDir", mustBeString);
  let stdin = getFlag(options, keys, "stdin", mustBeObject);
  let write = (_a2 = getFlag(options, keys, "write", mustBeBoolean)) != null ? _a2 : writeDefault;
  let allowOverwrite = getFlag(options, keys, "allowOverwrite", mustBeBoolean);
  let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
  keys.plugins = true;
  checkForInvalidFlags(options, keys, `in ${callName}() call`);
  if (sourcemap) flags.push(`--sourcemap${sourcemap === true ? "" : `=${sourcemap}`}`);
  if (bundle) flags.push("--bundle");
  if (allowOverwrite) flags.push("--allow-overwrite");
  if (splitting) flags.push("--splitting");
  if (preserveSymlinks) flags.push("--preserve-symlinks");
  if (metafile) flags.push(`--metafile`);
  if (outfile) flags.push(`--outfile=${outfile}`);
  if (outdir) flags.push(`--outdir=${outdir}`);
  if (outbase) flags.push(`--outbase=${outbase}`);
  if (tsconfig) flags.push(`--tsconfig=${tsconfig}`);
  if (packages) flags.push(`--packages=${packages}`);
  if (resolveExtensions) flags.push(`--resolve-extensions=${validateAndJoinStringArray(resolveExtensions, "resolve extension")}`);
  if (publicPath) flags.push(`--public-path=${publicPath}`);
  if (entryNames) flags.push(`--entry-names=${entryNames}`);
  if (chunkNames) flags.push(`--chunk-names=${chunkNames}`);
  if (assetNames) flags.push(`--asset-names=${assetNames}`);
  if (mainFields) flags.push(`--main-fields=${validateAndJoinStringArray(mainFields, "main field")}`);
  if (conditions) flags.push(`--conditions=${validateAndJoinStringArray(conditions, "condition")}`);
  if (external) for (let name of external) flags.push(`--external:${validateStringValue(name, "external")}`);
  if (alias) {
    for (let old in alias) {
      if (old.indexOf("=") >= 0) throw new Error(`Invalid package name in alias: ${old}`);
      flags.push(`--alias:${old}=${validateStringValue(alias[old], "alias", old)}`);
    }
  }
  if (banner) {
    for (let type in banner) {
      if (type.indexOf("=") >= 0) throw new Error(`Invalid banner file type: ${type}`);
      flags.push(`--banner:${type}=${validateStringValue(banner[type], "banner", type)}`);
    }
  }
  if (footer) {
    for (let type in footer) {
      if (type.indexOf("=") >= 0) throw new Error(`Invalid footer file type: ${type}`);
      flags.push(`--footer:${type}=${validateStringValue(footer[type], "footer", type)}`);
    }
  }
  if (inject) for (let path3 of inject) flags.push(`--inject:${validateStringValue(path3, "inject")}`);
  if (loader) {
    for (let ext in loader) {
      if (ext.indexOf("=") >= 0) throw new Error(`Invalid loader extension: ${ext}`);
      flags.push(`--loader:${ext}=${validateStringValue(loader[ext], "loader", ext)}`);
    }
  }
  if (outExtension) {
    for (let ext in outExtension) {
      if (ext.indexOf("=") >= 0) throw new Error(`Invalid out extension: ${ext}`);
      flags.push(`--out-extension:${ext}=${validateStringValue(outExtension[ext], "out extension", ext)}`);
    }
  }
  if (entryPoints) {
    if (Array.isArray(entryPoints)) {
      for (let i = 0, n = entryPoints.length; i < n; i++) {
        let entryPoint = entryPoints[i];
        if (typeof entryPoint === "object" && entryPoint !== null) {
          let entryPointKeys = /* @__PURE__ */ Object.create(null);
          let input = getFlag(entryPoint, entryPointKeys, "in", mustBeString);
          let output = getFlag(entryPoint, entryPointKeys, "out", mustBeString);
          checkForInvalidFlags(entryPoint, entryPointKeys, "in entry point at index " + i);
          if (input === void 0) throw new Error('Missing property "in" for entry point at index ' + i);
          if (output === void 0) throw new Error('Missing property "out" for entry point at index ' + i);
          entries.push([output, input]);
        } else {
          entries.push(["", validateStringValue(entryPoint, "entry point at index " + i)]);
        }
      }
    } else {
      for (let key in entryPoints) {
        entries.push([key, validateStringValue(entryPoints[key], "entry point", key)]);
      }
    }
  }
  if (stdin) {
    let stdinKeys = /* @__PURE__ */ Object.create(null);
    let contents = getFlag(stdin, stdinKeys, "contents", mustBeStringOrUint8Array);
    let resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString);
    let sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString);
    let loader2 = getFlag(stdin, stdinKeys, "loader", mustBeString);
    checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object');
    if (sourcefile) flags.push(`--sourcefile=${sourcefile}`);
    if (loader2) flags.push(`--loader=${loader2}`);
    if (resolveDir) stdinResolveDir = resolveDir;
    if (typeof contents === "string") stdinContents = encodeUTF8(contents);
    else if (contents instanceof Uint8Array) stdinContents = contents;
  }
  let nodePaths = [];
  if (nodePathsInput) {
    for (let value of nodePathsInput) {
      value += "";
      nodePaths.push(value);
    }
  }
  return {
    entries,
    flags,
    write,
    stdinContents,
    stdinResolveDir,
    absWorkingDir,
    nodePaths,
    mangleCache: validateMangleCache(mangleCache)
  };
}
function flagsForTransformOptions(callName, options, isTTY2, logLevelDefault) {
  let flags = [];
  let keys = /* @__PURE__ */ Object.create(null);
  pushLogFlags(flags, options, keys, isTTY2, logLevelDefault);
  pushCommonFlags(flags, options, keys);
  let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
  let sourcefile = getFlag(options, keys, "sourcefile", mustBeString);
  let loader = getFlag(options, keys, "loader", mustBeString);
  let banner = getFlag(options, keys, "banner", mustBeString);
  let footer = getFlag(options, keys, "footer", mustBeString);
  let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
  checkForInvalidFlags(options, keys, `in ${callName}() call`);
  if (sourcemap) flags.push(`--sourcemap=${sourcemap === true ? "external" : sourcemap}`);
  if (sourcefile) flags.push(`--sourcefile=${sourcefile}`);
  if (loader) flags.push(`--loader=${loader}`);
  if (banner) flags.push(`--banner=${banner}`);
  if (footer) flags.push(`--footer=${footer}`);
  return {
    flags,
    mangleCache: validateMangleCache(mangleCache)
  };
}
function createChannel(streamIn) {
  const requestCallbacksByKey = {};
  const closeData = { didClose: false, reason: "" };
  let responseCallbacks = {};
  let nextRequestID = 0;
  let nextBuildKey = 0;
  let stdout = new Uint8Array(16 * 1024);
  let stdoutUsed = 0;
  let readFromStdout = (chunk) => {
    let limit = stdoutUsed + chunk.length;
    if (limit > stdout.length) {
      let swap = new Uint8Array(limit * 2);
      swap.set(stdout);
      stdout = swap;
    }
    stdout.set(chunk, stdoutUsed);
    stdoutUsed += chunk.length;
    let offset = 0;
    while (offset + 4 <= stdoutUsed) {
      let length = readUInt32LE(stdout, offset);
      if (offset + 4 + length > stdoutUsed) {
        break;
      }
      offset += 4;
      handleIncomingPacket(stdout.subarray(offset, offset + length));
      offset += length;
    }
    if (offset > 0) {
      stdout.copyWithin(0, offset, stdoutUsed);
      stdoutUsed -= offset;
    }
  };
  let afterClose = (error) => {
    closeData.didClose = true;
    if (error) closeData.reason = ": " + (error.message || error);
    const text = "The service was stopped" + closeData.reason;
    for (let id in responseCallbacks) {
      responseCallbacks[id](text, null);
    }
    responseCallbacks = {};
  };
  let sendRequest = (refs, value, callback) => {
    if (closeData.didClose) return callback("The service is no longer running" + closeData.reason, null);
    let id = nextRequestID++;
    responseCallbacks[id] = (error, response) => {
      try {
        callback(error, response);
      } finally {
        if (refs) refs.unref();
      }
    };
    if (refs) refs.ref();
    streamIn.writeToStdin(encodePacket({ id, isRequest: true, value }));
  };
  let sendResponse = (id, value) => {
    if (closeData.didClose) throw new Error("The service is no longer running" + closeData.reason);
    streamIn.writeToStdin(encodePacket({ id, isRequest: false, value }));
  };
  let handleRequest = async (id, request) => {
    try {
      if (request.command === "ping") {
        sendResponse(id, {});
        return;
      }
      if (typeof request.key === "number") {
        const requestCallbacks = requestCallbacksByKey[request.key];
        if (!requestCallbacks) {
          return;
        }
        const callback = requestCallbacks[request.command];
        if (callback) {
          await callback(id, request);
          return;
        }
      }
      throw new Error(`Invalid command: ` + request.command);
    } catch (e) {
      const errors = [extractErrorMessageV8(e, streamIn, null, void 0, "")];
      try {
        sendResponse(id, { errors });
      } catch {
      }
    }
  };
  let isFirstPacket = true;
  let handleIncomingPacket = (bytes) => {
    if (isFirstPacket) {
      isFirstPacket = false;
      let binaryVersion = String.fromCharCode(...bytes);
      if (binaryVersion !== "0.28.1") {
        throw new Error(`Cannot start service: Host version "${"0.28.1"}" does not match binary version ${quote(binaryVersion)}`);
      }
      return;
    }
    let packet = decodePacket(bytes);
    if (packet.isRequest) {
      handleRequest(packet.id, packet.value);
    } else {
      let callback = responseCallbacks[packet.id];
      delete responseCallbacks[packet.id];
      if (packet.value.error) callback(packet.value.error, {});
      else callback(null, packet.value);
    }
  };
  let buildOrContext = ({ callName, refs, options, isTTY: isTTY2, defaultWD: defaultWD2, callback }) => {
    let refCount = 0;
    const buildKey = nextBuildKey++;
    const requestCallbacks = {};
    const buildRefs = {
      ref() {
        if (++refCount === 1) {
          if (refs) refs.ref();
        }
      },
      unref() {
        if (--refCount === 0) {
          delete requestCallbacksByKey[buildKey];
          if (refs) refs.unref();
        }
      }
    };
    requestCallbacksByKey[buildKey] = requestCallbacks;
    buildRefs.ref();
    buildOrContextImpl(
      callName,
      buildKey,
      sendRequest,
      sendResponse,
      buildRefs,
      streamIn,
      requestCallbacks,
      options,
      isTTY2,
      defaultWD2,
      (err, res) => {
        try {
          callback(err, res);
        } finally {
          buildRefs.unref();
        }
      }
    );
  };
  let transform2 = ({ callName, refs, input, options, isTTY: isTTY2, fs: fs3, callback }) => {
    const details = createObjectStash();
    let start = (inputPath) => {
      try {
        if (typeof input !== "string" && !(input instanceof Uint8Array))
          throw new Error('The input to "transform" must be a string or a Uint8Array');
        let {
          flags,
          mangleCache
        } = flagsForTransformOptions(callName, options, isTTY2, transformLogLevelDefault);
        let request = {
          command: "transform",
          flags,
          inputFS: inputPath !== null,
          input: inputPath !== null ? encodeUTF8(inputPath) : typeof input === "string" ? encodeUTF8(input) : input
        };
        if (mangleCache) request.mangleCache = mangleCache;
        sendRequest(refs, request, (error, response) => {
          if (error) return callback(new Error(error), null);
          let errors = replaceDetailsInMessages(response.errors, details);
          let warnings = replaceDetailsInMessages(response.warnings, details);
          let outstanding = 1;
          let next = () => {
            if (--outstanding === 0) {
              let result = {
                warnings,
                code: response.code,
                map: response.map,
                mangleCache: void 0,
                legalComments: void 0
              };
              if ("legalComments" in response) result.legalComments = response == null ? void 0 : response.legalComments;
              if (response.mangleCache) result.mangleCache = response == null ? void 0 : response.mangleCache;
              callback(null, result);
            }
          };
          if (errors.length > 0) return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
          if (response.codeFS) {
            outstanding++;
            fs3.readFile(response.code, (err, contents) => {
              if (err !== null) {
                callback(err, null);
              } else {
                response.code = contents;
                next();
              }
            });
          }
          if (response.mapFS) {
            outstanding++;
            fs3.readFile(response.map, (err, contents) => {
              if (err !== null) {
                callback(err, null);
              } else {
                response.map = contents;
                next();
              }
            });
          }
          next();
        });
      } catch (e) {
        let flags = [];
        try {
          pushLogFlags(flags, options, {}, isTTY2, transformLogLevelDefault);
        } catch {
        }
        const error = extractErrorMessageV8(e, streamIn, details, void 0, "");
        sendRequest(refs, { command: "error", flags, error }, () => {
          error.detail = details.load(error.detail);
          callback(failureErrorWithLog("Transform failed", [error], []), null);
        });
      }
    };
    if ((typeof input === "string" || input instanceof Uint8Array) && input.length > 1024 * 1024) {
      let next = start;
      start = () => fs3.writeFile(input, next);
    }
    start(null);
  };
  let formatMessages2 = ({ callName, refs, messages, options, callback }) => {
    if (!options) throw new Error(`Missing second argument in ${callName}() call`);
    let keys = {};
    let kind = getFlag(options, keys, "kind", mustBeString);
    let color = getFlag(options, keys, "color", mustBeBoolean);
    let terminalWidth = getFlag(options, keys, "terminalWidth", mustBeInteger);
    checkForInvalidFlags(options, keys, `in ${callName}() call`);
    if (kind === void 0) throw new Error(`Missing "kind" in ${callName}() call`);
    if (kind !== "error" && kind !== "warning") throw new Error(`Expected "kind" to be "error" or "warning" in ${callName}() call`);
    let request = {
      command: "format-msgs",
      messages: sanitizeMessages(messages, "messages", null, "", terminalWidth),
      isWarning: kind === "warning"
    };
    if (color !== void 0) request.color = color;
    if (terminalWidth !== void 0) request.terminalWidth = terminalWidth;
    sendRequest(refs, request, (error, response) => {
      if (error) return callback(new Error(error), null);
      callback(null, response.messages);
    });
  };
  let analyzeMetafile2 = ({ callName, refs, metafile, options, callback }) => {
    if (options === void 0) options = {};
    let keys = {};
    let color = getFlag(options, keys, "color", mustBeBoolean);
    let verbose = getFlag(options, keys, "verbose", mustBeBoolean);
    checkForInvalidFlags(options, keys, `in ${callName}() call`);
    let request = {
      command: "analyze-metafile",
      metafile
    };
    if (color !== void 0) request.color = color;
    if (verbose !== void 0) request.verbose = verbose;
    sendRequest(refs, request, (error, response) => {
      if (error) return callback(new Error(error), null);
      callback(null, response.result);
    });
  };
  return {
    readFromStdout,
    afterClose,
    service: {
      buildOrContext,
      transform: transform2,
      formatMessages: formatMessages2,
      analyzeMetafile: analyzeMetafile2
    }
  };
}
function buildOrContextImpl(callName, buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, options, isTTY2, defaultWD2, callback) {
  const details = createObjectStash();
  const isContext = callName === "context";
  const handleError = (e, pluginName) => {
    const flags = [];
    try {
      pushLogFlags(flags, options, {}, isTTY2, buildLogLevelDefault);
    } catch {
    }
    const message = extractErrorMessageV8(e, streamIn, details, void 0, pluginName);
    sendRequest(refs, { command: "error", flags, error: message }, () => {
      message.detail = details.load(message.detail);
      callback(failureErrorWithLog(isContext ? "Context failed" : "Build failed", [message], []), null);
    });
  };
  let plugins;
  if (typeof options === "object") {
    const value = options.plugins;
    if (value !== void 0) {
      if (!Array.isArray(value)) return handleError(new Error(`"plugins" must be an array`), "");
      plugins = value;
    }
  }
  if (plugins && plugins.length > 0) {
    if (streamIn.isSync) return handleError(new Error("Cannot use plugins in synchronous API calls"), "");
    handlePlugins(
      buildKey,
      sendRequest,
      sendResponse,
      refs,
      streamIn,
      requestCallbacks,
      options,
      plugins,
      details
    ).then(
      (result) => {
        if (!result.ok) return handleError(result.error, result.pluginName);
        try {
          buildOrContextContinue(result.requestPlugins, result.runOnEndCallbacks, result.scheduleOnDisposeCallbacks);
        } catch (e) {
          handleError(e, "");
        }
      },
      (e) => handleError(e, "")
    );
    return;
  }
  try {
    buildOrContextContinue(null, (result, done) => done([], []), () => {
    });
  } catch (e) {
    handleError(e, "");
  }
  function buildOrContextContinue(requestPlugins, runOnEndCallbacks, scheduleOnDisposeCallbacks) {
    const writeDefault = streamIn.hasFS;
    const {
      entries,
      flags,
      write,
      stdinContents,
      stdinResolveDir,
      absWorkingDir,
      nodePaths,
      mangleCache
    } = flagsForBuildOptions(callName, options, isTTY2, buildLogLevelDefault, writeDefault);
    if (write && !streamIn.hasFS) throw new Error(`The "write" option is unavailable in this environment`);
    const request = {
      command: "build",
      key: buildKey,
      entries,
      flags,
      write,
      stdinContents,
      stdinResolveDir,
      absWorkingDir: absWorkingDir || defaultWD2,
      nodePaths,
      context: isContext
    };
    if (requestPlugins) request.plugins = requestPlugins;
    if (mangleCache) request.mangleCache = mangleCache;
    const buildResponseToResult = (response, callback2) => {
      const result = {
        errors: replaceDetailsInMessages(response.errors, details),
        warnings: replaceDetailsInMessages(response.warnings, details),
        outputFiles: void 0,
        metafile: void 0,
        mangleCache: void 0
      };
      const originalErrors = result.errors.slice();
      const originalWarnings = result.warnings.slice();
      if (response.outputFiles) result.outputFiles = response.outputFiles.map(convertOutputFiles);
      if (response.metafile && response.metafile.length) result.metafile = parseJSON(response.metafile);
      if (response.mangleCache) result.mangleCache = response.mangleCache;
      if (response.writeToStdout !== void 0) console.log(decodeUTF8(response.writeToStdout).replace(/\n$/, ""));
      runOnEndCallbacks(result, (onEndErrors, onEndWarnings) => {
        if (originalErrors.length > 0 || onEndErrors.length > 0) {
          const error = failureErrorWithLog("Build failed", originalErrors.concat(onEndErrors), originalWarnings.concat(onEndWarnings));
          return callback2(error, null, onEndErrors, onEndWarnings);
        }
        callback2(null, result, onEndErrors, onEndWarnings);
      });
    };
    let latestResultPromise;
    let provideLatestResult;
    if (isContext)
      requestCallbacks["on-end"] = (id, request2) => new Promise((resolve) => {
        buildResponseToResult(request2, (err, result, onEndErrors, onEndWarnings) => {
          const response = {
            errors: onEndErrors,
            warnings: onEndWarnings
          };
          if (provideLatestResult) provideLatestResult(err, result);
          latestResultPromise = void 0;
          provideLatestResult = void 0;
          sendResponse(id, response);
          resolve();
        });
      });
    sendRequest(refs, request, (error, response) => {
      if (error) return callback(new Error(error), null);
      if (!isContext) {
        return buildResponseToResult(response, (err, res) => {
          scheduleOnDisposeCallbacks();
          return callback(err, res);
        });
      }
      if (response.errors.length > 0) {
        return callback(failureErrorWithLog("Context failed", response.errors, response.warnings), null);
      }
      let didDispose = false;
      const result = {
        rebuild: () => {
          if (!latestResultPromise) latestResultPromise = new Promise((resolve, reject) => {
            let settlePromise;
            provideLatestResult = (err, result2) => {
              if (!settlePromise) settlePromise = () => err ? reject(err) : resolve(result2);
            };
            const triggerAnotherBuild = () => {
              const request2 = {
                command: "rebuild",
                key: buildKey
              };
              sendRequest(refs, request2, (error2, response2) => {
                if (error2) {
                  reject(new Error(error2));
                } else if (settlePromise) {
                  settlePromise();
                } else {
                  triggerAnotherBuild();
                }
              });
            };
            triggerAnotherBuild();
          });
          return latestResultPromise;
        },
        watch: (options2 = {}) => new Promise((resolve, reject) => {
          if (!streamIn.hasFS) throw new Error(`Cannot use the "watch" API in this environment`);
          const keys = {};
          const delay = getFlag(options2, keys, "delay", mustBeInteger);
          checkForInvalidFlags(options2, keys, `in watch() call`);
          const request2 = {
            command: "watch",
            key: buildKey
          };
          if (delay) request2.delay = delay;
          sendRequest(refs, request2, (error2) => {
            if (error2) reject(new Error(error2));
            else resolve(void 0);
          });
        }),
        serve: (options2 = {}) => new Promise((resolve, reject) => {
          if (!streamIn.hasFS) throw new Error(`Cannot use the "serve" API in this environment`);
          const keys = {};
          const port = getFlag(options2, keys, "port", mustBeValidPortNumber);
          const host = getFlag(options2, keys, "host", mustBeString);
          const servedir = getFlag(options2, keys, "servedir", mustBeString);
          const keyfile = getFlag(options2, keys, "keyfile", mustBeString);
          const certfile = getFlag(options2, keys, "certfile", mustBeString);
          const fallback = getFlag(options2, keys, "fallback", mustBeString);
          const cors = getFlag(options2, keys, "cors", mustBeObject);
          const onRequest = getFlag(options2, keys, "onRequest", mustBeFunction);
          checkForInvalidFlags(options2, keys, `in serve() call`);
          const request2 = {
            command: "serve",
            key: buildKey,
            onRequest: !!onRequest
          };
          if (port !== void 0) request2.port = port;
          if (host !== void 0) request2.host = host;
          if (servedir !== void 0) request2.servedir = servedir;
          if (keyfile !== void 0) request2.keyfile = keyfile;
          if (certfile !== void 0) request2.certfile = certfile;
          if (fallback !== void 0) request2.fallback = fallback;
          if (cors) {
            const corsKeys = {};
            const origin = getFlag(cors, corsKeys, "origin", mustBeStringOrArrayOfStrings);
            checkForInvalidFlags(cors, corsKeys, `on "cors" object`);
            if (Array.isArray(origin)) request2.corsOrigin = origin;
            else if (origin !== void 0) request2.corsOrigin = [origin];
          }
          sendRequest(refs, request2, (error2, response2) => {
            if (error2) return reject(new Error(error2));
            if (onRequest) {
              requestCallbacks["serve-request"] = (id, request3) => {
                onRequest(request3.args);
                sendResponse(id, {});
              };
            }
            resolve(response2);
          });
        }),
        cancel: () => new Promise((resolve) => {
          if (didDispose) return resolve();
          const request2 = {
            command: "cancel",
            key: buildKey
          };
          sendRequest(refs, request2, () => {
            resolve();
          });
        }),
        dispose: () => new Promise((resolve) => {
          if (didDispose) return resolve();
          didDispose = true;
          const request2 = {
            command: "dispose",
            key: buildKey
          };
          sendRequest(refs, request2, () => {
            resolve();
            scheduleOnDisposeCallbacks();
            refs.unref();
          });
        })
      };
      refs.ref();
      callback(null, result);
    });
  }
}
var handlePlugins = async (buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, initialOptions, plugins, details) => {
  let onStartCallbacks = [];
  let onEndCallbacks = [];
  let onResolveCallbacks = {};
  let onLoadCallbacks = {};
  let onDisposeCallbacks = [];
  let nextCallbackID = 0;
  let i = 0;
  let requestPlugins = [];
  let isSetupDone = false;
  plugins = [...plugins];
  for (let item of plugins) {
    let keys = {};
    if (typeof item !== "object") throw new Error(`Plugin at index ${i} must be an object`);
    const name = getFlag(item, keys, "name", mustBeString);
    if (typeof name !== "string" || name === "") throw new Error(`Plugin at index ${i} is missing a name`);
    try {
      let setup = getFlag(item, keys, "setup", mustBeFunction);
      if (typeof setup !== "function") throw new Error(`Plugin is missing a setup function`);
      checkForInvalidFlags(item, keys, `on plugin ${quote(name)}`);
      let plugin = {
        name,
        onStart: false,
        onEnd: false,
        onResolve: [],
        onLoad: []
      };
      i++;
      let resolve = (path3, options = {}) => {
        if (!isSetupDone) throw new Error('Cannot call "resolve" before plugin setup has completed');
        if (typeof path3 !== "string") throw new Error(`The path to resolve must be a string`);
        let keys2 = /* @__PURE__ */ Object.create(null);
        let pluginName = getFlag(options, keys2, "pluginName", mustBeString);
        let importer = getFlag(options, keys2, "importer", mustBeString);
        let namespace = getFlag(options, keys2, "namespace", mustBeString);
        let resolveDir = getFlag(options, keys2, "resolveDir", mustBeString);
        let kind = getFlag(options, keys2, "kind", mustBeString);
        let pluginData = getFlag(options, keys2, "pluginData", canBeAnything);
        let importAttributes = getFlag(options, keys2, "with", mustBeObject);
        checkForInvalidFlags(options, keys2, "in resolve() call");
        return new Promise((resolve2, reject) => {
          const request = {
            command: "resolve",
            path: path3,
            key: buildKey,
            pluginName: name
          };
          if (pluginName != null) request.pluginName = pluginName;
          if (importer != null) request.importer = importer;
          if (namespace != null) request.namespace = namespace;
          if (resolveDir != null) request.resolveDir = resolveDir;
          if (kind != null) request.kind = kind;
          else throw new Error(`Must specify "kind" when calling "resolve"`);
          if (pluginData != null) request.pluginData = details.store(pluginData);
          if (importAttributes != null) request.with = sanitizeStringMap(importAttributes, "with");
          sendRequest(refs, request, (error, response) => {
            if (error !== null) reject(new Error(error));
            else resolve2({
              errors: replaceDetailsInMessages(response.errors, details),
              warnings: replaceDetailsInMessages(response.warnings, details),
              path: response.path,
              external: response.external,
              sideEffects: response.sideEffects,
              namespace: response.namespace,
              suffix: response.suffix,
              pluginData: details.load(response.pluginData)
            });
          });
        });
      };
      let promise = setup({
        initialOptions,
        resolve,
        onStart(callback) {
          let registeredText = `This error came from the "onStart" callback registered here:`;
          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onStart");
          onStartCallbacks.push({ name, callback, note: registeredNote });
          plugin.onStart = true;
        },
        onEnd(callback) {
          let registeredText = `This error came from the "onEnd" callback registered here:`;
          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onEnd");
          onEndCallbacks.push({ name, callback, note: registeredNote });
          plugin.onEnd = true;
        },
        onResolve(options, callback) {
          let registeredText = `This error came from the "onResolve" callback registered here:`;
          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onResolve");
          let keys2 = {};
          let filter = getFlag(options, keys2, "filter", mustBeRegExp);
          let namespace = getFlag(options, keys2, "namespace", mustBeString);
          checkForInvalidFlags(options, keys2, `in onResolve() call for plugin ${quote(name)}`);
          if (filter == null) throw new Error(`onResolve() call is missing a filter`);
          let id = nextCallbackID++;
          onResolveCallbacks[id] = { name, callback, note: registeredNote };
          plugin.onResolve.push({ id, filter: jsRegExpToGoRegExp(filter), namespace: namespace || "" });
        },
        onLoad(options, callback) {
          let registeredText = `This error came from the "onLoad" callback registered here:`;
          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad");
          let keys2 = {};
          let filter = getFlag(options, keys2, "filter", mustBeRegExp);
          let namespace = getFlag(options, keys2, "namespace", mustBeString);
          checkForInvalidFlags(options, keys2, `in onLoad() call for plugin ${quote(name)}`);
          if (filter == null) throw new Error(`onLoad() call is missing a filter`);
          let id = nextCallbackID++;
          onLoadCallbacks[id] = { name, callback, note: registeredNote };
          plugin.onLoad.push({ id, filter: jsRegExpToGoRegExp(filter), namespace: namespace || "" });
        },
        onDispose(callback) {
          onDisposeCallbacks.push(callback);
        },
        esbuild: streamIn.esbuild
      });
      if (promise) await promise;
      requestPlugins.push(plugin);
    } catch (e) {
      return { ok: false, error: e, pluginName: name };
    }
  }
  requestCallbacks["on-start"] = async (id, request) => {
    details.clear();
    let response = { errors: [], warnings: [] };
    await Promise.all(onStartCallbacks.map(async ({ name, callback, note }) => {
      try {
        let result = await callback();
        if (result != null) {
          if (typeof result !== "object") throw new Error(`Expected onStart() callback in plugin ${quote(name)} to return an object`);
          let keys = {};
          let errors = getFlag(result, keys, "errors", mustBeArray);
          let warnings = getFlag(result, keys, "warnings", mustBeArray);
          checkForInvalidFlags(result, keys, `from onStart() callback in plugin ${quote(name)}`);
          if (errors != null) response.errors.push(...sanitizeMessages(errors, "errors", details, name, void 0));
          if (warnings != null) response.warnings.push(...sanitizeMessages(warnings, "warnings", details, name, void 0));
        }
      } catch (e) {
        response.errors.push(extractErrorMessageV8(e, streamIn, details, note && note(), name));
      }
    }));
    sendResponse(id, response);
  };
  requestCallbacks["on-resolve"] = async (id, request) => {
    let response = {}, name = "", callback, note;
    for (let id2 of request.ids) {
      try {
        ({ name, callback, note } = onResolveCallbacks[id2]);
        let result = await callback({
          path: request.path,
          importer: request.importer,
          namespace: request.namespace,
          resolveDir: request.resolveDir,
          kind: request.kind,
          pluginData: details.load(request.pluginData),
          with: request.with
        });
        if (result != null) {
          if (typeof result !== "object") throw new Error(`Expected onResolve() callback in plugin ${quote(name)} to return an object`);
          let keys = {};
          let pluginName = getFlag(result, keys, "pluginName", mustBeString);
          let path3 = getFlag(result, keys, "path", mustBeString);
          let namespace = getFlag(result, keys, "namespace", mustBeString);
          let suffix = getFlag(result, keys, "suffix", mustBeString);
          let external = getFlag(result, keys, "external", mustBeBoolean);
          let sideEffects = getFlag(result, keys, "sideEffects", mustBeBoolean);
          let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
          let errors = getFlag(result, keys, "errors", mustBeArray);
          let warnings = getFlag(result, keys, "warnings", mustBeArray);
          let watchFiles = getFlag(result, keys, "watchFiles", mustBeArrayOfStrings);
          let watchDirs = getFlag(result, keys, "watchDirs", mustBeArrayOfStrings);
          checkForInvalidFlags(result, keys, `from onResolve() callback in plugin ${quote(name)}`);
          response.id = id2;
          if (pluginName != null) response.pluginName = pluginName;
          if (path3 != null) response.path = path3;
          if (namespace != null) response.namespace = namespace;
          if (suffix != null) response.suffix = suffix;
          if (external != null) response.external = external;
          if (sideEffects != null) response.sideEffects = sideEffects;
          if (pluginData != null) response.pluginData = details.store(pluginData);
          if (errors != null) response.errors = sanitizeMessages(errors, "errors", details, name, void 0);
          if (warnings != null) response.warnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
          if (watchFiles != null) response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
          if (watchDirs != null) response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
          break;
        }
      } catch (e) {
        response = { id: id2, errors: [extractErrorMessageV8(e, streamIn, details, note && note(), name)] };
        break;
      }
    }
    sendResponse(id, response);
  };
  requestCallbacks["on-load"] = async (id, request) => {
    let response = {}, name = "", callback, note;
    for (let id2 of request.ids) {
      try {
        ({ name, callback, note } = onLoadCallbacks[id2]);
        let result = await callback({
          path: request.path,
          namespace: request.namespace,
          suffix: request.suffix,
          pluginData: details.load(request.pluginData),
          with: request.with
        });
        if (result != null) {
          if (typeof result !== "object") throw new Error(`Expected onLoad() callback in plugin ${quote(name)} to return an object`);
          let keys = {};
          let pluginName = getFlag(result, keys, "pluginName", mustBeString);
          let contents = getFlag(result, keys, "contents", mustBeStringOrUint8Array);
          let resolveDir = getFlag(result, keys, "resolveDir", mustBeString);
          let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
          let loader = getFlag(result, keys, "loader", mustBeString);
          let errors = getFlag(result, keys, "errors", mustBeArray);
          let warnings = getFlag(result, keys, "warnings", mustBeArray);
          let watchFiles = getFlag(result, keys, "watchFiles", mustBeArrayOfStrings);
          let watchDirs = getFlag(result, keys, "watchDirs", mustBeArrayOfStrings);
          checkForInvalidFlags(result, keys, `from onLoad() callback in plugin ${quote(name)}`);
          response.id = id2;
          if (pluginName != null) response.pluginName = pluginName;
          if (contents instanceof Uint8Array) response.contents = contents;
          else if (contents != null) response.contents = encodeUTF8(contents);
          if (resolveDir != null) response.resolveDir = resolveDir;
          if (pluginData != null) response.pluginData = details.store(pluginData);
          if (loader != null) response.loader = loader;
          if (errors != null) response.errors = sanitizeMessages(errors, "errors", details, name, void 0);
          if (warnings != null) response.warnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
          if (watchFiles != null) response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
          if (watchDirs != null) response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
          break;
        }
      } catch (e) {
        response = { id: id2, errors: [extractErrorMessageV8(e, streamIn, details, note && note(), name)] };
        break;
      }
    }
    sendResponse(id, response);
  };
  let runOnEndCallbacks = (result, done) => done([], []);
  if (onEndCallbacks.length > 0) {
    runOnEndCallbacks = (result, done) => {
      (async () => {
        const onEndErrors = [];
        const onEndWarnings = [];
        for (const { name, callback, note } of onEndCallbacks) {
          let newErrors;
          let newWarnings;
          try {
            const value = await callback(result);
            if (value != null) {
              if (typeof value !== "object") throw new Error(`Expected onEnd() callback in plugin ${quote(name)} to return an object`);
              let keys = {};
              let errors = getFlag(value, keys, "errors", mustBeArray);
              let warnings = getFlag(value, keys, "warnings", mustBeArray);
              checkForInvalidFlags(value, keys, `from onEnd() callback in plugin ${quote(name)}`);
              if (errors != null) newErrors = sanitizeMessages(errors, "errors", details, name, void 0);
              if (warnings != null) newWarnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
            }
          } catch (e) {
            newErrors = [extractErrorMessageV8(e, streamIn, details, note && note(), name)];
          }
          if (newErrors) {
            onEndErrors.push(...newErrors);
            try {
              result.errors.push(...newErrors);
            } catch {
            }
          }
          if (newWarnings) {
            onEndWarnings.push(...newWarnings);
            try {
              result.warnings.push(...newWarnings);
            } catch {
            }
          }
        }
        done(onEndErrors, onEndWarnings);
      })();
    };
  }
  let scheduleOnDisposeCallbacks = () => {
    for (const cb of onDisposeCallbacks) {
      setTimeout(() => cb(), 0);
    }
  };
  isSetupDone = true;
  return {
    ok: true,
    requestPlugins,
    runOnEndCallbacks,
    scheduleOnDisposeCallbacks
  };
};
function createObjectStash() {
  const map = /* @__PURE__ */ new Map();
  let nextID = 0;
  return {
    clear() {
      map.clear();
    },
    load(id) {
      return map.get(id);
    },
    store(value) {
      if (value === void 0) return -1;
      const id = nextID++;
      map.set(id, value);
      return id;
    }
  };
}
function extractCallerV8(e, streamIn, ident) {
  let note;
  let tried = false;
  return () => {
    if (tried) return note;
    tried = true;
    try {
      let lines = (e.stack + "").split("\n");
      lines.splice(1, 1);
      let location = parseStackLinesV8(streamIn, lines, ident);
      if (location) {
        note = { text: e.message, location };
        return note;
      }
    } catch {
    }
  };
}
function extractErrorMessageV8(e, streamIn, stash, note, pluginName) {
  let text = "Internal error";
  let location = null;
  try {
    text = (e && e.message || e) + "";
  } catch {
  }
  try {
    location = parseStackLinesV8(streamIn, (e.stack + "").split("\n"), "");
  } catch {
  }
  return { id: "", pluginName, text, location, notes: note ? [note] : [], detail: stash ? stash.store(e) : -1 };
}
function parseStackLinesV8(streamIn, lines, ident) {
  let at = "    at ";
  if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
    for (let i = 1; i < lines.length; i++) {
      let line = lines[i];
      if (!line.startsWith(at)) continue;
      line = line.slice(at.length);
      while (true) {
        let match = /^(?:new |async )?\S+ \((.*)\)$/.exec(line);
        if (match) {
          line = match[1];
          continue;
        }
        match = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(line);
        if (match) {
          line = match[1];
          continue;
        }
        match = /^(\S+):(\d+):(\d+)$/.exec(line);
        if (match) {
          let contents;
          try {
            contents = streamIn.readFileSync(match[1], "utf8");
          } catch {
            break;
          }
          let lineText = contents.split(/\r\n|\r|\n|\u2028|\u2029/)[+match[2] - 1] || "";
          let column = +match[3] - 1;
          let length = lineText.slice(column, column + ident.length) === ident ? ident.length : 0;
          return {
            file: match[1],
            namespace: "file",
            line: +match[2],
            column: encodeUTF8(lineText.slice(0, column)).length,
            length: encodeUTF8(lineText.slice(column, column + length)).length,
            lineText: lineText + "\n" + lines.slice(1).join("\n"),
            suggestion: ""
          };
        }
        break;
      }
    }
  }
  return null;
}
function failureErrorWithLog(text, errors, warnings) {
  let limit = 5;
  text += errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i) => {
    if (i === limit) return "\n...";
    if (!e.location) return `
error: ${e.text}`;
    let { file, line, column } = e.location;
    let pluginText = e.pluginName ? `[plugin: ${e.pluginName}] ` : "";
    return `
${file}:${line}:${column}: ERROR: ${pluginText}${e.text}`;
  }).join("");
  let error = new Error(text);
  for (const [key, value] of [["errors", errors], ["warnings", warnings]]) {
    Object.defineProperty(error, key, {
      configurable: true,
      enumerable: true,
      get: () => value,
      set: (value2) => Object.defineProperty(error, key, {
        configurable: true,
        enumerable: true,
        value: value2
      })
    });
  }
  return error;
}
function replaceDetailsInMessages(messages, stash) {
  for (const message of messages) {
    message.detail = stash.load(message.detail);
  }
  return messages;
}
function sanitizeLocation(location, where, terminalWidth) {
  if (location == null) return null;
  let keys = {};
  let file = getFlag(location, keys, "file", mustBeString);
  let namespace = getFlag(location, keys, "namespace", mustBeString);
  let line = getFlag(location, keys, "line", mustBeInteger);
  let column = getFlag(location, keys, "column", mustBeInteger);
  let length = getFlag(location, keys, "length", mustBeInteger);
  let lineText = getFlag(location, keys, "lineText", mustBeString);
  let suggestion = getFlag(location, keys, "suggestion", mustBeString);
  checkForInvalidFlags(location, keys, where);
  if (lineText) {
    const relevantASCII = lineText.slice(
      0,
      (column && column > 0 ? column : 0) + (length && length > 0 ? length : 0) + (terminalWidth && terminalWidth > 0 ? terminalWidth : 80)
    );
    if (!/[\x7F-\uFFFF]/.test(relevantASCII) && !/\n/.test(lineText)) {
      lineText = relevantASCII;
    }
  }
  return {
    file: file || "",
    namespace: namespace || "",
    line: line || 0,
    column: column || 0,
    length: length || 0,
    lineText: lineText || "",
    suggestion: suggestion || ""
  };
}
function sanitizeMessages(messages, property, stash, fallbackPluginName, terminalWidth) {
  let messagesClone = [];
  let index = 0;
  for (const message of messages) {
    let keys = {};
    let id = getFlag(message, keys, "id", mustBeString);
    let pluginName = getFlag(message, keys, "pluginName", mustBeString);
    let text = getFlag(message, keys, "text", mustBeString);
    let location = getFlag(message, keys, "location", mustBeObjectOrNull);
    let notes = getFlag(message, keys, "notes", mustBeArray);
    let detail = getFlag(message, keys, "detail", canBeAnything);
    let where = `in element ${index} of "${property}"`;
    checkForInvalidFlags(message, keys, where);
    let notesClone = [];
    if (notes) {
      for (const note of notes) {
        let noteKeys = {};
        let noteText = getFlag(note, noteKeys, "text", mustBeString);
        let noteLocation = getFlag(note, noteKeys, "location", mustBeObjectOrNull);
        checkForInvalidFlags(note, noteKeys, where);
        notesClone.push({
          text: noteText || "",
          location: sanitizeLocation(noteLocation, where, terminalWidth)
        });
      }
    }
    messagesClone.push({
      id: id || "",
      pluginName: pluginName || fallbackPluginName,
      text: text || "",
      location: sanitizeLocation(location, where, terminalWidth),
      notes: notesClone,
      detail: stash ? stash.store(detail) : -1
    });
    index++;
  }
  return messagesClone;
}
function sanitizeStringArray(values, property) {
  const result = [];
  for (const value of values) {
    if (typeof value !== "string") throw new Error(`${quote(property)} must be an array of strings`);
    result.push(value);
  }
  return result;
}
function sanitizeStringMap(map, property) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const key in map) {
    const value = map[key];
    if (typeof value !== "string") throw new Error(`key ${quote(key)} in object ${quote(property)} must be a string`);
    result[key] = value;
  }
  return result;
}
function convertOutputFiles({ path: path3, contents, hash }) {
  let text = null;
  return {
    path: path3,
    contents,
    hash,
    get text() {
      const binary = this.contents;
      if (text === null || binary !== contents) {
        contents = binary;
        text = decodeUTF8(binary);
      }
      return text;
    }
  };
}
function jsRegExpToGoRegExp(regexp) {
  let result = regexp.source;
  if (regexp.flags) result = `(?${regexp.flags})${result}`;
  return result;
}
function parseJSON(bytes) {
  let text;
  try {
    text = decodeUTF8(bytes);
  } catch {
    return JSON_parse(bytes);
  }
  return JSON.parse(text);
}

// lib/npm/node-platform.ts
var fs = __webpack_require__(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var os = __webpack_require__(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'os'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var path = __webpack_require__(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var ESBUILD_BINARY_PATH = process.env.ESBUILD_BINARY_PATH || ESBUILD_BINARY_PATH;
var isValidBinaryPath = (x) => !!x && x !== "/usr/bin/esbuild";
var packageDarwin_arm64 = "@esbuild/darwin-arm64";
var packageDarwin_x64 = "@esbuild/darwin-x64";
var knownWindowsPackages = {
  "win32 arm64 LE": "@esbuild/win32-arm64",
  "win32 ia32 LE": "@esbuild/win32-ia32",
  "win32 x64 LE": "@esbuild/win32-x64"
};
var knownUnixlikePackages = {
  "aix ppc64 BE": "@esbuild/aix-ppc64",
  "android arm64 LE": "@esbuild/android-arm64",
  "darwin arm64 LE": "@esbuild/darwin-arm64",
  "darwin x64 LE": "@esbuild/darwin-x64",
  "freebsd arm64 LE": "@esbuild/freebsd-arm64",
  "freebsd x64 LE": "@esbuild/freebsd-x64",
  "linux arm LE": "@esbuild/linux-arm",
  "linux arm64 LE": "@esbuild/linux-arm64",
  "linux ia32 LE": "@esbuild/linux-ia32",
  "linux mips64el LE": "@esbuild/linux-mips64el",
  "linux ppc64 LE": "@esbuild/linux-ppc64",
  "linux riscv64 LE": "@esbuild/linux-riscv64",
  "linux s390x BE": "@esbuild/linux-s390x",
  "linux x64 LE": "@esbuild/linux-x64",
  "linux loong64 LE": "@esbuild/linux-loong64",
  "netbsd arm64 LE": "@esbuild/netbsd-arm64",
  "netbsd x64 LE": "@esbuild/netbsd-x64",
  "openbsd arm64 LE": "@esbuild/openbsd-arm64",
  "openbsd x64 LE": "@esbuild/openbsd-x64",
  "sunos x64 LE": "@esbuild/sunos-x64"
};
var knownWebAssemblyFallbackPackages = {
  "android arm LE": "@esbuild/android-arm",
  "android x64 LE": "@esbuild/android-x64",
  "openharmony arm64 LE": "@esbuild/openharmony-arm64"
};
function pkgAndSubpathForCurrentPlatform() {
  let pkg;
  let subpath;
  let isWASM = false;
  let platformKey = `${process.platform} ${os.arch()} ${os.endianness()}`;
  if (platformKey in knownWindowsPackages) {
    pkg = knownWindowsPackages[platformKey];
    subpath = "esbuild.exe";
  } else if (platformKey in knownUnixlikePackages) {
    pkg = knownUnixlikePackages[platformKey];
    subpath = "bin/esbuild";
  } else if (platformKey in knownWebAssemblyFallbackPackages) {
    pkg = knownWebAssemblyFallbackPackages[platformKey];
    subpath = "bin/esbuild";
    isWASM = true;
  } else {
    throw new Error(`Unsupported platform: ${platformKey}`);
  }
  return { pkg, subpath, isWASM };
}
function pkgForSomeOtherPlatform() {
  const libMainJS = /*require.resolve*/(/*! esbuild */ "./node_modules/esbuild/lib/main.js");
  const nodeModulesDirectory = path.dirname(path.dirname(path.dirname(libMainJS)));
  if (path.basename(nodeModulesDirectory) === "node_modules") {
    for (const unixKey in knownUnixlikePackages) {
      try {
        const pkg = knownUnixlikePackages[unixKey];
        if (fs.existsSync(path.join(nodeModulesDirectory, pkg))) return pkg;
      } catch {
      }
    }
    for (const windowsKey in knownWindowsPackages) {
      try {
        const pkg = knownWindowsPackages[windowsKey];
        if (fs.existsSync(path.join(nodeModulesDirectory, pkg))) return pkg;
      } catch {
      }
    }
  }
  return null;
}
function downloadedBinPath(pkg, subpath) {
  const esbuildLibDir = path.dirname(/*require.resolve*/(/*! esbuild */ "./node_modules/esbuild/lib/main.js"));
  return path.join(esbuildLibDir, `downloaded-${pkg.replace("/", "-")}-${path.basename(subpath)}`);
}
function generateBinPath() {
  if (isValidBinaryPath(ESBUILD_BINARY_PATH)) {
    if (!fs.existsSync(ESBUILD_BINARY_PATH)) {
      console.warn(`[esbuild] Ignoring bad configuration: ESBUILD_BINARY_PATH=${ESBUILD_BINARY_PATH}`);
    } else {
      return { binPath: ESBUILD_BINARY_PATH, isWASM: false };
    }
  }
  const { pkg, subpath, isWASM } = pkgAndSubpathForCurrentPlatform();
  let binPath;
  try {
    binPath = /*require.resolve*/(__webpack_require__("./node_modules/esbuild/lib sync recursive ^.*\\/.*$").resolve(`${pkg}/${subpath}`));
  } catch (e) {
    binPath = downloadedBinPath(pkg, subpath);
    if (!fs.existsSync(binPath)) {
      try {
        /*require.resolve*/(__webpack_require__("./node_modules/esbuild/lib sync recursive").resolve(pkg));
      } catch {
        const otherPkg = pkgForSomeOtherPlatform();
        if (otherPkg) {
          let suggestions = `
Specifically the "${otherPkg}" package is present but this platform
needs the "${pkg}" package instead. People often get into this
situation by installing esbuild on Windows or macOS and copying "node_modules"
into a Docker image that runs Linux, or by copying "node_modules" between
Windows and WSL environments.

If you are installing with npm, you can try not copying the "node_modules"
directory when you copy the files over, and running "npm ci" or "npm install"
on the destination platform after the copy. Or you could consider using yarn
instead of npm which has built-in support for installing a package on multiple
platforms simultaneously.

If you are installing with yarn, you can try listing both this platform and the
other platform in your ".yarnrc.yml" file using the "supportedArchitectures"
feature: https://yarnpkg.com/configuration/yarnrc/#supportedArchitectures
Keep in mind that this means multiple copies of esbuild will be present.
`;
          if (pkg === packageDarwin_x64 && otherPkg === packageDarwin_arm64 || pkg === packageDarwin_arm64 && otherPkg === packageDarwin_x64) {
            suggestions = `
Specifically the "${otherPkg}" package is present but this platform
needs the "${pkg}" package instead. People often get into this
situation by installing esbuild with npm running inside of Rosetta 2 and then
trying to use it with node running outside of Rosetta 2, or vice versa (Rosetta
2 is Apple's on-the-fly x86_64-to-arm64 translation service).

If you are installing with npm, you can try ensuring that both npm and node are
not running under Rosetta 2 and then reinstalling esbuild. This likely involves
changing how you installed npm and/or node. For example, installing node with
the universal installer here should work: https://nodejs.org/en/download/. Or
you could consider using yarn instead of npm which has built-in support for
installing a package on multiple platforms simultaneously.

If you are installing with yarn, you can try listing both "arm64" and "x64"
in your ".yarnrc.yml" file using the "supportedArchitectures" feature:
https://yarnpkg.com/configuration/yarnrc/#supportedArchitectures
Keep in mind that this means multiple copies of esbuild will be present.
`;
          }
          throw new Error(`
You installed esbuild for another platform than the one you're currently using.
This won't work because esbuild is written with native code and needs to
install a platform-specific binary executable.
${suggestions}
Another alternative is to use the "esbuild-wasm" package instead, which works
the same way on all platforms. But it comes with a heavy performance cost and
can sometimes be 10x slower than the "esbuild" package, so you may also not
want to do that.
`);
        }
        throw new Error(`The package "${pkg}" could not be found, and is needed by esbuild.

If you are installing esbuild with npm, make sure that you don't specify the
"--no-optional" or "--omit=optional" flags. The "optionalDependencies" feature
of "package.json" is used by esbuild to install the correct binary executable
for your current platform.`);
      }
      throw e;
    }
  }
  if (/\.zip\//.test(binPath)) {
    let pnpapi;
    try {
      pnpapi = __webpack_require__(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'pnpapi'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    } catch (e) {
    }
    if (pnpapi) {
      const root = pnpapi.getPackageInformation(pnpapi.topLevel).packageLocation;
      const binTargetPath = path.join(
        root,
        "node_modules",
        ".cache",
        "esbuild",
        `pnpapi-${pkg.replace("/", "-")}-${"0.28.1"}-${path.basename(subpath)}`
      );
      if (!fs.existsSync(binTargetPath)) {
        fs.mkdirSync(path.dirname(binTargetPath), { recursive: true });
        fs.copyFileSync(binPath, binTargetPath);
        fs.chmodSync(binTargetPath, 493);
      }
      return { binPath: binTargetPath, isWASM };
    }
  }
  return { binPath, isWASM };
}

// lib/npm/node.ts
var child_process = __webpack_require__(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'child_process'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var crypto = __webpack_require__(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'crypto'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var path2 = __webpack_require__(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var fs2 = __webpack_require__(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var os2 = __webpack_require__(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'os'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var tty = __webpack_require__(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'tty'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var worker_threads;
if (process.env.ESBUILD_WORKER_THREADS !== "0") {
  try {
    worker_threads = __webpack_require__(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'worker_threads'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
  } catch {
  }
  let [major, minor] = process.versions.node.split(".");
  if (
    // <v12.17.0 does not work
    +major < 12 || +major === 12 && +minor < 17 || +major === 13 && +minor < 13
  ) {
    worker_threads = void 0;
  }
}
var _a;
var isInternalWorkerThread = ((_a = worker_threads == null ? void 0 : worker_threads.workerData) == null ? void 0 : _a.esbuildVersion) === "0.28.1";
var esbuildCommandAndArgs = () => {
  if ((!ESBUILD_BINARY_PATH || false) && (path2.basename(__webpack_filename__) !== "main.js" || path2.basename(__webpack_dirname__) !== "lib")) {
    throw new Error(
      `The esbuild JavaScript API cannot be bundled. Please mark the "esbuild" package as external so it's not included in the bundle.

More information: The file containing the code for esbuild's JavaScript API (${__webpack_filename__}) does not appear to be inside the esbuild package on the file system, which usually means that the esbuild package was bundled into another file. This is problematic because the API needs to run a binary executable inside the esbuild package which is located using a relative path from the API code to the executable. If the esbuild package is bundled, the relative path will be incorrect and the executable won't be found.`
    );
  }
  if (false) // removed by dead control flow
{} else {
    const { binPath, isWASM } = generateBinPath();
    if (isWASM) {
      return ["node", [binPath]];
    } else {
      return [binPath, []];
    }
  }
};
var isTTY = () => tty.isatty(2);
var fsSync = {
  readFile(tempFile, callback) {
    try {
      let contents = fs2.readFileSync(tempFile, "utf8");
      try {
        fs2.unlinkSync(tempFile);
      } catch {
      }
      callback(null, contents);
    } catch (err) {
      callback(err, null);
    }
  },
  writeFile(contents, callback) {
    try {
      let tempFile = randomFileName();
      fs2.writeFileSync(tempFile, contents);
      callback(tempFile);
    } catch {
      callback(null);
    }
  }
};
var fsAsync = {
  readFile(tempFile, callback) {
    try {
      fs2.readFile(tempFile, "utf8", (err, contents) => {
        try {
          fs2.unlink(tempFile, () => callback(err, contents));
        } catch {
          callback(err, contents);
        }
      });
    } catch (err) {
      callback(err, null);
    }
  },
  writeFile(contents, callback) {
    try {
      let tempFile = randomFileName();
      fs2.writeFile(tempFile, contents, (err) => err !== null ? callback(null) : callback(tempFile));
    } catch {
      callback(null);
    }
  }
};
var version = "0.28.1";
var build = (options) => ensureServiceIsRunning().build(options);
var context = (buildOptions) => ensureServiceIsRunning().context(buildOptions);
var transform = (input, options) => ensureServiceIsRunning().transform(input, options);
var formatMessages = (messages, options) => ensureServiceIsRunning().formatMessages(messages, options);
var analyzeMetafile = (messages, options) => ensureServiceIsRunning().analyzeMetafile(messages, options);
var buildSync = (options) => {
  if (worker_threads && !isInternalWorkerThread) {
    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
    return workerThreadService.buildSync(options);
  }
  let result;
  runServiceSync((service) => service.buildOrContext({
    callName: "buildSync",
    refs: null,
    options,
    isTTY: isTTY(),
    defaultWD,
    callback: (err, res) => {
      if (err) throw err;
      result = res;
    }
  }));
  return result;
};
var transformSync = (input, options) => {
  if (worker_threads && !isInternalWorkerThread) {
    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
    return workerThreadService.transformSync(input, options);
  }
  let result;
  runServiceSync((service) => service.transform({
    callName: "transformSync",
    refs: null,
    input,
    options: options || {},
    isTTY: isTTY(),
    fs: fsSync,
    callback: (err, res) => {
      if (err) throw err;
      result = res;
    }
  }));
  return result;
};
var formatMessagesSync = (messages, options) => {
  if (worker_threads && !isInternalWorkerThread) {
    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
    return workerThreadService.formatMessagesSync(messages, options);
  }
  let result;
  runServiceSync((service) => service.formatMessages({
    callName: "formatMessagesSync",
    refs: null,
    messages,
    options,
    callback: (err, res) => {
      if (err) throw err;
      result = res;
    }
  }));
  return result;
};
var analyzeMetafileSync = (metafile, options) => {
  if (worker_threads && !isInternalWorkerThread) {
    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
    return workerThreadService.analyzeMetafileSync(metafile, options);
  }
  let result;
  runServiceSync((service) => service.analyzeMetafile({
    callName: "analyzeMetafileSync",
    refs: null,
    metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
    options,
    callback: (err, res) => {
      if (err) throw err;
      result = res;
    }
  }));
  return result;
};
var stop = () => {
  if (stopService) stopService();
  if (workerThreadService) workerThreadService.stop();
  return Promise.resolve();
};
var initializeWasCalled = false;
var initialize = (options) => {
  options = validateInitializeOptions(options || {});
  if (options.wasmURL) throw new Error(`The "wasmURL" option only works in the browser`);
  if (options.wasmModule) throw new Error(`The "wasmModule" option only works in the browser`);
  if (options.worker) throw new Error(`The "worker" option only works in the browser`);
  if (initializeWasCalled) throw new Error('Cannot call "initialize" more than once');
  ensureServiceIsRunning();
  initializeWasCalled = true;
  return Promise.resolve();
};
var defaultWD = process.cwd();
var longLivedService;
var stopService;
var ensureServiceIsRunning = () => {
  if (longLivedService) return longLivedService;
  let [command, args] = esbuildCommandAndArgs();
  let child = child_process.spawn(command, args.concat(`--service=${"0.28.1"}`, "--ping"), {
    windowsHide: true,
    stdio: ["pipe", "pipe", "inherit"],
    cwd: defaultWD
  });
  let { readFromStdout, afterClose, service } = createChannel({
    writeToStdin(bytes) {
      child.stdin.write(bytes, (err) => {
        if (err) afterClose(err);
      });
    },
    readFileSync: fs2.readFileSync,
    isSync: false,
    hasFS: true,
    esbuild: node_exports
  });
  child.stdin.on("error", afterClose);
  child.on("error", afterClose);
  const stdin = child.stdin;
  const stdout = child.stdout;
  stdout.on("data", readFromStdout);
  stdout.on("end", afterClose);
  stopService = () => {
    stdin.destroy();
    stdout.destroy();
    child.kill();
    initializeWasCalled = false;
    longLivedService = void 0;
    stopService = void 0;
  };
  let refCount = 0;
  child.unref();
  if (stdin.unref) {
    stdin.unref();
  }
  if (stdout.unref) {
    stdout.unref();
  }
  const refs = {
    ref() {
      if (++refCount === 1) child.ref();
    },
    unref() {
      if (--refCount === 0) child.unref();
    }
  };
  longLivedService = {
    build: (options) => new Promise((resolve, reject) => {
      service.buildOrContext({
        callName: "build",
        refs,
        options,
        isTTY: isTTY(),
        defaultWD,
        callback: (err, res) => err ? reject(err) : resolve(res)
      });
    }),
    context: (options) => new Promise((resolve, reject) => service.buildOrContext({
      callName: "context",
      refs,
      options,
      isTTY: isTTY(),
      defaultWD,
      callback: (err, res) => err ? reject(err) : resolve(res)
    })),
    transform: (input, options) => new Promise((resolve, reject) => service.transform({
      callName: "transform",
      refs,
      input,
      options: options || {},
      isTTY: isTTY(),
      fs: fsAsync,
      callback: (err, res) => err ? reject(err) : resolve(res)
    })),
    formatMessages: (messages, options) => new Promise((resolve, reject) => service.formatMessages({
      callName: "formatMessages",
      refs,
      messages,
      options,
      callback: (err, res) => err ? reject(err) : resolve(res)
    })),
    analyzeMetafile: (metafile, options) => new Promise((resolve, reject) => service.analyzeMetafile({
      callName: "analyzeMetafile",
      refs,
      metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
      options,
      callback: (err, res) => err ? reject(err) : resolve(res)
    }))
  };
  return longLivedService;
};
var runServiceSync = (callback) => {
  let [command, args] = esbuildCommandAndArgs();
  let stdin = new Uint8Array();
  let { readFromStdout, afterClose, service } = createChannel({
    writeToStdin(bytes) {
      if (stdin.length !== 0) throw new Error("Must run at most one command");
      stdin = bytes;
    },
    isSync: true,
    hasFS: true,
    esbuild: node_exports
  });
  callback(service);
  let stdout = child_process.execFileSync(command, args.concat(`--service=${"0.28.1"}`), {
    cwd: defaultWD,
    windowsHide: true,
    input: stdin,
    // We don't know how large the output could be. If it's too large, the
    // command will fail with ENOBUFS. Reserve 16mb for now since that feels
    // like it should be enough. Also allow overriding this with an environment
    // variable.
    maxBuffer: +process.env.ESBUILD_MAX_BUFFER || 16 * 1024 * 1024
  });
  readFromStdout(stdout);
  afterClose(null);
};
var randomFileName = () => {
  return path2.join(os2.tmpdir(), `esbuild-${crypto.randomBytes(32).toString("hex")}`);
};
var workerThreadService = null;
var startWorkerThreadService = (worker_threads2) => {
  let { port1: mainPort, port2: workerPort } = new worker_threads2.MessageChannel();
  let worker = new worker_threads2.Worker(__webpack_filename__, {
    workerData: { workerPort, defaultWD, esbuildVersion: "0.28.1" },
    transferList: [workerPort],
    // From node's documentation: https://nodejs.org/api/worker_threads.html
    //
    //   Take care when launching worker threads from preload scripts (scripts loaded
    //   and run using the `-r` command line flag). Unless the `execArgv` option is
    //   explicitly set, new Worker threads automatically inherit the command line flags
    //   from the running process and will preload the same preload scripts as the main
    //   thread. If the preload script unconditionally launches a worker thread, every
    //   thread spawned will spawn another until the application crashes.
    //
    execArgv: []
  });
  let nextID = 0;
  let fakeBuildError = (text) => {
    let error = new Error(`Build failed with 1 error:
error: ${text}`);
    let errors = [{ id: "", pluginName: "", text, location: null, notes: [], detail: void 0 }];
    error.errors = errors;
    error.warnings = [];
    return error;
  };
  let validateBuildSyncOptions = (options) => {
    if (!options) return;
    let plugins = options.plugins;
    if (plugins && plugins.length > 0) throw fakeBuildError(`Cannot use plugins in synchronous API calls`);
  };
  let applyProperties = (object, properties) => {
    for (let key in properties) {
      object[key] = properties[key];
    }
  };
  let runCallSync = (command, args) => {
    let id = nextID++;
    let sharedBuffer = new SharedArrayBuffer(8);
    let sharedBufferView = new Int32Array(sharedBuffer);
    let msg = { sharedBuffer, id, command, args };
    worker.postMessage(msg);
    let status = Atomics.wait(sharedBufferView, 0, 0);
    if (status !== "ok" && status !== "not-equal") throw new Error("Internal error: Atomics.wait() failed: " + status);
    let { message: { id: id2, resolve, reject, properties } } = worker_threads2.receiveMessageOnPort(mainPort);
    if (id !== id2) throw new Error(`Internal error: Expected id ${id} but got id ${id2}`);
    if (reject) {
      applyProperties(reject, properties);
      throw reject;
    }
    return resolve;
  };
  worker.unref();
  return {
    buildSync(options) {
      validateBuildSyncOptions(options);
      return runCallSync("build", [options]);
    },
    transformSync(input, options) {
      return runCallSync("transform", [input, options]);
    },
    formatMessagesSync(messages, options) {
      return runCallSync("formatMessages", [messages, options]);
    },
    analyzeMetafileSync(metafile, options) {
      return runCallSync("analyzeMetafile", [metafile, options]);
    },
    stop() {
      worker.terminate();
      workerThreadService = null;
    }
  };
};
var startSyncServiceWorker = () => {
  let workerPort = worker_threads.workerData.workerPort;
  let parentPort = worker_threads.parentPort;
  let extractProperties = (object) => {
    let properties = {};
    if (object && typeof object === "object") {
      for (let key in object) {
        properties[key] = object[key];
      }
    }
    return properties;
  };
  try {
    let service = ensureServiceIsRunning();
    defaultWD = worker_threads.workerData.defaultWD;
    parentPort.on("message", (msg) => {
      (async () => {
        let { sharedBuffer, id, command, args } = msg;
        let sharedBufferView = new Int32Array(sharedBuffer);
        try {
          switch (command) {
            case "build":
              workerPort.postMessage({ id, resolve: await service.build(args[0]) });
              break;
            case "transform":
              workerPort.postMessage({ id, resolve: await service.transform(args[0], args[1]) });
              break;
            case "formatMessages":
              workerPort.postMessage({ id, resolve: await service.formatMessages(args[0], args[1]) });
              break;
            case "analyzeMetafile":
              workerPort.postMessage({ id, resolve: await service.analyzeMetafile(args[0], args[1]) });
              break;
            default:
              throw new Error(`Invalid command: ${command}`);
          }
        } catch (reject) {
          workerPort.postMessage({ id, reject, properties: extractProperties(reject) });
        }
        Atomics.add(sharedBufferView, 0, 1);
        Atomics.notify(sharedBufferView, 0, Infinity);
      })();
    });
  } catch (reject) {
    parentPort.on("message", (msg) => {
      let { sharedBuffer, id } = msg;
      let sharedBufferView = new Int32Array(sharedBuffer);
      workerPort.postMessage({ id, reject, properties: extractProperties(reject) });
      Atomics.add(sharedBufferView, 0, 1);
      Atomics.notify(sharedBufferView, 0, Infinity);
    });
  }
};
if (isInternalWorkerThread) {
  startSyncServiceWorker();
}
var node_default = node_exports;
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ },

/***/ "./node_modules/esbuild/lib sync recursive"
/*!****************************************!*\
  !*** ./node_modules/esbuild/lib/ sync ***!
  \****************************************/
(module) {

function webpackEmptyContext(req) {
	const e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/esbuild/lib sync recursive";
module.exports = webpackEmptyContext;

/***/ },

/***/ "./node_modules/esbuild/lib sync recursive ^.*\\/.*$"
/*!*************************************************!*\
  !*** ./node_modules/esbuild/lib/ sync ^.*\/.*$ ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const map = {
	"./main": "./node_modules/esbuild/lib/main.js",
	"./main.d": "./node_modules/esbuild/lib/main.d.ts",
	"./main.d.ts": "./node_modules/esbuild/lib/main.d.ts",
	"./main.js": "./node_modules/esbuild/lib/main.js"
};


function webpackContext(req) {
	const id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		const e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/esbuild/lib sync recursive ^.*\\/.*$";

/***/ },

/***/ "./aula18-webpack/mod.ts"
/*!*******************************!*\
  !*** ./aula18-webpack/mod.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
    console.log('O módulo sou eu');
});
__webpack_require__.dn(__WEBPACK_DEFAULT_EXPORT__);


/***/ },

/***/ "./node_modules/tsx/dist/esm/index.mjs?42ed"
/*!*********************************************!*\
  !*** ./node_modules/tsx/dist/esm/index.mjs ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "aa2462a296c6b05f2570.mjs";

/***/ },

/***/ "./node_modules/tsx/dist/loader.mjs?4a13"
/*!******************************************!*\
  !*** ./node_modules/tsx/dist/loader.mjs ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "f0da8658f43dae673b35.mjs";

/***/ },

/***/ "./node_modules/tsx/dist/client-D_mPDF5S.mjs"
/*!***************************************************!*\
  !*** ./node_modules/tsx/dist/client-D_mPDF5S.mjs ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ a),
/* harmony export */   p: () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var node_net__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:net */ "node:net");
/* harmony import */ var _get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-pipe-path-_tAJyU_v.mjs */ "./node_modules/tsx/dist/get-pipe-path-_tAJyU_v.mjs");
var p=Object.defineProperty;var t=(e,n)=>p(e,"name",{value:n,configurable:!0});let o=[];const m=t(()=>new Promise(e=>{const n=(0,_get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_1__.g)(process.ppid),r=node_net__WEBPACK_IMPORTED_MODULE_0__.createConnection(n,()=>{e(t(i=>{const c=Buffer.from(JSON.stringify(i)),f=Buffer.alloc(4);f.writeInt32BE(c.length,0),r.write(Buffer.concat([f,c]))},"sendToParent"))});r.on("error",()=>{e()}),r.unref()}),"connectToServer"),s={send:t(e=>{o.push(e)},"send")},a=m();a.then(e=>{if(e)for(const n of o)e(n);o=[],s.send=e},()=>{o=[],s.send=void 0});


/***/ },

/***/ "./node_modules/tsx/dist/esm/index.mjs?65ac"
/*!*********************************************!*\
  !*** ./node_modules/tsx/dist/esm/index.mjs ***!
  \*********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   globalPreload: () => (/* binding */ n),
/* harmony export */   initialize: () => (/* binding */ c),
/* harmony export */   load: () => (/* binding */ f),
/* harmony export */   resolve: () => (/* binding */ u)
/* harmony export */ });
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:worker_threads */ "node:worker_threads");
/* harmony import */ var _node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node-features-JeyyvQz6.mjs */ "./node_modules/tsx/dist/node-features-JeyyvQz6.mjs");
/* harmony import */ var _register_zZ7SWseA_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../register-zZ7SWseA.mjs */ "./node_modules/tsx/dist/register-zZ7SWseA.mjs");
/* harmony import */ var _get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../get-pipe-path-_tAJyU_v.mjs */ "./node_modules/tsx/dist/get-pipe-path-_tAJyU_v.mjs");
/* harmony import */ var node_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node:module */ "node:module");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var _register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../register-HWZIKnmC.mjs */ "./node_modules/tsx/dist/register-HWZIKnmC.mjs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var esbuild__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! esbuild */ "./node_modules/esbuild/lib/main.js");
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! node:crypto */ "node:crypto");
/* harmony import */ var _index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../index-CQhDiIsg.mjs */ "./node_modules/tsx/dist/index-CQhDiIsg.mjs");
/* harmony import */ var _client_D_mPDF5S_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../client-D_mPDF5S.mjs */ "./node_modules/tsx/dist/client-D_mPDF5S.mjs");
/* harmony import */ var _require_awuW45Q3_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../require-awuW45Q3.mjs */ "./node_modules/tsx/dist/require-awuW45Q3.mjs");
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! node:fs/promises */ "node:fs/promises");
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'module'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _temporary_directory_BDDVQOvU_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../temporary-directory-BDDVQOvU.mjs */ "./node_modules/tsx/dist/temporary-directory-BDDVQOvU.mjs");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! node:os */ "node:os");
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'os'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var node_util__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! node:util */ "node:util");
/* harmony import */ var _index_gbaejti9_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../index-gbaejti9.mjs */ "./node_modules/tsx/dist/index-gbaejti9.mjs");
/* harmony import */ var node_net__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! node:net */ "node:net");
((0,_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_1__.i)(_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_1__.m)&&!node_worker_threads__WEBPACK_IMPORTED_MODULE_0__.isInternalThread||(0,_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_1__.i)(_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_1__.a)&&node_worker_threads__WEBPACK_IMPORTED_MODULE_0__.isMainThread)&&(0,_register_zZ7SWseA_mjs__WEBPACK_IMPORTED_MODULE_2__.r)();const r=(0,_register_zZ7SWseA_mjs__WEBPACK_IMPORTED_MODULE_2__.e)(),c=(0,_register_zZ7SWseA_mjs__WEBPACK_IMPORTED_MODULE_2__.c)(r),n=(0,_register_zZ7SWseA_mjs__WEBPACK_IMPORTED_MODULE_2__.a)(r),f=(0,_register_zZ7SWseA_mjs__WEBPACK_IMPORTED_MODULE_2__.b)(r),u=(0,_register_zZ7SWseA_mjs__WEBPACK_IMPORTED_MODULE_2__.d)(r);


/***/ },

/***/ "./node_modules/tsx/dist/get-pipe-path-_tAJyU_v.mjs"
/*!**********************************************************!*\
  !*** ./node_modules/tsx/dist/get-pipe-path-_tAJyU_v.mjs ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ n),
/* harmony export */   i: () => (/* binding */ i),
/* harmony export */   r: () => (/* binding */ m)
/* harmony export */ });
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'module'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var _temporary_directory_BDDVQOvU_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./temporary-directory-BDDVQOvU.mjs */ "./node_modules/tsx/dist/temporary-directory-BDDVQOvU.mjs");
var o=Object.defineProperty;var t=(e,r)=>o(e,"name",{value:r,configurable:!0});var m=Object(function webpackMissingModule() { const e = new Error("Cannot find module 'module'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("file:///C:/Dev/udemy-web-fullstack/curso-typeScript/Secao19-TS-TiposBasicos/node_modules/tsx/dist/get-pipe-path-_tAJyU_v.mjs");const i=process.platform==="win32",n=t(e=>{const r=node_path__WEBPACK_IMPORTED_MODULE_1__.join(_temporary_directory_BDDVQOvU_mjs__WEBPACK_IMPORTED_MODULE_2__.t,`${e}.pipe`);return i?`\\\\?\\pipe\\${r}`:r},"getPipePath");


/***/ },

/***/ "./node_modules/tsx/dist/index-CQhDiIsg.mjs"
/*!**************************************************!*\
  !*** ./node_modules/tsx/dist/index-CQhDiIsg.mjs ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ Lr),
/* harmony export */   b: () => (/* binding */ ae),
/* harmony export */   c: () => (/* binding */ Or),
/* harmony export */   i: () => (/* binding */ yn),
/* harmony export */   p: () => (/* binding */ Le),
/* harmony export */   r: () => (/* binding */ Xe),
/* harmony export */   t: () => (/* binding */ Ir)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var esbuild__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esbuild */ "./node_modules/esbuild/lib/main.js");
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node:crypto */ "node:crypto");
/* harmony import */ var _node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node-features-JeyyvQz6.mjs */ "./node_modules/tsx/dist/node-features-JeyyvQz6.mjs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! node:os */ "node:os");
/* harmony import */ var _temporary_directory_BDDVQOvU_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./temporary-directory-BDDVQOvU.mjs */ "./node_modules/tsx/dist/temporary-directory-BDDVQOvU.mjs");
var Xt=Object.defineProperty;var l=(s,e)=>Xt(s,"name",{value:e,configurable:!0});const Se=l(s=>node_crypto__WEBPACK_IMPORTED_MODULE_3__.createHash("sha1").update(s).digest("hex"),"sha1");var rn=44,sn=59,Fe="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Pe=new Uint8Array(64),on=new Uint8Array(128);for(let s=0;s<Fe.length;s++){const e=Fe.charCodeAt(s);Pe[s]=e,on[e]=s}function Y(s,e,n){let i=e-n;i=i<0?-i<<1|1:i<<1;do{let o=i&31;i>>>=5,i>0&&(o|=32),s.write(Pe[o])}while(i>0);return e}l(Y,"encodeInteger$1");var We=1024*16,Je=typeof TextDecoder<"u"?new TextDecoder:typeof Buffer<"u"?{decode(s){return Buffer.from(s.buffer,s.byteOffset,s.byteLength).toString()}}:{decode(s){let e="";for(let n=0;n<s.length;n++)e+=String.fromCharCode(s[n]);return e}},an=class{static{l(this,"StringWriter")}constructor(){this.pos=0,this.out="",this.buffer=new Uint8Array(We)}write(s){const{buffer:e}=this;e[this.pos++]=s,this.pos===We&&(this.out+=Je.decode(e),this.pos=0)}flush(){const{buffer:s,out:e,pos:n}=this;return n>0?e+Je.decode(s.subarray(0,n)):e}};function cn(s){const e=new an;let n=0,i=0,o=0,c=0;for(let u=0;u<s.length;u++){const p=s[u];if(u>0&&e.write(sn),p.length===0)continue;let g=0;for(let b=0;b<p.length;b++){const d=p[b];b>0&&e.write(rn),g=Y(e,d[0],g),d.length!==1&&(n=Y(e,d[1],n),i=Y(e,d[2],i),o=Y(e,d[3],o),d.length!==4&&(c=Y(e,d[4],c)))}}return e.flush()}l(cn,"encode$1");class he{static{l(this,"BitSet")}constructor(e){this.bits=e instanceof he?e.bits.slice():[]}add(e){this.bits[e>>5]|=1<<(e&31)}has(e){return!!(this.bits[e>>5]&1<<(e&31))}}class re{static{l(this,"Chunk")}constructor(e,n,i){this.start=e,this.end=n,this.original=i,this.intro="",this.outro="",this.content=i,this.storeName=!1,this.edited=!1,this.previous=null,this.next=null}appendLeft(e){this.outro+=e}appendRight(e){this.intro=this.intro+e}clone(){const e=new re(this.start,this.end,this.original);return e.intro=this.intro,e.outro=this.outro,e.content=this.content,e.storeName=this.storeName,e.edited=this.edited,e}contains(e){return this.start<e&&e<this.end}eachNext(e){let n=this;for(;n;)e(n),n=n.next}eachPrevious(e){let n=this;for(;n;)e(n),n=n.previous}edit(e,n,i){return this.content=e,i||(this.intro="",this.outro=""),this.storeName=n,this.edited=!0,this}prependLeft(e){this.outro=e+this.outro}prependRight(e){this.intro=e+this.intro}reset(){this.intro="",this.outro="",this.edited&&(this.content=this.original,this.storeName=!1,this.edited=!1)}split(e){const n=e-this.start,i=this.original.slice(0,n),o=this.original.slice(n);this.original=i;const c=new re(e,this.end,o);return c.outro=this.outro,this.outro="",this.end=e,this.edited?(c.edit("",!1),this.content=""):this.content=i,c.next=this.next,c.next&&(c.next.previous=c),c.previous=this,this.next=c,c}toString(){return this.intro+this.content+this.outro}trimEnd(e){if(this.outro=this.outro.replace(e,""),this.outro.length)return!0;const n=this.content.replace(e,"");if(n.length)return n!==this.content&&(this.split(this.start+n.length).edit("",void 0,!0),this.edited&&this.edit(n,this.storeName,!0)),!0;if(this.edit("",void 0,!0),this.intro=this.intro.replace(e,""),this.intro.length)return!0}trimStart(e){if(this.intro=this.intro.replace(e,""),this.intro.length)return!0;const n=this.content.replace(e,"");if(n.length){if(n!==this.content){const i=this.split(this.end-n.length);this.edited&&i.edit(n,this.storeName,!0),this.edit("",void 0,!0)}return!0}else if(this.edit("",void 0,!0),this.outro=this.outro.replace(e,""),this.outro.length)return!0}}function un(){return typeof globalThis<"u"&&typeof globalThis.btoa=="function"?s=>globalThis.btoa(unescape(encodeURIComponent(s))):typeof Buffer=="function"?s=>Buffer.from(s,"utf-8").toString("base64"):()=>{throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.")}}l(un,"getBtoa");const hn=un();let fn=class{static{l(this,"SourceMap")}constructor(e){this.version=3,this.file=e.file,this.sources=e.sources,this.sourcesContent=e.sourcesContent,this.names=e.names,this.mappings=cn(e.mappings),typeof e.x_google_ignoreList<"u"&&(this.x_google_ignoreList=e.x_google_ignoreList),typeof e.debugId<"u"&&(this.debugId=e.debugId)}toString(){return JSON.stringify(this)}toUrl(){return"data:application/json;charset=utf-8;base64,"+hn(this.toString())}};function ln(s){const e=s.split(`
`),n=e.filter(c=>/^\t+/.test(c)),i=e.filter(c=>/^ {2,}/.test(c));if(n.length===0&&i.length===0)return null;if(n.length>=i.length)return"	";const o=i.reduce((c,u)=>{const p=/^ +/.exec(u)[0].length;return Math.min(p,c)},1/0);return new Array(o+1).join(" ")}l(ln,"guessIndent");function dn(s,e){const n=s.split(/[/\\]/),i=e.split(/[/\\]/);for(n.pop();n[0]===i[0];)n.shift(),i.shift();if(n.length){let o=n.length;for(;o--;)n[o]=".."}return n.concat(i).join("/")}l(dn,"getRelativePath");const gn=Object.prototype.toString;function bn(s){return gn.call(s)==="[object Object]"}l(bn,"isObject");function Ge(s){const e=s.split(`
`),n=[];for(let i=0,o=0;i<e.length;i++)n.push(o),o+=e[i].length+1;return l(function(o){let c=0,u=n.length;for(;c<u;){const b=c+u>>1;o<n[b]?u=b:c=b+1}const p=c-1,g=o-n[p];return{line:p,column:g}},"locate")}l(Ge,"getLocator");const pn=/\w/;class mn{static{l(this,"Mappings")}constructor(e){this.hires=e,this.generatedCodeLine=0,this.generatedCodeColumn=0,this.raw=[],this.rawSegments=this.raw[this.generatedCodeLine]=[],this.pending=null}addEdit(e,n,i,o){if(n.length){const c=n.length-1;let u=n.indexOf(`
`,0),p=-1;for(;u>=0&&c>u;){const b=[this.generatedCodeColumn,e,i.line,i.column];o>=0&&b.push(o),this.rawSegments.push(b),this.generatedCodeLine+=1,this.raw[this.generatedCodeLine]=this.rawSegments=[],this.generatedCodeColumn=0,p=u,u=n.indexOf(`
`,u+1)}const g=[this.generatedCodeColumn,e,i.line,i.column];o>=0&&g.push(o),this.rawSegments.push(g),this.advance(n.slice(p+1))}else this.pending&&(this.rawSegments.push(this.pending),this.advance(n));this.pending=null}addUneditedChunk(e,n,i,o,c){let u=n.start,p=!0,g=!1;for(;u<n.end;){if(i[u]===`
`)o.line+=1,o.column=0,this.generatedCodeLine+=1,this.raw[this.generatedCodeLine]=this.rawSegments=[],this.generatedCodeColumn=0,p=!0,g=!1;else{if(this.hires||p||c.has(u)){const b=[this.generatedCodeColumn,e,o.line,o.column];this.hires==="boundary"?pn.test(i[u])?g||(this.rawSegments.push(b),g=!0):(this.rawSegments.push(b),g=!1):this.rawSegments.push(b)}o.column+=1,this.generatedCodeColumn+=1,p=!1}u+=1}this.pending=null}advance(e){if(!e)return;const n=e.split(`
`);if(n.length>1){for(let i=0;i<n.length-1;i++)this.generatedCodeLine++,this.raw[this.generatedCodeLine]=this.rawSegments=[];this.generatedCodeColumn=0}this.generatedCodeColumn+=n[n.length-1].length}}const Q=`
`,G={insertLeft:!1,insertRight:!1,storeName:!1};class $e{static{l(this,"MagicString")}constructor(e,n={}){const i=new re(0,e.length,e);Object.defineProperties(this,{original:{writable:!0,value:e},outro:{writable:!0,value:""},intro:{writable:!0,value:""},firstChunk:{writable:!0,value:i},lastChunk:{writable:!0,value:i},lastSearchedChunk:{writable:!0,value:i},byStart:{writable:!0,value:{}},byEnd:{writable:!0,value:{}},filename:{writable:!0,value:n.filename},indentExclusionRanges:{writable:!0,value:n.indentExclusionRanges},sourcemapLocations:{writable:!0,value:new he},storedNames:{writable:!0,value:{}},indentStr:{writable:!0,value:void 0},ignoreList:{writable:!0,value:n.ignoreList},offset:{writable:!0,value:n.offset||0}}),this.byStart[0]=i,this.byEnd[e.length]=i}addSourcemapLocation(e){this.sourcemapLocations.add(e)}append(e){if(typeof e!="string")throw new TypeError("outro content must be a string");return this.outro+=e,this}appendLeft(e,n){if(e=e+this.offset,typeof n!="string")throw new TypeError("inserted content must be a string");this._split(e);const i=this.byEnd[e];return i?i.appendLeft(n):this.intro+=n,this}appendRight(e,n){if(e=e+this.offset,typeof n!="string")throw new TypeError("inserted content must be a string");this._split(e);const i=this.byStart[e];return i?i.appendRight(n):this.outro+=n,this}clone(){const e=new $e(this.original,{filename:this.filename,offset:this.offset});let n=this.firstChunk,i=e.firstChunk=e.lastSearchedChunk=n.clone();for(;n;){e.byStart[i.start]=i,e.byEnd[i.end]=i;const o=n.next,c=o&&o.clone();c&&(i.next=c,c.previous=i,i=c),n=o}return e.lastChunk=i,this.indentExclusionRanges&&(e.indentExclusionRanges=this.indentExclusionRanges.slice()),e.sourcemapLocations=new he(this.sourcemapLocations),e.intro=this.intro,e.outro=this.outro,e}generateDecodedMap(e){e=e||{};const n=0,i=Object.keys(this.storedNames),o=new mn(e.hires),c=Ge(this.original);return this.intro&&o.advance(this.intro),this.firstChunk.eachNext(u=>{const p=c(u.start);u.intro.length&&o.advance(u.intro),u.edited?o.addEdit(n,u.content,p,u.storeName?i.indexOf(u.original):-1):o.addUneditedChunk(n,u,this.original,p,this.sourcemapLocations),u.outro.length&&o.advance(u.outro)}),{file:e.file?e.file.split(/[/\\]/).pop():void 0,sources:[e.source?dn(e.file||"",e.source):e.file||""],sourcesContent:e.includeContent?[this.original]:void 0,names:i,mappings:o.raw,x_google_ignoreList:this.ignoreList?[n]:void 0}}generateMap(e){return new fn(this.generateDecodedMap(e))}_ensureindentStr(){this.indentStr===void 0&&(this.indentStr=ln(this.original))}_getRawIndentString(){return this._ensureindentStr(),this.indentStr}getIndentString(){return this._ensureindentStr(),this.indentStr===null?"	":this.indentStr}indent(e,n){const i=/^[^\r\n]/gm;if(bn(e)&&(n=e,e=void 0),e===void 0&&(this._ensureindentStr(),e=this.indentStr||"	"),e==="")return this;n=n||{};const o={};n.exclude&&(typeof n.exclude[0]=="number"?[n.exclude]:n.exclude).forEach(d=>{for(let r=d[0];r<d[1];r+=1)o[r]=!0});let c=n.indentStart!==!1;const u=l(b=>c?`${e}${b}`:(c=!0,b),"replacer");this.intro=this.intro.replace(i,u);let p=0,g=this.firstChunk;for(;g;){const b=g.end;if(g.edited)o[p]||(g.content=g.content.replace(i,u),g.content.length&&(c=g.content[g.content.length-1]===`
`));else for(p=g.start;p<b;){if(!o[p]){const d=this.original[p];d===`
`?c=!0:d!=="\r"&&c&&(c=!1,p===g.start||(this._splitChunk(g,p),g=g.next),g.prependRight(e))}p+=1}p=g.end,g=g.next}return this.outro=this.outro.replace(i,u),this}insert(){throw new Error("magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)")}insertLeft(e,n){return G.insertLeft||(console.warn("magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"),G.insertLeft=!0),this.appendLeft(e,n)}insertRight(e,n){return G.insertRight||(console.warn("magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"),G.insertRight=!0),this.prependRight(e,n)}move(e,n,i){if(e=e+this.offset,n=n+this.offset,i=i+this.offset,i>=e&&i<=n)throw new Error("Cannot move a selection inside itself");this._split(e),this._split(n),this._split(i);const o=this.byStart[e],c=this.byEnd[n],u=o.previous,p=c.next,g=this.byStart[i];if(!g&&c===this.lastChunk)return this;const b=g?g.previous:this.lastChunk;return u&&(u.next=p),p&&(p.previous=u),b&&(b.next=o),g&&(g.previous=c),o.previous||(this.firstChunk=c.next),c.next||(this.lastChunk=o.previous,this.lastChunk.next=null),o.previous=b,c.next=g||null,b||(this.firstChunk=o),g||(this.lastChunk=c),this}overwrite(e,n,i,o){return o=o||{},this.update(e,n,i,{...o,overwrite:!o.contentOnly})}update(e,n,i,o){if(e=e+this.offset,n=n+this.offset,typeof i!="string")throw new TypeError("replacement content must be a string");if(this.original.length!==0){for(;e<0;)e+=this.original.length;for(;n<0;)n+=this.original.length}if(n>this.original.length)throw new Error("end is out of bounds");if(e===n)throw new Error("Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead");this._split(e),this._split(n),o===!0&&(G.storeName||(console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"),G.storeName=!0),o={storeName:!0});const c=o!==void 0?o.storeName:!1,u=o!==void 0?o.overwrite:!1;if(c){const b=this.original.slice(e,n);Object.defineProperty(this.storedNames,b,{writable:!0,value:!0,enumerable:!0})}const p=this.byStart[e],g=this.byEnd[n];if(p){let b=p;for(;b!==g;){if(b.next!==this.byStart[b.end])throw new Error("Cannot overwrite across a split point");b=b.next,b.edit("",!1)}p.edit(i,c,!u)}else{const b=new re(e,n,"").edit(i,c);g.next=b,b.previous=g}return this}prepend(e){if(typeof e!="string")throw new TypeError("outro content must be a string");return this.intro=e+this.intro,this}prependLeft(e,n){if(e=e+this.offset,typeof n!="string")throw new TypeError("inserted content must be a string");this._split(e);const i=this.byEnd[e];return i?i.prependLeft(n):this.intro=n+this.intro,this}prependRight(e,n){if(e=e+this.offset,typeof n!="string")throw new TypeError("inserted content must be a string");this._split(e);const i=this.byStart[e];return i?i.prependRight(n):this.outro=n+this.outro,this}remove(e,n){if(e=e+this.offset,n=n+this.offset,this.original.length!==0){for(;e<0;)e+=this.original.length;for(;n<0;)n+=this.original.length}if(e===n)return this;if(e<0||n>this.original.length)throw new Error("Character is out of bounds");if(e>n)throw new Error("end must be greater than start");this._split(e),this._split(n);let i=this.byStart[e];for(;i;)i.intro="",i.outro="",i.edit(""),i=n>i.end?this.byStart[i.end]:null;return this}reset(e,n){if(e=e+this.offset,n=n+this.offset,this.original.length!==0){for(;e<0;)e+=this.original.length;for(;n<0;)n+=this.original.length}if(e===n)return this;if(e<0||n>this.original.length)throw new Error("Character is out of bounds");if(e>n)throw new Error("end must be greater than start");this._split(e),this._split(n);let i=this.byStart[e];for(;i;)i.reset(),i=n>i.end?this.byStart[i.end]:null;return this}lastChar(){if(this.outro.length)return this.outro[this.outro.length-1];let e=this.lastChunk;do{if(e.outro.length)return e.outro[e.outro.length-1];if(e.content.length)return e.content[e.content.length-1];if(e.intro.length)return e.intro[e.intro.length-1]}while(e=e.previous);return this.intro.length?this.intro[this.intro.length-1]:""}lastLine(){let e=this.outro.lastIndexOf(Q);if(e!==-1)return this.outro.substr(e+1);let n=this.outro,i=this.lastChunk;do{if(i.outro.length>0){if(e=i.outro.lastIndexOf(Q),e!==-1)return i.outro.substr(e+1)+n;n=i.outro+n}if(i.content.length>0){if(e=i.content.lastIndexOf(Q),e!==-1)return i.content.substr(e+1)+n;n=i.content+n}if(i.intro.length>0){if(e=i.intro.lastIndexOf(Q),e!==-1)return i.intro.substr(e+1)+n;n=i.intro+n}}while(i=i.previous);return e=this.intro.lastIndexOf(Q),e!==-1?this.intro.substr(e+1)+n:this.intro+n}slice(e=0,n=this.original.length-this.offset){if(e=e+this.offset,n=n+this.offset,this.original.length!==0){for(;e<0;)e+=this.original.length;for(;n<0;)n+=this.original.length}let i="",o=this.firstChunk;for(;o&&(o.start>e||o.end<=e);){if(o.start<n&&o.end>=n)return i;o=o.next}if(o&&o.edited&&o.start!==e)throw new Error(`Cannot use replaced character ${e} as slice start anchor.`);const c=o;for(;o;){o.intro&&(c!==o||o.start===e)&&(i+=o.intro);const u=o.start<n&&o.end>=n;if(u&&o.edited&&o.end!==n)throw new Error(`Cannot use replaced character ${n} as slice end anchor.`);const p=c===o?e-o.start:0,g=u?o.content.length+n-o.end:o.content.length;if(i+=o.content.slice(p,g),o.outro&&(!u||o.end===n)&&(i+=o.outro),u)break;o=o.next}return i}snip(e,n){const i=this.clone();return i.remove(0,e),i.remove(n,i.original.length),i}_split(e){if(this.byStart[e]||this.byEnd[e])return;let n=this.lastSearchedChunk,i=n;const o=e>n.end;for(;n;){if(n.contains(e))return this._splitChunk(n,e);if(n=o?this.byStart[n.end]:this.byEnd[n.start],n===i)return;i=n}}_splitChunk(e,n){if(e.edited&&e.content.length){const o=Ge(this.original)(n);throw new Error(`Cannot split a chunk that has already been edited (${o.line}:${o.column} \u2013 "${e.original}")`)}const i=e.split(n);return this.byEnd[n]=e,this.byStart[n]=i,this.byEnd[i.end]=i,e===this.lastChunk&&(this.lastChunk=i),this.lastSearchedChunk=e,!0}toString(){let e=this.intro,n=this.firstChunk;for(;n;)e+=n.toString(),n=n.next;return e+this.outro}isEmpty(){let e=this.firstChunk;do if(e.intro.length&&e.intro.trim()||e.content.length&&e.content.trim()||e.outro.length&&e.outro.trim())return!1;while(e=e.next);return!0}length(){let e=this.firstChunk,n=0;do n+=e.intro.length+e.content.length+e.outro.length;while(e=e.next);return n}trimLines(){return this.trim("[\\r\\n]")}trim(e){return this.trimStart(e).trimEnd(e)}trimEndAborted(e){const n=new RegExp((e||"\\s")+"+$");if(this.outro=this.outro.replace(n,""),this.outro.length)return!0;let i=this.lastChunk;do{const o=i.end,c=i.trimEnd(n);if(i.end!==o&&(this.lastChunk===i&&(this.lastChunk=i.next),this.byEnd[i.end]=i,this.byStart[i.next.start]=i.next,this.byEnd[i.next.end]=i.next),c)return!0;i=i.previous}while(i);return!1}trimEnd(e){return this.trimEndAborted(e),this}trimStartAborted(e){const n=new RegExp("^"+(e||"\\s")+"+");if(this.intro=this.intro.replace(n,""),this.intro.length)return!0;let i=this.firstChunk;do{const o=i.end,c=i.trimStart(n);if(i.end!==o&&(i===this.lastChunk&&(this.lastChunk=i.next),this.byEnd[i.end]=i,this.byStart[i.next.start]=i.next,this.byEnd[i.next.end]=i.next),c)return!0;i=i.next}while(i);return!1}trimStart(e){return this.trimStartAborted(e),this}hasChanged(){return this.original!==this.toString()}_replaceRegexp(e,n){function i(c,u){return typeof n=="string"?n.replace(/\$(\$|&|\d+)/g,(p,g)=>g==="$"?"$":g==="&"?c[0]:+g<c.length?c[+g]:`$${g}`):n(...c,c.index,u,c.groups)}l(i,"getReplacement");function o(c,u){let p;const g=[];for(;p=c.exec(u);)g.push(p);return g}if(l(o,"matchAll"),e.global)o(e,this.original).forEach(u=>{if(u.index!=null){const p=i(u,this.original);p!==u[0]&&this.overwrite(u.index,u.index+u[0].length,p)}});else{const c=this.original.match(e);if(c&&c.index!=null){const u=i(c,this.original);u!==c[0]&&this.overwrite(c.index,c.index+c[0].length,u)}}return this}_replaceString(e,n){const{original:i}=this,o=i.indexOf(e);return o!==-1&&this.overwrite(o,o+e.length,n),this}replace(e,n){return typeof e=="string"?this._replaceString(e,n):this._replaceRegexp(e,n)}_replaceAllString(e,n){const{original:i}=this,o=e.length;for(let c=i.indexOf(e);c!==-1;c=i.indexOf(e,c+o))i.slice(c,c+o)!==n&&this.overwrite(c,c+o,n);return this}replaceAll(e,n){if(typeof e=="string")return this._replaceAllString(e,n);if(!e.global)throw new TypeError("MagicString.prototype.replaceAll called with a non-global RegExp argument");return this._replaceRegexp(e,n)}}let x,oe,ve,Z=2<<19;const qe=new Uint8Array(new Uint16Array([1]).buffer)[0]===1?function(s,e){const n=s.length;let i=0;for(;i<n;)e[i]=s.charCodeAt(i++)}:function(s,e){const n=s.length;let i=0;for(;i<n;){const o=s.charCodeAt(i);e[i++]=(255&o)<<8|o>>>8}},wn="xportmportlassforetaourceromsyncunctionssertvoyiedelecontininstantybreareturdebuggeawaithrwhileifcatcfinallels";let _,ze,C;function kn(s,e="@"){_=s,ze=e;const n=2*_.length+(2<<18);if(n>Z||!x){for(;n>Z;)Z*=2;oe=new ArrayBuffer(Z),qe(wn,new Uint16Array(oe,16,110)),x=function(u,p,g){var b=new u.Int8Array(g),d=new u.Int16Array(g),r=new u.Int32Array(g),O=new u.Uint8Array(g),I=new u.Uint16Array(g),E=1040;function R(){var t=0,a=0,f=0,h=0,m=0,w=0,y=0;y=E,E=E+10240|0,b[804]=1,b[803]=0,d[399]=0,d[400]=0,r[69]=r[2],b[805]=0,r[68]=0,b[802]=0,r[70]=y+2048,r[71]=y,b[806]=0,t=(r[3]|0)+-2|0,r[72]=t,a=t+(r[66]<<1)|0,r[73]=a;e:for(;;){if(f=t+2|0,r[72]=f,t>>>0>=a>>>0){h=18;break}t:do switch(d[f>>1]|0){case 9:case 10:case 11:case 12:case 13:case 32:break;case 101:{if(!(d[400]|0)&&X(f)|0&&!(A(t+4|0,16,10)|0)&&($(),(b[804]|0)==0)){h=9;break e}else h=17;break}case 105:{X(f)|0&&!(A(t+4|0,26,10)|0)&&F(),h=17;break}case 59:{h=17;break}case 47:switch(d[t+4>>1]|0){case 47:{be();break t}case 42:{de(1);break t}default:{h=16;break e}}default:{h=16;break e}}while(!1);(h|0)==17&&(h=0,r[69]=r[72]),t=r[72]|0,a=r[73]|0}(h|0)==9?(t=r[72]|0,r[69]=t,h=19):(h|0)==16?(b[804]=0,r[72]=t,h=19):(h|0)==18&&(b[802]|0?t=0:(t=f,h=19));do if((h|0)==19){e:for(;;){if(a=t+2|0,r[72]=a,t>>>0>=(r[73]|0)>>>0){h=92;break}t:do switch(d[a>>1]|0){case 9:case 10:case 11:case 12:case 13:case 32:break;case 101:{!(d[400]|0)&&X(a)|0&&!(A(t+4|0,16,10)|0)&&$(),h=91;break}case 105:{X(a)|0&&!(A(t+4|0,26,10)|0)&&F(),h=91;break}case 99:{X(a)|0&&!(A(t+4|0,36,8)|0)&&W(d[t+12>>1]|0)|0&&(b[806]=1),h=91;break}case 40:{f=r[70]|0,t=d[400]|0,h=t&65535,r[f+(h<<3)>>2]=1,a=r[69]|0,d[400]=t+1<<16>>16,r[f+(h<<3)+4>>2]=a,h=91;break}case 41:{if(a=d[400]|0,!(a<<16>>16)){h=36;break e}f=a+-1<<16>>16,d[400]=f,h=d[399]|0,a=h&65535,h<<16>>16&&(r[(r[70]|0)+((f&65535)<<3)>>2]|0)==5&&(a=r[(r[71]|0)+(a+-1<<2)>>2]|0,f=a+4|0,r[f>>2]|0||(r[f>>2]=(r[69]|0)+2),r[a+12>>2]=t+4,d[399]=h+-1<<16>>16),h=91;break}case 123:{h=r[69]|0,f=r[63]|0,t=h;do if((d[h>>1]|0)==41&(f|0)!=0&&(r[f+4>>2]|0)==(h|0))if(a=r[64]|0,r[63]=a,a){r[a+32>>2]=0;break}else{r[59]=0;break}while(!1);f=r[70]|0,a=d[400]|0,h=a&65535,r[f+(h<<3)>>2]=b[806]|0?6:2,d[400]=a+1<<16>>16,r[f+(h<<3)+4>>2]=t,b[806]=0,h=91;break}case 125:{if(t=d[400]|0,!(t<<16>>16)){h=49;break e}f=r[70]|0,h=t+-1<<16>>16,d[400]=h,(r[f+((h&65535)<<3)>>2]|0)==4&&De(),h=91;break}case 39:{N(39),h=91;break}case 34:{N(34),h=91;break}case 47:switch(d[t+4>>1]|0){case 47:{be();break t}case 42:{de(1);break t}default:{t=r[69]|0,a=d[t>>1]|0;n:do if(!(Et(a)|0))a<<16>>16==41?(f=d[400]|0,Ot(r[(r[70]|0)+((f&65535)<<3)+4>>2]|0)|0||(h=65)):h=64;else switch(a<<16>>16){case 46:if(((d[t+-2>>1]|0)+-48&65535)<10){h=64;break n}else break n;case 43:if((d[t+-2>>1]|0)==43){h=64;break n}else break n;case 45:if((d[t+-2>>1]|0)==45){h=64;break n}else break n;default:break n}while(!1);(h|0)==64&&(f=d[400]|0,h=65);n:do if((h|0)==65){if(h=0,f<<16>>16&&(m=r[70]|0,w=(f&65535)+-1|0,a<<16>>16==102?(r[m+(w<<3)>>2]|0)==1:0)){if((d[t+-2>>1]|0)==111&&L(r[m+(w<<3)+4>>2]|0,44,3)|0)break}else h=69;if((h|0)==69&&a<<16>>16==125&&(h=r[70]|0,f=f&65535,xt(r[h+(f<<3)+4>>2]|0)|0||(r[h+(f<<3)>>2]|0)==6))break;if(!(St(t)|0)){switch(a<<16>>16){case 0:break n;case 47:{if(b[805]|0)break n;break}default:}if(h=r[65]|0,h|0&&t>>>0>=(r[h>>2]|0)>>>0&&t>>>0<=(r[h+4>>2]|0)>>>0){le(),b[805]=0,h=91;break t}f=r[3]|0;do{if(t>>>0<=f>>>0)break;t=t+-2|0,r[69]=t,a=d[t>>1]|0}while(!(ge(a)|0));if(se(a)|0){do{if(t>>>0<=f>>>0)break;t=t+-2|0,r[69]=t}while(se(d[t>>1]|0)|0);if(Lt(t)|0){le(),b[805]=0,h=91;break t}}b[805]=1,h=91;break t}}while(!1);le(),b[805]=0,h=91;break t}}case 96:{f=r[70]|0,a=d[400]|0,h=a&65535,r[f+(h<<3)+4>>2]=r[69],d[400]=a+1<<16>>16,r[f+(h<<3)>>2]=3,De(),h=91;break}default:h=91}while(!1);(h|0)==91&&(h=0,r[69]=r[72]),t=r[72]|0}if((h|0)==36){M(),t=0;break}else if((h|0)==49){M(),t=0;break}else if((h|0)==92){t=b[802]|0?0:(d[399]|d[400])<<16>>16==0;break}}while(!1);return E=y,t|0}l(R,"b");function $(){var t=0,a=0,f=0,h=0,m=0,w=0,y=0,T=0,me=0,we=0,ke=0,Ce=0,S=0,v=0;T=r[72]|0,me=r[65]|0,v=T+12|0,r[72]=v,f=k(1)|0,t=r[72]|0,(t|0)==(v|0)&&!(ie(f)|0)||(S=3);e:do if((S|0)==3){t:do switch(f<<16>>16){case 123:{for(r[72]=t+2,t=k(1)|0,a=r[72]|0;;){if(K(t)|0?(N(t),t=(r[72]|0)+2|0,r[72]=t):(j(t)|0,t=r[72]|0),k(1)|0,t=je(a,t)|0,t<<16>>16==44&&(r[72]=(r[72]|0)+2,t=k(1)|0),t<<16>>16==125){S=15;break}if(v=a,a=r[72]|0,(a|0)==(v|0)){S=12;break}if(a>>>0>(r[73]|0)>>>0){S=14;break}}if((S|0)==12){M();break e}else if((S|0)==14){M();break e}else if((S|0)==15){b[803]=1,r[72]=(r[72]|0)+2;break t}break}case 42:{r[72]=t+2,k(1)|0,v=r[72]|0,je(v,v)|0;break}default:{switch(b[804]=0,f<<16>>16){case 100:{switch(T=t+14|0,r[72]=T,(k(1)|0)<<16>>16){case 97:{a=r[72]|0,!(A(a+2|0,72,8)|0)&&(m=a+10|0,se(d[m>>1]|0)|0)&&(r[72]=m,k(0)|0,S=22);break}case 102:{S=22;break}case 99:{a=r[72]|0,!(A(a+2|0,36,8)|0)&&(h=a+10|0,v=d[h>>1]|0,W(v)|0|v<<16>>16==123)&&(r[72]=h,w=k(1)|0,w<<16>>16!=123)&&(Ce=w,S=31);break}default:}n:do if((S|0)==22&&(y=r[72]|0,(A(y+2|0,80,14)|0)==0)){if(f=y+16|0,a=d[f>>1]|0,!(W(a)|0))switch(a<<16>>16){case 40:case 42:break;default:break n}r[72]=f,a=k(1)|0,a<<16>>16==42&&(r[72]=(r[72]|0)+2,a=k(1)|0),a<<16>>16!=40&&(Ce=a,S=31)}while(!1);if((S|0)==31&&(we=r[72]|0,j(Ce)|0,ke=r[72]|0,ke>>>0>we>>>0)){P(t,T,we,ke),r[72]=(r[72]|0)+-2;break e}P(t,T,0,0),r[72]=t+12;break e}case 97:{r[72]=t+10,k(0)|0,t=r[72]|0,S=35;break}case 102:{S=35;break}case 99:{if(!(A(t+2|0,36,8)|0)&&(a=t+10|0,ge(d[a>>1]|0)|0)){r[72]=a,v=k(1)|0,S=r[72]|0,j(v)|0,v=r[72]|0,P(S,v,S,v),r[72]=(r[72]|0)+-2;break e}t=t+4|0,r[72]=t;break}case 108:case 118:break;default:break e}if((S|0)==35){r[72]=t+16,t=k(1)|0,t<<16>>16==42&&(r[72]=(r[72]|0)+2,t=k(1)|0),S=r[72]|0,j(t)|0,v=r[72]|0,P(S,v,S,v),r[72]=(r[72]|0)+-2;break e}r[72]=t+6,b[804]=0,f=k(1)|0,t=r[72]|0,f=(j(f)|0|32)<<16>>16==123,h=r[72]|0,f&&(r[72]=h+2,v=k(1)|0,t=r[72]|0,j(v)|0);n:for(;a=r[72]|0,(a|0)!=(t|0);){if(P(t,a,t,a),a=k(1)|0,f)switch(a<<16>>16){case 93:case 125:break e;default:}if(t=r[72]|0,a<<16>>16!=44){S=51;break}switch(r[72]=t+2,a=k(1)|0,t=r[72]|0,a<<16>>16){case 91:case 123:{S=51;break n}default:}j(a)|0}if((S|0)==51&&(r[72]=t+-2),!f)break e;r[72]=h+-2;break e}}while(!1);if(v=(k(1)|0)<<16>>16==102,t=r[72]|0,v&&!(A(t+2|0,66,6)|0))for(r[72]=t+8,z(T,k(1)|0,0),t=me|0?me+16|0:240;;){if(t=r[t>>2]|0,!t)break e;r[t+12>>2]=0,r[t+8>>2]=0,t=t+16|0}r[72]=t+-2}while(!1)}l($,"k");function F(){var t=0,a=0,f=0,h=0,m=0,w=0,y=0;m=r[72]|0,f=m+12|0,r[72]=f,h=k(1)|0,a=r[72]|0;e:do if(h<<16>>16!=46)h<<16>>16==115&a>>>0>f>>>0?!(A(a+2|0,56,10)|0)&&(t=a+12|0,W(d[t>>1]|0)|0)?w=14:(a=6,f=0,w=46):(t=h,f=0,w=15);else switch(r[72]=a+2,(k(1)|0)<<16>>16){case 109:{if(t=r[72]|0,A(t+2|0,50,6)|0||(a=r[69]|0,!(pe(a)|0)&&(d[a>>1]|0)==46))break e;fe(m,m,t+8|0,2);break e}case 115:{if(t=r[72]|0,A(t+2|0,56,10)|0||(a=r[69]|0,!(pe(a)|0)&&(d[a>>1]|0)==46))break e;t=t+12|0,w=14;break e}default:break e}while(!1);(w|0)==14&&(r[72]=t,t=k(1)|0,f=1,w=15);e:do if((w|0)==15)switch(t<<16>>16){case 40:{if(a=r[70]|0,y=d[400]|0,h=y&65535,r[a+(h<<3)>>2]=5,t=r[72]|0,d[400]=y+1<<16>>16,r[a+(h<<3)+4>>2]=t,(d[r[69]>>1]|0)==46)break e;switch(r[72]=t+2,a=k(1)|0,fe(m,r[72]|0,0,t),f?(t=r[63]|0,r[t+28>>2]=5):t=r[63]|0,m=r[71]|0,y=d[399]|0,d[399]=y+1<<16>>16,r[m+((y&65535)<<2)>>2]=t,a<<16>>16){case 39:{N(39);break}case 34:{N(34);break}default:{r[72]=(r[72]|0)+-2;break e}}switch(t=(r[72]|0)+2|0,r[72]=t,(k(1)|0)<<16>>16){case 44:{r[72]=(r[72]|0)+2,k(1)|0,m=r[63]|0,r[m+4>>2]=t,y=r[72]|0,r[m+16>>2]=y,b[m+24>>0]=1,r[72]=y+-2;break e}case 41:{d[400]=(d[400]|0)+-1<<16>>16,y=r[63]|0,r[y+4>>2]=t,r[y+12>>2]=(r[72]|0)+2,b[y+24>>0]=1,d[399]=(d[399]|0)+-1<<16>>16;break e}default:{r[72]=(r[72]|0)+-2;break e}}}case 123:{if(f){a=12,f=1,w=46;break e}if(t=r[72]|0,d[400]|0){r[72]=t+-2;break e}for(;!(t>>>0>=(r[73]|0)>>>0);){if(t=k(1)|0,K(t)|0)N(t);else if(t<<16>>16==125){w=36;break}t=(r[72]|0)+2|0,r[72]=t}if((w|0)==36&&(r[72]=(r[72]|0)+2),y=(k(1)|0)<<16>>16==102,t=r[72]|0,y&&A(t+2|0,66,6)|0){M();break e}if(r[72]=t+8,t=k(1)|0,K(t)|0){z(m,t,0);break e}else{M();break e}}default:{if(f){a=12,f=1,w=46;break e}switch(t<<16>>16){case 42:case 39:case 34:{f=0,w=48;break e}default:{a=6,f=0,w=46;break e}}}}while(!1);(w|0)==46&&(t=r[72]|0,(t|0)==(m+(a<<1)|0)?r[72]=t+-2:w=48);do if((w|0)==48){if(d[400]|0){r[72]=(r[72]|0)+-2;break}for(t=r[73]|0,a=r[72]|0;;){if(a>>>0>=t>>>0){w=55;break}if(h=d[a>>1]|0,K(h)|0){w=53;break}y=a+2|0,r[72]=y,a=y}if((w|0)==53){z(m,h,f);break}else if((w|0)==55){M();break}}while(!1)}l(F,"l");function z(t,a,f){t=t|0,a=a|0,f=f|0;var h=0,m=0;switch(h=(r[72]|0)+2|0,a<<16>>16){case 39:{N(39),m=5;break}case 34:{N(34),m=5;break}default:M()}do if((m|0)==5){if(fe(t,h,r[72]|0,1),f&&(r[(r[63]|0)+28>>2]=4),r[72]=(r[72]|0)+2,a=k(0)|0,f=a<<16>>16==97,f?(h=r[72]|0,A(h+2|0,94,10)|0&&(m=13)):(h=r[72]|0,a<<16>>16==119&&(d[h+2>>1]|0)==105&&(d[h+4>>1]|0)==116&&(d[h+6>>1]|0)==104||(m=13)),(m|0)==13){r[72]=h+-2;break}if(r[72]=h+((f?6:4)<<1),(k(1)|0)<<16>>16!=123){r[72]=h;break}f=r[72]|0,a=f;e:for(;;){switch(r[72]=a+2,a=k(1)|0,a<<16>>16){case 39:{N(39),r[72]=(r[72]|0)+2,a=k(1)|0;break}case 34:{N(34),r[72]=(r[72]|0)+2,a=k(1)|0;break}default:a=j(a)|0}if(a<<16>>16!=58){m=22;break}switch(r[72]=(r[72]|0)+2,(k(1)|0)<<16>>16){case 39:{N(39);break}case 34:{N(34);break}default:{m=26;break e}}switch(r[72]=(r[72]|0)+2,(k(1)|0)<<16>>16){case 125:{m=31;break e}case 44:break;default:{m=30;break e}}if(r[72]=(r[72]|0)+2,(k(1)|0)<<16>>16==125){m=31;break}a=r[72]|0}if((m|0)==22){r[72]=h;break}else if((m|0)==26){r[72]=h;break}else if((m|0)==30){r[72]=h;break}else if((m|0)==31){m=r[63]|0,r[m+16>>2]=f,r[m+12>>2]=(r[72]|0)+2;break}}while(!1)}l(z,"u");function St(t){t=t|0;e:do switch(d[t>>1]|0){case 100:switch(d[t+-2>>1]|0){case 105:{t=L(t+-4|0,104,2)|0;break e}case 108:{t=L(t+-4|0,108,3)|0;break e}default:{t=0;break e}}case 101:switch(d[t+-2>>1]|0){case 115:switch(d[t+-4>>1]|0){case 108:{t=H(t+-6|0,101)|0;break e}case 97:{t=H(t+-6|0,99)|0;break e}default:{t=0;break e}}case 116:{t=L(t+-4|0,114,4)|0;break e}case 117:{t=L(t+-4|0,122,6)|0;break e}default:{t=0;break e}}case 102:{if((d[t+-2>>1]|0)==111&&(d[t+-4>>1]|0)==101)switch(d[t+-6>>1]|0){case 99:{t=L(t+-8|0,134,6)|0;break e}case 112:{t=L(t+-8|0,146,2)|0;break e}default:{t=0;break e}}else t=0;break}case 107:{t=L(t+-2|0,150,4)|0;break}case 110:{t=t+-2|0,H(t,105)|0?t=1:t=L(t,158,5)|0;break}case 111:{t=H(t+-2|0,100)|0;break}case 114:{t=L(t+-2|0,168,7)|0;break}case 116:{t=L(t+-2|0,182,4)|0;break}case 119:switch(d[t+-2>>1]|0){case 101:{t=H(t+-4|0,110)|0;break e}case 111:{t=L(t+-4|0,190,3)|0;break e}default:{t=0;break e}}default:t=0}while(!1);return t|0}l(St,"o");function De(){var t=0,a=0,f=0,h=0;a=r[73]|0,f=r[72]|0;e:for(;;){if(t=f+2|0,f>>>0>=a>>>0){a=10;break}switch(d[t>>1]|0){case 96:{a=7;break e}case 36:{if((d[f+4>>1]|0)==123){a=6;break e}break}case 92:{t=f+4|0;break}default:}f=t}(a|0)==6?(t=f+4|0,r[72]=t,a=r[70]|0,h=d[400]|0,f=h&65535,r[a+(f<<3)>>2]=4,d[400]=h+1<<16>>16,r[a+(f<<3)+4>>2]=t):(a|0)==7?(r[72]=t,f=r[70]|0,h=(d[400]|0)+-1<<16>>16,d[400]=h,(r[f+((h&65535)<<3)>>2]|0)!=3&&M()):(a|0)==10&&(r[72]=t,M())}l(De,"h");function k(t){t=t|0;var a=0,f=0,h=0;f=r[72]|0;e:do{a=d[f>>1]|0;t:do if(a<<16>>16!=47)if(t){if(W(a)|0)break;break e}else{if(se(a)|0)break;break e}else switch(d[f+2>>1]|0){case 47:{be();break t}case 42:{de(t);break t}default:{a=47;break e}}while(!1);h=r[72]|0,f=h+2|0,r[72]=f}while(h>>>0<(r[73]|0)>>>0);return a|0}l(k,"w");function fe(t,a,f,h){t=t|0,a=a|0,f=f|0,h=h|0;var m=0,w=0;w=r[67]|0,r[67]=w+36,m=r[63]|0,r[(m|0?m+32|0:236)>>2]=w,r[64]=m,r[63]=w,r[w+8>>2]=t,(h|0)==2?(t=3,m=f):(m=(h|0)==1,t=m?1:2,m=m?f+2|0:0),r[w+12>>2]=m,r[w+28>>2]=t,r[w>>2]=a,r[w+4>>2]=f,r[w+16>>2]=0,r[w+20>>2]=h,a=(h|0)==1,b[w+24>>0]=a&1,r[w+32>>2]=0,a|(h|0)==2&&(b[803]=1)}l(fe,"d");function N(t){t=t|0;var a=0,f=0,h=0,m=0;for(m=r[73]|0,a=r[72]|0;;){if(h=a+2|0,a>>>0>=m>>>0){a=9;break}if(f=d[h>>1]|0,f<<16>>16==t<<16>>16){a=10;break}if(f<<16>>16==92)f=a+4|0,(d[f>>1]|0)==13?(a=a+6|0,a=(d[a>>1]|0)==10?a:f):a=f;else if(Te(f)|0){a=9;break}else a=h}(a|0)==9?(r[72]=h,M()):(a|0)==10&&(r[72]=h)}l(N,"v");function je(t,a){t=t|0,a=a|0;var f=0,h=0,m=0,w=0;return f=r[72]|0,h=d[f>>1]|0,w=(t|0)==(a|0),m=w?0:t,w=w?0:a,h<<16>>16==97&&(r[72]=f+4,f=k(1)|0,t=r[72]|0,K(f)|0?(N(f),a=(r[72]|0)+2|0,r[72]=a):(j(f)|0,a=r[72]|0),h=k(1)|0,f=r[72]|0),(f|0)!=(t|0)&&P(t,a,m,w),h|0}l(je,"A");function vt(){var t=0,a=0,f=0;f=r[73]|0,a=r[72]|0;e:for(;;){if(t=a+2|0,a>>>0>=f>>>0){a=6;break}switch(d[t>>1]|0){case 13:case 10:{a=6;break e}case 93:{a=7;break e}case 92:{t=a+4|0;break}default:}a=t}return(a|0)==6?(r[72]=t,M(),t=0):(a|0)==7&&(r[72]=t,t=93),t|0}l(vt,"C");function le(){var t=0,a=0,f=0;e:for(;;){if(t=r[72]|0,a=t+2|0,r[72]=a,t>>>0>=(r[73]|0)>>>0){f=7;break}switch(d[a>>1]|0){case 13:case 10:{f=7;break e}case 47:break e;case 91:{vt()|0;break}case 92:{r[72]=t+4;break}default:}}(f|0)==7&&M()}l(le,"g");function xt(t){switch(t=t|0,d[t>>1]|0){case 62:{t=(d[t+-2>>1]|0)==61;break}case 41:case 59:{t=1;break}case 104:{t=L(t+-2|0,210,4)|0;break}case 121:{t=L(t+-2|0,218,6)|0;break}case 101:{t=L(t+-2|0,230,3)|0;break}default:t=0}return t|0}l(xt,"p");function de(t){t=t|0;var a=0,f=0,h=0,m=0,w=0;for(m=(r[72]|0)+2|0,r[72]=m,f=r[73]|0;a=m+2|0,!(m>>>0>=f>>>0||(h=d[a>>1]|0,!t&&Te(h)|0));){if(h<<16>>16==42&&(d[m+4>>1]|0)==47){w=8;break}m=a}(w|0)==8&&(r[72]=a,a=m+4|0),r[72]=a}l(de,"y");function A(t,a,f){t=t|0,a=a|0,f=f|0;var h=0,m=0;e:do if(!f)t=0;else{for(;h=b[t>>0]|0,m=b[a>>0]|0,h<<24>>24==m<<24>>24;)if(f=f+-1|0,f)t=t+1|0,a=a+1|0;else{t=0;break e}t=(h&255)-(m&255)|0}while(!1);return t|0}l(A,"m");function ie(t){t=t|0;e:do switch(t<<16>>16){case 38:case 37:case 33:{t=1;break}default:if((t&-8)<<16>>16==40|(t+-58&65535)<6)t=1;else{switch(t<<16>>16){case 91:case 93:case 94:{t=1;break e}default:}t=(t+-123&65535)<4}}while(!1);return t|0}l(ie,"I");function Et(t){t=t|0;e:do switch(t<<16>>16){case 38:case 37:case 33:break;default:if(!((t+-58&65535)<6|(t+-40&65535)<7&t<<16>>16!=41)){switch(t<<16>>16){case 91:case 94:break e;default:}return t<<16>>16!=125&(t+-123&65535)<4|0}}while(!1);return 1}l(Et,"U");function Ue(t){t=t|0;var a=0;a=d[t>>1]|0;e:do if((a+-9&65535)>=5){switch(a<<16>>16){case 160:case 32:{a=1;break e}default:}if(ie(a)|0)return a<<16>>16!=46|(pe(t)|0)|0;a=0}else a=1;while(!1);return a|0}l(Ue,"x");function _t(t){t=t|0;var a=0,f=0,h=0,m=0;return f=E,E=E+16|0,h=f,r[h>>2]=0,r[66]=t,a=r[3]|0,m=a+(t<<1)|0,t=m+2|0,d[m>>1]=0,r[h>>2]=t,r[67]=t,r[59]=0,r[63]=0,r[61]=0,r[60]=0,r[65]=0,r[62]=0,E=f,a|0}l(_t,"S");function P(t,a,f,h){t=t|0,a=a|0,f=f|0,h=h|0;var m=0,w=0;m=r[67]|0,r[67]=m+20,w=r[65]|0,r[(w|0?w+16|0:240)>>2]=m,r[65]=m,r[m>>2]=t,r[m+4>>2]=a,r[m+8>>2]=f,r[m+12>>2]=h,r[m+16>>2]=0,b[803]=1}l(P,"O");function L(t,a,f){t=t|0,a=a|0,f=f|0;var h=0,m=0;return h=t+(0-f<<1)|0,m=h+2|0,t=r[3]|0,m>>>0>=t>>>0&&!(A(m,a,f<<1)|0)?(m|0)==(t|0)?t=1:t=Ue(h)|0:t=0,t|0}l(L,"$");function Lt(t){switch(t=t|0,d[t>>1]|0){case 107:{t=L(t+-2|0,150,4)|0;break}case 101:{(d[t+-2>>1]|0)==117?t=L(t+-4|0,122,6)|0:t=0;break}default:t=0}return t|0}l(Lt,"j");function H(t,a){t=t|0,a=a|0;var f=0;return f=r[3]|0,f>>>0<=t>>>0&&(d[t>>1]|0)==a<<16>>16?(f|0)==(t|0)?f=1:f=ge(d[t+-2>>1]|0)|0:f=0,f|0}l(H,"B");function ge(t){t=t|0;e:do if((t+-9&65535)<5)t=1;else{switch(t<<16>>16){case 32:case 160:{t=1;break e}default:}t=t<<16>>16!=46&(ie(t)|0)}while(!1);return t|0}l(ge,"E");function be(){var t=0,a=0,f=0;t=r[73]|0,f=r[72]|0;e:for(;a=f+2|0,!(f>>>0>=t>>>0);)switch(d[a>>1]|0){case 13:case 10:break e;default:f=a}r[72]=a}l(be,"P");function j(t){for(t=t|0;!(W(t)|0||ie(t)|0);)if(t=(r[72]|0)+2|0,r[72]=t,t=d[t>>1]|0,!(t<<16>>16)){t=0;break}return t|0}l(j,"q");function It(){var t=0;switch(t=r[(r[61]|0)+20>>2]|0,t|0){case 1:{t=-1;break}case 2:{t=-2;break}default:t=t-(r[3]|0)>>1}return t|0}l(It,"z");function Ot(t){return t=t|0,!(L(t,196,5)|0)&&!(L(t,44,3)|0)?t=L(t,206,2)|0:t=1,t|0}l(Ot,"D");function se(t){switch(t=t|0,t<<16>>16){case 160:case 32:case 12:case 11:case 9:{t=1;break}default:t=0}return t|0}l(se,"F");function pe(t){return t=t|0,(d[t>>1]|0)==46&&(d[t+-2>>1]|0)==46?t=(d[t+-4>>1]|0)==46:t=0,t|0}l(pe,"G");function X(t){return t=t|0,(r[3]|0)==(t|0)?t=1:t=Ue(t+-2|0)|0,t|0}l(X,"H");function At(){var t=0;return t=r[(r[62]|0)+12>>2]|0,t?t=t-(r[3]|0)>>1:t=-1,t|0}l(At,"J");function Rt(){var t=0;return t=r[(r[61]|0)+12>>2]|0,t?t=t-(r[3]|0)>>1:t=-1,t|0}l(Rt,"K");function Nt(){var t=0;return t=r[(r[62]|0)+8>>2]|0,t?t=t-(r[3]|0)>>1:t=-1,t|0}l(Nt,"L");function Mt(){var t=0;return t=r[(r[61]|0)+16>>2]|0,t?t=t-(r[3]|0)>>1:t=-1,t|0}l(Mt,"M");function $t(){var t=0;return t=r[(r[61]|0)+4>>2]|0,t?t=t-(r[3]|0)>>1:t=-1,t|0}l($t,"N");function Dt(){var t=0;return t=r[61]|0,t=r[(t|0?t+32|0:236)>>2]|0,r[61]=t,(t|0)!=0|0}l(Dt,"Q");function jt(){var t=0;return t=r[62]|0,t=r[(t|0?t+16|0:240)>>2]|0,r[62]=t,(t|0)!=0|0}l(jt,"R");function M(){b[802]=1,r[68]=(r[72]|0)-(r[3]|0)>>1,r[72]=(r[73]|0)+2}l(M,"T");function W(t){return t=t|0,(t|128)<<16>>16==160|(t+-9&65535)<5|0}l(W,"V");function K(t){return t=t|0,t<<16>>16==39|t<<16>>16==34|0}l(K,"W");function Ut(){return(r[(r[61]|0)+8>>2]|0)-(r[3]|0)>>1|0}l(Ut,"X");function Tt(){return(r[(r[62]|0)+4>>2]|0)-(r[3]|0)>>1|0}l(Tt,"Y");function Te(t){return t=t|0,t<<16>>16==13|t<<16>>16==10|0}l(Te,"Z");function Bt(){return(r[r[61]>>2]|0)-(r[3]|0)>>1|0}l(Bt,"_");function Ft(){return(r[r[62]>>2]|0)-(r[3]|0)>>1|0}l(Ft,"ee");function Pt(){return O[(r[61]|0)+24>>0]|0|0}l(Pt,"ae");function Wt(t){t=t|0,r[3]=t}l(Wt,"re");function Jt(){return r[(r[61]|0)+28>>2]|0}l(Jt,"ie");function Gt(){return(b[803]|0)!=0|0}l(Gt,"se");function qt(){return(b[804]|0)!=0|0}l(qt,"fe");function zt(){return r[68]|0}l(zt,"te");function Ht(t){return t=t|0,E=t+992+15&-16,992}return l(Ht,"ce"),{su:Ht,ai:Mt,e:zt,ee:Tt,ele:At,els:Nt,es:Ft,f:qt,id:It,ie:$t,ip:Pt,is:Bt,it:Jt,ms:Gt,p:R,re:jt,ri:Dt,sa:_t,se:Rt,ses:Wt,ss:Ut}}(typeof self<"u"?self:__webpack_require__.g,{},oe),ve=x.su(Z-(2<<17))}const i=_.length+1;x.ses(ve),x.sa(i-1),qe(_,new Uint16Array(oe,ve,i)),x.p()||(C=x.e(),U());const o=[],c=[];for(;x.ri();){const u=x.is(),p=x.ie(),g=x.ai(),b=x.id(),d=x.ss(),r=x.se(),O=x.it();let I;x.ip()&&(I=xe(b===-1?u:u+1,_.charCodeAt(b===-1?u-1:u))),o.push({t:O,n:I,s:u,e:p,ss:d,se:r,d:b,a:g})}for(;x.re();){const u=x.es(),p=x.ee(),g=x.els(),b=x.ele(),d=_.charCodeAt(u),r=g>=0?_.charCodeAt(g):-1;c.push({s:u,e:p,ls:g,le:b,n:d===34||d===39?xe(u+1,d):_.slice(u,p),ln:g<0?void 0:r===34||r===39?xe(g+1,r):_.slice(g,b)})}return[o,c,!!x.f(),!!x.ms()]}l(kn,"parse");function xe(s,e){C=s;let n="",i=C;for(;;){C>=_.length&&U();const o=_.charCodeAt(C);if(o===e)break;o===92?(n+=_.slice(i,C),n+=Cn(),i=C):(o===8232||o===8233||He(o)&&U(),++C)}return n+=_.slice(i,C++),n}l(xe,"b");function Cn(){let s=_.charCodeAt(++C);switch(++C,s){case 110:return`
`;case 114:return"\r";case 120:return String.fromCharCode(Ee(2));case 117:return function(){const e=_.charCodeAt(C);let n;return e===123?(++C,n=Ee(_.indexOf("}",C)-C),++C,n>1114111&&U()):n=Ee(4),n<=65535?String.fromCharCode(n):(n-=65536,String.fromCharCode(55296+(n>>10),56320+(1023&n)))}();case 116:return"	";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:_.charCodeAt(C)===10&&++C;case 10:return"";case 56:case 57:U();default:if(s>=48&&s<=55){let e=_.substr(C-1,3).match(/^[0-7]+/)[0],n=parseInt(e,8);return n>255&&(e=e.slice(0,-1),n=parseInt(e,8)),C+=e.length-1,s=_.charCodeAt(C),e==="0"&&s!==56&&s!==57||U(),String.fromCharCode(n)}return He(s)?"":String.fromCharCode(s)}}l(Cn,"k");function Ee(s){const e=C;let n=0,i=0;for(let o=0;o<s;++o,++C){let c,u=_.charCodeAt(C);if(u!==95){if(u>=97)c=u-97+10;else if(u>=65)c=u-65+10;else{if(!(u>=48&&u<=57))break;c=u-48}if(c>=16)break;i=u,n=16*n+c}else i!==95&&o!==0||U(),i=u}return i!==95&&C-e===s||U(),n}l(Ee,"l");function He(s){return s===13||s===10}l(He,"u");function U(){throw Object.assign(Error(`Parse error ${ze}:${_.slice(0,C).split(`
`).length}:${C-_.lastIndexOf(`
`,C-1)}`),{idx:C})}l(U,"o");let _e;typeof WebAssembly<"u"&&(async()=>{const{parse:s,init:e}=await __webpack_require__.e(/*! import() */ "vendors-node_modules_tsx_dist_lexer-DQCqS3nf_mjs").then(__webpack_require__.bind(__webpack_require__, /*! ./lexer-DQCqS3nf.mjs */ "./node_modules/tsx/dist/lexer-DQCqS3nf.mjs"));await e,_e=s})();const Le=l((s,e)=>_e?_e(s,e):kn(s,e),"parseEsm"),yn=l(s=>{if(!s.includes("import")&&!s.includes("export"))return!1;try{return Le(s)[3]}catch{return!0}},"isESM"),Ie="2",Sn=(s=>{const e="default";return s[e]&&typeof s[e]=="object"&&"__esModule"in s[e]?s[e]:s}).toString(),vn=`.then(${Sn})`,ae=l((s,e,n)=>{if(n){if(!e.includes("import("))return}else if(!e.includes("import"))return;const o=Le(e,s)[0].filter(g=>g.d>-1);if(o.length===0)return;const c=new $e(e);for(const g of o)c.appendRight(g.se,vn);const u=c.toString(),p=c.generateMap({source:s,includeContent:!1,hires:"boundary"});return{code:u,map:p}},"transformDynamicImport"),Xe=l(s=>{try{const e=node_fs__WEBPACK_IMPORTED_MODULE_5__.readFileSync(s,"utf8");return JSON.parse(e)}catch{}},"readJsonFile"),V=l(()=>{},"noop"),Ke=l(()=>Math.floor(Date.now()/1e8),"getTime"),xn=/^(\d+)-([^-]+)$/;class En extends Map{static{l(this,"FileCache")}cacheDirectory;oldCacheDirectory;diskCacheIndex;diskCacheEntries;constructor(e=_temporary_directory_BDDVQOvU_mjs__WEBPACK_IMPORTED_MODULE_7__.t,n=node_path__WEBPACK_IMPORTED_MODULE_0__.join(node_os__WEBPACK_IMPORTED_MODULE_6__.tmpdir(),"tsx")){super(),this.cacheDirectory=e,this.oldCacheDirectory=n}getDiskCacheIndex(){if(this.diskCacheIndex)return this.diskCacheIndex;node_fs__WEBPACK_IMPORTED_MODULE_5__.mkdirSync(this.cacheDirectory,{recursive:!0});const e=new Map,n=[];for(const i of node_fs__WEBPACK_IMPORTED_MODULE_5__.readdirSync(this.cacheDirectory)){const o=xn.exec(i);if(!o)continue;const c=Number(o[1]);if(!Number.isSafeInteger(c))continue;const u=o[2],p={time:c,key:u,fileName:i};n.push(p);const g=e.get(u);(!g||g.time<c)&&e.set(u,p)}return this.diskCacheIndex=e,this.diskCacheEntries=n,setImmediate(()=>{this.expireDiskCache().catch(V),this.removeOldCacheDirectory().catch(V)}),e}removeDiskCacheEntry(e){const n=this.diskCacheEntries.indexOf(e);if(n!==-1&&this.diskCacheEntries.splice(n,1),this.diskCacheIndex.get(e.key)===e){let i;for(const o of this.diskCacheEntries)o.key===e.key&&(!i||o.time>i.time)&&(i=o);i?this.diskCacheIndex.set(e.key,i):this.diskCacheIndex.delete(e.key)}}get(e){const n=super.get(e);if(n)return n;const i=this.getDiskCacheIndex();let o=i.get(e);for(;o;){const c=node_path__WEBPACK_IMPORTED_MODULE_0__.join(this.cacheDirectory,o.fileName),u=Xe(c);if(u)return super.set(e,u),u;this.removeDiskCacheEntry(o),node_fs__WEBPACK_IMPORTED_MODULE_5__.promises.unlink(c).catch(V),o=i.get(e)}}set(e,n){if(super.set(e,n),n){const i=Ke(),o=`${i}-${e}`,c=this.getDiskCacheIndex(),u={time:i,key:e,fileName:o};node_fs__WEBPACK_IMPORTED_MODULE_5__.promises.writeFile(node_path__WEBPACK_IMPORTED_MODULE_0__.join(this.cacheDirectory,o),JSON.stringify(n)).then(()=>{const p=c.get(e);p?.fileName===o&&this.removeDiskCacheEntry(p),c.set(e,u),this.diskCacheEntries.push(u)},V)}return this}async expireDiskCache(){this.getDiskCacheIndex();const e=Ke(),n=[];for(const i of this.diskCacheEntries)e-i.time>7&&n.push(node_fs__WEBPACK_IMPORTED_MODULE_5__.promises.unlink(node_path__WEBPACK_IMPORTED_MODULE_0__.join(this.cacheDirectory,i.fileName)).then(()=>this.removeDiskCacheEntry(i),V));await Promise.all(n)}async removeOldCacheDirectory(){try{await node_fs__WEBPACK_IMPORTED_MODULE_5__.promises.access(this.oldCacheDirectory).then(()=>!0)&&("rm" in node_fs__WEBPACK_IMPORTED_MODULE_5__.promises?await node_fs__WEBPACK_IMPORTED_MODULE_5__.promises.rm(this.oldCacheDirectory,{recursive:!0,force:!0}):await node_fs__WEBPACK_IMPORTED_MODULE_5__.promises.rmdir(this.oldCacheDirectory,{recursive:!0}))}catch{}}}var q=process.env.TSX_DISABLE_CACHE?new Map:new En;const Ye=44,_n=59,Qe="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ze=new Uint8Array(64),Ve=new Uint8Array(128);for(let s=0;s<Qe.length;s++){const e=Qe.charCodeAt(s);Ze[s]=e,Ve[e]=s}const Oe=typeof TextDecoder<"u"?new TextDecoder:typeof Buffer<"u"?{decode(s){return Buffer.from(s.buffer,s.byteOffset,s.byteLength).toString()}}:{decode(s){let e="";for(let n=0;n<s.length;n++)e+=String.fromCharCode(s[n]);return e}};function Ln(s){const e=new Int32Array(5),n=[];let i=0;do{const o=In(s,i),c=[];let u=!0,p=0;e[0]=0;for(let g=i;g<o;g++){let b;g=ee(s,g,e,0);const d=e[0];d<p&&(u=!1),p=d,et(s,g,o)?(g=ee(s,g,e,1),g=ee(s,g,e,2),g=ee(s,g,e,3),et(s,g,o)?(g=ee(s,g,e,4),b=[d,e[1],e[2],e[3],e[4]]):b=[d,e[1],e[2],e[3]]):b=[d],c.push(b)}u||On(c),n.push(c),i=o+1}while(i<=s.length);return n}l(Ln,"decode");function In(s,e){const n=s.indexOf(";",e);return n===-1?s.length:n}l(In,"indexOf");function ee(s,e,n,i){let o=0,c=0,u=0;do{const g=s.charCodeAt(e++);u=Ve[g],o|=(u&31)<<c,c+=5}while(u&32);const p=o&1;return o>>>=1,p&&(o=-2147483648|-o),n[i]+=o,e}l(ee,"decodeInteger");function et(s,e,n){return e>=n?!1:s.charCodeAt(e)!==Ye}l(et,"hasMoreVlq");function On(s){s.sort(An)}l(On,"sort");function An(s,e){return s[0]-e[0]}l(An,"sortComparator$1");function Rn(s){const e=new Int32Array(5),n=1024*16,i=n-36,o=new Uint8Array(n),c=o.subarray(0,i);let u=0,p="";for(let g=0;g<s.length;g++){const b=s[g];if(g>0&&(u===n&&(p+=Oe.decode(o),u=0),o[u++]=_n),b.length!==0){e[0]=0;for(let d=0;d<b.length;d++){const r=b[d];u>i&&(p+=Oe.decode(c),o.copyWithin(0,i,u),u-=i),d>0&&(o[u++]=Ye),u=te(o,u,e,r,0),r.length!==1&&(u=te(o,u,e,r,1),u=te(o,u,e,r,2),u=te(o,u,e,r,3),r.length!==4&&(u=te(o,u,e,r,4)))}}}return p+Oe.decode(o.subarray(0,u))}l(Rn,"encode");function te(s,e,n,i,o){const c=i[o];let u=c-n[o];n[o]=c,u=u<0?-u<<1|1:u<<1;do{let p=u&31;u>>>=5,u>0&&(p|=32),s[e++]=Ze[p]}while(u>0);return e}l(te,"encodeInteger");const Nn=/^[\w+.-]+:\/\//,Mn=/^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/,$n=/^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;function Dn(s){return Nn.test(s)}l(Dn,"isAbsoluteUrl");function jn(s){return s.startsWith("//")}l(jn,"isSchemeRelativeUrl");function tt(s){return s.startsWith("/")}l(tt,"isAbsolutePath");function Un(s){return s.startsWith("file:")}l(Un,"isFileUrl");function nt(s){return/^[.?#]/.test(s)}l(nt,"isRelative");function ce(s){const e=Mn.exec(s);return rt(e[1],e[2]||"",e[3],e[4]||"",e[5]||"/",e[6]||"",e[7]||"")}l(ce,"parseAbsoluteUrl");function Tn(s){const e=$n.exec(s),n=e[2];return rt("file:","",e[1]||"","",tt(n)?n:"/"+n,e[3]||"",e[4]||"")}l(Tn,"parseFileUrl");function rt(s,e,n,i,o,c,u){return{scheme:s,user:e,host:n,port:i,path:o,query:c,hash:u,type:7}}l(rt,"makeUrl");function it(s){if(jn(s)){const n=ce("http:"+s);return n.scheme="",n.type=6,n}if(tt(s)){const n=ce("http://foo.com"+s);return n.scheme="",n.host="",n.type=5,n}if(Un(s))return Tn(s);if(Dn(s))return ce(s);const e=ce("http://foo.com/"+s);return e.scheme="",e.host="",e.type=s?s.startsWith("?")?3:s.startsWith("#")?2:4:1,e}l(it,"parseUrl");function Bn(s){if(s.endsWith("/.."))return s;const e=s.lastIndexOf("/");return s.slice(0,e+1)}l(Bn,"stripPathFilename");function Fn(s,e){st(e,e.type),s.path==="/"?s.path=e.path:s.path=Bn(e.path)+s.path}l(Fn,"mergePaths");function st(s,e){const n=e<=4,i=s.path.split("/");let o=1,c=0,u=!1;for(let g=1;g<i.length;g++){const b=i[g];if(!b){u=!0;continue}if(u=!1,b!=="."){if(b===".."){c?(u=!0,c--,o--):n&&(i[o++]=b);continue}i[o++]=b,c++}}let p="";for(let g=1;g<o;g++)p+="/"+i[g];(!p||u&&!p.endsWith("/.."))&&(p+="/"),s.path=p}l(st,"normalizePath");function Pn(s,e){if(!s&&!e)return"";const n=it(s);let i=n.type;if(e&&i!==7){const c=it(e),u=c.type;switch(i){case 1:n.hash=c.hash;case 2:n.query=c.query;case 3:case 4:Fn(n,c);case 5:n.user=c.user,n.host=c.host,n.port=c.port;case 6:n.scheme=c.scheme}u>i&&(i=u)}st(n,i);const o=n.query+n.hash;switch(i){case 2:case 3:return o;case 4:{const c=n.path.slice(1);return c?nt(e||s)&&!nt(c)?"./"+c+o:c+o:o||"."}case 5:return n.path+o;default:return n.scheme+"//"+n.user+n.host+n.port+n.path+o}}l(Pn,"resolve$1");function ot(s,e){return e&&!e.endsWith("/")&&(e+="/"),Pn(s,e)}l(ot,"resolve");function Wn(s){if(!s)return"";const e=s.lastIndexOf("/");return s.slice(0,e+1)}l(Wn,"stripFilename");const B=0;function Jn(s,e){const n=at(s,0);if(n===s.length)return s;e||(s=s.slice());for(let i=n;i<s.length;i=at(s,i+1))s[i]=qn(s[i],e);return s}l(Jn,"maybeSort");function at(s,e){for(let n=e;n<s.length;n++)if(!Gn(s[n]))return n;return s.length}l(at,"nextUnsortedSegmentLine");function Gn(s){for(let e=1;e<s.length;e++)if(s[e][B]<s[e-1][B])return!1;return!0}l(Gn,"isSorted");function qn(s,e){return e||(s=s.slice()),s.sort(zn)}l(qn,"sortSegments");function zn(s,e){return s[B]-e[B]}l(zn,"sortComparator");let ue=!1;function Hn(s,e,n,i){for(;n<=i;){const o=n+(i-n>>1),c=s[o][B]-e;if(c===0)return ue=!0,o;c<0?n=o+1:i=o-1}return ue=!1,n-1}l(Hn,"binarySearch");function Xn(s,e,n){for(let i=n-1;i>=0&&s[i][B]===e;n=i--);return n}l(Xn,"lowerBound");function Kn(){return{lastKey:-1,lastNeedle:-1,lastIndex:-1}}l(Kn,"memoizedState");function Yn(s,e,n,i){const{lastKey:o,lastNeedle:c,lastIndex:u}=n;let p=0,g=s.length-1;if(i===o){if(e===c)return ue=u!==-1&&s[u][B]===e,u;e>=c?p=u===-1?0:u:g=u}return n.lastKey=i,n.lastNeedle=e,n.lastIndex=Hn(s,e,p,g)}l(Yn,"memoizedBinarySearch");class ct{static{l(this,"TraceMap")}constructor(e,n){const i=typeof e=="string";if(!i&&e._decodedMemo)return e;const o=i?JSON.parse(e):e,{version:c,file:u,names:p,sourceRoot:g,sources:b,sourcesContent:d}=o;this.version=c,this.file=u,this.names=p||[],this.sourceRoot=g,this.sources=b,this.sourcesContent=d,this.ignoreList=o.ignoreList||o.x_google_ignoreList||void 0;const r=ot(g||"",Wn(n));this.resolvedSources=b.map(I=>ot(I||"",r));const{mappings:O}=o;typeof O=="string"?(this._encoded=O,this._decoded=void 0):(this._encoded=void 0,this._decoded=Jn(O,i)),this._decodedMemo=Kn(),this._bySources=void 0,this._bySourceMemos=void 0}}function Fr(s){return s}l(Fr,"cast$2");function ut(s){var e;return(e=s)._decoded||(e._decoded=Ln(s._encoded))}l(ut,"decodedMappings");function Qn(s,e,n){const i=ut(s);if(e>=i.length)return null;const o=i[e],c=Zn(o,s._decodedMemo,e,n);return c===-1?null:o[c]}l(Qn,"traceSegment");function Zn(s,e,n,i,o){let c=Yn(s,i,e,n);return ue&&(c=Xn(s,i,c)),c===-1||c===s.length?-1:c}l(Zn,"traceSegmentInternal");class Ae{static{l(this,"SetArray")}constructor(){this._indexes={__proto__:null},this.array=[]}}function Pr(s){return s}l(Pr,"cast$1");function ht(s,e){return s._indexes[e]}l(ht,"get");function ne(s,e){const n=ht(s,e);if(n!==void 0)return n;const{array:i,_indexes:o}=s,c=i.push(e);return o[e]=c-1}l(ne,"put");function Vn(s,e){const n=ht(s,e);if(n===void 0)return;const{array:i,_indexes:o}=s;for(let c=n+1;c<i.length;c++){const u=i[c];i[c-1]=u,o[u]--}o[e]=void 0,i.pop()}l(Vn,"remove");const er=0,tr=1,nr=2,rr=3,ir=4,ft=-1;class sr{static{l(this,"GenMapping")}constructor({file:e,sourceRoot:n}={}){this._names=new Ae,this._sources=new Ae,this._sourcesContent=[],this._mappings=[],this.file=e,this.sourceRoot=n,this._ignoreList=new Ae}}function Wr(s){return s}l(Wr,"cast");const or=l((s,e,n,i,o,c,u,p)=>hr(!0,s,e,n,i,o,c,u),"maybeAddSegment");function ar(s,e,n){const{_sources:i,_sourcesContent:o}=s,c=ne(i,e);o[c]=n}l(ar,"setSourceContent");function cr(s,e,n=!0){const{_sources:i,_sourcesContent:o,_ignoreList:c}=s,u=ne(i,e);u===o.length&&(o[u]=null),n?ne(c,u):Vn(c,u)}l(cr,"setIgnore");function lt(s){const{_mappings:e,_sources:n,_sourcesContent:i,_names:o,_ignoreList:c}=s;return dr(e),{version:3,file:s.file||void 0,names:o.array,sourceRoot:s.sourceRoot||void 0,sources:n.array,sourcesContent:i,mappings:e,ignoreList:c.array}}l(lt,"toDecodedMap");function ur(s){const e=lt(s);return Object.assign(Object.assign({},e),{mappings:Rn(e.mappings)})}l(ur,"toEncodedMap");function hr(s,e,n,i,o,c,u,p,g){const{_mappings:b,_sources:d,_sourcesContent:r,_names:O}=e,I=fr(b,n),E=lr(I,i);if(!o)return gr(I,E)?void 0:dt(I,E,[i]);const R=ne(d,o),$=p?ne(O,p):ft;if(R===r.length&&(r[R]=null),!br(I,E,R,c,u,$))return dt(I,E,p?[i,R,c,u,$]:[i,R,c,u])}l(hr,"addSegmentInternal");function fr(s,e){for(let n=s.length;n<=e;n++)s[n]=[];return s[e]}l(fr,"getLine");function lr(s,e){let n=s.length;for(let i=n-1;i>=0;n=i--){const o=s[i];if(e>=o[er])break}return n}l(lr,"getColumnIndex");function dt(s,e,n){for(let i=s.length;i>e;i--)s[i]=s[i-1];s[e]=n}l(dt,"insert");function dr(s){const{length:e}=s;let n=e;for(let i=n-1;i>=0&&!(s[i].length>0);n=i,i--);n<e&&(s.length=n)}l(dr,"removeEmptyFinalLines");function gr(s,e){return e===0?!0:s[e-1].length===1}l(gr,"skipSourceless");function br(s,e,n,i,o,c){if(e===0)return!1;const u=s[e-1];return u.length===1?!1:n===u[tr]&&i===u[nr]&&o===u[rr]&&c===(u.length===5?u[ir]:ft)}l(br,"skipSource");const gt=bt("",-1,-1,"",null,!1),pr=[];function bt(s,e,n,i,o,c){return{source:s,line:e,column:n,name:i,content:o,ignore:c}}l(bt,"SegmentObject");function pt(s,e,n,i,o){return{map:s,sources:e,source:n,content:i,ignore:o}}l(pt,"Source");function mt(s,e){return pt(s,e,"",null,!1)}l(mt,"MapSource");function mr(s,e,n){return pt(null,pr,s,e,n)}l(mr,"OriginalSource");function wr(s){const e=new sr({file:s.map.file}),{sources:n,map:i}=s,o=i.names,c=ut(i);for(let u=0;u<c.length;u++){const p=c[u];for(let g=0;g<p.length;g++){const b=p[g],d=b[0];let r=gt;if(b.length!==1){const z=n[b[1]];if(r=wt(z,b[2],b[3],b.length===5?o[b[4]]:""),r==null)continue}const{column:O,line:I,name:E,content:R,source:$,ignore:F}=r;or(e,u,d,$,I,O,E),$&&R!=null&&ar(e,$,R),F&&cr(e,$,!0)}}return e}l(wr,"traceMappings");function wt(s,e,n,i){if(!s.map)return bt(s.source,e,n,i,s.content,s.ignore);const o=Qn(s.map,e,n);return o==null?null:o.length===1?gt:wt(s.sources[o[1]],o[2],o[3],o.length===5?s.map.names[o[4]]:i)}l(wt,"originalPositionFor");function kr(s){return Array.isArray(s)?s:[s]}l(kr,"asArray");function Cr(s,e){const n=kr(s).map(c=>new ct(c,"")),i=n.pop();for(let c=0;c<n.length;c++)if(n[c].sources.length>1)throw new Error(`Transformation map ${c} must have exactly one source file.
Did you specify these with the most recent transformation maps first?`);let o=kt(i,e,"",0);for(let c=n.length-1;c>=0;c--)o=mt(n[c],[o]);return o}l(Cr,"buildSourceMapTree");function kt(s,e,n,i){const{resolvedSources:o,sourcesContent:c,ignoreList:u}=s,p=i+1,g=o.map((b,d)=>{const r={importer:n,depth:p,source:b||"",content:void 0,ignore:void 0},O=e(r.source,r),{source:I,content:E,ignore:R}=r;if(O)return kt(new ct(O,I),e,I,p);const $=E!==void 0?E:c?c[d]:null,F=R!==void 0?R:u?u.includes(d):!1;return mr(I,$,F)});return mt(s,g)}l(kt,"build");class yr{static{l(this,"SourceMap")}constructor(e,n){const i=n.decodedMappings?lt(e):ur(e);this.version=i.version,this.file=i.file,this.mappings=i.mappings,this.names=i.names,this.ignoreList=i.ignoreList,this.sourceRoot=i.sourceRoot,this.sources=i.sources,n.excludeContent||(this.sourcesContent=i.sourcesContent)}toString(){return JSON.stringify(this)}}function Ct(s,e,n){const i={excludeContent:!!n,decodedMappings:!1},o=Cr(s,e);return new yr(wr(o),i)}l(Ct,"remapping");const yt=l((s,e,n)=>{const i=[],o={code:e};for(const c of n){const u=c(s,o.code);u&&(Object.assign(o,u),i.unshift(u.map))}return{...o,map:Ct(i,()=>null)}},"applyTransformersSync"),Sr=l(async(s,e,n)=>{const i=[],o={code:e};for(const c of n){const u=await c(s,o.code);u&&(Object.assign(o,u),i.unshift(u.map))}return{...o,map:Ct(i,()=>null)}},"applyTransformers"),vr=Object.freeze({target:`node${process.versions.node}`,loader:"default"}),xr=/^--inspect(?:-brk|-port|-publish-uid|-wait)?(?:=|$)/,Er=process.execArgv.some(s=>xr.test(s)),Re={...vr,sourcemap:!0,sourcesContent:!!process.env.NODE_V8_COVERAGE||Er,minifyWhitespace:!0,keepNames:!0},Ne=l(s=>{const e=s.sourcefile;if(e){const n=node_path__WEBPACK_IMPORTED_MODULE_0__.extname(e.split("?")[0]);n?n===".cts"||n===".mts"?s.sourcefile=`${e.slice(0,-3)}ts`:n===".mjs"&&(s.sourcefile=`${e.slice(0,-3)}js`):s.sourcefile+=".js"}return n=>(n.map&&(s.sourcefile!==e&&(n.map=n.map.replace(JSON.stringify(s.sourcefile),JSON.stringify(e))),n.map=JSON.parse(n.map)),n)},"patchOptions"),Me=l(s=>{throw s.name="TransformError",delete s.errors,delete s.warnings,s},"formatEsbuildError"),_r=l((s,e)=>({...(0,_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_4__.i)(_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_4__.c)?{dirname:node_path__WEBPACK_IMPORTED_MODULE_0__.dirname(s),filename:s}:{},url:e}),"getImportMeta"),Lr=l((s,e,n)=>{let i,o,c;if(e.startsWith("file://")){i=e;const r=new URL(e);o=(0,node_url__WEBPACK_IMPORTED_MODULE_1__.fileURLToPath)(r)}else[o,c]=e.split("?"),i=(0,node_url__WEBPACK_IMPORTED_MODULE_1__.pathToFileURL)(o)+(c?`?${c}`:"");const{cjsBanner:u,...p}=n??{},g={...Re,format:"cjs",sourcefile:o,banner:`__filename=${JSON.stringify(o)};(()=>{${u??""}`,footer:"})()",platform:"node",...p};s.includes("import.meta")&&g.format==="cjs"&&!o.endsWith(".cjs")&&!o.endsWith(".cts")&&(g.define={...g.define,"import.meta":JSON.stringify(_r(o,i))});const b=Se([s,i,JSON.stringify(g),esbuild__WEBPACK_IMPORTED_MODULE_2__.version,Ie].join("-"));let d=q.get(b);return d||(d=yt(e,s,[(r,O)=>{const I=Ne(g);let E;try{E=(0,esbuild__WEBPACK_IMPORTED_MODULE_2__.transformSync)(O,g)}catch(R){throw Me(R)}return I(E)},(r,O)=>ae(r,O,!0)]),q.set(b,d)),d},"transformSync"),Ir=l(async(s,e,n)=>{const i={...Re,format:"esm",sourcefile:e,...n},o=Se([s,JSON.stringify(i),esbuild__WEBPACK_IMPORTED_MODULE_2__.version,Ie].join("-"));let c=q.get(o);return c||(c=await Sr(e,s,[async(u,p)=>{const g=Ne(i);let b;try{b=await (0,esbuild__WEBPACK_IMPORTED_MODULE_2__.transform)(p,i)}catch(d){throw Me(d)}return g(b)},(u,p)=>ae(u,p,!0)]),q.set(o,c)),c},"transform"),Or=l((s,e,n)=>{const i={...Re,format:"esm",sourcefile:e,...n},o=Se([s,JSON.stringify(i),esbuild__WEBPACK_IMPORTED_MODULE_2__.version,Ie].join("-"));let c=q.get(o);return c||(c=yt(e,s,[(u,p)=>{const g=Ne(i);let b;try{b=(0,esbuild__WEBPACK_IMPORTED_MODULE_2__.transformSync)(p,i)}catch(d){throw Me(d)}return g(b)},(u,p)=>ae(u,p,!0)]),q.set(o,c)),c},"transformEsmSync");


/***/ },

/***/ "./node_modules/tsx/dist/index-gbaejti9.mjs"
/*!**************************************************!*\
  !*** ./node_modules/tsx/dist/index-gbaejti9.mjs ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ b),
/* harmony export */   b: () => (/* binding */ T),
/* harmony export */   c: () => (/* binding */ L),
/* harmony export */   d: () => (/* binding */ E),
/* harmony export */   e: () => (/* binding */ R),
/* harmony export */   f: () => (/* binding */ C),
/* harmony export */   g: () => (/* binding */ O),
/* harmony export */   l: () => (/* binding */ I),
/* harmony export */   o: () => (/* binding */ f),
/* harmony export */   y: () => (/* binding */ d)
/* harmony export */ });
var u=Object.defineProperty;var g=(s,n)=>u(s,"name",{value:n,configurable:!0});let t=!0;const l=typeof self<"u"?self:typeof window<"u"?window:typeof __webpack_require__.g<"u"?__webpack_require__.g:{};let i=0;if(l.process&&l.process.env&&l.process.stdout){const{FORCE_COLOR:s,NODE_DISABLE_COLORS:n,NO_COLOR:r,TERM:o,COLORTERM:c}=l.process.env;n||r||s==="0"?t=!1:s==="1"||s==="2"||s==="3"?t=!0:o==="dumb"?t=!1:"CI"in l.process.env&&["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE","DRONE"].some(a=>a in l.process.env)?t=!0:t=process.stdout.isTTY,t&&(process.platform==="win32"||c&&(c==="truecolor"||c==="24bit")?i=3:o&&(o.endsWith("-256color")||o.endsWith("256"))?i=2:i=1)}let f={enabled:t,supportLevel:i};function e(s,n,r=1){const o=`\x1B[${s}m`,c=`\x1B[${n}m`,a=new RegExp(`\\x1b\\[${n}m`,"g");return p=>f.enabled&&f.supportLevel>=r?o+(""+p).replace(a,o)+c:""+p}g(e,"kolorist");const b=e(30,39),d=e(33,39),O=e(90,39),C=e(92,39),R=e(95,39),I=e(96,39),L=e(44,49),E=e(100,49),T=e(103,49);


/***/ },

/***/ "./node_modules/tsx/dist/node-features-JeyyvQz6.mjs"
/*!**********************************************************!*\
  !*** ./node_modules/tsx/dist/node-features-JeyyvQz6.mjs ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ u),
/* harmony export */   b: () => (/* binding */ m),
/* harmony export */   c: () => (/* binding */ d),
/* harmony export */   e: () => (/* binding */ p),
/* harmony export */   i: () => (/* binding */ c),
/* harmony export */   m: () => (/* binding */ l),
/* harmony export */   r: () => (/* binding */ R),
/* harmony export */   t: () => (/* binding */ f)
/* harmony export */ });
var i=Object.defineProperty;var o=(e,t)=>i(e,"name",{value:t,configurable:!0});const n=o((e,t)=>{const s=e[0]-t[0];if(s===0){const r=e[1]-t[1];return r===0?e[2]>=t[2]:r>0}return s>0},"isVersionGreaterOrEqual"),a=process.versions.node.split(".").map(Number),c=o((e,t=a)=>{for(let s=0;s<e.length;s+=1){const r=e[s];if(s===e.length-1||t[0]===r[0])return n(t,r)}return!1},"isFeatureSupported"),u=[[18,19,0],[20,6,0]],l=[[22,22,3],[24,11,1],[25,1,0],[26,0,0]],m=[[18,19,0],[20,10,0],[21,0,0]],f=[[21,0,0]],p=[[20,11,0],[21,3,0]],d=[[20,11,0],[21,2,0]],R=[[20,19,0],[22,12,0],[23,0,0]];


/***/ },

/***/ "./node_modules/tsx/dist/register-HWZIKnmC.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/tsx/dist/register-HWZIKnmC.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ Wn),
/* harmony export */   b: () => (/* binding */ Fn),
/* harmony export */   c: () => (/* binding */ _n),
/* harmony export */   d: () => (/* binding */ le),
/* harmony export */   e: () => (/* binding */ Dn),
/* harmony export */   f: () => (/* binding */ Ce),
/* harmony export */   g: () => (/* binding */ Bn),
/* harmony export */   h: () => (/* binding */ it),
/* harmony export */   i: () => (/* binding */ Un),
/* harmony export */   j: () => (/* binding */ An),
/* harmony export */   k: () => (/* binding */ Ee),
/* harmony export */   l: () => (/* binding */ ot),
/* harmony export */   m: () => (/* binding */ ie),
/* harmony export */   n: () => (/* binding */ Ln),
/* harmony export */   o: () => (/* binding */ H),
/* harmony export */   p: () => (/* binding */ ce),
/* harmony export */   q: () => (/* binding */ dt),
/* harmony export */   r: () => (/* binding */ rr),
/* harmony export */   s: () => (/* binding */ je),
/* harmony export */   t: () => (/* binding */ Pn),
/* harmony export */   u: () => (/* binding */ _e),
/* harmony export */   w: () => (/* binding */ st)
/* harmony export */ });
/* harmony import */ var _get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-pipe-path-_tAJyU_v.mjs */ "./node_modules/tsx/dist/get-pipe-path-_tAJyU_v.mjs");
/* harmony import */ var node_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:module */ "node:module");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node:fs */ "node:fs");
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'os'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index-CQhDiIsg.mjs */ "./node_modules/tsx/dist/index-CQhDiIsg.mjs");
/* harmony import */ var _client_D_mPDF5S_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./client-D_mPDF5S.mjs */ "./node_modules/tsx/dist/client-D_mPDF5S.mjs");
/* harmony import */ var node_util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! node:util */ "node:util");
/* harmony import */ var _index_gbaejti9_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./index-gbaejti9.mjs */ "./node_modules/tsx/dist/index-gbaejti9.mjs");
/* harmony import */ var _node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node-features-JeyyvQz6.mjs */ "./node_modules/tsx/dist/node-features-JeyyvQz6.mjs");
var yt=Object.defineProperty;var p=(e,t)=>yt(e,"name",{value:t,configurable:!0});const De=p(e=>{if(!e.startsWith("data:text/javascript,"))return;const t=e.indexOf("?");if(t===-1)return;const n=new URLSearchParams(e.slice(t+1)).get("filePath");if(n)return n},"getOriginalFilePath"),_e=p(e=>{const t=De(e);return t&&(node_module__WEBPACK_IMPORTED_MODULE_1__._cache[t]=node_module__WEBPACK_IMPORTED_MODULE_1__._cache[e],delete node_module__WEBPACK_IMPORTED_MODULE_1__._cache[e],e=t),e},"interopCjsExports"),Le=p(e=>e!==null&&typeof e=="object","A"),W=p((e,t)=>Object.assign(new Error(`[${e}]: ${t}`),{code:e}),"a"),Ue="ERR_INVALID_PACKAGE_CONFIG",ue="ERR_INVALID_PACKAGE_TARGET",Ft="ERR_PACKAGE_PATH_NOT_EXPORTED",Rt=/^\d+$/,It=/^(\.{1,2}|node_modules)$/i,Nt=/\/|\\/;var Fe=(e=>(e.Export="exports",e.Import="imports",e))(Fe||{});const fe=p((e,t,r,n,s)=>{if(t==null)return[];if(typeof t=="string"){const[o,...a]=t.split(Nt);if(o===".."||a.some(i=>It.test(i)))throw W(ue,`Invalid "${e}" target "${t}" defined in the package config`);return[s?t.replace(/\*/g,s):t]}if(Array.isArray(t))return t.flatMap(o=>fe(e,o,r,n,s));if(Le(t)){for(const o of Object.keys(t)){if(Rt.test(o))throw W(Ue,"Cannot contain numeric property keys");if(o==="default"||n.includes(o))return fe(e,t[o],r,n,s)}return[]}throw W(ue,`Invalid "${e}" target "${t}"`)},"f"),G="*",Bt=p((e,t)=>{const r=e.indexOf(G),n=t.indexOf(G);return r===n?t.length>e.length:n>r},"m");function Wt(e,t){if(!t.includes(G)&&e.hasOwnProperty(t))return[t];let r,n;for(const s of Object.keys(e))if(s.includes(G)){const[o,a,i]=s.split(G);if(i===void 0&&t.startsWith(o)&&t.endsWith(a)){const d=t.slice(o.length,-a.length||void 0);d&&(!r||Bt(r,s))&&(r=s,n=d)}}return[r,n]}p(Wt,"d");const Mt=p(e=>Object.keys(e).reduce((t,r)=>{const n=r===""||r[0]!==".";if(t===void 0||t===n)return n;throw W(Ue,'"exports" cannot contain some keys starting with "." and some not')},void 0),"p"),Jt=/^\w+:/,Vt=p((e,t,r)=>{if(!e)throw new Error('"exports" is required');t=t===""?".":`./${t}`,(typeof e=="string"||Array.isArray(e)||Le(e)&&Mt(e))&&(e={".":e});const[n,s]=Wt(e,t),o=fe(Fe.Export,e[n],t,r,s);if(o.length===0)throw W(Ft,t==="."?'No "exports" main defined':`Package subpath '${t}' is not defined by "exports"`);for(const a of o)if(!a.startsWith("./")&&!Jt.test(a))throw W(ue,`Invalid "exports" target "${a}" defined in the package config`);return o},"v");var Gt=Object.defineProperty,c=p((e,t)=>Gt(e,"name",{value:t,configurable:!0}),"i");function A(e){return e.startsWith("\\\\?\\")?e:e.replace(/\\/g,"/")}p(A,"x"),c(A,"slash");const Qt=c((e,t)=>{const r=`readFileSync:${t}`;let n=e?.get(r);return n===void 0&&(n=node_fs__WEBPACK_IMPORTED_MODULE_4__.readFileSync(t,"utf8"),e?.set(r,n)),n},"readFile"),D=c((e,t)=>{const r=`tryStat:${t}`;let n=e?.get(r);if(n===void 0){try{n=node_fs__WEBPACK_IMPORTED_MODULE_4__.statSync(t)}catch{n=null}e?.set(r,n)}return n??void 0},"tryStat"),Q=c((e,t,r)=>{for(;;){const n=node_path__WEBPACK_IMPORTED_MODULE_2__.posix.join(e,t);if(D(r,n))return n;const s=node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(e);if(s===e)return;e=s}},"findUp");function Re(e,t=!1){const r=e.length;let n=0,s="",o=0,a=16,i=0,d=0,u=0,k=0,f=0;function v(l,C){let S=0,x=0;for(;S<l;){let y=e.charCodeAt(n);if(y>=48&&y<=57)x=x*16+y-48;else if(y>=65&&y<=70)x=x*16+y-65+10;else if(y>=97&&y<=102)x=x*16+y-97+10;else break;n++,S++}return S<l&&(x=-1),x}p(v,"A"),c(v,"scanHexDigits");function w(l){n=l,s="",o=0,a=16,f=0}p(w,"O"),c(w,"setPosition");function b(){let l=n;if(e.charCodeAt(n)===48)n++;else for(n++;n<e.length&&I(e.charCodeAt(n));)n++;if(n<e.length&&e.charCodeAt(n)===46)if(n++,n<e.length&&I(e.charCodeAt(n)))for(n++;n<e.length&&I(e.charCodeAt(n));)n++;else return f=3,e.substring(l,n);let C=n;if(n<e.length&&(e.charCodeAt(n)===69||e.charCodeAt(n)===101))if(n++,(n<e.length&&e.charCodeAt(n)===43||e.charCodeAt(n)===45)&&n++,n<e.length&&I(e.charCodeAt(n))){for(n++;n<e.length&&I(e.charCodeAt(n));)n++;C=n}else f=3;return e.substring(l,C)}p(b,"h"),c(b,"scanNumber");function E(){let l="",C=n;for(;;){if(n>=r){l+=e.substring(C,n),f=2;break}const S=e.charCodeAt(n);if(S===34){l+=e.substring(C,n),n++;break}if(S===92){if(l+=e.substring(C,n),n++,n>=r){f=2;break}switch(e.charCodeAt(n++)){case 34:l+='"';break;case 92:l+="\\";break;case 47:l+="/";break;case 98:l+="\b";break;case 102:l+="\f";break;case 110:l+=`
`;break;case 114:l+="\r";break;case 116:l+="	";break;case 117:const x=v(4);x>=0?l+=String.fromCharCode(x):f=4;break;default:f=5}C=n;continue}if(S>=0&&S<=31)if(M(S)){l+=e.substring(C,n),f=2;break}else f=6;n++}return l}p(E,"D"),c(E,"scanString");function m(){if(s="",f=0,o=n,d=i,k=u,n>=r)return o=r,a=17;let l=e.charCodeAt(n);if(ee(l)){do n++,s+=String.fromCharCode(l),l=e.charCodeAt(n);while(ee(l));return a=15}if(M(l))return n++,s+=String.fromCharCode(l),l===13&&e.charCodeAt(n)===10&&(n++,s+=`
`),i++,u=n,a=14;switch(l){case 123:return n++,a=1;case 125:return n++,a=2;case 91:return n++,a=3;case 93:return n++,a=4;case 58:return n++,a=6;case 44:return n++,a=5;case 34:return n++,s=E(),a=10;case 47:const C=n-1;if(e.charCodeAt(n+1)===47){for(n+=2;n<r&&!M(e.charCodeAt(n));)n++;return s=e.substring(C,n),a=12}if(e.charCodeAt(n+1)===42){n+=2;const S=r-1;let x=!1;for(;n<S;){const y=e.charCodeAt(n);if(y===42&&e.charCodeAt(n+1)===47){n+=2,x=!0;break}n++,M(y)&&(y===13&&e.charCodeAt(n)===10&&n++,i++,u=n)}return x||(n++,f=1),s=e.substring(C,n),a=13}return s+=String.fromCharCode(l),n++,a=16;case 45:if(s+=String.fromCharCode(l),n++,n===r||!I(e.charCodeAt(n)))return a=16;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return s+=b(),a=11;default:for(;n<r&&g(l);)n++,l=e.charCodeAt(n);if(o!==n){switch(s=e.substring(o,n),s){case"true":return a=8;case"false":return a=9;case"null":return a=7}return a=16}return s+=String.fromCharCode(l),n++,a=16}}p(m,"c"),c(m,"scanNext");function g(l){if(ee(l)||M(l))return!1;switch(l){case 125:case 93:case 123:case 91:case 34:case 58:case 44:case 47:return!1}return!0}p(g,"p"),c(g,"isUnknownContentCharacter");function T(){let l;do l=m();while(l>=12&&l<=15);return l}return p(T,"b"),c(T,"scanNextNonTrivia"),{setPosition:w,getPosition:c(()=>n,"getPosition"),scan:t?T:m,getToken:c(()=>a,"getToken"),getTokenValue:c(()=>s,"getTokenValue"),getTokenOffset:c(()=>o,"getTokenOffset"),getTokenLength:c(()=>n-o,"getTokenLength"),getTokenStartLine:c(()=>d,"getTokenStartLine"),getTokenStartCharacter:c(()=>o-k,"getTokenStartCharacter"),getTokenError:c(()=>f,"getTokenError")}}p(Re,"Ne"),c(Re,"createScanner");function ee(e){return e===32||e===9}p(ee,"X"),c(ee,"isWhiteSpace");function M(e){return e===10||e===13}p(M,"P"),c(M,"isLineBreak");function I(e){return e>=48&&e<=57}p(I,"S"),c(I,"isDigit");var Ie;(function(e){e[e.lineFeed=10]="lineFeed",e[e.carriageReturn=13]="carriageReturn",e[e.space=32]="space",e[e._0=48]="_0",e[e._1=49]="_1",e[e._2=50]="_2",e[e._3=51]="_3",e[e._4=52]="_4",e[e._5=53]="_5",e[e._6=54]="_6",e[e._7=55]="_7",e[e._8=56]="_8",e[e._9=57]="_9",e[e.a=97]="a",e[e.b=98]="b",e[e.c=99]="c",e[e.d=100]="d",e[e.e=101]="e",e[e.f=102]="f",e[e.g=103]="g",e[e.h=104]="h",e[e.i=105]="i",e[e.j=106]="j",e[e.k=107]="k",e[e.l=108]="l",e[e.m=109]="m",e[e.n=110]="n",e[e.o=111]="o",e[e.p=112]="p",e[e.q=113]="q",e[e.r=114]="r",e[e.s=115]="s",e[e.t=116]="t",e[e.u=117]="u",e[e.v=118]="v",e[e.w=119]="w",e[e.x=120]="x",e[e.y=121]="y",e[e.z=122]="z",e[e.A=65]="A",e[e.B=66]="B",e[e.C=67]="C",e[e.D=68]="D",e[e.E=69]="E",e[e.F=70]="F",e[e.G=71]="G",e[e.H=72]="H",e[e.I=73]="I",e[e.J=74]="J",e[e.K=75]="K",e[e.L=76]="L",e[e.M=77]="M",e[e.N=78]="N",e[e.O=79]="O",e[e.P=80]="P",e[e.Q=81]="Q",e[e.R=82]="R",e[e.S=83]="S",e[e.T=84]="T",e[e.U=85]="U",e[e.V=86]="V",e[e.W=87]="W",e[e.X=88]="X",e[e.Y=89]="Y",e[e.Z=90]="Z",e[e.asterisk=42]="asterisk",e[e.backslash=92]="backslash",e[e.closeBrace=125]="closeBrace",e[e.closeBracket=93]="closeBracket",e[e.colon=58]="colon",e[e.comma=44]="comma",e[e.dot=46]="dot",e[e.doubleQuote=34]="doubleQuote",e[e.minus=45]="minus",e[e.openBrace=123]="openBrace",e[e.openBracket=91]="openBracket",e[e.plus=43]="plus",e[e.slash=47]="slash",e[e.formFeed=12]="formFeed",e[e.tab=9]="tab"})(Ie||(Ie={})),new Array(20).fill(0).map((e,t)=>" ".repeat(t));const J=200;new Array(J).fill(0).map((e,t)=>`
`+" ".repeat(t)),new Array(J).fill(0).map((e,t)=>"\r"+" ".repeat(t)),new Array(J).fill(0).map((e,t)=>`\r
`+" ".repeat(t)),new Array(J).fill(0).map((e,t)=>`
`+"	".repeat(t)),new Array(J).fill(0).map((e,t)=>"\r"+"	".repeat(t)),new Array(J).fill(0).map((e,t)=>`\r
`+"	".repeat(t));var te;(function(e){e.DEFAULT={allowTrailingComma:!1}})(te||(te={}));function Ne(e,t=[],r=te.DEFAULT){let n=null,s=[];const o=[];function a(i){Array.isArray(s)?s.push(i):n!==null&&(s[n]=i)}return p(a,"l"),c(a,"onValue"),Be(e,{onObjectBegin:c(()=>{const i={};a(i),o.push(s),s=i,n=null},"onObjectBegin"),onObjectProperty:c(i=>{n=i},"onObjectProperty"),onObjectEnd:c(()=>{s=o.pop()},"onObjectEnd"),onArrayBegin:c(()=>{const i=[];a(i),o.push(s),s=i,n=null},"onArrayBegin"),onArrayEnd:c(()=>{s=o.pop()},"onArrayEnd"),onLiteralValue:a,onError:c((i,d,u)=>{t.push({error:i,offset:d,length:u})},"onError")},r),s[0]}p(Ne,"Re"),c(Ne,"parse$1");function Be(e,t,r=te.DEFAULT){const n=Re(e,!1),s=[];let o=0;function a(j){return j?()=>o===0&&j(n.getTokenOffset(),n.getTokenLength(),n.getTokenStartLine(),n.getTokenStartCharacter()):()=>!0}p(a,"l"),c(a,"toNoArgVisit");function i(j){return j?O=>o===0&&j(O,n.getTokenOffset(),n.getTokenLength(),n.getTokenStartLine(),n.getTokenStartCharacter()):()=>!0}p(i,"g"),c(i,"toOneArgVisit");function d(j){return j?O=>o===0&&j(O,n.getTokenOffset(),n.getTokenLength(),n.getTokenStartLine(),n.getTokenStartCharacter(),()=>s.slice()):()=>!0}p(d,"m"),c(d,"toOneArgVisitWithPath");function u(j){return j?()=>{o>0?o++:j(n.getTokenOffset(),n.getTokenLength(),n.getTokenStartLine(),n.getTokenStartCharacter(),()=>s.slice())===!1&&(o=1)}:()=>!0}p(u,"k"),c(u,"toBeginVisit");function k(j){return j?()=>{o>0&&o--,o===0&&j(n.getTokenOffset(),n.getTokenLength(),n.getTokenStartLine(),n.getTokenStartCharacter())}:()=>!0}p(k,"w"),c(k,"toEndVisit");const f=u(t.onObjectBegin),v=d(t.onObjectProperty),w=k(t.onObjectEnd),b=u(t.onArrayBegin),E=k(t.onArrayEnd),m=d(t.onLiteralValue),g=i(t.onSeparator),T=a(t.onComment),l=i(t.onError),C=r&&r.disallowComments,S=r&&r.allowTrailingComma;function x(){for(;;){const j=n.scan();switch(n.getTokenError()){case 4:y(14);break;case 5:y(15);break;case 3:y(13);break;case 1:C||y(11);break;case 2:y(12);break;case 6:y(16);break}switch(j){case 12:case 13:C?y(10):T();break;case 16:y(1);break;case 15:case 14:break;default:return j}}}p(x,"v"),c(x,"scanNext");function y(j,O=[],Ae=[]){if(l(j),O.length+Ae.length>0){let Z=n.getToken();for(;Z!==17;){if(O.indexOf(Z)!==-1){x();break}else if(Ae.indexOf(Z)!==-1)break;Z=x()}}}p(y,"d"),c(y,"handleError");function _(j){const O=n.getTokenValue();return j?m(O):(v(O),s.push(O)),x(),!0}p(_,"L"),c(_,"parseString");function L(){switch(n.getToken()){case 11:const j=n.getTokenValue();let O=Number(j);isNaN(O)&&(y(2),O=0),m(O);break;case 7:m(null);break;case 8:m(!0);break;case 9:m(!1);break;default:return!1}return x(),!0}p(L,"B"),c(L,"parseLiteral");function P(){return n.getToken()!==10?(y(3,[],[2,5]),!1):(_(!1),n.getToken()===6?(g(":"),x(),Y()||y(4,[],[2,5])):y(5,[],[2,5]),s.pop(),!0)}p(P,"$"),c(P,"parseProperty");function B(){f(),x();let j=!1;for(;n.getToken()!==2&&n.getToken()!==17;){if(n.getToken()===5){if(j||y(4,[],[]),g(","),x(),n.getToken()===2&&S)break}else j&&y(6,[],[]);P()||y(4,[],[2,5]),j=!0}return w(),n.getToken()!==2?y(7,[2],[]):x(),!0}p(B,"N"),c(B,"parseObject");function Oe(){b(),x();let j=!0,O=!1;for(;n.getToken()!==4&&n.getToken()!==17;){if(n.getToken()===5){if(O||y(4,[],[]),g(","),x(),n.getToken()===4&&S)break}else O&&y(6,[],[]);j?(s.push(0),j=!1):s[s.length-1]++,Y()||y(4,[],[4,5]),O=!0}return E(),j||s.pop(),n.getToken()!==4?y(8,[4],[]):x(),!0}p(Oe,"$e"),c(Oe,"parseArray");function Y(){switch(n.getToken()){case 3:return Oe();case 1:return B();case 10:return _(!0);default:return L()}}return p(Y,"H"),c(Y,"parseValue"),x(),n.getToken()===17?r.allowEmptyContent?!0:(y(4,[],[]),!1):Y()?(n.getToken()!==17&&y(9,[],[]),!0):(y(4,[],[]),!1)}p(Be,"Pe"),c(Be,"visit");var We;(function(e){e[e.None=0]="None",e[e.UnexpectedEndOfComment=1]="UnexpectedEndOfComment",e[e.UnexpectedEndOfString=2]="UnexpectedEndOfString",e[e.UnexpectedEndOfNumber=3]="UnexpectedEndOfNumber",e[e.InvalidUnicode=4]="InvalidUnicode",e[e.InvalidEscapeCharacter=5]="InvalidEscapeCharacter",e[e.InvalidCharacter=6]="InvalidCharacter"})(We||(We={}));var Me;(function(e){e[e.OpenBraceToken=1]="OpenBraceToken",e[e.CloseBraceToken=2]="CloseBraceToken",e[e.OpenBracketToken=3]="OpenBracketToken",e[e.CloseBracketToken=4]="CloseBracketToken",e[e.CommaToken=5]="CommaToken",e[e.ColonToken=6]="ColonToken",e[e.NullKeyword=7]="NullKeyword",e[e.TrueKeyword=8]="TrueKeyword",e[e.FalseKeyword=9]="FalseKeyword",e[e.StringLiteral=10]="StringLiteral",e[e.NumericLiteral=11]="NumericLiteral",e[e.LineCommentTrivia=12]="LineCommentTrivia",e[e.BlockCommentTrivia=13]="BlockCommentTrivia",e[e.LineBreakTrivia=14]="LineBreakTrivia",e[e.Trivia=15]="Trivia",e[e.Unknown=16]="Unknown",e[e.EOF=17]="EOF"})(Me||(Me={}));const Kt=Ne;var Je;(function(e){e[e.InvalidSymbol=1]="InvalidSymbol",e[e.InvalidNumberFormat=2]="InvalidNumberFormat",e[e.PropertyNameExpected=3]="PropertyNameExpected",e[e.ValueExpected=4]="ValueExpected",e[e.ColonExpected=5]="ColonExpected",e[e.CommaExpected=6]="CommaExpected",e[e.CloseBraceExpected=7]="CloseBraceExpected",e[e.CloseBracketExpected=8]="CloseBracketExpected",e[e.EndOfFileExpected=9]="EndOfFileExpected",e[e.InvalidCommentToken=10]="InvalidCommentToken",e[e.UnexpectedEndOfComment=11]="UnexpectedEndOfComment",e[e.UnexpectedEndOfString=12]="UnexpectedEndOfString",e[e.UnexpectedEndOfNumber=13]="UnexpectedEndOfNumber",e[e.InvalidUnicode=14]="InvalidUnicode",e[e.InvalidEscapeCharacter=15]="InvalidEscapeCharacter",e[e.InvalidCharacter=16]="InvalidCharacter"})(Je||(Je={}));const de=c((e,t)=>Kt(Qt(t,e)),"readJsonc"),Ve=c(()=>{const{findPnpApi:e}=node_module__WEBPACK_IMPORTED_MODULE_1__;return e&&e(process.cwd())},"getPnpApi"),zt="detectTypeScriptVersion:",Ht=c((e,t)=>{const r=`${zt}${e}`,n=t?.get(r);if(n!==void 0)return n??void 0;let s;const o=Ve();if(o)try{s=o.resolveRequest("typescript/package.json",e)??void 0}catch{}s??=Q(node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(e),node_path__WEBPACK_IMPORTED_MODULE_2__.join("node_modules","typescript","package.json"),t);let a;if(s)try{const i=de(s,t);typeof i?.version=="string"&&(a=i.version)}catch{}return t?.set(r,a??null),a},"detectTypeScriptVersion"),N="package.json",ne="tsconfig.json",Xt=c((e,t,r)=>{const n=node_module__WEBPACK_IMPORTED_MODULE_1__.createRequire(node_path__WEBPACK_IMPORTED_MODULE_2__.join(r,"tsconfig.json"));if(e!==t)try{return n.resolve(e)}catch{}try{return n.resolve(t)}catch{}try{return n.resolve(`${t}/${N}`)}catch{}},"resolvePackageEntryWithNode"),me=c((e,t,r,n)=>{const s=`resolveFromPackageJsonPath:${e}:${t}:${r}`;if(n?.has(s))return n.get(s)||!1;const o=de(e,n);if(!o)return;let a=t||ne;if(!r&&o.exports)try{const[i]=Vt(o.exports,t,["require","types"]);a=i}catch{return n?.set(s,""),!1}else!t&&o.tsconfig&&(a=o.tsconfig);return a=node_path__WEBPACK_IMPORTED_MODULE_2__.join(e,"..",a),n?.set(s,a),a},"resolveFromPackageJsonPath"),Yt=c((e,t,r)=>{const n=`resolveExtendsPath:${e}:${t}`;if(r?.has(n))return r.get(n)||void 0;const s=Zt(e,t,r);return r?.set(n,s||""),s},"resolveExtendsPath"),Zt=c((e,t,r)=>{let n=e;if(e===".."&&(n=node_path__WEBPACK_IMPORTED_MODULE_2__.join(n,ne)),e[0]==="."&&(n=node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(t,n)),node_path__WEBPACK_IMPORTED_MODULE_2__.isAbsolute(n)){const m=D(r,n);if(m){if(m.isFile())return n}else if(!n.endsWith(".json")){const g=`${n}.json`;if(D(r,g))return g}return}const[s,...o]=e.split("/"),a=s[0]==="@"?`${s}/${o.shift()}`:s,i=o.join("/"),d=Ve();if(d){const{resolveRequest:m}=d;try{if(a===e){const g=m(node_path__WEBPACK_IMPORTED_MODULE_2__.join(a,N),t);if(g){const T=me(g,i,!1,r);if(T&&D(r,T))return T}}else{let g;try{g=m(e,t,{extensions:[".json"]})}catch{g=m(node_path__WEBPACK_IMPORTED_MODULE_2__.join(e,ne),t)}if(g)return g}}catch{}}const u=Xt(e,a,t);let k;if(u){if(node_path__WEBPACK_IMPORTED_MODULE_2__.basename(u)!==N&&u.endsWith(".json"))return u;k=node_path__WEBPACK_IMPORTED_MODULE_2__.basename(u)===N?u:Q(node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(u),N,r)}const f=k&&node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(k)||Q(node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(t),node_path__WEBPACK_IMPORTED_MODULE_2__.join("node_modules",a),r);if(!f||!D(r,f)?.isDirectory())return;const v=node_path__WEBPACK_IMPORTED_MODULE_2__.join(f,N);if(D(r,v)){const m=me(v,i,!1,r);if(m===!1)return;if(m&&D(r,m)?.isFile())return m}const w=node_path__WEBPACK_IMPORTED_MODULE_2__.join(f,i),b=w.endsWith(".json");if(!b){const m=`${w}.json`;if(D(r,m))return m}const E=D(r,w);if(E){if(E.isDirectory()){const m=node_path__WEBPACK_IMPORTED_MODULE_2__.join(w,N);if(D(r,m)){const T=me(m,"",!0,r);if(T&&D(r,T))return T}const g=node_path__WEBPACK_IMPORTED_MODULE_2__.join(w,ne);if(D(r,g))return g}else if(b)return w}},"resolveExtendsPathUncached"),he=Symbol("implicitBaseUrl"),U="${configDir}",ge=/^\.{1,2}(\/.*)?$/,re=c(e=>{const t=A(e);return ge.test(t)?t:`./${t}`},"normalizeRelativePath"),qt=c(e=>{const t={...e};if(t.strict){const r=["noImplicitAny","noImplicitThis","strictNullChecks","strictFunctionTypes","strictBindCallApply","strictPropertyInitialization","strictBuiltinIteratorReturn","alwaysStrict","useUnknownInCatchVariables"];for(const n of r)t[n]===void 0&&(t[n]=!0)}if(t.composite&&(t.declaration??=!0,t.incremental??=!0),t.target){let r=t.target.toLowerCase();r==="es2015"&&(r="es6"),t.target=r,r==="esnext"&&(t.module??="es6",t.useDefineForClassFields??=!0),(r==="es6"||r==="es2016"||r==="es2017"||r==="es2018"||r==="es2019"||r==="es2020"||r==="es2021"||r==="es2022"||r==="es2023"||r==="es2024"||r==="es2025")&&(t.module??="es6"),(r==="es2022"||r==="es2023"||r==="es2024"||r==="es2025")&&(t.useDefineForClassFields??=!0)}if(t.module){let r=t.module.toLowerCase();if(r==="es2015"&&(r="es6"),t.module=r,(r==="es6"||r==="es2020"||r==="es2022"||r==="esnext"||r==="none"||r==="system"||r==="umd"||r==="amd")&&(t.moduleResolution??="classic"),r==="system"&&(t.allowSyntheticDefaultImports??=!0),(r==="node16"||r==="node18"||r==="node20"||r==="nodenext"||r==="preserve")&&(t.esModuleInterop??=!0,t.allowSyntheticDefaultImports??=!0),(r==="node16"||r==="node18"||r==="node20"||r==="nodenext")&&(t.moduleDetection??="force"),(r==="node16"||r==="node18")&&(t.target??="es2022",t.moduleResolution??="node16"),r==="node20"&&(t.target??="es2023",t.moduleResolution??="node16",t.resolveJsonModule??=!0),r==="nodenext"&&(t.target??="esnext",t.moduleResolution??="nodenext",t.resolveJsonModule??=!0),r==="node16"||r==="node18"||r==="node20"||r==="nodenext"){const n=t.target;(n==="es3"||n==="es2022"||n==="es2023"||n==="es2024"||n==="esnext")&&(t.useDefineForClassFields??=!0)}r==="preserve"&&(t.moduleResolution??="bundler")}if(t.moduleResolution){let r=t.moduleResolution.toLowerCase();r==="node"&&(r="node10"),t.moduleResolution=r,(r==="node16"||r==="nodenext"||r==="bundler")&&(t.resolvePackageJsonExports??=!0,t.resolvePackageJsonImports??=!0),r==="bundler"&&(t.allowSyntheticDefaultImports??=!0,t.resolveJsonModule??=!0)}for(const r of["jsx","moduleDetection","importsNotUsedAsValues","newLine"])t[r]&&(t[r]=t[r].toLowerCase());return t.esModuleInterop&&(t.allowSyntheticDefaultImports??=!0),t.verbatimModuleSyntax&&(t.isolatedModules??=!0,t.preserveConstEnums??=!0),t.isolatedModules&&(t.preserveConstEnums??=!0),t.rewriteRelativeImportExtensions&&(t.allowImportingTsExtensions??=!0),t.lib&&(t.lib=t.lib.map(r=>r.toLowerCase())),t.checkJs&&(t.allowJs??=!0),t},"normalizeCompilerOptions"),en=c((e,t)=>{!t.has("target")&&!tn(e.module)&&(e.target="es3")},"applyV4Defaults"),tn=c(e=>e==="node16"||e==="node18"||e==="node20"||e==="nodenext","moduleDictatesTarget$1"),nn=c((e,t)=>{!t.has("target")&&!rn(e.module)&&(e.target="es5")},"applyV5Defaults"),rn=c(e=>e==="node16"||e==="node18"||e==="node20"||e==="nodenext","moduleDictatesTarget"),sn=c((e,t)=>{t.has("strict")||(e.strict=!0),t.has("target")||(e.target="es2025"),t.has("module")||(e.module="es2022"),t.has("moduleResolution")||(e.moduleResolution="bundler"),t.has("rootDir")||(e.rootDir="."),t.has("types")||(e.types=[]),t.has("noUncheckedSideEffectImports")||(e.noUncheckedSideEffectImports=!0),t.has("libReplacement")||(e.libReplacement=!1)},"applyV6Defaults"),on=[[4,en],[5,nn],[6,sn]],an=c(e=>{const t=/^v?(\d+)/.exec(e);return t?Number(t[1]):void 0},"parseMajor"),cn=c((e,t)=>{const r=an(t);if(r===void 0)return;const n=new Set(Object.keys(e));for(const[s,o]of on)s<=r&&o(e,n)},"applyVersionDefaults"),ke=c((e,t)=>re(node_path__WEBPACK_IMPORTED_MODULE_2__.relative(e,t)),"pathRelative"),Ge=["files","include","exclude"],Qe=c((e,t,r)=>{const n=node_path__WEBPACK_IMPORTED_MODULE_2__.join(t,r),s=node_path__WEBPACK_IMPORTED_MODULE_2__.relative(e,n);return A(s)||"./"},"resolveAndRelativize"),ln=c((e,t,r)=>{const n=node_path__WEBPACK_IMPORTED_MODULE_2__.relative(e,t);if(!n)return r;const s=r.startsWith("./")?r.slice(2):r;return A(`${n}/${s}`)},"prefixPattern"),Ke=["outDir","declarationDir"],se=c((e,t)=>{if(e.startsWith(U))return A(node_path__WEBPACK_IMPORTED_MODULE_2__.join(t,e.slice(U.length)))},"interpolateConfigDir"),pn=["outDir","declarationDir","outFile","rootDir","baseUrl","tsBuildInfoFile"],un=c((e,t={})=>{if(e.length===0)throw new Error("Chain must not be empty");const{typescriptVersion:r}=t,n=new Map(e.map(f=>[f.path,f])),s=new Map,o=c(f=>{const v=s.get(f);if(v)return v;const w=n.get(f);if(!w)throw new Error(`Config not found in chain: ${f}`);const b=w.config,E=node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(f);let m={...b,...b.compilerOptions&&{compilerOptions:{...b.compilerOptions}},...b.watchOptions&&{watchOptions:{...b.watchOptions}}};if(delete m.extends,m.compilerOptions?.paths&&!m.compilerOptions.baseUrl&&(m.compilerOptions[he]=E),b.extends){const g=Array.isArray(b.extends)?b.extends:[b.extends];for(const T of g.toReversed()){const l=o(T),C=node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(T),{references:S,...x}=l;if(x.compilerOptions){const _={...x.compilerOptions};for(const L of["baseUrl","outDir","declarationDir","rootDir"]){const P=_[L];P&&!P.startsWith(U)&&(_[L]=Qe(E,C,P))}for(const L of["rootDirs","typeRoots"]){const P=_[L];P&&(_[L]=P.map(B=>B.startsWith(U)?B:Qe(E,C,B)))}x.compilerOptions=_}for(const _ of Ge){const L=x[_];L&&(x[_]=L.map(P=>P.startsWith(U)?P:ln(E,C,P)))}const y={...x,...m,compilerOptions:{...x.compilerOptions,...m.compilerOptions}};x.watchOptions&&(y.watchOptions={...x.watchOptions,...m.watchOptions}),m=y}}if(m.compilerOptions){const{compilerOptions:g}=m,T=["baseUrl","rootDir"];for(const l of T){const C=g[l];if(C&&!C.startsWith(U)){const S=node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(E,C),x=ke(E,S);g[l]=x}}for(const l of Ke){let C=g[l];C&&(Array.isArray(m.exclude)||(m.exclude=Ke.map(S=>g[S]).filter(Boolean)),C.startsWith(U)||(C=re(C)),g[l]=C)}}else m.compilerOptions={};if(m.include&&(m.include=m.include.map(A)),m.files&&(m.files=m.files.map(g=>g.startsWith(U)?g:re(g))),m.watchOptions){const{watchOptions:g}=m;for(const T of["excludeDirectories","excludeFiles"])g[T]&&(g[T]=g[T].map(l=>A(node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(E,l))));for(const T of["watchFile","watchDirectory","fallbackPolling"])if(g[T]){const l=g;l[T]=g[T].toLowerCase()}}return s.set(f,m),m},"resolveEntry"),a=e[0],i=o(a.path),d=node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(a.path),u={...i,compilerOptions:i.compilerOptions?{...i.compilerOptions}:{}},{compilerOptions:k}=u;if(k){for(const f of pn){const v=k[f];if(v){const w=se(v,d);k[f]=w?ke(d,w):v}}for(const f of["rootDirs","typeRoots"]){const v=k[f];v&&(k[f]=v.map(w=>{const b=se(w,d);return b?ke(d,b):re(w)}))}if(k.paths){const f={};for(const[v,w]of Object.entries(k.paths))f[v]=w.map(b=>se(b,d)??b);k.paths=f}r&&cn(k,r),u.compilerOptions=qt(k)}for(const f of Ge){const v=u[f];v&&(u[f]=v.map(w=>se(w,d)??w))}return{path:a.path,config:u,sources:e.map(f=>f.path)}},"resolveExtendsChain"),fn=c((e,t={})=>{const{cache:r=new Map}=t,n=node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(e),s=[],o=new Set,a=c((i,d)=>{const u=A(i);if(o.has(u))return;o.add(u);let k;try{k=de(i,r)||{}}catch{throw new Error(`Cannot resolve tsconfig at path: ${i}`)}if(typeof k!="object")throw new SyntaxError(`Failed to parse tsconfig at: ${i}`);const f=node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(i);if(k.extends){const v=Array.isArray(k.extends),w=(v?k.extends:[k.extends]).map(E=>{const m=Yt(E,f,r);if(!m)throw new Error(`File '${E}' not found.`);const g=A(m);if(d.has(g)||g===u)throw new Error(`Circularity detected while resolving configuration: ${g}`);return g});k.extends=v?w:w[0],s.push({path:u,config:k});const b=new Set(d);b.add(u);for(const E of[...w].reverse())a(E,b)}else s.push({path:u,config:k})},"collect");return a(n,new Set),s},"getExtendsChain"),ye=c((e,t={})=>{const{cache:r=new Map,typescriptVersion:n="auto"}=t,s=fn(e,{cache:r});let o;return n==="auto"?o=Ht(node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(s[0].path),r):n!==!1&&(o=n),un(s,{typescriptVersion:o})},"readTsconfig");var dn=Object.defineProperty,oe=c((e,t)=>dn(e,"name",{value:t,configurable:!0}),"s");const ze=oe(e=>{let t="";for(let r=0;r<e.length;r+=1){const n=e[r],s=n.toUpperCase();t+=n===s?n.toLowerCase():s}return t},"invertCase"),be=new Map,He=oe((e,t)=>{const r=Object(function webpackMissingModule() { const e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(e,`.is-fs-case-sensitive-test-${process.pid}`);try{return t.writeFileSync(r,""),!t.existsSync(ze(r))}finally{try{t.unlinkSync(r)}catch{}}},"checkDirectoryCaseWithWrite"),mn=oe((e,t,r)=>{try{return He(e,r)}catch(n){if(t===void 0)return He(Object(function webpackMissingModule() { const e = new Error("Cannot find module 'os'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(),r);throw n}},"checkDirectoryCaseWithFallback"),hn=oe((e,t=Object(function webpackMissingModule() { const e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),r=!0)=>{const n=e??process.cwd();if(r&&be.has(n))return be.get(n);let s;const o=ze(n);return o!==n&&t.existsSync(n)?s=!t.existsSync(o):s=mn(n,e,t),r&&be.set(n,s),s},"isFsCaseSensitive"),{join:Xe}=node_path__WEBPACK_IMPORTED_MODULE_2__.posix,xe={ts:[".ts",".tsx",".d.ts"],cts:[".cts",".d.cts"],mts:[".mts",".d.mts"]},gn=c(e=>{const t=[...xe.ts],r=[...xe.cts],n=[...xe.mts];return e?.allowJs&&(t.push(".js",".jsx"),r.push(".cjs"),n.push(".mjs")),[...t,...r,...n]},"getSupportedExtensions"),kn=c(e=>{const t=[];if(!e)return t;const{outDir:r,declarationDir:n}=e;return r&&t.push(r),n&&t.push(n),t},"getDefaultExcludeSpec"),Ye=c(e=>e.replaceAll(/[.*+?^${}()|[\]\\]/g,String.raw`\$&`),"escapeForRegexp"),yn=["node_modules","bower_components","jspm_packages"],we=`(?!(${yn.join("|")})(/|$))`,bn=/(?:^|\/)[^.*?]+$/,Ze="**/*",ae="[^/]",ve="[^./]",qe=process.platform==="win32",xn=c(({config:e,path:t},r)=>{if("extends"in e)throw new Error("tsconfig#extends must be resolved. Use getTsconfig or readTsconfig to resolve it.");if(!node_path__WEBPACK_IMPORTED_MODULE_2__.isAbsolute(t))throw new Error("The tsconfig path must be absolute");qe&&(t=A(t));const n=node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(t),{files:s,include:o,exclude:a,compilerOptions:i}=e,d=c(E=>node_path__WEBPACK_IMPORTED_MODULE_2__.isAbsolute(E)?E:Xe(n,E),"resolvePattern"),u=s?new Set(s.map(d)):void 0,k=gn(i),f=r?"":"i",v=(a||kn(i)).map(E=>{const m=d(E),g=Ye(m).replaceAll(String.raw`\*\*/`,"(.+/)?").replaceAll(String.raw`\*`,`${ae}*`).replaceAll(String.raw`\?`,ae);return new RegExp(`^${g}($|/)`,f)}),w=s||o?o:[Ze],b=w?w.map(E=>{let m=d(E);bn.test(m)&&(m=Xe(m,Ze));const g=Ye(m).replaceAll(String.raw`/\*\*`,`(/${we}${ve}${ae}*)*?`).replaceAll(/(\/)?\\\*/g,(T,l)=>{const C=String.raw`(${ve}|(\.(?!min\.js$))?)*`;return l?`/${we}${ve}${C}`:C}).replaceAll(/(\/)?\\\?/g,(T,l)=>{const C=ae;return l?`/${we}${C}`:C});return new RegExp(`^${g}$`,f)}):void 0;return{filesSet:u,extensions:k,excludePatterns:v,includePatterns:b}},"compilePatterns"),et=new WeakMap,Ee=c((e,t)=>{if(!node_path__WEBPACK_IMPORTED_MODULE_2__.isAbsolute(t))return!1;qe&&(t=A(t));let r=et.get(e);r||(r=xn(e,hn()),et.set(e,r));const{filesSet:n,extensions:s,excludePatterns:o,includePatterns:a}=r;return n?.has(t)?!0:!s.some(i=>t.endsWith(i))||o.some(i=>i.test(t))?!1:!!(a&&a.some(i=>i.test(t)))},"isFileIncluded"),tt=c((e,t,r,n)=>{const s=node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(e);let o=A(e);for(;;){const a=Q(o,t,r);if(!a)return;const i=node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(a),d=ye(i,{cache:r,typescriptVersion:n});if(Ee(d,s))return d;const u=node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(a),k=node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(u);if(k===u)return;o=k}},"findConfigApplicable"),wn=c((e=process.cwd(),t={})=>{const{configName:r="tsconfig.json",cache:n=new Map,includes:s=!1}=t;if(!s){const o=node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(e);return node_path__WEBPACK_IMPORTED_MODULE_2__.basename(o)===r&&D(n,o)?.isFile()?A(o):Q(A(e),r,n)}return tt(e,r,n,!1)?.path},"findTsconfig"),vn=c((e=process.cwd(),t={})=>{const{configName:r="tsconfig.json",cache:n=new Map,includes:s=!1,typescriptVersion:o="auto"}=t;if(!s){const a=wn(e,{configName:r,cache:n});return a?ye(a,{cache:n,typescriptVersion:o}):void 0}return tt(e,r,n,o)},"getTsconfig"),En=/\*/g,nt=c((e,t)=>{const r=e.match(En);if(r&&r.length>1)throw new Error(t)},"assertStarCount"),Cn=c(e=>{if(e.includes("*")){const[t,r]=e.split("*");return{prefix:t,suffix:r}}return e},"parsePattern"),jn=c(({prefix:e,suffix:t},r)=>r.startsWith(e)&&r.endsWith(t),"isPatternMatch"),Tn=c((e,t,r)=>Object.entries(e).map(([n,s])=>(nt(n,`Pattern '${n}' can have at most one '*' character.`),{pattern:Cn(n),substitutions:s.map(o=>{if(nt(o,`Substitution '${o}' in pattern '${n}' can have at most one '*' character.`),!t&&!ge.test(o)&&!node_path__WEBPACK_IMPORTED_MODULE_2__.isAbsolute(o))throw new Error("Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?");return node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(r,o)})})),"parsePaths"),Sn=c(e=>{const{compilerOptions:t}=e.config;if(!t)return null;const{baseUrl:r,paths:n}=t;if(!r&&!n)return null;const s=he in t&&t[he],o=node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(e.path),r||s||"."),a=n?Tn(n,r,o):[],i=new Map,d=[];for(const u of a)typeof u.pattern=="string"?i.set(u.pattern,u.substitutions):d.push(u);return{exactEntries:i,patternEntries:d,resolvedBaseUrl:o,baseUrl:r}},"compilePaths"),rt=new WeakMap,st=c((e,t)=>{let r=rt.get(e);if(r===void 0&&(r=Sn(e),rt.set(e,r)),!r)return[];if(ge.test(t))return[];const{exactEntries:n,patternEntries:s,resolvedBaseUrl:o,baseUrl:a}=r,i=n.get(t);if(i)return i.map(A);let d,u=-1;for(const f of s)jn(f.pattern,t)&&f.pattern.prefix.length>u&&(u=f.pattern.prefix.length,d=f);if(!d)return a?[A(node_path__WEBPACK_IMPORTED_MODULE_2__.join(o,t))]:[];const k=t.slice(d.pattern.prefix.length,t.length-d.pattern.suffix.length);return d.substitutions.map(f=>A(f.replace("*",k)))},"resolvePathAlias"),ot=p(e=>{if(e)return ye(e);try{return vn()??void 0}catch{}},"loadTsconfig"),On=`
//# sourceMappingURL=data:application/json;base64,`,at=p(()=>process.sourceMapsEnabled??!0,"shouldApplySourceMap"),Ce=p(({code:e,map:t})=>e+On+Buffer.from(JSON.stringify(t),"utf8").toString("base64"),"inlineSourceMap"),K=Symbol.for("tsx:global-cjs-loader-count"),z=globalThis,An=p(()=>(z[K]??0)>0,"isGlobalCjsLoaderActive"),$n=p(()=>(z[K]=(z[K]??0)+1,()=>{z[K]=Math.max((z[K]??1)-1,0)}),"activateGlobalCjsLoader"),je=p(e=>e[0]==="."&&(e[1]==="/"||e[1]==="."||e[2]==="/"),"isRelativePath"),H=p(e=>je(e)||node_path__WEBPACK_IMPORTED_MODULE_2__.isAbsolute(e),"isFilePath"),ie="file://",Pn=[".ts",".tsx",".jsx",".mts",".cts"],it=/\.([cm]?ts|[tj]sx)($|\?)/,Dn=/\.(?:ts|tsx|jsx)($|\?)/,_n=/[/\\].+\.(?:cts|cjs)(?:$|\?)/,Ln=/\.json($|\?)/,ce=/\/(?:$|\?)/,Un=/^(?:@[^/]+\/)?[^/\\]+$/,ct=`${node_path__WEBPACK_IMPORTED_MODULE_2__.sep}node_modules${node_path__WEBPACK_IMPORTED_MODULE_2__.sep}`,le=Number(process.env.TSX_DEBUG);le&&(_index_gbaejti9_mjs__WEBPACK_IMPORTED_MODULE_9__.o.enabled=!0,_index_gbaejti9_mjs__WEBPACK_IMPORTED_MODULE_9__.o.supportLevel=3);const lt=p(e=>(t,...r)=>{if(!le||t>le)return;const n=`${(0,_index_gbaejti9_mjs__WEBPACK_IMPORTED_MODULE_9__.d)(` tsx P${process.pid} `)} ${e}`,s=r.map(o=>typeof o=="string"?o:(0,node_util__WEBPACK_IMPORTED_MODULE_8__.inspect)(o,{colors:!0})).join(" ");(0,node_fs__WEBPACK_IMPORTED_MODULE_4__.writeSync)(1,`${n} ${s}
`)},"createLog"),V=lt((0,_index_gbaejti9_mjs__WEBPACK_IMPORTED_MODULE_9__.b)((0,_index_gbaejti9_mjs__WEBPACK_IMPORTED_MODULE_9__.a)(" CJS "))),Fn=lt((0,_index_gbaejti9_mjs__WEBPACK_IMPORTED_MODULE_9__.c)(" ESM ")),F=new Map,Rn=p(async e=>{if(F.has(e))return F.get(e);if(!await node_fs__WEBPACK_IMPORTED_MODULE_4__.promises.access(e).then(()=>!0,()=>!1)){F.set(e,void 0);return}const r=await node_fs__WEBPACK_IMPORTED_MODULE_4__.promises.readFile(e,"utf8");try{const n=JSON.parse(r);return F.set(e,n),n}catch{throw new Error(`Error parsing: ${e}`)}},"readPackageJson"),In=p(e=>{if(F.has(e))return F.get(e);if(!node_fs__WEBPACK_IMPORTED_MODULE_4__.existsSync(e)){F.set(e,void 0);return}const t=node_fs__WEBPACK_IMPORTED_MODULE_4__.readFileSync(e,"utf8");try{const r=JSON.parse(t);return F.set(e,r),r}catch{throw new Error(`Error parsing: ${e}`)}},"readPackageJsonSync"),Nn=p(async e=>{let t=new URL("package.json",e);for(;!t.pathname.endsWith("/node_modules/package.json");){const r=(0,node_url__WEBPACK_IMPORTED_MODULE_3__.fileURLToPath)(t),n=await Rn(r);if(n)return n;const s=t;if(t=new URL("../package.json",t),t.pathname===s.pathname)break}},"findPackageJson"),pt=p(e=>{let t=new URL("package.json",e);for(;!t.pathname.endsWith("/node_modules/package.json");){const r=(0,node_url__WEBPACK_IMPORTED_MODULE_3__.fileURLToPath)(t),n=In(r);if(n)return n;const s=t;if(t=new URL("../package.json",t),t.pathname===s.pathname)break}},"findPackageJsonSync"),Bn=p(async e=>(await Nn(e))?.type??"commonjs","getPackageType"),Wn=p(e=>pt(e)?.type??"commonjs","getPackageTypeSync"),Mn=p(e=>pt(e)?.type,"getNearestPackageTypeSync"),ut=[".js",".json"],ft=[".ts",".tsx",".jsx"],Jn=[...ft,...ut],Vn=[...ut,...ft],X=Object.create(null);X[".js"]=[".ts",".tsx",".js",".jsx"],X[".jsx"]=[".tsx",".ts",".jsx",".js"],X[".cjs"]=[".cts"],X[".mjs"]=[".mts"];const Gn=new Set([".ts",".tsx",".mts",".cts"]),dt=p(e=>{const t=e.split("?"),r=t[1]?`?${t[1]}`:"",[n]=t,s=node_path__WEBPACK_IMPORTED_MODULE_2__.extname(n);if(Gn.has(s))return;const o=[],a=X[s];if(a){const d=n.slice(0,-s.length);return o.push(...a.map(u=>d+u+r)),o}const i=!(e.startsWith(ie)||H(n))||n.includes(ct)||n.includes("/node_modules/")?Vn:Jn;return o.push(...i.map(d=>n+d+r)),o},"mapTsExtensions"),Te=p(e=>Array.from(e).length>0?`?${e.toString()}`:"","urlSearchParamsStringify"),Qn=[".cts",".mts",".ts",".tsx",".jsx"],Kn=[".js",".cjs",".mjs"],mt=[".ts",".tsx",".jsx"],ht="module.exports",zn=p(e=>{const t=node_path__WEBPACK_IMPORTED_MODULE_2__.extname(e);return t===".mjs"||t===".mts"||(t===".js"||t===".ts")&&Mn((0,node_url__WEBPACK_IMPORTED_MODULE_3__.pathToFileURL)(e).toString())!=="commonjs"},"isRequireEsmCandidate"),Se=p((e,t,r,n)=>{const s=Object.getOwnPropertyDescriptor(e,t);s?.set?e[t]=r:(!s||s.configurable)&&Object.defineProperty(e,t,{value:r,enumerable:s?.enumerable||n?.enumerable,writable:n?.writable??(s?s.writable:!0),configurable:n?.configurable??(s?s.configurable:!0)})},"safeSet"),Hn=p((e,t,r,n)=>{const s=t[".js"],o=(0,_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_10__.i)(_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_10__.r),a=p((i,d)=>{if(e.enabled===!1)return s(i,d);const[u,k]=d.split("?");if((new URLSearchParams(k).get("namespace")??void 0)!==n)return s(i,d);V(2,"load",{filePath:d}),i.id.startsWith("data:text/javascript,")&&(i.path=node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(u)),_client_D_mPDF5S_mjs__WEBPACK_IMPORTED_MODULE_7__.p?.send&&_client_D_mPDF5S_mjs__WEBPACK_IMPORTED_MODULE_7__.p.send({type:"dependency",path:u});const v=Qn.some(l=>u.endsWith(l)),w=Kn.some(l=>u.endsWith(l));if(!v&&!w)return s(i,u);let b=node_fs__WEBPACK_IMPORTED_MODULE_4__.readFileSync(u,"utf8");const E=w&&!u.endsWith(".cjs")&&!u.endsWith(".cts")&&(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_6__.i)(b),m=(v||E)&&r&&Ee(r,u)?r.config:void 0;if(u.endsWith(".cjs")){const l=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_6__.b)(d,b);l&&(b=at()?Ce(l):l.code)}else if(v||E){const l=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_6__.a)(b,d,{tsconfigRaw:m});b=at()?Ce(l):l.code}V(1,"loaded",{filePath:u}),i._compile(b,u),k&&node_module__WEBPACK_IMPORTED_MODULE_1__._cache[u]===i&&(node_module__WEBPACK_IMPORTED_MODULE_1__._cache[d]=i,delete node_module__WEBPACK_IMPORTED_MODULE_1__._cache[u]);const{exports:g}=i;(o&&g&&(typeof g=="object"||typeof g=="function")?Object.getOwnPropertyDescriptor(g,ht):void 0)?.get&&zn(u)&&(i.exports=g[ht])},"transformer");Se(t,".js",a);for(const i of mt)Se(t,i,a,{enumerable:!n,writable:!0,configurable:!0});return Se(t,".mjs",a,{writable:!0,configurable:!0}),()=>{t[".js"]===a&&(t[".js"]=s);for(const i of[...mt,".mjs"])t[i]===a&&delete t[i]}},"createExtensions"),Xn=p(e=>t=>{if((t==="."||t===".."||t.endsWith("/.."))&&(t+="/"),ce.test(t)){let r=node_path__WEBPACK_IMPORTED_MODULE_2__.join(t,"index");t.startsWith("./")&&(r=`./${r}`);try{return e(r)}catch{}}try{return e(t)}catch(r){const n=r;if(n.code==="MODULE_NOT_FOUND")try{return e(`${t}${node_path__WEBPACK_IMPORTED_MODULE_2__.sep}index`)}catch{}throw n}},"createImplicitResolver"),Yn=p((e,t)=>{let r;return node_path__WEBPACK_IMPORTED_MODULE_2__.isAbsolute(e)?r=e:je(e)&&t&&(r=node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(t,e)),r!==void 0&&!(0,node_fs__WEBPACK_IMPORTED_MODULE_4__.existsSync)(r)},"candidateDoesntExist"),pe=p((e,t,r,n,s)=>{if(V(3,"resolveTsFilename",{request:t,isDirectory:ce.test(t),isTsParent:n,allowJs:s}),ce.test(t)||!n&&!s)return;const o=dt(t);if(o){for(const a of o)if(!Yn(a,r))try{return e(a)}catch(i){const{code:d}=i;if(d!=="MODULE_NOT_FOUND"&&d!=="ERR_PACKAGE_PATH_NOT_EXPORTED")throw i}}},"resolveTsFilename"),Zn=p((e,t,r,n)=>s=>{if(V(3,"resolveTsFilename",{request:s,isTsParent:r,isFilePath:H(s)}),H(s)){const o=pe(e,s,t,r,n);if(o)return o}try{return e(s)}catch(o){const a=o;if(a.code==="MODULE_NOT_FOUND"){if(a.path){const d=a.message.match(/^Cannot find module '([^']+)'$/);if(d){const k=d[1],f=pe(e,k,t,r,n);if(f)return f}const u=a.message.match(/^Cannot find module '([^']+)'. Please verify that the package.json has a valid "main" entry$/);if(u){const k=u[1],f=pe(e,k,t,r,n);if(f)return f}}const i=pe(e,s,t,r,n);if(i)return i}throw a}},"createTsExtensionResolver"),gt="at cjsPreparseModuleExports (node:internal",qn=p(e=>{const t=e.stack.split(`
`).slice(1);return t[1].includes(gt)||t[2].includes(gt)},"isFromCjsLexer"),er=p((e,t)=>{const r=e.split("?"),n=new URLSearchParams(r[1]);if(t?.filename){const s=De(t.filename);let o;if(s){const d=s.split("?"),u=d[0];o=d[1];const f=new URLSearchParams(o).get("namespace");t.filename=u,t.path=node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(u),t.paths=node_module__WEBPACK_IMPORTED_MODULE_1__._nodeModulePaths(t.path),f||(node_module__WEBPACK_IMPORTED_MODULE_1__._cache[u]=t)}o||(o=t.filename.split("?")[1]);const i=new URLSearchParams(o).get("namespace");i&&n.append("namespace",i)}return[r[0],n,(s,o)=>(node_path__WEBPACK_IMPORTED_MODULE_2__.isAbsolute(s)&&!s.endsWith(".json")&&!s.endsWith(".node")&&!(o===0&&qn(new Error))&&(s+=Te(n)),s)]},"preserveQuery"),tr=p((e,t,r,n)=>{if(e.startsWith(ie)&&(e=(0,node_url__WEBPACK_IMPORTED_MODULE_3__.fileURLToPath)(e)),n&&!H(e)&&!t?.filename?.includes(ct)){const s=st(n,e);for(const o of s)try{return r(o)}catch{}}return r(e)},"resolveTsPaths"),nr=p((e,t,r,n)=>(s,o,...a)=>{if(e.enabled===!1)return t(s,o,...a);s=_e(s);const[i,d,u]=er(s,o);if((d.get("namespace")??void 0)!==n)return t(s,o,...a);V(2,"resolve",{request:s,parent:o?.filename??o,restOfArgs:a});let k=p(v=>t(v,o,...a),"nextResolveSimple");k=Zn(k,o?.path??void 0,!!(n||o?.filename&&it.test(o.filename)),r?.config.compilerOptions?.allowJs??!1),k=Xn(k);const f=u(tr(i,o,k,r),a.length);return V(1,"resolved",{request:s,parent:o?.filename??o,resolved:f}),f},"createResolveFilename"),kt=p((e,t)=>{if(!t)throw new Error("The current file path (__filename or import.meta.url) must be provided in the second argument of tsx.require()");return e.startsWith(".")?((typeof t=="string"&&t.startsWith(ie)||t instanceof URL)&&(t=(0,node_url__WEBPACK_IMPORTED_MODULE_3__.fileURLToPath)(t)),node_path__WEBPACK_IMPORTED_MODULE_2__.resolve(node_path__WEBPACK_IMPORTED_MODULE_2__.dirname(t),e)):e},"resolveContext"),rr=p(e=>{const{sourceMapsEnabled:t}=process,r={enabled:!0},n=ot(process.env.TSX_TSCONFIG_PATH);process.setSourceMapsEnabled(!0);const s=node_module__WEBPACK_IMPORTED_MODULE_1__._resolveFilename,o=nr(r,s,n,e?.namespace);node_module__WEBPACK_IMPORTED_MODULE_1__._resolveFilename=o;const a=Hn(r,node_module__WEBPACK_IMPORTED_MODULE_1__._extensions,n,e?.namespace),i=e?.namespace?void 0:$n(),d=p(()=>{t===!1&&process.setSourceMapsEnabled(!1),r.enabled=!1,node_module__WEBPACK_IMPORTED_MODULE_1__._resolveFilename===o&&(node_module__WEBPACK_IMPORTED_MODULE_1__._resolveFilename=s),a(),i?.()},"unregister");if(e?.namespace){const u=p((f,v)=>{const w=kt(f,v),[b,E]=w.split("?"),m=new URLSearchParams(E);return e.namespace&&!b.startsWith("node:")&&m.set("namespace",e.namespace),(0,_get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_0__.r)(b+Te(m))},"scopedRequire");d.require=u;const k=p((f,v,w)=>{const b=kt(f,v),[E,m]=b.split("?"),g=new URLSearchParams(m);return e.namespace&&!E.startsWith("node:")&&g.set("namespace",e.namespace),o(E+Te(g),module,!1,w)},"scopedResolve");d.resolve=k,d.unregister=d}return d},"register");


/***/ },

/***/ "./node_modules/tsx/dist/register-zZ7SWseA.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/tsx/dist/register-zZ7SWseA.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ Ke),
/* harmony export */   b: () => (/* binding */ at),
/* harmony export */   c: () => (/* binding */ Ve),
/* harmony export */   d: () => (/* binding */ pt),
/* harmony export */   e: () => (/* binding */ De),
/* harmony export */   r: () => (/* binding */ vt)
/* harmony export */ });
/* harmony import */ var node_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:module */ "node:module");
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:worker_threads */ "node:worker_threads");
/* harmony import */ var _node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node-features-JeyyvQz6.mjs */ "./node_modules/tsx/dist/node-features-JeyyvQz6.mjs");
/* harmony import */ var _register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./register-HWZIKnmC.mjs */ "./node_modules/tsx/dist/register-HWZIKnmC.mjs");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! node:fs/promises */ "node:fs/promises");
/* harmony import */ var _index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index-CQhDiIsg.mjs */ "./node_modules/tsx/dist/index-CQhDiIsg.mjs");
/* harmony import */ var _client_D_mPDF5S_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./client-D_mPDF5S.mjs */ "./node_modules/tsx/dist/client-D_mPDF5S.mjs");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! node:path */ "node:path");
var _e=Object.defineProperty;var i=(e,s)=>_e(e,"name",{value:s,configurable:!0});const De=i(()=>({active:!0,parsedTsconfig:void 0}),"createDefaultData"),de=i(e=>{const s={active:!0,namespace:e?.namespace,onImport:e?.onImport,parsedTsconfig:void 0,port:e?.port,tsconfig:e?.tsconfig};return e?.tsconfig!==!1&&(s.parsedTsconfig=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.l)(e?.tsconfig??process.env.TSX_TSCONFIG_PATH)),s},"createData"),Ve=i(e=>async s=>{if(!s)throw new Error(`tsx must be loaded with --import instead of --loader
The --loader flag was deprecated in Node v20.6.0 and v18.19.0`);Object.assign(e,de(s)),s.port&&s.port.on("message",t=>{t==="deactivate"&&(e.active=!1,s.port.postMessage({type:"deactivated"}))})},"createInitialize"),Ke=i(e=>()=>(e.parsedTsconfig=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.l)(process.env.TSX_TSCONFIG_PATH),"process.setSourceMapsEnabled(true);"),"createGlobalPreload"),Ye=i(e=>{const{pathname:s}=new URL(e),t=node_path__WEBPACK_IMPORTED_MODULE_9__.extname(s);if(t===".mts"||t===".mjs")return"module";if(t===".cts"||t===".cjs")return"commonjs";if(t===".js"||_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.t.includes(t))return (0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.g)(e)},"getFormatFromFileUrl"),Ze=i(e=>{const{pathname:s}=new URL(e),t=node_path__WEBPACK_IMPORTED_MODULE_9__.extname(s);if(t===".mts"||t===".mjs")return"module";if(t===".cts"||t===".cjs")return"commonjs";if(t===".js"||_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.t.includes(t))return (0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.a)(e)},"getFormatFromFileUrlSync"),U="tsx-namespace=",M="tsx-commonjs-export-preparse",ue=`${M}=1`,C="tsx-commonjs-virtual-query",W=new Map,K=i((e,s)=>e.slice(1).split("&").filter(t=>t&&s.every(r=>!t.startsWith(r))).join("&"),"getQueryWithoutParameters"),B=i((e,s)=>{const t=K(e,s);return t?`?${t}`:""},"getSearchWithoutParameters"),ke=i(e=>e.replaceAll(/\/\*[\s\S]*?\*\/|\/\/[^\n\r]*/g,""),"stripComments"),xe=i(e=>{const s=ke(e);if(/^\s*export\s*\*/.test(s))return"named";if(/^\s*import\s*\*\s*as\s+[\w$]+/.test(s))return"namespace";const t=s.match(/\{([^}]*)\}/)?.[1];if(t)return t.split(",").some(r=>{const o=r.trim().split(/\s+as\s+/)[0];return!!(o&&o!=="default")})?"named":void 0},"getCommonJsImportBinding"),et=i((e,s,t)=>{const r=W.get(e);if(!r)return!1;try{const[o]=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.p)(r);return o.some(a=>{if(a.d!==-1||a.n!==s)return!1;const m=xe(r.slice(a.ss,a.s));return m==="named"||t&&m==="namespace"})}catch{return!1}},"parentImportsCommonJsExports"),v=i(e=>{const s=e.indexOf(U);if(s===-1)return;const t=e[s-1];if(t!=="?"&&t!=="&")return;const r=s+U.length,o=e.indexOf("&",r);return o===-1?e.slice(r):e.slice(r,o)},"getNamespace"),fe=(0,_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_2__.i)(_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_2__.b)?"importAttributes":"importAssertions",pe=i(e=>e==="commonjs"||e==="commonjs-typescript","isCommonJsFormat"),he=i(e=>e==="module-typescript"||e==="typescript","isModuleTypeScriptFormat"),tt=(0,_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_2__.i)(_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_2__.e),st=[`${C}=`],q=[`${M}=`,`${C}=`],w=i((e,s)=>s.parsedTsconfig&&(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.k)(s.parsedTsconfig,e)?s.parsedTsconfig.config:void 0,"getTsconfigRaw"),rt=i(e=>{if(!e.searchParams.has(C))return;const{pathname:s}=e,t=s.toLowerCase().lastIndexOf("%3f");if(t===-1)return;const r=new URL(e);return r.pathname=s.slice(0,t),r.search="",(0,node_url__WEBPACK_IMPORTED_MODULE_4__.fileURLToPath)(r)},"getFilePathFromVirtualQuery"),Y=i(e=>{const s=e.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m)?new URL(e):void 0,t=s?(0,node_url__WEBPACK_IMPORTED_MODULE_4__.fileURLToPath)(s):e,r=s&&rt(s),o=r||t,a=s&&r?(0,node_url__WEBPACK_IMPORTED_MODULE_4__.pathToFileURL)(o).toString()+B(s.search,st):e;return{fileUrl:s,filePath:o,loadUrl:a}},"getFileLoadContext"),ge=i((e,s)=>{if(!s?.search)return e;const t=B(s.search,q);return t?(0,node_url__WEBPACK_IMPORTED_MODULE_4__.pathToFileURL)(e).toString()+t:e},"getTransformPath"),ye=i((e,s,t)=>{const r=[...s?K(s.search,[U,...q]).split("&").filter(Boolean):[],...t?[`namespace=${encodeURIComponent(t)}`]:[]].join("&");return r?`${e}?${r}`:e},"getFilePathWithQuery"),ot=new TextDecoder,Pe=i(e=>typeof e=="string"?e:ot.decode(e),"decodeSource"),nt=i((e,s)=>{const t=new URL(s),r=s.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m)?Y(s).filePath:void 0;t.searchParams.delete("tsx-namespace"),t.searchParams.delete(M),t.searchParams.delete(C),r&&(t.pathname=new URL((0,node_url__WEBPACK_IMPORTED_MODULE_4__.pathToFileURL)(r)).pathname);const o=t.toString();return e.port&&e.port.postMessage({type:"load",url:o}),e.onImport?.(o),o},"notifyLoad"),Se=i((e,s)=>{if(!e.active)return!1;const t=v(s);if(e.namespace!==t)return!1;const r=nt(e,s);return _client_D_mPDF5S_mjs__WEBPACK_IMPORTED_MODULE_8__.p.send&&_client_D_mPDF5S_mjs__WEBPACK_IMPORTED_MODULE_8__.p.send({type:"dependency",path:r}),!0},"prepareLoad"),Re=i((e,s)=>{if(!_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.n.test(e))return s;const t=s[fe];return t?.type?s:{...s,[fe]:{...t,type:"json"}}},"prepareJsonAttributes"),Z=i(({conditions:e})=>e?.includes("require")===!0&&!e.includes("import"),"isCommonJsRequireContext$1"),at=i(e=>{const s=i(async(t,r,o)=>{if(!Se(e,t))return o(t,r);const a=v(t),{fileUrl:m,filePath:c,loadUrl:n}=Y(t),u=Re(n,r),l=await o(n,u);(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"loaded by next loader",{url:t,loadUrl:n,loaded:l});const y=m?.searchParams.has(M)===!0,P=l.format,j=m?new URL((0,node_url__WEBPACK_IMPORTED_MODULE_4__.pathToFileURL)(c)):void 0;if(j&&m&&(j.search=B(m.search,q)),pe(P)&&m&&l.responseURL?.startsWith("file:")&&!c.endsWith(".cjs")){const f=await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_6__.readFile)((0,node_url__WEBPACK_IMPORTED_MODULE_4__.pathToFileURL)(c),"utf8"),b=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.i)(f);if(P==="commonjs-typescript"||!c.endsWith(".js")||b){if(!tt){if(y&&b&&_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.e.test(c)){const J=await (0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.t)(f,c,{define:{"import.meta.url":JSON.stringify(j.toString())},tsconfigRaw:w(c,e)});return W.set(t,J.code),{format:"module",source:(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.f)(J)}}return l}if(!a&&!y&&!c.endsWith(".cts"))return l;const ee=!!(a||y||B(m.search,q)),te=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.a)(f,ge(c,m),{cjsBanner:ee?`require = require("node:module").createRequire(${JSON.stringify((0,node_url__WEBPACK_IMPORTED_MODULE_4__.pathToFileURL)(c).toString())});`:void 0,tsconfigRaw:w(c,e)});if(l.format="commonjs",l.source=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.f)(te),ee){const J=ye(c,m,a);l.responseURL=`data:text/javascript,${encodeURIComponent(te.code)}?filePath=${encodeURIComponent(J)}`}return (0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"returning CJS export annotation",l),l}}if(!l.source)return l;const p=Pe(l.source),$=P==="json"&&!Z(r);if(P==="commonjs-typescript"){const f=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.a)(p,c,{tsconfigRaw:w(c,e)});return{...l,format:"commonjs",source:(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.f)(f)}}if($||he(P)||_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.h.test(t)){const f=await (0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.t)(p,c,{tsconfigRaw:w(c,e)});return W.set(t,f.code),{format:"module",source:(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.f)(f)}}if(l.format==="module"){const f=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.b)(c,p);f?(l.source=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.f)(f),W.set(t,f.code)):W.set(t,p)}return l},"load");return _register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.d?async(t,r,o)=>{(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(2,"load",{url:t,context:r});const a=await s(t,r,o);return (0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(1,"loaded",{url:t,result:a}),a}:s},"createLoad"),ct=i(e=>{const s=i((t,r,o)=>{if(Z(r)&&(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.j)()||!Se(e,t))return o(t,r);const a=v(t),{fileUrl:m,filePath:c,loadUrl:n}=Y(t),u=Re(n,r),l=o(n,u);(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"loaded by next loader",{url:t,loadUrl:n,loaded:l});const y=l.format;if(pe(y)&&(0,_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_2__.i)(_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_2__.e)&&l.responseURL?.startsWith("file:")&&!c.endsWith(".cjs")){const p=(0,node_fs__WEBPACK_IMPORTED_MODULE_5__.readFileSync)((0,node_url__WEBPACK_IMPORTED_MODULE_4__.pathToFileURL)(c),"utf8");if(y==="commonjs-typescript"||!c.endsWith(".js")||(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.i)(p)){const $=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.a)(p,ge(c,m),{tsconfigRaw:w(c,e)}),f=!a&&(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.j)(),b=ye(c,m,a);return l.format="commonjs",l.shouldBeReloadedByCJSLoader=f,l.source=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.f)($),f||(l.responseURL=`data:text/javascript,${encodeURIComponent($.code)}?filePath=${encodeURIComponent(b)}`),(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"returning CJS export annotation",l),l}}if(!l.source)return l;const P=Pe(l.source),j=y==="json"&&!Z(r);if(y==="commonjs-typescript"){const p=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.a)(P,c,{tsconfigRaw:w(c,e)});return{...l,format:"commonjs",shouldBeReloadedByCJSLoader:!1,source:(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.f)(p)}}if(j||he(y)||_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.h.test(t)){const p=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.c)(P,c,{tsconfigRaw:w(c,e)});return{format:"module",source:(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.f)(p)}}if(l.format==="module"){const p=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.b)(c,P);p&&(l.source=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.f)(p))}return l},"load");return _register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.d?(t,r,o)=>{(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(2,"loadSync",{url:t,context:r});const a=s(t,r,o);return (0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(1,"loadedSync",{url:t,result:a}),a}:s},"createLoadSync"),it=(0,_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_2__.i)(_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_2__.e),mt=/^(?:[a-z][\d+.a-z-]*:\/\/|data:|file:|node:)/i,Ue=i(e=>!(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.o)(e)&&!mt.test(e),"isTsconfigPathAliasSpecifier"),Q=i(e=>{if(e.url)return e.url;const s=e.message.match(/^Cannot find module '([^']+)'/);if(s){const[,r]=s;return r}const t=e.message.match(/^Cannot find package '([^']+)'/);if(t){const[,r]=t;if(!node_path__WEBPACK_IMPORTED_MODULE_9__.isAbsolute(r))return;const o=(0,node_url__WEBPACK_IMPORTED_MODULE_4__.pathToFileURL)(r);if(o.pathname.endsWith("/")&&(o.pathname+="package.json"),o.pathname.endsWith("/package.json")){const a=(0,_index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_7__.r)(o);if(a?.main)return new URL(a.main,o).toString()}else return o.toString()}},"getMissingPathFromNotFound"),H=i(e=>e==="ERR_MODULE_NOT_FOUND"||e==="MODULE_NOT_FOUND","isModuleNotFound"),ve=i(e=>e.conditions.includes("require")&&!e.conditions.includes("import"),"isCommonJsRequireContext"),lt=i((e,s)=>{const[t]=e.split("?");try{if(t.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m))return (0,node_url__WEBPACK_IMPORTED_MODULE_4__.fileURLToPath)(t);if(node_path__WEBPACK_IMPORTED_MODULE_9__.isAbsolute(t))return t;if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.s)(t)&&s?.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m))return (0,node_url__WEBPACK_IMPORTED_MODULE_4__.fileURLToPath)(new URL(t,s))}catch{}},"getProbeFilePath"),we=i((e,s)=>{const t=lt(e,s);return t!==void 0&&!(0,node_fs__WEBPACK_IMPORTED_MODULE_5__.existsSync)(t)},"candidateDoesntExist"),G=i(async(e,s,t,r)=>{const o=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.q)(e);if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveExtensions",{url:e,context:s,throwError:r,tryPaths:o}),!o)return;let a;for(const m of o)if(!we(m,s.parentURL))try{return await t(m,s)}catch(c){const{code:n}=c;if(!H(n)&&n!=="ERR_PACKAGE_PATH_NOT_EXPORTED")throw c;a=c}if(r){if(a===void 0)return t(o[0],s);throw a}},"resolveExtensions"),_=i((e,s,t,r)=>{const o=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.q)(e);if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveExtensionsSync",{url:e,context:s,throwError:r,tryPaths:o}),!o)return;let a;for(const m of o)if(!we(m,s.parentURL))try{return t(m,s)}catch(c){const{code:n}=c;if(!H(n)&&n!=="ERR_PACKAGE_PATH_NOT_EXPORTED")throw c;a=c}if(r){if(a===void 0)return t(o[0],s);throw a}},"resolveExtensionsSync"),dt=i(async(e,s,t,r)=>{const o=r.parsedTsconfig?.config.compilerOptions?.allowJs??!1;if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveBase",{specifier:e,context:s,specifierStartsWithFileUrl:e.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m),isRelativePath:(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.s)(e),tsExtensionsPattern:_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.h.test(s.parentURL),allowJs:o}),(e.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m)||(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.s)(e))&&(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.h.test(s.parentURL)||o)){const a=await G(e,s,t);if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveBase resolved",{specifier:e,context:s,resolved:a}),a)return a}try{return await t(e,s)}catch(a){if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveBase error",{specifier:e,context:s,error:a}),a instanceof Error){const m=a;if(H(m.code)){const c=Q(m);if(c){const n=await G(c,s,t);if(n)return n}}}throw a}},"resolveBase"),k=i((e,s,t,r)=>{const o=r.parsedTsconfig?.config.compilerOptions?.allowJs??!1;if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveBaseSync",{specifier:e,context:s,specifierStartsWithFileUrl:e.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m),isRelativePath:(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.s)(e),tsExtensionsPattern:_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.h.test(s.parentURL),allowJs:o}),(e.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m)||(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.s)(e))&&(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.h.test(s.parentURL)||o)){const a=_(e,s,t);if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveBaseSync resolved",{specifier:e,context:s,resolved:a}),a)return a}try{return t(e,s)}catch(a){if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveBaseSync error",{specifier:e,context:s,error:a}),a instanceof Error){const m=a;if(H(m.code)){const c=Q(m);if(c){const n=_(c,s,t);if(n)return n}}}throw a}},"resolveBaseSync"),Te=i(async(e,s,t,r)=>{if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveDirectory",{specifier:e,context:s,isDirectory:_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.p.test(e)}),(e==="."||e===".."||e.endsWith("/.."))&&(e+="/"),_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.p.test(e)){const o=new URL(e,s.parentURL);return o.pathname=node_path__WEBPACK_IMPORTED_MODULE_9__.join(o.pathname,"index"),await G(o.toString(),s,t,!0)}try{return await dt(e,s,t,r)}catch(o){if(o instanceof Error){(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveDirectory error",{specifier:e,context:s,error:o});const a=o;if(a.code==="ERR_UNSUPPORTED_DIR_IMPORT"){const m=Q(a);if(m)try{return await G(`${m}/index`,s,t,!0)}catch(c){const n=c,{message:u}=n;throw n.message=n.message.replace(`${"/index".replace("/",node_path__WEBPACK_IMPORTED_MODULE_9__.sep)}'`,"'"),n.stack=n.stack.replace(u,n.message),n}}}throw o}},"resolveDirectory"),Le=i((e,s,t,r)=>{if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveDirectorySync",{specifier:e,context:s,isDirectory:_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.p.test(e)}),(e==="."||e===".."||e.endsWith("/.."))&&(e+="/"),_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.p.test(e)){const o=ve(s);if(o&&!(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.o)(e))return k(e,s,t,r);const a=new URL(e,s.parentURL);return a.pathname=node_path__WEBPACK_IMPORTED_MODULE_9__.join(a.pathname,"index"),o?_((0,node_url__WEBPACK_IMPORTED_MODULE_4__.fileURLToPath)(a),s,t,!1)??k(e,s,t,r):_(a.toString(),s,t,!0)}try{return k(e,s,t,r)}catch(o){if(o instanceof Error){(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveDirectorySync error",{specifier:e,context:s,error:o});const a=o;if(a.code==="ERR_UNSUPPORTED_DIR_IMPORT"){const m=Q(a);if(m)try{return _(`${m}/index`,s,t,!0)}catch(c){const n=c,{message:u}=n;throw n.message=n.message.replace(`${"/index".replace("/",node_path__WEBPACK_IMPORTED_MODULE_9__.sep)}'`,"'"),n.stack=n.stack.replace(u,n.message),n}}}throw o}},"resolveDirectorySync"),ut=i(async(e,s,t,r)=>{const o=Ue(e);if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveTsPaths",{specifier:e,context:s,tsconfigPathAliasSpecifier:o,tsconfig:r.parsedTsconfig,fromNodeModules:s.parentURL?.includes("/node_modules/")}),o&&r.parsedTsconfig&&!s.parentURL?.includes("/node_modules/")){const a=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.w)(r.parsedTsconfig,e);(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveTsPaths",{possiblePaths:a});for(const m of a)try{return await Te((0,node_url__WEBPACK_IMPORTED_MODULE_4__.pathToFileURL)(m).toString(),s,t,r)}catch{}}return Te(e,s,t,r)},"resolveTsPaths"),ft=i((e,s,t,r)=>{const o=Ue(e);if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveTsPathsSync",{specifier:e,context:s,tsconfigPathAliasSpecifier:o,tsconfig:r.parsedTsconfig,fromNodeModules:s.parentURL?.includes("/node_modules/")}),o&&r.parsedTsconfig&&!s.parentURL?.includes("/node_modules/")){const a=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.w)(r.parsedTsconfig,e);(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(3,"resolveTsPathsSync",{possiblePaths:a});for(const m of a)try{return Le((0,node_url__WEBPACK_IMPORTED_MODULE_4__.pathToFileURL)(m).toString(),s,t,r)}catch{}}return Le(e,s,t,r)},"resolveTsPathsSync"),X="tsx://",x=i((e,s)=>`${e}${e.includes("?")?"&":"?"}${s}`,"addQuery"),je=i((e,s,t)=>{if(s!=="commonjs"||!e.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m)||!_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.e.test(e))return e;const r=new URL(e),o=[K(r.search,[U]),...t?[`namespace=${encodeURIComponent(t)}`]:[]].filter(Boolean).join("&");return o?(r.pathname+=`%3F${o}`,r.searchParams.set(C,"1"),r.toString()):e},"preserveCommonJsQueryIdentity"),pt=i(e=>{const s=i(async(t,r,o)=>{if(!e.active||t.startsWith("node:"))return o(t,r);let a=v(t)??(r.parentURL&&v(r.parentURL));if(e.namespace){let l;if(t.startsWith(X)){try{l=JSON.parse(t.slice(X.length))}catch{}l?.namespace&&(a=l.namespace)}if(e.namespace!==a)return o(t,r);l&&(t=l.specifier,r.parentURL=l.parentURL)}const[m,c]=t.split("?"),n=await ut(m,r,o,e);if((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(2,"nextResolve",{resolved:n}),n.format==="builtin")return n;n.url.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m)&&(n.format==="module-typescript"?n.format="module":n.format==="commonjs-typescript"?n.format="commonjs":n.format||(n.format=await Ye(n.url),(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(2,"getFormatFromFileUrl",{resolved:n,format:n.format}))),c&&(n.url+=`?${c}`);const u=r.parentURL&&n.format==="commonjs"&&_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.e.test(n.url)&&(r.parentURL.includes(ue)||et(r.parentURL,t,it));return a&&!n.url.includes(U)&&(n.url=x(n.url,`${U}${a}`)),u&&(n.url=x(n.url,ue)),(a||u)&&(n.url=je(n.url,n.format,a)),n},"resolve");return _register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.d?async(t,r,o)=>{(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(2,"resolve",{specifier:t,context:r});const a=await s(t,r,o);return (0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(1,"resolved",{specifier:t,context:r,result:a}),a}:s},"createResolve"),ht=i(e=>{const s=i((t,r,o)=>{if(!e.active||t.startsWith("node:")||ve(r)&&(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.j)())return o(t,r);let a=v(t)??(r.parentURL&&v(r.parentURL));if(e.namespace){let u;if(t.startsWith(X)){try{u=JSON.parse(t.slice(X.length))}catch{}u?.namespace&&(a=u.namespace)}if(e.namespace!==a)return o(t,r);u&&(t=u.specifier,r.parentURL=u.parentURL)}const[m,c]=t.split("?"),n=ft(m,r,o,e);return (0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(2,"nextResolve",{resolved:n}),n.format==="builtin"||(n.url.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m)&&(n.format==="module-typescript"?n.format="module":n.format==="commonjs-typescript"?n.format="commonjs":n.format||(n.format=Ze(n.url),(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(2,"getFormatFromFileUrlSync",{resolved:n,format:n.format}))),c&&(n.url+=`?${c}`),a&&!n.url.includes(U)&&(n.url=x(n.url,`${U}${a}`)),n.url=je(n.url,n.format,a)),n},"resolve");return _register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.d?(t,r,o)=>{(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(2,"resolveSync",{specifier:t,context:r});const a=s(t,r,o);return (0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(1,"resolvedSync",{specifier:t,context:r,result:a}),a}:s},"createResolveSync"),Ee=i(e=>(s,t)=>{if(!t)throw new Error("The current file path (import.meta.url) must be provided in the second argument of tsImport()");const r=t.startsWith(_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.m)?t:(0,node_url__WEBPACK_IMPORTED_MODULE_4__.pathToFileURL)(t).toString();return Object(function webpackMissingModule() { const e = new Error("Cannot find module 'undefined'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())},"createScopedImport");let Ie=!1;const gt=i(e=>{const s=[];for(let t=0;t<e.length;t+=1){const r=e[t];if(r==="--import"){const o=e[t+1];o&&s.push(o),t+=1}else r.startsWith("--import=")&&s.push(r.slice(9))}return s},"collectImportSpecifiers"),yt=i(()=>[...(process.env.NODE_OPTIONS??"").matchAll(/(?:^|\s)--import(?:=|\s+)(\S+)/g)].map(([,e])=>e),"collectNodeOptionsImportSpecifiers"),Fe=[new URL(/* asset import */ __webpack_require__(/*! loader.mjs */ "./node_modules/tsx/dist/loader.mjs?4a13"), __webpack_require__.b).toString(),new URL(/* asset import */ __webpack_require__(/*! esm/index.mjs */ "./node_modules/tsx/dist/esm/index.mjs?42ed"), __webpack_require__.b).toString()],Pt=new Set(["tsx","tsx/esm",...Fe,...Fe.map(e=>decodeURI(new URL(e).pathname))]),St=i(e=>Pt.has(e),"isTsxImport"),Ce=i(e=>/\.(?:[cm]?ts|tsx)(?:[?#].*)?$/.test(e),"isTypeScriptImport"),Rt=i(()=>{const e=gt(process.execArgv),s=e.findIndex(St);return s>0&&e.slice(0,s).some(Ce)},"hasCliTypeScriptPreload"),Ut=yt().some(Ce)||Rt(),We=typeof node_module__WEBPACK_IMPORTED_MODULE_0__.registerHooks=="function"&&(0,_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_2__.i)(_node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_2__.m)&&!Ut,vt=i(e=>{if(!node_module__WEBPACK_IMPORTED_MODULE_0__.register&&!We)throw new Error(`This version of Node.js (${process.version}) does not support module.register(). Please upgrade to Node v18.19 or v20.6 and above.`);if(!Ie){const{_resolveFilename:c}=node_module__WEBPACK_IMPORTED_MODULE_0__;node_module__WEBPACK_IMPORTED_MODULE_0__._resolveFilename=(n,...u)=>c((0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_3__.u)(n),...u),Ie=!0}const{sourceMapsEnabled:s}=process;if(process.setSourceMapsEnabled(!0),We){const c=de({namespace:e?.namespace,onImport:e?.onImport,tsconfig:e?.tsconfig}),n=node_module__WEBPACK_IMPORTED_MODULE_0__.registerHooks({load:ct(c),resolve:ht(c)}),u=i(async()=>{c.active=!1,n.deregister(),s===!1&&process.setSourceMapsEnabled(!1)},"unregister2");return e?.namespace&&(u.import=Ee(e.namespace),u.unregister=u),u}const{port1:t,port2:r}=new node_worker_threads__WEBPACK_IMPORTED_MODULE_1__.MessageChannel;node_module__WEBPACK_IMPORTED_MODULE_0__.register(`./esm/index.mjs?${Date.now()}`,{parentURL:"file:///C:/Dev/udemy-web-fullstack/curso-typeScript/Secao19-TS-TiposBasicos/node_modules/tsx/dist/register-zZ7SWseA.mjs",data:{port:r,namespace:e?.namespace,tsconfig:e?.tsconfig},transferList:[r]});const o=e?.onImport,a=o&&(c=>{c.type==="load"&&o(c.url)});a&&(t.on("message",a),t.unref());const m=i(()=>(s===!1&&process.setSourceMapsEnabled(!1),a&&t.off("message",a),t.postMessage("deactivate"),new Promise(c=>{const n=i(u=>{u.type==="deactivated"&&(c(),t.off("message",n))},"onDeactivated");t.on("message",n)})),"unregister");return e?.namespace&&(m.import=Ee(e.namespace),m.unregister=m),m},"register");


/***/ },

/***/ "./node_modules/tsx/dist/require-awuW45Q3.mjs"
/*!****************************************************!*\
  !*** ./node_modules/tsx/dist/require-awuW45Q3.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var _get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-pipe-path-_tAJyU_v.mjs */ "./node_modules/tsx/dist/get-pipe-path-_tAJyU_v.mjs");
/* harmony import */ var _register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register-HWZIKnmC.mjs */ "./node_modules/tsx/dist/register-HWZIKnmC.mjs");
var m=Object.defineProperty;var a=(r,t)=>m(r,"name",{value:t,configurable:!0});let e;const s=a((r,t)=>(e||(e=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_1__.r)({namespace:Date.now().toString()})),e.require(r,t)),"tsxRequire"),i=a((r,t,c)=>(e||(e=(0,_register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_1__.r)({namespace:Date.now().toString()})),e.resolve(r,t,c)),"resolve");i.paths=_get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_0__.r.resolve.paths,s.resolve=i,s.main=_get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_0__.r.main,s.extensions=_get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_0__.r.extensions,s.cache=_get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_0__.r.cache;


/***/ },

/***/ "./node_modules/tsx/dist/temporary-directory-BDDVQOvU.mjs"
/*!****************************************************************!*\
  !*** ./node_modules/tsx/dist/temporary-directory-BDDVQOvU.mjs ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ e)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:os */ "node:os");
const{geteuid:r}=process,t=r?r():node_os__WEBPACK_IMPORTED_MODULE_1__.userInfo().username,e=node_path__WEBPACK_IMPORTED_MODULE_0__.join(node_os__WEBPACK_IMPORTED_MODULE_1__.tmpdir(),`tsx-${t}`);


/***/ },

/***/ "node:crypto"
/*!*******************!*\
  !*** node:crypto ***!
  \*******************/
() {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:crypto\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1577:13\n    at Hook.eval [as callAsync] (eval at create (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:6:1)\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1571:10\n    at new Promise (<anonymous>)\n    at readResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1568:14)\n    at Object.processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1590:28)\n    at processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:295:10)\n    at iteratePitchingLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:358:9)\n    at runLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:525:2)\n    at JavascriptModule._doBuild (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1553:3)");

/***/ },

/***/ "node:fs"
/*!***************!*\
  !*** node:fs ***!
  \***************/
() {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:fs\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1577:13\n    at Hook.eval [as callAsync] (eval at create (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:6:1)\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1571:10\n    at new Promise (<anonymous>)\n    at readResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1568:14)\n    at Object.processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1590:28)\n    at processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:295:10)\n    at iteratePitchingLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:358:9)\n    at runLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:525:2)\n    at JavascriptModule._doBuild (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1553:3)");

/***/ },

/***/ "node:fs/promises"
/*!************************!*\
  !*** node:fs/promises ***!
  \************************/
() {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:fs/promises\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1577:13\n    at Hook.eval [as callAsync] (eval at create (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:6:1)\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1571:10\n    at new Promise (<anonymous>)\n    at readResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1568:14)\n    at Object.processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1590:28)\n    at processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:295:10)\n    at iteratePitchingLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:358:9)\n    at runLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:525:2)\n    at JavascriptModule._doBuild (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1553:3)");

/***/ },

/***/ "node:module"
/*!*******************!*\
  !*** node:module ***!
  \*******************/
() {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:module\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1577:13\n    at Hook.eval [as callAsync] (eval at create (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:6:1)\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1571:10\n    at new Promise (<anonymous>)\n    at readResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1568:14)\n    at Object.processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1590:28)\n    at processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:295:10)\n    at iteratePitchingLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:358:9)\n    at runLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:525:2)\n    at JavascriptModule._doBuild (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1553:3)");

/***/ },

/***/ "node:net"
/*!****************!*\
  !*** node:net ***!
  \****************/
() {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:net\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1577:13\n    at Hook.eval [as callAsync] (eval at create (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:6:1)\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1571:10\n    at new Promise (<anonymous>)\n    at readResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1568:14)\n    at Object.processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1590:28)\n    at processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:295:10)\n    at iteratePitchingLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:358:9)\n    at runLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:525:2)\n    at JavascriptModule._doBuild (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1553:3)");

/***/ },

/***/ "node:os"
/*!***************!*\
  !*** node:os ***!
  \***************/
() {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:os\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1577:13\n    at Hook.eval [as callAsync] (eval at create (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:6:1)\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1571:10\n    at new Promise (<anonymous>)\n    at readResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1568:14)\n    at Object.processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1590:28)\n    at processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:295:10)\n    at iteratePitchingLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:358:9)\n    at runLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:525:2)\n    at JavascriptModule._doBuild (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1553:3)");

/***/ },

/***/ "node:path"
/*!*****************!*\
  !*** node:path ***!
  \*****************/
() {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:path\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1577:13\n    at Hook.eval [as callAsync] (eval at create (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:6:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\tapable\\lib\\Hook.js:21:14)\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1571:10\n    at new Promise (<anonymous>)\n    at readResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1568:14)\n    at Object.processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1590:28)\n    at processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:295:10)\n    at iteratePitchingLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:358:9)\n    at runLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:525:2)");

/***/ },

/***/ "node:url"
/*!****************!*\
  !*** node:url ***!
  \****************/
() {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:url\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1577:13\n    at Hook.eval [as callAsync] (eval at create (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:6:1)\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1571:10\n    at new Promise (<anonymous>)\n    at readResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1568:14)\n    at Object.processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1590:28)\n    at processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:295:10)\n    at iteratePitchingLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:358:9)\n    at runLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:525:2)\n    at JavascriptModule._doBuild (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1553:3)");

/***/ },

/***/ "node:util"
/*!*****************!*\
  !*** node:util ***!
  \*****************/
() {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:util\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1577:13\n    at Hook.eval [as callAsync] (eval at create (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:6:1)\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1571:10\n    at new Promise (<anonymous>)\n    at readResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1568:14)\n    at Object.processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1590:28)\n    at processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:295:10)\n    at iteratePitchingLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:358:9)\n    at runLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:525:2)\n    at JavascriptModule._doBuild (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1553:3)");

/***/ },

/***/ "node:worker_threads"
/*!***************************!*\
  !*** node:worker_threads ***!
  \***************************/
() {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:worker_threads\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1577:13\n    at Hook.eval [as callAsync] (eval at create (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:6:1)\n    at C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1571:10\n    at new Promise (<anonymous>)\n    at readResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1568:14)\n    at Object.processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1590:28)\n    at processResource (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:295:10)\n    at iteratePitchingLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:358:9)\n    at runLoaders (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\loader-runner\\lib\\LoaderRunner.js:525:2)\n    at JavascriptModule._doBuild (C:\\Dev\\udemy-web-fullstack\\curso-typeScript\\Secao19-TS-TiposBasicos\\node_modules\\webpack\\lib\\NormalModule.js:1553:3)");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		const inProgress = {};
/******/ 		const dataWebpackPrefix = "cursojstypescript:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			let script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				const scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					const s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			const onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				const doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode?.removeChild(script);
/******/ 				doneFns?.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			const timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/set anonymous default export name */
/******/ 	(() => {
/******/ 		// set .name for anonymous default exports per ES spec
/******/ 		__webpack_require__.dn = (x) => {
/******/ 			(Object.getOwnPropertyDescriptor(x, "name") || {}).writable || Object.defineProperty(x, "name", { value: "default", configurable: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		let scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		const document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript?.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				const scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					let i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = (typeof document !== 'undefined' && document.baseURI) || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				let installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							const promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							const url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							const error = new Error();
/******/ 							const loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										const errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										const realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = self["webpackChunkcursojstypescript"] = self["webpackChunkcursojstypescript"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
let __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./aula18-webpack/index.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mod.js */ "./aula18-webpack/mod.ts");

(0,_mod_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************************************!*\
  !*** ./node_modules/tsx/dist/loader.mjs ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   globalPreload: () => (/* reexport safe */ _esm_index_mjs__WEBPACK_IMPORTED_MODULE_1__.globalPreload),
/* harmony export */   initialize: () => (/* reexport safe */ _esm_index_mjs__WEBPACK_IMPORTED_MODULE_1__.initialize),
/* harmony export */   load: () => (/* reexport safe */ _esm_index_mjs__WEBPACK_IMPORTED_MODULE_1__.load),
/* harmony export */   resolve: () => (/* reexport safe */ _esm_index_mjs__WEBPACK_IMPORTED_MODULE_1__.resolve)
/* harmony export */ });
/* harmony import */ var _get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-pipe-path-_tAJyU_v.mjs */ "./node_modules/tsx/dist/get-pipe-path-_tAJyU_v.mjs");
/* harmony import */ var _esm_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./esm/index.mjs */ "./node_modules/tsx/dist/esm/index.mjs?65ac");
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'module'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var _temporary_directory_BDDVQOvU_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./temporary-directory-BDDVQOvU.mjs */ "./node_modules/tsx/dist/temporary-directory-BDDVQOvU.mjs");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! node:os */ "node:os");
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! node:worker_threads */ "node:worker_threads");
/* harmony import */ var _node_features_JeyyvQz6_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node-features-JeyyvQz6.mjs */ "./node_modules/tsx/dist/node-features-JeyyvQz6.mjs");
/* harmony import */ var _register_zZ7SWseA_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./register-zZ7SWseA.mjs */ "./node_modules/tsx/dist/register-zZ7SWseA.mjs");
/* harmony import */ var node_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! node:module */ "node:module");
/* harmony import */ var _register_HWZIKnmC_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./register-HWZIKnmC.mjs */ "./node_modules/tsx/dist/register-HWZIKnmC.mjs");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! node:fs */ "node:fs");
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'os'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { const e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _index_CQhDiIsg_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./index-CQhDiIsg.mjs */ "./node_modules/tsx/dist/index-CQhDiIsg.mjs");
/* harmony import */ var esbuild__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! esbuild */ "./node_modules/esbuild/lib/main.js");
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! node:crypto */ "node:crypto");
/* harmony import */ var _client_D_mPDF5S_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./client-D_mPDF5S.mjs */ "./node_modules/tsx/dist/client-D_mPDF5S.mjs");
/* harmony import */ var node_net__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! node:net */ "node:net");
/* harmony import */ var node_util__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! node:util */ "node:util");
/* harmony import */ var _index_gbaejti9_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./index-gbaejti9.mjs */ "./node_modules/tsx/dist/index-gbaejti9.mjs");
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! node:fs/promises */ "node:fs/promises");
/* harmony import */ var _require_awuW45Q3_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./require-awuW45Q3.mjs */ "./node_modules/tsx/dist/require-awuW45Q3.mjs");
(0,_get_pipe_path_tAJyU_v_mjs__WEBPACK_IMPORTED_MODULE_0__.r)("./cjs/index.cjs");

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map