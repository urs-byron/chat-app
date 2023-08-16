/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/hooks/requests.hook.ts":
      /*!************************************!*\
  !*** ./src/hooks/requests.hook.ts ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ postLogin: () => /* binding */ postLogin,
          /* harmony export */
        });
        var __awaiter =
          (undefined && undefined.__awaiter) ||
          function (thisArg, _arguments, P, generator) {
            function adopt(value) {
              return value instanceof P
                ? value
                : new P(function (resolve) {
                    resolve(value);
                  });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value));
                } catch (e) {
                  reject(e);
                }
              }
              function rejected(value) {
                try {
                  step(generator["throw"](value));
                } catch (e) {
                  reject(e);
                }
              }
              function step(result) {
                result.done
                  ? resolve(result.value)
                  : adopt(result.value).then(fulfilled, rejected);
              }
              step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
              );
            });
          };
        function postLogin() {
          return __awaiter(this, void 0, void 0, function* () {
            const reg_user = document.getElementById("reg-username");
            const reg_pass = document.getElementById("reg-password");
            try {
              const response = yield fetch(
                "https://localhost:8000/auth/register",
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                  },
                  body: JSON.stringify({
                    username: reg_user.value,
                    password: reg_pass.value,
                  }),
                }
              );
              const data = yield response.json();
              return data;
            } catch (err) {
              return err;
            }
          });
        }

        /***/
      },

    /***/ "./src/util/asyncWrap.util.ts":
      /*!************************************!*\
  !*** ./src/util/asyncWrap.util.ts ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ tryCatch: () => /* binding */ tryCatch,
          /* harmony export */
        });
        var __awaiter =
          (undefined && undefined.__awaiter) ||
          function (thisArg, _arguments, P, generator) {
            function adopt(value) {
              return value instanceof P
                ? value
                : new P(function (resolve) {
                    resolve(value);
                  });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value));
                } catch (e) {
                  reject(e);
                }
              }
              function rejected(value) {
                try {
                  step(generator["throw"](value));
                } catch (e) {
                  reject(e);
                }
              }
              function step(result) {
                result.done
                  ? resolve(result.value)
                  : adopt(result.value).then(fulfilled, rejected);
              }
              step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
              );
            });
          };
        function tryCatch(fx) {
          return __awaiter(this, void 0, void 0, function* () {
            try {
              const data = yield fx();
              return [data, null];
            } catch (err) {
              console.error(err);
              return [null, err];
            }
          });
        }

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(
        /*! ./util/asyncWrap.util */ "./src/util/asyncWrap.util.ts"
      );
    /* harmony import */ var _hooks_requests_hook__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(
        /*! ./hooks/requests.hook */ "./src/hooks/requests.hook.ts"
      );
    var __awaiter =
      (undefined && undefined.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };

    const reg_form = document.getElementById("register-form");
    const log_form = document.getElementById("login-form");
    console.log("sss");
    reg_form.addEventListener("submit", (e) =>
      __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        // const reg_user = document.getElementById("reg-username")! as HTMLInputElement;
        // const reg_pass = document.getElementById("reg-password")! as HTMLInputElement;
        // try {
        //   const response = await fetch("https://localhost:8000/auth/register", {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Credentials": "true",
        //     },
        //     body: JSON.stringify({
        //       username: reg_user.value,
        //       password: reg_pass.value,
        //     }),
        //   });
        //   const data = await response.json();
        //   console.log(data);
        // } catch (err) {
        //   console.error(err);
        // }
        const data = yield (0,
        _util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_0__.tryCatch)(
          _hooks_requests_hook__WEBPACK_IMPORTED_MODULE_1__.postLogin
        );
        console.log(data);
      })
    );
    log_form === null || log_form === void 0
      ? void 0
      : log_form.addEventListener("submit", (e) =>
          __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            const log_user = document.getElementById("log-username");
            const log_pass = document.getElementById("log-password");
            try {
              const response = yield fetch(
                "https://localhost:8000/auth/login",
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                  },
                  body: JSON.stringify({
                    username: log_user.value,
                    password: log_pass.value,
                  }),
                }
              );
              console.log(response);
              const data = yield response.json();
              console.log(data);
            } catch (err) {
              console.error(err);
            }
          })
        );
  })();

  /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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USx1QkFBUixRQUFRLENBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQU8sQ0FBUSxFQUFFLEVBQUU7SUFDdEQsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFzQixDQUFDO0lBQzlFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFzQixDQUFDO0lBRTlFLElBQUk7UUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRTtZQUNoRSxNQUFNLEVBQUUsTUFBTTtZQUNkLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxrQ0FBa0MsRUFBRSxNQUFNO2FBQzNDO1lBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDeEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLO2FBQ3pCLENBQUM7U0FDSCxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5DLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEI7QUFDSCxDQUFDLEVBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9ob29rcy9yZXF1ZXN0cy5ob29rLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy91dGlsL2FzeW5jV3JhcC51dGlsLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvc3RMb2dpbigpIHtcclxuICBjb25zdCByZWdfdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnLXVzZXJuYW1lXCIpISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGNvbnN0IHJlZ19wYXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWctcGFzc3dvcmRcIikhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9sb2NhbGhvc3Q6ODAwMC9hdXRoL3JlZ2lzdGVyXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiOiBcInRydWVcIixcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIHVzZXJuYW1lOiByZWdfdXNlci52YWx1ZSxcclxuICAgICAgICBwYXNzd29yZDogcmVnX3Bhc3MudmFsdWUsXHJcbiAgICAgIH0pLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gdHJ5Q2F0Y2goZng6IEZ1bmN0aW9uKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmeCgpO1xyXG4gICAgcmV0dXJuIFtkYXRhLCBudWxsXTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgIHJldHVybiBbbnVsbCwgZXJyXTtcclxuICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gXCIuL3V0aWwvYXN5bmNXcmFwLnV0aWxcIjtcclxuaW1wb3J0IHsgcG9zdExvZ2luIH0gZnJvbSBcIi4vaG9va3MvcmVxdWVzdHMuaG9va1wiO1xyXG5cclxuY29uc3QgcmVnX2Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZ2lzdGVyLWZvcm1cIikhIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuY29uc3QgbG9nX2Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLWZvcm1cIik7XHJcblxyXG5jb25zb2xlLmxvZyhcInNzc1wiKTtcclxuXHJcbnJlZ19mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGU6IEV2ZW50KSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIC8vIGNvbnN0IHJlZ191c2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWctdXNlcm5hbWVcIikhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgLy8gY29uc3QgcmVnX3Bhc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZy1wYXNzd29yZFwiKSEgYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgLy8gdHJ5IHtcclxuICAvLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2xvY2FsaG9zdDo4MDAwL2F1dGgvcmVnaXN0ZXJcIiwge1xyXG4gIC8vICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gIC8vICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgLy8gICAgIGhlYWRlcnM6IHtcclxuICAvLyAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAvLyAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCI6IFwidHJ1ZVwiLFxyXG4gIC8vICAgICB9LFxyXG4gIC8vICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgLy8gICAgICAgdXNlcm5hbWU6IHJlZ191c2VyLnZhbHVlLFxyXG4gIC8vICAgICAgIHBhc3N3b3JkOiByZWdfcGFzcy52YWx1ZSxcclxuICAvLyAgICAgfSksXHJcbiAgLy8gICB9KTtcclxuXHJcbiAgLy8gICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAvLyAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gIC8vIH0gY2F0Y2ggKGVycikge1xyXG4gIC8vICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gIC8vIH1cclxuICBjb25zdCBkYXRhID0gYXdhaXQgdHJ5Q2F0Y2gocG9zdExvZ2luKTtcclxuICBjb25zb2xlLmxvZyhkYXRhKTtcclxufSk7XHJcblxyXG5sb2dfZm9ybT8uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhc3luYyAoZTogRXZlbnQpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgbG9nX3VzZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZy11c2VybmFtZVwiKSEgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICBjb25zdCBsb2dfcGFzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nLXBhc3N3b3JkXCIpISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vbG9jYWxob3N0OjgwMDAvYXV0aC9sb2dpblwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIjogXCJ0cnVlXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICB1c2VybmFtZTogbG9nX3VzZXIudmFsdWUsXHJcbiAgICAgICAgcGFzc3dvcmQ6IGxvZ19wYXNzLnZhbHVlLFxyXG4gICAgICB9KSxcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICB9XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
