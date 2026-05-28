const orderForm = document.querySelector("#order");
// console.log(orderForm);
console.log('marjae');

//_________got from MDN____________________
async function postJSON(data) {
   console.log("aaaaaaaa");
   try {
      const response = await fetch("/order-submited", {
         method: "POST", // or 'PUT'
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);
   } catch (error) {
      console.error(">>>>Error:", error);
   }
}

//   const data = { username: "example" };
//   postJSON(data);
//_____________________________

function getData(event) {
   event.preventDefault();
   console.log("Running...");
   const productRow = document.querySelectorAll("#productRow");
   // console.log(productRow);
   const arr = [];
   productRow.forEach((item) => {
      // console.log(item);
      if (item.querySelector("#marjae").value) {
         const obj = {};
         // obj.subGroupe = item.querySelector("#subGroupe").textContent
         // obj.productName = item.querySelector("#productName").textContent;
         obj["نام کالا"] = item.querySelector("#productName").textContent.trim();
         obj.dkp = item.querySelector("#dkp").textContent.trim();
         obj.dkpc = item.querySelector("#dkpc").textContent.trim();
         // obj.holoo = item.querySelector("#holoo").textContent;
         // obj.holoo = item.querySelector("#holoo").textContent;
         obj["کد هلو"] = item.querySelector("#holoo").textContent;
         obj['مرجع فعلی']= item.querySelector('#currentMarjae').textContent
         // obj.orderCount = parseInt(item.querySelector("#orderCount").value);
         // obj["تعداد"] = parseInt(item.querySelector("#orderCount").value);
         // obj.orderPrice = parseInt(item.querySelector("#orderPrice").value);
         obj["مرجع"] = parseInt(item.querySelector("#marjae").value);
         // withoutPriceIsOk = true
         // if (!obj["فی"]) {
         //    __price = prompt(obj["نام کالا"] + "قیمت ندارد");
         //    obj["فی"] = __price
         //    const x = item.querySelector("#marjae");
         //    console.log(__price);
         //    x.value = obj["فی"];
         // }
         // console.log(obj);
         arr.push(obj);
      }
   });
   if (confirm("آیا از ثبت فاکتور مطمئن هستید؟") == true) {
      const fileName = document.querySelector("#fileName").value;
      console.log("fileName>>>>>>>", fileName);
      console.log(arr);
      const invoice = { fileName: fileName, invoiceDetail: arr };
      //    const data = { name: "behzad" };
      postJSON({ data: invoice });
      alert("اطلاعات ثبت شد.");
      // document.location.reload()

      //    return arr;
   }
}

orderForm.addEventListener("submit", getData);

