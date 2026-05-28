function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const sumElement = document.querySelector("#sum-invoice");
sumElement.innerHTML = numberWithCommas(sumElement.innerHTML)
