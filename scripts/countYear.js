"use strict";

const currentYear = new Date().getFullYear();
const yearElement = document.querySelector("#copyright-year");
yearElement.innerHTML = currentYear;
