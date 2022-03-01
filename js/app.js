// Get all variables
const inputPhone = document.getElementById('input-phone');
const searchButton = document.getElementById('search-button');
const phoneContainer = document.getElementById('phone-container');

const searchPhone = () =>{
    const inputValue = inputPhone.value;
    if(inputValue.length == ''){
        phoneContainer.innerHTML = `
        <h1 class="text-center my-4 text-warning">Please write a phone name!</h1>
        `;
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
        fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        inputPhone.value = '';
    }
};