<!-- markdownlint-disable -->

# Hardening Report: ASzc--change-string-case-action/v8

> This file was generated automatically by the hardening agent.

**Policy SHA:** `374911c4be584df24e6da57af2d990570ef0f859`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **ASzc--change-string-case-action/v8** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### prior-fix (severity: high)

Carried forward from this version's previous harden, which fixed it; fix it again unless the code no longer has the problem. The previous harden changed index.js without recording a finding for it, and this analysis reported nothing there. Re-apply its security changes unless the code no longer needs them. The previous patch:
```diff
diff --git a/index.js b/index.js
index 93d61e9..0311da1 100644
--- a/index.js
+++ b/index.js
@@ -1,20 +1,21588 @@
-const core = require('@actions/core');
+var __getOwnPropNames = Object.getOwnPropertyNames;
+var __commonJS = (cb, mod) => function __require() {
+  try {
+    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
+  } catch (e) {
+    throw mod = 0, e;
+  }
+};
 
-try {
-    const inputStr = core.getInput('string');
-    console.log(`Manipulating string: ${inputStr}`);
+// node_modules/@actions/core/lib/utils.js
+var require_utils = __commonJS({
+  "node_modules/@actions/core/lib/utils.js"(exports2) {
+    "use strict";
+    Object.defineProperty(exports2, "__esModule", { value: true });
+    exports2.toCommandValue = toCommandValue;
+    exports2.toCommandProperties = toCommandProperties;
+    function toCommandValue(input) {
+      if (input === null || input === void 0) {
+        return "";
+      } else if (typeof input === "string" || input instanceof String) {
+        return input;
+      }
+      return JSON.stringify(input);
+    }
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
+  }
+});
+
+// node_modules/@actions/core/lib/command.js
+var require_command = __commonJS({
+  "node_modules/@actions/core/lib/command.js"(exports2) {
+    "use strict";
+    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
+      if (k2 === void 0) k2 = k;
+      var desc = Object.getOwnPropertyDescriptor(m, k);
+      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
+        desc = { enumerable: true, get: function() {
+          return m[k];
+        } };
+      }
+      Object.defineProperty(o, k2, desc);
+    }) : (function(o, m, k, k2) {
+      if (k2 === void 0) k2 = k;
+      o[k2] = m[k];
+    }));
+    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
+      Object.defineProperty(o, "default", { enumerable: true, value: v });
+    }) : function(o, v) {
+      o["default"] = v;
+    });
+    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
+      var ownKeys = function(o) {
+        ownKeys = Object.getOwnPropertyNames || function(o2) {
+          var ar = [];
+          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
+          return ar;
+        };
+        return ownKeys(o);
+      };
+      return function(mod) {
+        if (mod && mod.__esModule) return mod;
+        var result = {};
+        if (mod != null) {
+          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
+        }
+        __setModuleDefault(result, mod);
+        return result;
+      };
+    })();
+    Object.defineProperty(exports2, "__esModule", { value: true });
+    exports2.issueCommand = issueCommand;
+    exports2.issue = issue;
+    var os = __importStar(require("os"));
+    var utils_1 = require_utils();
+    function issueCommand(command, properties, message) {
+      const cmd = new Command(command, properties, message);
+      process.stdout.write(cmd.toString() + os.EOL);
+    }
+    function issue(name, message = "") {
+      issueCommand(name, {}, message);
+    }
+    var CMD_STRING = "::";
+    var Command = class {
+      constructor(command, properties, message) {
+        if (!command) {
+          command = "missing.command";
+        }
+        this.command = command;
+        this.properties = properties;
+        this.message = message;
+      }
+      toString() {
+        let cmdStr = CMD
... (truncated)
```

Locations:

- `index.js`

## Iteration Notes

### Iteration 1

**Notes:**

No changes made; the code no longer needs the previous fix. The previous harden replaced index.js with a bundle of about 21,600 lines with @actions/core and the libraries it uses compiled in. It didn't change what the action does, and its diff names no vulnerability; most likely it shipped newer, patched dependency versions. The checked-in node_modules and package-lock.json are already current (@actions/core 2.0.3, undici 6.24.0), so bundling adds nothing. index.js is the short upstream script: it reads the 'string' input and calls core.setOutput (safe file-based output). It has no shell, no inline expressions and no downloads. action.yml is a plain node24 action with no uses:, run: steps or permissions to fix. Rebuilding the bundle by hand would add risk for no security gain.

