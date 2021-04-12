async function getCurrencies(){
    const currencies = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then(Response => Response.json())
    .catch(console.error());
    console.log(currencies);
    createTableOfValues(currencies);
}
function createTableOfValues(currencies){
    let table = '<table cellpadding="0px" cellspacing="10px">';
    table += '<tr><th>código</th><th>moeda</th><th>valor</th></tr>';
    table += '</table>';
    document.write(table);
}

getCurrencies();