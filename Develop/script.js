// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);



//generate password
function generatePassword() {
  //prompt user for password criteria: length (8-128 chars), lowercase letters, uppercase letters, numeric characters, special characters
  //check user input for ranges/
  var numChars = prompt("Please enter the length of your desired password (8-128 characters):")
  if (numChars < 8 || numChars > 128) {//if user input is not in range
    alert("Please enter a number between 8 and 128");
    return "";
  }
  var useLowercase = confirm("Use lowercase characters? (OK for yes, cancel for no)");
  var useUppercase = confirm("Use uppercase characters? (OK for yes, cancel for no)");
  var useNumeric = confirm("Use numeric characters? (OK for yes, cancel for no)");
  var useSpecial = confirm("Use special characters? (OK for yes, cancel for no)");
  if (!useLowercase && !useUppercase && !useNumeric && !useSpecial) { // if user has selected no character types
    alert("You must select at least one type of character. Please try again.")
    return "";
  }
  // script will not reach this point unless: numChars is in range and at least one character type has been selected

  //version 2
  //this code adapted from: https://stackoverflow.com/questions/9719570/generate-random-password-string-with-requirements-in-javascript/9719815

  var Password = { // Password object
    //regular expression
    _pattern: new RegExp(""),  // /[a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[_`{}~\"^|\\\]"]/, // this regex includes lowercase, uppercase, numerics, and special chars

    //public function for configuring regular expression
    selectPattern: function (useLowercase, useUppercase, useNumeric, useSpecial) {
      var regExString = "";
      if (useLowercase) {
        regExString += "a-z";
      }
      if (useUppercase) {
        regExString += "A-Z";
      }
      if (useNumeric) {
        regExString += "0-9";
      }
      if (useSpecial) {
        regExString += "!#$%&'()*+,-./:;<=>?@[_`{}~\"^|\\\]/"; // removed: space
      }
      this._pattern = new RegExp("[" + regExString + "]"); //creates a new regular expression and saves it in place of Password._pattern
    },

    // generates a (hopefully) cryptographically random byte
    _getRandomByte: function () {
      if (window.crypto && window.crypto.getRandomValues) { // if function can access window.crypto
        var result = new Uint8Array(1); // create 1 8-bit unsigned integer
        window.crypto.getRandomValues(result); // grab random values
        return result[0]; // return the first byte
      } else if (window.msCrypto && window.msCrypto.getRandomValues) { // if function can access window.msCrypto
        var result = new Uint8Array(1); // create 1 8-bit unsigned integer
        window.msCrypto.getRandomValues(result); // grab random value
        return result[0]; // return the first byte
      } else { // if Math.random() is the only option
        return Math.floor(Math.random() * 256); // return a 'random' number from 0-255
      }
    },

    // generates a random password of length 'length' that matches the regex pattern '_pattern'
    generate: function (length) {
      //Array.apply(null, {length}) creates an array of size length filled with undefined data.  
      // .map(function(){...}, this) calls the anonymous function on each element of the array of size length. 
      // 'this' passes the Password var reference to the anonymous function, and allows it to call 'this._getRandomByte()'
      // .join('') joins the elements of the array into one string, which is then returned
      return Array.apply(null, { length }).map(function () {
        var result;
        while (true) { // repeats until _getRandomByte returns a byte that matches this._pattern
          result = String.fromCharCode(this._getRandomByte());  //get a random byte, convert to string, store in result
          if (this._pattern.test(result)) { // if result byte matches the regex pattern
            return result; // return that byte to the map function
          }
        }
      }, this)
        .join('');
    }
  };

  //call Password methods and return password result
  Password.selectPattern(useLowercase, useUppercase, useNumeric, useSpecial); // call function to setup regex pattern
  var result = Password.generate(numChars); // generate a password of length numChars
  console.log(result);
  return result;


  //version 1 below
  /*   //prompt user for password criteria: length (8-128 chars), lowercase letters, uppercase letters, numeric characters, special characters
    //check user input for ranges/
    var numChars = prompt("Please enter the length of your desired password (8-128 characters):")
    if (numChars < 8 || numChars > 128) {//if user input is not in range
      alert("Please enter a number between 8 and 128");
      return "";
      // continue; // continues to next while loop iteration
    }
  
    var useLowercase = confirm("Use lowercase characters? (OK for yes, cancel for no)");
    var useUppercase = confirm("Use uppercase characters? (OK for yes, cancel for no)");
    var useNumeric = confirm("Use numeric characters? (OK for yes, cancel for no)");
    var useSpecial = confirm("Use special characters? (OK for yes, cancel for no)");
  
    if (!useLowercase && !useUppercase && !useNumeric && !useSpecial) { // if user has selected no character types
      alert("You must select at least one type of character. Please try again.")
      return "";
    }
  
    // script will not reach this point unless: numChars is in range and at least one character type has been selected
    var useableChars = ""; // this string will contain all permitted chars, and will be used for char selection
    if (useLowercase) {
      useableChars += "abcdefghijklmnopqrstuvwxyz";
    }
    if (useUppercase) {
      useableChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (useNumeric) {
      useableChars += "1234567890";
    }
    if (useSpecial) {
      useableChars += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; //removed " " as a useable special char
    }
  
    //generate password from usableChars string
    var password = "";
    for (var i = 0; i < numChars; i++) {// for number of chars
      rNum = Math.floor(Math.random() * useableChars.length); // generate random index number
      password += useableChars[rNum]; // concatenate random characters onto password
    }
    return password; // return password  */
}

