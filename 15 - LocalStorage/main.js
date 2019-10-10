const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value; // this reffers to the form - select the elem. with attr. name=item
    const item = {
        text: text,
        done: false
    }
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem("items", JSON.stringify(items));
    this.reset(); // clear the input
}

function populateList(items = [], platesList) {
    platesList.innerHTML = items.map((item, i) => {
        return `  
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? "checked" : ""}/>
                <label for="item${i}">${item.text}</label>
            </li>
        `
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches("input")) return
    const el = e.target;
    const index = el.dataset.index;

    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));// store is ls
    populateList(items, itemsList); // refresh the list
}


addItems.addEventListener('submit', addItem);
itemsList.addEventListener("click", toggleDone);
populateList(items, itemsList);