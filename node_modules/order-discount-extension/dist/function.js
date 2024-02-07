var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// extensions/order-discount-extension/generated/api.ts
var init_api = __esm({
  "extensions/order-discount-extension/generated/api.ts"() {
  }
});

// extensions/order-discount-extension/src/run.js
var require_run = __commonJS({
  "extensions/order-discount-extension/src/run.js"(exports, module) {
    init_api();
    var EMPTY_DISCOUNT = {
      discountApplicationStrategy: "FIRST" /* First */,
      discounts: []
    };
    console.error("Running");
    function run2(input) {
      console.error("Starting discount calculation...");
      const productType1000Count = calculateProductTypeCount(input.cart.lines, "1000");
      const productType1500Count = calculateProductTypeCount(input.cart.lines, "1500");
      const discount1000 = calculateDiscount(productType1000Count, "1000");
      const discount1500 = calculateDiscount(productType1500Count, "1500");
      if (discount1000 === 0 && discount1500 === 0) {
        console.log("No products with the specified product types.");
        return EMPTY_DISCOUNT;
      }
      console.log(`Applying a discount of Rs ${discount1000 + discount1500} to ${productType1000Count + productType1500Count} products.`);
      const targets = input.cart.lines.filter((line) => {
        if (line.merchandise.__typename === "ProductVariant") {
          const productType = line.merchandise.product.productType;
          return productType === "1000" || productType === "1500";
        }
        return false;
      }).map((line) => ({
        productVariant: {
          id: line.merchandise.id
        }
      }));
      const DISCOUNTED_ITEMS = {
        discountApplicationStrategy: "FIRST",
        // Assuming "FIRST" is a valid value; replace with actual value needed.
        discounts: [
          {
            targets,
            value: {
              fixedAmount: {
                amount: discount1000 + discount1500
              }
            },
            message: "MESSOLD"
          }
        ]
      };
      console.log("Discount calculation complete.");
      return DISCOUNTED_ITEMS;
    }
    function calculateProductTypeCount(cartItems, productType) {
      let productTypeCount = 0;
      for (const item of cartItems) {
        if (item.merchandise.__typename === "ProductVariant" && item.merchandise.product.productType === productType) {
          productTypeCount += item.quantity;
        }
      }
      return productTypeCount;
    }
    function calculateDiscount(productTypeCount, productType) {
      if (productTypeCount >= 2) {
        const remainder = productTypeCount % 3;
        const bulkCount = Math.floor(productTypeCount / 3);
        if (productType === "1500") {
          return remainder === 2 ? 300 + bulkCount * 750 : bulkCount * 750;
        } else if (productType === "1000") {
          return remainder === 2 ? 598 + bulkCount * 1097 : bulkCount * 1097;
        }
      }
      return 0;
    }
    module.exports = {
      run: run2,
      calculateProductTypeCount,
      calculateDiscount
    };
  }
});

// node_modules/javy/dist/index.js
var r = /* @__PURE__ */ ((t) => (t[t.Stdin = 0] = "Stdin", t[t.Stdout = 1] = "Stdout", t[t.Stderr = 2] = "Stderr", t))(r || {});

// node_modules/javy/dist/fs/index.js
function o(i) {
  let r2 = new Uint8Array(1024), e = 0;
  for (; ; ) {
    const t = Javy.IO.readSync(i, r2.subarray(e));
    if (t < 0)
      throw Error("Error while reading from file descriptor");
    if (t === 0)
      return r2.subarray(0, e + t);
    if (e += t, e === r2.length) {
      const n = new Uint8Array(r2.length * 2);
      n.set(r2), r2 = n;
    }
  }
}
function l(i, r2) {
  for (; r2.length > 0; ) {
    const e = Javy.IO.writeSync(i, r2);
    if (e < 0)
      throw Error("Error while writing to file descriptor");
    if (e === 0)
      throw Error("Could not write all contents in buffer to file descriptor");
    r2 = r2.subarray(e);
  }
}

// node_modules/@shopify/shopify_function/run.ts
function run_default(userfunction) {
  const input_data = o(r.Stdin);
  const input_str = new TextDecoder("utf-8").decode(input_data);
  const input_obj = JSON.parse(input_str);
  const output_obj = userfunction(input_obj);
  const output_str = JSON.stringify(output_obj);
  const output_data = new TextEncoder().encode(output_str);
  l(r.Stdout, output_data);
}

// extensions/order-discount-extension/src/index.js
var src_exports = {};
__reExport(src_exports, __toESM(require_run()));

// <stdin>
function run() {
  return run_default(src_exports.run);
}
export {
  run
};
