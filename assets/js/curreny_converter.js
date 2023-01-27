const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "LKR" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}  - ${country_list[currency_code].name}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}


function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].code.toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
    getCurrentExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
    getCurrentExchangeRate();
    getCurrentDate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    // getCurrentExchangeRate();
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
   

   
    let amountVal = amount.value;
  
    // if(amountVal == "" || amountVal == "0"){
    //     amount.value = "1";
    //     amountVal = 1;
    // }
    if(amountVal == "")
    {
        amount.value = 1;
        amountVal = 1;
    }
    else if(amountVal <= 0 )
    {
        exchangeRateTxt.innerText = "Please enter a valid amount. The amount should always be above zero";
        exchangeRateTxt.style.color = "red";
    
    }
    else if(amountVal > 1000)
    {
        exchangeRateTxt.innerText = "Please enter an amount below 1000";
        exchangeRateTxt.style.color = "red";
    }
    else {
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/0931f04d4b4535fcd7184b9d/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);

        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
        exchangeRateTxt.style.color = "white";
        
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong";
    });
}
}

function getCurrentDate(){
    var datetime = new Date().toLocaleString('en-GB');
    document.getElementById("time").textContent = "Calculation Timestamp : " + datetime; //it will print on html page   
}

function getCurrentExchangeRate(){
    const currentExchangeRateTxt = document.querySelector("form .exchange-rate-fixed");
    const amount = document.querySelector("form input");
    
    let amountVal = amount.value;
    amountVal = 1;

    currentExchangeRateTxt.innerText = "Current Exchange Rate...";
    let url = `https://v6.exchangerate-api.com/v6/0931f04d4b4535fcd7184b9d/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);

        currentExchangeRateTxt.innerText = `Current Exchange Rate : ${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
        currentExchangeRateTxt.style.color = "white";
        
    }).catch(() =>{
        currentExchangeRateTxt.innerText = "Something went wrong";
    });
   
}