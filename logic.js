let imgfrom = document.querySelector("#imgfrom");
let imgto = document.querySelector("#imgto");
let selects = document.querySelectorAll("select");
let enter = document.querySelector("#enter");
let outputFrom = document.querySelector(".fromresult");
let outputTo = document.querySelector(".toresult");
let get = document.querySelector(".get");
let i = document.querySelector("i");
let button = document.querySelector(".btn");

let url = "https://open.er-api.com/v6/latest/EUR";
let from = "USD";
let to = "INR";

const getdata = async () => {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  let input = enter.value;
  if (input <= 0) {
    enter.value = "1";
    input = 1;
  }
  let fromVal = data.rates[from];
  let toVal = data.rates[to];
  let result = input * (toVal / fromVal);
  outputFrom.innerText = input + " " + from;
  outputTo.innerText = String(Math.round(result * 1000) / 1000) + " " + to;
  get.innerText = "1 " + from + " = " + result / input + to;
  get.classList.remove("hide");
};

button.addEventListener("click", async () => {
  button.innerText = "converting ...";
  button.disabled = true;
  await getdata();
  button.innerText = "Get Exchange Rate";
  button.disabled = false;
});

for (let select of selects) {
  for (let currency in countryList) {
    let newCur = document.createElement("option");
    newCur.innerText = currency;
    newCur.value = currency;
    if (select.name === "from" && newCur.innerText === "USD") {
      newCur.selected = "selected";
    }
    if (select.name === "to" && newCur.innerText === "INR") {
      newCur.selected = "selected";
    }
    select.append(newCur);
  }
}

selects[0].addEventListener("change", (e) => {
  updateFlag1(e.target);
  from = e.target.value;
});
const updateFlag1 = (ele) => {
  let curr = ele.value;
  let country = countryList[curr];
  imgfrom.setAttribute(
    "src",
    "https://flagsapi.com/" + country + "/flat/64.png"
  );
};

selects[1].addEventListener("change", (e) => {
  updateFlag2(e.target);
  to = e.target.value;
});
const updateFlag2 = (ele) => {
  let curr = ele.value;
  let country = countryList[curr];
  imgto.setAttribute("src", "https://flagsapi.com/" + country + "/flat/64.png");
};
