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

function addItem(e) {
    e.preventDefault();
    const name = e.target.querySelector('[name=product]').value
    const quantity = parseFloat(e.target.querySelector('[name=quantity]').value)

    products.forEach(product => {
        if (name === product.name) {
            basket.push(product);

            let price = parseFloat(product.price * quantity)
            newRow = table.insertRow()
            newRow.insertCell().innerHTML = `${basket.length}`;
            newRow.insertCell().innerHTML = name;

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

            updateSum();
        }
    })
    this.reset();
}

function editQuantity(e) {
    const oldValue = e.target.innerHTML
    const input = document.createElement('input');
    input.value = oldValue
    input.classList.add('quantityControl')
    e.target.replaceWith(input);
    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && validateNewQ(input.value)) {
            this.innerHTML = input.value;
            input.replaceWith(this);
            updatePrice(this);
        }
    })
}

function validateNewQ(input) {
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