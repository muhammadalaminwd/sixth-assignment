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
        .then(data => displayPhone(data.data.slice(0,20)))
        inputPhone.value = '';
    }
};

// Display the phone
const displayPhone = (data) => {
    if(data == ''){
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
        </div>
            `;
            phoneContainer.appendChild(div);
        });
    }
};

//  Get the phone Details
const phoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(info => displayDetails(info.data));
};

// Display the phone Details
const displayDetails = singlePhone =>{
    let releaseText = "";
    if(singlePhone.releaseDate == ""){
        releaseText = "Not released yet!";
    }
    else{
        releaseText = singlePhone.releaseDate;
    }
    const phoneDetail = document.getElementById('phone-detail');
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card mb-3" style="width: 28rem;">
    <img src="${singlePhone.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5> ${singlePhone.brand}</h5>
    <h3 class="card-title">${singlePhone.name}</h3>
    <p><span class="fw-bold">Release Date: </span>${releaseText}</p>
    <p><span class="fw-bold">Storage:</span> ${singlePhone.mainFeatures.storage}</p>
    <p><span class="fw-bold">Chipset: </span>${singlePhone.mainFeatures.chipSet}</p>
    <p><span class="fw-bold">Display Size: </span>${singlePhone.mainFeatures.displaySize}</p>
    <p><span class="fw-bold">Sensors: </span>${singlePhone.mainFeatures.sensors}</p>
    <p><span class="fw-bold">Others: </span>${singlePhone.mainFeatures.memory}</p>
    </div>
    </div>
    `;
    phoneDetail.appendChild(div);
}

