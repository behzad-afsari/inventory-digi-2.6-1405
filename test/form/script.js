const myForm = document.querySelector("#my_form");
// console.log(myForm);

// myForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     console.log("behzad");
//     alert('hello behzad')
// });

// const myForm = document.getElementById('my_form')

myForm.addEventListener("submit", logProductsinform_2);

function logProductsinform_1(event) {
   event.preventDefault();
   // console.log("aaaaaaaaaaaa");
   // alert('hi behzad')
   //    const count = document.querySelector("#buyCount").value;
   const count = document.querySelectorAll("#buyCount");
   //    const count = document.querySelectorAll("#buyCount").values;
   console.log(count);
   count.forEach((item) => {
      console.log(item.value);
   });
   //    console.log("count >>", count);
}
function logProductsinform_2(event) {
   event.preventDefault();
   const rowProducts = document.querySelectorAll("#product-row");
   console.log(rowProducts);
   console.log(rowProducts[0].childNodes);
   console.log(rowProducts[0].querySelector('#dkpc').innerHTML);
   //    const count = document.querySelectorAll("#buyCount").values;
   // console.log(rowProducts[0].querySelector('#buyCount').value);
   const arr = []
   rowProducts.forEach((item) => {
         // console.log(item);
         //   console.log(item.value);
      // console.log('count >>',item.querySelector('#buyCount').value);
      const obj = {}
      obj.dkp =item.querySelector('#dkp').innerHTML
      obj.dkpc =item.querySelector('#dkpc').innerHTML
      obj.name =item.querySelector('#name').innerHTML
      // console.log('>>>',item.querySelector('#dkp').innerHTML,'-',item.querySelector('#dkpc').innerHTML,'=',item.querySelector('#name').innerHTML);
arr.push(obj)
   });
   //    console.log("count >>", count);
      console.log("arr >>", arr);
}