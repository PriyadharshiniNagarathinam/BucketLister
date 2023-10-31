const addButton = document.getElementById("AddMyWish");
const buttons = document.querySelector(".buttons");
const collapses = document.querySelectorAll(".collapse");
let collapseForEveryListItems = document.querySelectorAll(
  ".collapseForEveryListItem"
);
const showButton = document.querySelector('[data-id="showMyBucketList"]');

addButton.addEventListener("click", myfunction);
showButton.addEventListener("click", showAll);
buttons.addEventListener("click", handleClick);

function handleClick(e) {
  if (e.target.matches("button")) {
    collapses.forEach((collapse) => collapse.classList.remove("show"));

    const { id } = e.target.dataset;

    const selector = `.collapse[id="${id}"]`;

    document.querySelector(selector).classList.add("show");
  }
}
function myfunction(e) {
  e.preventDefault();

  let inputValue = document.getElementById("EnterNewWish").value;
  let deadline = document.getElementById("deadline").value;
  let description = document.getElementById("AddDescription").value;

  let obj = { wish: inputValue, description: description, deadline: deadline };

  document.getElementById("EnterNewWish").value = "";
  document.getElementById("deadline").value = "";
  document.getElementById("AddDescription").value = "";

  let key = crypto.randomUUID();
  localStorage.setItem(key, JSON.stringify(obj));
}

function showAll() {
  let wishes = allStorage();

  let div = document.getElementById("showCaseArea");
  let ul = document.getElementById("wishesList");

  ul.innerHTML = "";
  console.log(wishes);
  if (Object.keys(wishes).length > 0) {
    for (let key in wishes) {
      let wishesObj = JSON.parse(wishes[key]);
      let wishItem = wishesObj["wish"];
      let descriptionItem = wishesObj["description"];
      let deadlineItem = wishesObj["deadline"];

      let listItem = document.createElement("li");
      listItem.classList.add("wishesList");
      listItem.setAttribute("data-id", wishItem);
      listItem.addEventListener("click", function () {
        collapseForEveryListItems = document.querySelectorAll(
          ".collapseForEveryListItem"
        );

        collapseForEveryListItems.forEach((collapse) => {
          collapse.classList.remove("show");
        });

        const ListIdVal = wishItem;
        const detailSelector = `.collapseForEveryListItem[id="${ListIdVal}"]`;
        document.querySelector(detailSelector).classList.add("show");
      });

      let wishDiv = document.createElement("div");

      let detailsDiv = document.createElement("div");
      detailsDiv.classList.add("collapseForEveryListItem");
      detailsDiv.id = wishItem;

      let descriptionPara = document.createElement("p");
      descriptionPara.classList.add("mb-1");
      descriptionPara.textContent = descriptionItem;

      let deadlineSmall = document.createElement("small");
      deadlineSmall.textContent = `Deadline: ${deadlineItem}`;

      detailsDiv.appendChild(descriptionPara);
      detailsDiv.appendChild(deadlineSmall);

      wishDiv.appendChild(document.createTextNode(wishItem));

      listItem.appendChild(wishDiv);
      wishDiv.appendChild(detailsDiv);

      ul.appendChild(listItem);
    }
    let clearButton = document.createElement("button");
    clearButton.classList.add("btn", "btn-outline-success");
    clearButton.textContent = "Clear";
    clearButton.addEventListener("click",() => {
      localStorage.clear();
      clearButton.remove();
      showAll();
    })
    div.appendChild(clearButton);
  } else {
    const h1 = document.createElement("h2");
    h1.textContent = "No Wishes <3";
    ul.appendChild(h1);
  }
}

function allStorage() {
  var archive = {},
    keys = Object.keys(localStorage), // returns an array containing all the keys (property names) of the items stored in the localStorage of a web browser
    i = keys.length;

  while (i--) {
    archive[keys[i]] = localStorage.getItem(keys[i]);
  }
  return archive;
}
