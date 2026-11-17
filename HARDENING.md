<!-- markdownlint-disable -->

# Hardening Report: ASzc--change-string-case-action/v6

> This file was generated automatically by the hardening agent.

**Policy SHA:** `374911c4be584df24e6da57af2d990570ef0f859`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **ASzc--change-string-case-action/v6** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### prior-fix (severity: high)

Carried forward from this version's previous harden, which fixed it; fix it again unless the code no longer has the problem. The previous harden changed index.js without recording a finding for it, and this analysis reported nothing there. Re-apply its security changes unless the code no longer needs them. The previous patch:
```diff
diff --git a/index.js b/index.js
index b31d689..2a4c2a6 100644
--- a/index.js
+++ b/index.js
@@ -1,21 +1,21865 @@
-const core = require('@actions/core');
-const github = require('@actions/github');
+var __create = Object.create;
+var __defProp = Object.defineProperty;
+var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
+var __getOwnPropNames = Object.getOwnPropertyNames;
+var __getProtoOf = Object.getPrototypeOf;
+var __hasOwnProp = Object.prototype.hasOwnProperty;
+var __esm = (fn, res, err) => function __init() {
+  if (err) throw err[0];
+  try {
+    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
+  } catch (e) {
+    throw err = [e], e;
+  }
+};
+var __commonJS = (cb, mod) => function __require() {
+  try {
+    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
+  } catch (e) {
+    throw mod = 0, e;
+  }
+};
+var __export = (target, all) => {
+  for (var name in all)
+    __defProp(target, name, { get: all[name], enumerable: true });
+};
+var __copyProps = (to, from, except, desc) => {
+  if (from && typeof from === "object" || typeof from === "function") {
+    for (let key of __getOwnPropNames(from))
+      if (!__hasOwnProp.call(to, key) && key !== except)
+        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
+  }
+  return to;
+};
+var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
+  // If the importer is in node compatibility mode or this is not an ESM
+  // file that has been converted to a CommonJS file using a Babel-
+  // compatible transform (i.e. "__esModule" has not been set), then set
+  // "default" to the CommonJS "module.exports" for node compatibility.
+  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
+  mod
+));
+var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
 
-try {
-    const inputStr = core.getInput('string');
-    console.log(`Manipulating string: ${inputStr}`);
+// node_modules/@actions/core/lib/utils.js
+var require_utils = __commonJS({
+  "node_modules/@actions/core/lib/utils.js"(exports2) {
+    "use strict";
+    Object.defineProperty(exports2, "__esModule", { value: true });
+    exports2.toCommandProperties = exports2.toCommandValue = void 0;
+    function toCommandValue(input) {
+      if (input === null || input === void 0) {
+        return "";
+      } else if (typeof input === "string" || input instanceof String) {
+        return input;
+      }
+      return JSON.stringify(input);
+    }
+    exports2.toCommandValue = toCommandValue;
+    function toCommandProperties(annotationProperties) {
+      if (!Object.keys(annotationProperties).length) {
+        return {};
+      }
+      return {
+        title: annotationProperties.title,
+        file: annotationProperties.file,
+        line: annotationProperties.startLine,
+        endLine: annotationProperties.endLine,
+        col: annotationProperties.startColumn,
+        endColumn: annotationProperties.endColumn
+      };
+    }
+    exports2.toCommandProperties = toCommandProperties;
+  }
+});
+
+// node_modules/@actions/core/lib/command.js
+var require_command = __commonJS({
+  "node_modules/@actions/core/lib/command.js"(exports2) {
+    "use strict";
+    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
+      if (k2 === void 0) k2 = k;
+      Object.defineProperty(o, k2, { enumerable: true, get: function() {
+        return m[k];
+      } });
+    }) : (function(o, m, k, k2) {
+      if (k2 === void 0) k2 = k;
+      o[k2] = m[k];
+    }));
+    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
+      Object.defineProperty(o, "default", { enumerable: true, value: v });
+    }) : function(o, v) {
+      o["default"] = v;
+    });
+    var __importStar = exports2 && exports2.__importStar || function(mo
... (truncated)
```

Locations:

- `index.js`

## Iteration Notes

### Iteration 1

**Fixes applied:** prior-fix

**Notes:**

Re-applied what the previous harden did to index.js: it now runs on its own without the vendored node_modules. That earlier patch replaced index.js with a bundle that included its dependencies, and its goal was to stop loading the outdated, vulnerable dependency tree from node_modules (undici, @octokit). I couldn't run a bundler, so I rewrote index.js to use only Node built-ins (fs, os, crypto). The unused require('@actions/github') is gone. The three @actions/core calls the action uses (getInput, setOutput, setFailed) are reimplemented to behave like the library: setOutput writes to $GITHUB_OUTPUT in the heredoc form with a fresh random delimiter (ghadelimiter_<randomUUID>) and refuses a name or value that contains it, and it falls back to the escaped ::set-output command when $GITHUB_OUTPUT is not set. The string-handling logic and the outputs it produces are unchanged. Nothing was run or tested here. action.yml (node20, no uses: lines) needed no changes. package.json and node_modules are left as they are; the action no longer loads them at runtime.

