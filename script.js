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

let previousProduct = null;

const basket = JSON.parse(localStorage.getItem('basket'));
if (basket.length >= 1) {
    basket.forEach(product => {
        addItem(null, product.name, product.quantity)
    });
}

updateSum();

products.forEach(product => {
    const opt = document.createElement('option');
    opt.value = product.name;
    opt.innerHTML = product.name;
    select.appendChild(opt);
})


function addItem(e,
    name=e.target.querySelector('[name=product]').value,
    quantity=parseFloat(e.target.querySelector('[name=quantity]').value)
) {

    if (e != null) {
        e.preventDefault();
    }

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

            let price = parseFloat(product.price * quantity)
            newRow = table.insertRow()

            const shownLp = newRow.insertCell();
            shownLp.setAttribute('name', 'productLp'); 

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
            updatePositions();
            updateSum();

            if (e) {
                this.reset();
            }
        }
    })
}

function editQuantity(e) {
    const cell = e.target
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
                let lastProduct = allProducts[allProducts.length - 1];
                if (lastProduct) {
                    previousProduct = (allProducts[allProducts.length - 1].innerHTML);
                } else {
                    previousProduct = null;
                }
                updatePositions();
                updateSum();
                return;
            }
            input.replaceWith(cell);
            cell.innerHTML = input.value;
            updatePrice(cell);
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

    const allRows = [...document.querySelectorAll('table tr')];
    const basket = [];
    allRows.slice(1).forEach(row => {
        let name = row.querySelector('[name=productName]').innerHTML;
        let quantity = parseFloat(row.querySelector('[name=productQuantity').innerHTML);

        basket.push({
            name: name,
            quantity: quantity
        })
    })
    localStorage.setItem('basket', JSON.stringify(basket))
}

function updatePositions() {
    const allProducts = document.querySelectorAll('[name=productLp]');
    
    for (let i = 0; i < allProducts.length ; i++) {
        allProducts[i].innerHTML = i + 1;
    }
}

form.addEventListener('submit', addItem);