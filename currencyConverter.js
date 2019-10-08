const axios = require('axios');

const getRate = async (fromCurrency, toCurrency)=>{
    try{
        const responce = await axios.get('http://www.apilayer.net/api/live?access_key=8020983b8920341b2256f03248eb2d90');
        const rate = responce.data.quotes; 
        const baseCurrency = responce.data.source;
        const usd = 1/rate[`${baseCurrency}${fromCurrency}`];
        const exachangeRate = usd * rate[`${baseCurrency}${toCurrency}`];
        return exachangeRate;
    }catch(error){
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }
}

const getCountries = async (currencyCode)=>{
    try{
        const responce = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return responce.data.map(country=>country.name);
       
    }catch(error){
        throw new Error();
    }
    
}

const converter = async(fromCurrency, toCurrency, amount)=>{
    const exachangeRate = await getRate(fromCurrency,toCurrency);
    const countries = await getCountries(toCurrency);
    const result = amount*exachangeRate;
    return `${amount} ${fromCurrency} is worth ${result} ${toCurrency}. 
    You can spend these in the following countries: ${countries}`;
}

converter('USD','BYR',20)
.then((message) => {
    console.log(message);
}).catch((error) => {
    console.log(error.message);
});