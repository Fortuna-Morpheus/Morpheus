"use strict";
const $ = require('jquery');

$(document).ready(function () {

    const {getBills} = require('./api.js');

    // Function to filter bills according to requested type (Bi-Weekly, Monthly, Yearly)
    let getBillsMonthly = freqType => {
        let requestedBills = []; // Empty bucket for the monthly bills
        getBills().then(data => { // Retrieve bills JSON then do something with the data
            // console.log(data) // Console log for debugging
            data.forEach(bill => { // Cycle thru each bill
                if (bill.frequency === freqType) { // if the bill's frequency is equal to type requested
                    requestedBills.push(bill); // Push bill into monthly bill array
                }
            });
        });
        return requestedBills; // returns array of bills meeting freq requested
    };


    console.log(getBillsMonthly("Bi-Weekly"));
    console.log(getBillsMonthly("Monthly"));
    console.log(getBillsMonthly("Yearly"));

    // Function to determine if bill shows Paid or Unpaid
    let billPaid = status => {
        if (status){ return "Paid"}
        else{ return "Unpaid"}
    };

    // Function to display correct due dates if multiple
    let multipleDueDates = dates => {
        let allDueDates = "";
        if (typeof dates !== "object"){
            return dates;
        } else {
            allDueDates += dates[0] + " & " + dates[1];
        }
        return allDueDates;
    };

    // Function to create HTML
    let createTableData = (status, category, alias, name, amount, dueDate, frequency,website) => {
        // Variable for empty string
        let html = "";
        // Push all elements of the table row to the empty string
        html += `
            <tr>
                <th scope="row" class="paid-status">${billPaid(status)}</th>
                <td>${category}</td>
                <td>${alias}</td>
                <td>\$${amount}</td>
                <td>${multipleDueDates(dueDate)}</td>
                <td>${frequency}</td>
                <td><a href="https://${website}" target="_blank">${name}</a></td>
            </tr>
        `;
        // Console log for debugging
        // console.log(html);

        // Returns string of table row data
        return html;
    };

    // Function for creating table row data appending it to table on HTML
    let createData = bills => {
        // Iterates thru each bill and takes data
        bills.forEach(({status, category, alias, name, amount, dueDate, frequency, website}) => {
            // uses above function to take data and append it to HTML
            $("#dataTextArea").append(createTableData(status, category, alias, name, amount, dueDate, frequency, website));
        });

        // Adds click functions since data is created on HTML
        $(".paid-status").click(()=> {
            console.log(this);
        })
    };

    // Runs bills and places on HTML
    getBills().then((data) => {
        createData(data);
        // If errors alert
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });




});
