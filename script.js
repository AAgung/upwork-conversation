// jQuery JavaScript
(function($) {
    "use strict";
    //LESSON 9 
    var colorRed = "#FF3333",
        borderColorDefault = "gray",
        borderColorRight = "#5CB85C",
        borderColorWrong = "#FF3333",
        messageOnUnselectedBlanks = "Please Fill all the blanks",
        i,
        answersArray = [], 
        selectedAnswersArray = [], 
        shuffledAnswersArray = [], 
        uniqueShuffledAnswersArray = [], 
        optionsHtmlArray = [], 
        optionsHtml = "",
        totalSentences,
        totalUnanswered = 0;
    // ON WINDOWS LOAD
    $('#message').hide();
    // collecting answers
    $('.sentence').each(function(index) {
        // Accessing answer in span and storing in answer variable
        var answer = $(this).find('span').text();
        
        // sotring each answer in answersArray
        answersArray.push(answer);
        
        // Clearing value in the span tag
        $(this).find('span').empty();
    });
    // Filling all values in shuffledAnswersArray before shuffling
    $.each(answersArray, function(index) {
        var answer = answersArray[index];
        shuffledAnswersArray.push(answer);
        totalUnanswered = totalUnanswered + 1;
    });
    // Shuffling All answers within shuffledAnswersArray
    shuffle(shuffledAnswersArray);
    // Removing duplicate answers and storing in uniqueShuffledAnswersArray
    uniqueShuffledAnswersArray = unique(shuffledAnswersArray);
    // Now we have unique answers that we can fill in dropdown for all sentences
//    $('#demo').text(answersArray +" , Shuffled: "+ uniqueShuffledAnswersArray);
    // Generating Options for dropdown in html form and storing each option on seperate index 
    // Appending all Options in one string
    for (i = 0; i < uniqueShuffledAnswersArray.length; i = i + 1) {
        var optionHtmlString = '<option>'+uniqueShuffledAnswersArray[i]+'</option>';
        optionsHtmlArray.push(optionHtmlString);
        if (i == 0) {
            optionsHtml = '<option></option>';
        }
        optionsHtml = optionsHtml + optionsHtmlArray[i];
    }
    // Generating new dropdown in each span
    $('.sentence').each(function(index) {
        var indexInc = index + 1;
        var dropdownId = 'answer-' + indexInc;
        
        $(this).find('span').append(
            '<select id='+dropdownId+' class="dropdown-answers">' +
            optionsHtml +
            '</select>'
        );
        
    });
    // ON CLICK FUNCTIONALITY
    // Check Answers
    $( "#check-answers" ).click(function() {
        // reset values
        totalUnanswered = answersArray.length;
          $('.sentence span select').each(function(index) {
              var indexInc = index + 1;
            // Accessing answer in span and storing in answer variable
            var answer = $(this).find(':selected').text();
            var answerIndex = $(this).find(':selected').index();
//              alert(answer);
            // sotring each answer in answersArray
              this.style.borderColor = borderColorDefault;
              if(answerIndex == 0) {
//                  allAnswersSelected = false;
                   this.style.borderColor = borderColorWrong;
              }
              if(answerIndex != 0) {
                  totalUnanswered = totalUnanswered - 1;
              }
        });
        
        // Check if all options are selected, if yes then set its status to true
        if (totalUnanswered == 0) {
            $('#message').hide();
            
            $('.sentence span select').each(function(index) {
                var indexInc = index + 1;
                // Accessing answer in span and storing in answer variable
                var answer = $(this).find(':selected').text();
                var answerIndex = $(this).find(':selected').index();
//                  alert('selected answer: ' + answer + ', actual answer: '+ answersArray[index]);
                
                // sotring each answer in answersArray
                this.style.borderColor = borderColorDefault;
                if(answer == answersArray[index]) {
                    this.style.borderColor = borderColorRight;
                } else {
                    this.style.borderColor = borderColorWrong;
                }
            });
            
        } else {;
            $('#message').css('color', colorRed);
            $('#message').text(messageOnUnselectedBlanks);
            $('#message').show();
            
        }
        
    });
    // Shuffle Array functions
    function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }
    
    // Get Unique Array
    function unique(list) {
        var result = [];
        $.each(list, function(i, e) {
            if ($.inArray(e, result) == -1) result.push(e);
        });
        return result;
    }
    
})(jQuery); // End of use strict