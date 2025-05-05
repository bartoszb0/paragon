const products = [
{
    name: 'Jabłko',
    price: '1.50'
},
{
    name: 'Gruszka',
    price: '2.31'
},
{
    name: 'Mleko',
    price: '3.10'
},
{
    name: 'Woda',
    price: '0.60'
},
{
    name: 'Cukier',
    price: '10.00'
}
];

// TODO jak da sie wartosc 0 to produkt sie usuwa

const select = document.querySelector('#selectControl');
const form = document.querySelector('form');
const table = document.querySelector('table');
const sumPrice = document.querySelector('#sum');

const basket = []

updateSum();

products.forEach(product => {
    const opt = document.createElement('option');
    opt.value = product.name;
    opt.innerHTML = product.name;
    select.appendChild(opt);
})

let previousProduct = null;

function addItem(e) {
    e.preventDefault();
    const name = e.target.querySelector('[name=product]').value
    const quantity = parseFloat(e.target.querySelector('[name=quantity]').value)

    if (previousProduct === name) {
        const allItems = [...document.querySelectorAll('[name=productQuantity]')];

        const lastItem = allItems[allItems.length - 1];
        const currentQuantity = parseFloat(lastItem.innerHTML);
        lastItem.innerHTML = currentQuantity + quantity;
        updatePrice(lastItem);
        this.reset();
        return;
    }

    products.forEach(product => {
        if (name === product.name) {
            basket.push(product);

            let price = parseFloat(product.price * quantity)
            newRow = table.insertRow()
            newRow.insertCell().innerHTML = `${basket.length}`;

            const shownName = newRow.insertCell();
            shownName.innerHTML = name;
            shownName.setAttribute('name', 'productName');

            const shownQuantity = newRow.insertCell();
            shownQuantity.innerHTML = quantity;
            shownQuantity.setAttribute('name', 'productQuantity');
            shownQuantity.addEventListener('click', editQuantity);

            const shownPrice = newRow.insertCell();
            shownPrice.innerHTML = `${product.price}zł`;
            shownPrice.setAttribute('name', 'productPrice');
            
            const shownSum = newRow.insertCell();
            shownSum.innerHTML = `${price.toFixed(2)}zł`;
            shownSum.setAttribute('name', 'productSum');

            previousProduct = product.name
            updateSum();
            this.reset();
        }
    })
}

function editQuantity(e) {
    const oldValue = e.target.innerHTML
    const input = document.createElement('input');
    input.value = oldValue
    input.classList.add('quantityControl')
    e.target.replaceWith(input);
    input.focus();
    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && validateNewQ(input.value)) {
            if (parseFloat(input.value) === 0 || !input.value) {
                input.parentElement.remove();
                let allProducts = document.querySelectorAll('[name=productName]');
                previousProduct = (allProducts[allProducts.length - 1].innerHTML);
            }
            this.innerHTML = input.value;
            input.replaceWith(this);
            updatePrice(this);
        }
    })
}

function validateNewQ(input) {
    if (parseFloat(input) === 0 || !input) {
        return true
    }
    if (!parseFloat(input) || (input % 0.5)) {
        return false
    } else {
        return true
    }
}

function updatePrice(element) {
    const row = element.parentElement
    
    const quantity = parseFloat(row.querySelector('[name=productQuantity]').innerHTML);
    const price = parseFloat(row.querySelector('[name=productPrice]').innerHTML);

    // Change the sum of current price
    const newPrice = parseFloat(quantity * price)
    row.querySelector('[name=productSum]').innerHTML = `${newPrice.toFixed(2)}zł`

    // Update the whole sum price
    updateSum();
}

function updateSum() {
    const allPrices = [...document.querySelectorAll('[name=productSum]')];
    if (allPrices.length === 0) {
        sumPrice.innerHTML = `0zł`;
    } else {
        let newSum = 0;
        allPrices.forEach(price => newSum += parseFloat(price.innerHTML))
        sumPrice.innerHTML = `${newSum.toFixed(2)}zł`;
    }
}

form.addEventListener('submit', addItem);