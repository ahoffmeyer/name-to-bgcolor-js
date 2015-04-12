(function(){
  // Use strict mode
  "use strict"

  // defining vars
  var myForm = document.getElementById('myForm'), 
      myName = document.getElementById('myName'), 

      // Global array with rgb data from given names
      splittedTextString = [], 

      /**
       * Function returns an array containing three parts of a given string
       *
       * @param string textString
       * @return array
       */
      splitStringToThreePieces = function( textString, devider ) {
        var sliceEnd = 0, 
            newString;

        // calculate the amount of chars for the nth part of array
        sliceEnd = Math.ceil( textString.length/ ( devider ? devider = devider : devider = 3 ) );

        if ( textString ) {  
          // Return closure
          return function() {
            // save part in array and calculate the ASCII sum
            splittedTextString.push( sumOfNameCharTokens( textString.slice( 0, sliceEnd ) ) );
            // lets take the rest of the string to put this into the recursive call
            var rest = textString.slice( sliceEnd, textString.length );
            // reduce devider
            devider = devider - 1;

            if ( splittedTextString ) {
              // recursive call of function
              return splitStringToThreePieces( rest, devider );                   
            }
          }();
        } else {
          return splittedTextString;
        }
      },

      /**
       * Convert a single char to its ASCII number
       *
       * @param mixed character
       * @return int
       */
      convertToAscii = function( character ) {
        return character.charCodeAt(0);
      },

      /**
       * Sum of all character of a given string all chars converted to its ASCII code
       *
       * @param string textString
       * @return int
       */
      sumOfNameCharTokens = function( textString ) {
        var sum = 0;
        for ( var i = 0; i < textString.length; i++ ) {
          sum += convertToAscii( textString[ i ] );
        }
        // simply return the sum or the rest of division of 256 (rgb)
        // @todo make this a little bit more complex
        return ( sum % 256 );
      },

      /**
       * Function returns the RGB values for BG color
       *
       * @param string myName
       * @return string
       */
      rgbOutput = function( myName ) {
        return splitStringToThreePieces( myName, null ).join(",");
      };

  // lets make the body nice ;)
  myForm.addEventListener('submit', function( event ) {
    event.preventDefault();
    if ( myName.value ) {
      // set back global array
      splittedTextString = [];
      // vars
      var nullString = "",
          inputValue = myName.value;

      // check if text from input is too short
      if (inputValue.length < 3) {
        for (var i = 0; i < 3 - inputValue.length; i++) {
          nullString += '0';
        }
        inputValue = inputValue + nullString;
        console.log('Short Text: ', inputValue);
      }

      // set new background color
      document.body.style.background = "rgb("+ rgbOutput( inputValue ) +")";
    } else {
      console.log('No name given');
    }
  });

})(window, document);
