let input = document.querySelector("#idinput");
let add = document.querySelector(`#add`);
let checkBoxDiv = document.querySelector(".checkboxes");
let form = document.querySelector("form");
let deleteAll = document.querySelector("#deleteAll");
let remove = document.querySelector(`span`);
let LS = window.localStorage;
let arr = [];
let deleteCompleted = document.querySelector(`#deleteCompleted`);

form.addEventListener("submit", function (event) {
  //добавляем событие к форме
  event.preventDefault();
  console.log(input.value); //консоль для значения инпута для проверки себя
  if (input.value) {
    // если инпут что то содержит
    addLs(input.value); // запускаем функцию ,которая закинет в локал сторэдж значение инпута
    createItem(input.value); //запускаем функцию , которая создаст элемент из значения инпута
  }

  input.value = ""; // строку инпута очищаем
});

if (LS.ToDoList) {
  //если в локал сторэдж что то есть и он трушный
  addList(); //запускаем функцию которая их массива создает элементы
}

deleteAll.addEventListener(`click`, function () {
  //функция которая все удаляет
  checkBoxDiv.innerHTML = ``; //иннер хтмл= ничего.
  LS.removeItem("ToDoList"); // удаляем из локал стораджа значения
  arr = []; //массив тоже пустой-чтобы после перезагрузки страницы ничего не появлялось
});

checkBoxDiv.addEventListener(`click`, function (event) {
  let target = event.target;
  if (target.tagName === "SPAN") {
    let text = target
      .closest(".checkboxes__everycheckbox")
      .querySelector("p").innerHTML;
    arr.splice(arr.splice(text), 1);
    LS.setItem(`ToDoList`, JSON.stringify(arr));
    target.closest(".checkboxes__everycheckbox").remove();
  }

  if (target.tagName === "INPUT") {
    console.log(target.nextElementSibling);
    target.nextElementSibling.classList.toggle(`line`);
    // arr[target].check.toggle(true);
    // console.log(arr.findIndex(target.nextElementSibling.textContent));
    console.log(
      arr.findIndex((el) => el.content == target.nextElementSibling.textContent)
    );

    let test =
      arr[
        arr.findIndex(
          (el) => el.content == target.nextElementSibling.textContent
        )
      ];
    console.log(test.check);
    test.check ? (test.check = false) : (test.check = true);
    LS.setItem(`ToDoList`, JSON.stringify(arr));
  }
});

function createItem(text, check = false) {
  let item = document.createElement("div");
  item.classList.add("checkboxes__everycheckbox");
  item.innerHTML = `
    <div class="inputdiv">
      <input type="checkbox" ${check ? "checked" : ""}/>
      <p class='${check ? "line" : ""}'>${text}</p>
    </div>
    <span>❌</span>`;

  checkBoxDiv.append(item);
}

function addList() {
  //функция
  //   arr = LS.getItem(`ToDoList`).split(`,`); //массив равен значению тудулиста , но так как это строка , используем сплит через запятую
  arr = JSON.parse(LS.getItem(`ToDoList`));
  console.log(arr);
  for (el of arr) {
    //перебор элементов массива
    createItem(el.content, el.check); //запускаем функцию создания элемента из массива (в котором значения локалсторэдж)
  }
}

function addLs(text) {
  let obj = {
    content: text,
    check: false,
  };
  //функция  с параметром текст
  arr.push(obj); // добавить в массив объект
  LS.setItem(`ToDoList`, JSON.stringify(arr)); // задать в переменную локал сторэдж этот массив??
}

deleteCompleted.addEventListener(`click`, function () {
  let allInputs = document
    .querySelector(".checkboxes")
    .querySelectorAll(`input`);
  console.log(allInputs);
  for (el of allInputs) {
    if (el.checked) {
      // console.log(el)
      let test = arr.findIndex(
        (item) =>
          item.content ==
          el.closest(`.checkboxes__everycheckbox`).querySelector("p").innerHTML
      );
      //   console.log(
      //     el.closest(`.checkboxes__everycheckbox`).querySelector("p").innerHTML
      //   );
      console.log(test);

      arr.splice(test, 1);
      console.log(arr);
      LS.setItem(`ToDoList`, JSON.stringify(arr));
      el.closest(`.checkboxes__everycheckbox`).remove();
    }
  }
});
