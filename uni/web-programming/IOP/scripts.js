import dbClient from './dbClient.js';

let supplierLabels;
let data;

const mainTableHeaders = document.querySelector('#entryTable thead');
const mainTableEntries = document.querySelector('#entryTable tbody');
const secondaryTableHeaders = document.querySelector('#editTable thead');
const secondaryTableEntries = document.querySelector('#editTable tbody');
var mainRow = document.createElement('tr');
var secondaryRow = document.createElement('tr');

function renderMainEntries(){
    mainTableEntries.innerHTML = '';

    if(supplierLabels.length === 0) return;

    data.forEach(entry => {
        var row = document.createElement('tr');
        supplierLabels.forEach(label => {
            row.innerHTML += '<td>' + entry[label] + '</td>'
        })
        mainTableEntries?.appendChild(row);
    })
}

function renderEditEntry(){
    secondaryTableEntries.innerHTML = '';
    var row = document.createElement('tr');

    if(supplierLabels.length === 0) return;

    supplierLabels
    .filter(label => label != 'created_at')
    .filter(label => label != 'Added_to_db_time')
    .forEach(label => {
        row.innerHTML += `<td> <input id="${label}"> </input> </td>`;
    })

    secondaryTableEntries?.appendChild(row);
    document.getElementById('submitEditDataButton').innerHTML = '<button> Submit </button>';
    document.getElementById('message').innerHTML = 'Please enter the ID of the row to edit:';
}

function renderInputEntry(){
    secondaryTableEntries.innerHTML = '';

    if(supplierLabels.length === 0) return;

    var row = document.createElement('tr');
    supplierLabels
        .filter(label => label != 'id')
        .filter(label => label != 'created_at')
        .filter(label => label != 'Added_to_db_time')    
        .forEach(label => {
            row.innerHTML += '<td>' + `<input id="${label}">` + '</input>' + '</td>'
        })

    secondaryTableEntries?.appendChild(row);
    document.getElementById('submitInputDataButton').innerHTML = '<button> Submit </button>';
    document.getElementById('message').innerHTML = 'Please enter the values to input:';
}

export async function insertDataOnClick(){
    let input = '';
    let finalInput = '';
    const tableSelection = document.getElementById('subject').value;

    supplierLabels
        .filter(label => label != 'id')
        .filter(label => label != 'created_at')
        .filter(label => label != 'Added_to_db_time')
        .forEach(label => {
            input += '"' + label + '": ' + '"' + document.getElementById(label).value + '", ';
        });

    finalInput = input.slice(0, -2);
    const jsonFormat = `{${finalInput}}`;
    await dbClient.insert(tableSelection, jsonFormat);

    outputInputView();
}

export async function editDataOnClick(){
    let input = '';
    let finalInput = '';
    const tableSelection = document.getElementById('subject').value;

    supplierLabels
        .filter(label => label != 'created_at')
        .filter(label => label != 'Added_to_db_time')
        .forEach(label => {
            input += '"' + label + '": ' + '"' + document.getElementById(label).value + '", ';
        });

    finalInput = input.slice(0, -2);
    const jsonFormat = `{${finalInput}}`;
    await dbClient.update(tableSelection, jsonFormat);

    outputEditView();
}

function renderMainHeader(){
    mainRow.innerHTML = '';
    supplierLabels = Object.keys(data[0]);

    if(supplierLabels.length === 0) return;

    supplierLabels.forEach(head => {
        mainRow.innerHTML += '<th>' + head + '</th>';
        mainTableHeaders.appendChild(mainRow);
    })
}

function renderEditHeaders(){
    secondaryRow.innerHTML = '';
    supplierLabels = Object.keys(data[0]);

    if(supplierLabels.length === 0) return;

    supplierLabels
        .filter(label => label != 'created_at')
        .filter(label => label != 'Added_to_db_time')  
        .forEach(head => {
            secondaryRow.innerHTML += '<th>' + head + '</th>';
            secondaryTableHeaders.appendChild(secondaryRow);
        })
}

function renderInputHeaders(){
    secondaryRow.innerHTML = '';
    supplierLabels = Object.keys(data[0]);

    if(supplierLabels.length === 0) return;

    supplierLabels
        .filter(label => label != 'id')
        .filter(label => label != 'created_at')
        .filter(label => label != 'Added_to_db_time')    
        .forEach(head => {
            secondaryRow.innerHTML += '<th>' + head + '</th>';
            secondaryTableHeaders.appendChild(secondaryRow);
        })
}

export async function login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginSuccess = await dbClient.signIn(email, password);

    if(!loginSuccess){
        document.querySelector('#loginMessage').innerHTML = 'Login Unsuccessful, please try again';
        return;
    }
    document.querySelector('#loginMessage').innerHTML = 'Login Successful';
}

export async function outputGetAllView(){
    resetTableAndButtonState();

    const searchValue = document.getElementById('subject').value;
    data = await dbClient.get(searchValue);
    if(!data) return;

    renderMainHeader();
    renderMainEntries(searchValue);
}

export async function outputEditView(){
    resetTableAndButtonState();

    const searchValue = document.getElementById('subject').value;
    data = await dbClient.get(searchValue);
    if(!data) return;

    renderMainHeader();
    renderMainEntries(searchValue);
    renderEditHeaders();
    renderEditEntry(searchValue);
}

export async function outputInputView(){
    resetTableAndButtonState();

    const searchValue = document.getElementById('subject').value;
    data = await dbClient.get(searchValue);
    if(!data) return;

    renderMainHeader();
    renderMainEntries(searchValue);
    renderInputHeaders();
    renderInputEntry(searchValue);
}

function resetTableAndButtonState(){
    mainTableHeaders.innerHTML='';
    mainTableEntries.innerHTML='';
    secondaryTableHeaders.innerHTML='';
    secondaryTableEntries.innerHTML='';

    document.getElementById('submitInputDataButton').innerHTML = '';
    document.getElementById('submitEditDataButton').innerHTML = '';
    document.getElementById('message').innerHTML = '';
}



