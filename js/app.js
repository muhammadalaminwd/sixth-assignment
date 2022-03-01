// Get all variables
const inputPhone = document.getElementById('input-phone');
const searchButton = document.getElementById('search-button');
const phoneContainer = document.getElementById('phone-container');

// Get the phone API
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
        .then(data => displayPhone(data.data))
        inputPhone.value = '';
    }
};

// Display the phone
const displayPhone = (data) => {
    if(!data){
        phoneContainer.innerHTML = `
        <h1 class="text-center my-4 text-warning">No result found</h1>
        `;
    }
    else{
        phoneContainer.innerHTML = "";
        data?.forEach((phone) => {
            const div = document.createElement("div");
            div.innerHTML = `
        <div class="card mb-3" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h3 class="card-title">${phone.phone_name}</h3>
            <h5>Brand: ${phone.brand}</h5>
            <button  onclick="phoneDetails('${phone.slug}')" class="btn btn-primary w-100">Phone Details</button>
            </div>
        </div>phop
            `;
            phoneContainer.appendChild(div);
        });
    }
};

//  Get the phone Details
const phoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId.slug}`;
    fetch(url)
    .then(res => res.json())
    .then(info => displayDetails(info.data));
}

// Display the phone Details
const displayDetails = singlePhone =>{
    console.log(singlePhone)
    const phoneDetail = document.getElementById('phone-detail');
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${singlePhone.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h3 class="card-title">${singlePhone.phone_name}</h3>
        <h5>Brand: ${singlePhone.brand}</h5>
        <p>${singlePhone.mainFeatures}</p>
        <a href="${singlePhone.others}" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    `;
    phoneDetail.appendChild(div);
}

