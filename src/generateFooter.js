// src/generateFooter.js

export default function generateFooter() {
  const divFooter = document.getElementById("djFooter");
  let date = new Date();
  let yr = date.getFullYear();
  divFooter.textContent = capitalize("this app was written by Dan Jeffrey in " + yr + ".");
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
