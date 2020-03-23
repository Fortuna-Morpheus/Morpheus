"use strict";
const $ = require('jquery');

$(document).ready(function () {

    const {getBills} = require('./api.js');


    function getBillsMonthly() {
        getBills().then(function (data) {
            data.forEach(function (expenses) {
                expenses.monthly.forEach( function (bills) {
                    console.log(bills);
                })
            })
        })
    }
    getBillsMonthly();

    function getBillsYearly() {
        getBills().then(function (data) {
            data.forEach(function (expenses) {
                expenses.yearly.forEach( function (bills) {
                    console.log(bills);
                })
            })
        })
    }
    getBillsYearly();


});
