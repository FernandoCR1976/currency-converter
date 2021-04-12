async function getCurrencies(){
    const currencies = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then(Response => Response.json())
    .catch(console.error());
    console.log(currencies);
    createTableOfValues(currencies);
}
function createTableOfValues(currencies){
    //tabela temporaria - para fins de teste
    let table = '<table cellpadding="0px" cellspacing="0px">';
    table += '<tr><th>código</th><th>moeda</th><th>valor</th></tr>';
    for (const currency of Object.values(currencies)){
        table += '<tr>'
        table += `<td>${currency.code}</td><td>${currency.name}</td><td>${currency.high}</td></td>`
        table += '</tr>'
        console.log(currency);
    }
    table += '</table>';
    document.querySelector('body').innerHTML = table;
}

getCurrencies();