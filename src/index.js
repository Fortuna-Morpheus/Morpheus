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


});
