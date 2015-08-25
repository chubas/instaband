/* jshint node: true */
"use strict";

require("stores");

var React = require("react"),
    Instaband = require("pages/instaband");

$(function () {
    React.render(new Instaband(), $("#app")[0]);
});