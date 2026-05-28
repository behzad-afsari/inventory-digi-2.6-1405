function on_hover() {
  const rows = document.querySelectorAll(".tb tr");
  rows.forEach((row) => {
    row.addEventListener("mouseover", function () {
      const tds = row.querySelectorAll("td");
      tds.forEach((td) => {
        td.style.opacity = "0.9";
      });
      this.style.backgroundColor = "black";
    });
  });
}

function hover_out() {
  const rows = document.querySelectorAll(".tb tr");
  rows.forEach((row) => {
    row.addEventListener("mouseout", function () {
      const tds = row.querySelectorAll("td");
      tds.forEach((td) => {
        td.style.opacity = "1";
        // td.style.backgroundColor = ""
      });
    });
  });
}

on_hover();
hover_out();
