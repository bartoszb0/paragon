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
            newRow.insertCell().innerHTML = quantity;
            newRow.insertCell().innerHTML = `${product.price}zł`;
            newRow.insertCell().innerHTML = `${price.toFixed(2)}zł`;

            updateSum(price);
        }
    })
    this.reset();
}

function updateSum(price=null) {
    if (price === null) {
        sumPrice.innerHTML = '0zł'
    } else {
        sumPrice.innerHTML = `${(parseFloat(sumPrice.innerHTML) + price).toFixed(2)}zł`;
    }
}

form.addEventListener('submit', addItem);