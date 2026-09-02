// src/index.js
"use strict";

import "./styles.css";
import generateFooter from "./generateFooter.js";

import { reverseString, Calculator } from "../src/testing.js";

generateFooter();

console.log(reverseString("the tall thin man"));

console.log(Calculator.add(3,43));