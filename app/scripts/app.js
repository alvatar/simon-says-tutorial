/*global define */
define([], function () {
    'use strict'
    
    var userPlaying = false
    var userClicks = new Array()
    var buttonList
    var computerSequence = new Array()

    var initialize = function() {
        buttonList = jQuery.map( $(".button"),
                       function(element) {
                         return $(element).attr('id')
                       })
    }

    var generateComputerSequence = function() {
        computerSequence.push( buttonList[
                                 Math.floor(Math.random()
                                   * buttonList.length)] )
        console.log(computerSequence)
    }

    var highlight = function(button, color) {
      var oldColor = button.css("background-color")
      button.css("background-color", color).dequeue()
            .delay(300)
            .queue( function() {
                    button.css("background-color", oldColor).dequeue()
                  })
    }

    var showComputerSequence = function() {
        var seq = computerSequence
        for(var id in seq) {
           (function(id){
             setTimeout( function() {
               highlight($("#"+seq[id]), "#fff")
             }, 600*id)
           })(id)
        }
        setTimeout( function() {
            userPlaying = true
        }, 600*seq.length)
    }

    var compareSequences = function() {
        for(var i in userClicks) {
            if(computerSequence[i] !== userClicks[i]) return false
        }
        return true
    }

    var endGame = function() {
        var response = confirm("HORROR. Restart?")
        if (response) {
            userClicks.length = 0
            computerSequence.length = 0
            setTimeout( function() {
                generateComputerSequence()
                showComputerSequence()
            }, 2000)
        }
    }
    
    $(document).ready(function() {
        initialize()

        $('#start-button').click(function() {
            $(this).css('color', '#fff').fadeOut()
            setTimeout( function() {
                generateComputerSequence()
                showComputerSequence()
            }, 500)
        })

        $('.button').click( function() {
            if(userPlaying) {
                var thisId = $(this).attr('id')
                highlight($(this), "#fff")
                userClicks.push(thisId)

                if (!compareSequences()) {
                    userPlaying = false
                    endGame()
                }
                if (userClicks.length >= computerSequence.length) {
                    userPlaying = false
                    userClicks.length = 0
                    setTimeout(function() {
                        generateComputerSequence()
                        showComputerSequence()
                    }, 1000)
                }
            }
        })
    })
    return "<============== OK";

    return '\'Allo \'Allo!';
});

