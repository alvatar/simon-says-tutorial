/*global define */
define([], function () {
    'use strict';
    
    $(document).ready(function() {
        $(".button").click( function(){
             var thisId = $(this).attr('id')
             if(thisId === "left-top") {
                 alert("Yes!")
             } else if ( thisId === "right-top") {

             } else if ( thisId === "left-bottom") {

             } else if ( thisId === "right-bottom") {

             } else {
                  console.log("Wrong button ID detected")
             }
        })
    })
    return "<============== OK";

    return '\'Allo \'Allo!';
});

