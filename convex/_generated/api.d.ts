/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as LiveValidation from "../LiveValidation.js";
import type * as NewsLetter from "../NewsLetter.js";
import type * as bookmarks from "../bookmarks.js";
import type * as cart from "../cart.js";
import type * as cartegories from "../cartegories.js";
import type * as products from "../products.js";
import type * as reviews from "../reviews.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  LiveValidation: typeof LiveValidation;
  NewsLetter: typeof NewsLetter;
  bookmarks: typeof bookmarks;
  cart: typeof cart;
  cartegories: typeof cartegories;
  products: typeof products;
  reviews: typeof reviews;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
