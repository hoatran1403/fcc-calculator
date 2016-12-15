$(document).ready(function(){
  var result = 0.0;
  var currentOperator = null;
  var currentNumber = "";
  var isFirstNumber = true;
  var displayText = "";
  var isNewCalculation = true;
  var numbers = $('.number').get();



  var clearAll = function(){
    $('#accumulate-screen').empty();
    $('#main-screen').empty();
    $('#accumulate-screen').html("&nbsp;");
    $('#main-screen').html("&nbsp;");
    result = 0;
    currentOperator = null;
    currentNumber = "";
    displayText = "";
    isFirstNumber = true;
  }

  var add = function(){
    currentNumber = "";
    currentOperator = "+";
  };

  var subtract = function(){
    currentNumber = "";
    currentOperator = "-";
  };

  var multiply = function(){
    currentNumber = "";
    currentOperator = "x";
  };

  var divide = function(){

    currentNumber = "";
    currentOperator = "/";
  };

  var equal = function(){
    //intialize result for first number
    if(isFirstNumber){

      result = parseFloat(currentNumber);
      isFirstNumber = false;
    }

    if(currentOperator!== null && currentNumber !== ""){
      if(currentOperator == '+') {
        result += parseFloat(currentNumber);
      }else if(currentOperator == '-') {
        result -= parseFloat(currentNumber);
      }else if(currentOperator == 'x') {
        result *= parseInt(currentNumber);
      }else if(currentOperator == '/') {
        // only display integer number if not float
        if((result % parseFloat(currentNumber)) == 0)
          result /= parseInt(currentNumber);
        else {
          result /= parseFloat(currentNumber);
          //Get 2 decimal numbers
          result = result.toFixed(2);
        }

      }
      currentNumber = ""
      currentOperator = null;
    }
  };




  var buttonPress = function(){
    //check for duplicated operator
    if(currentOperator == this.id && currentNumber === "") return;

    switch(this.id){
      case 'AC':
        clearAll();
        return;
      case 'CE':
        currentNumber ="";
        break;
      case '+':
        if(isNewCalculation) break;

        displayText += currentNumber + "+";
        equal();
        add();
        $('#main-screen').html(result);
        break;
      case '-':
        if(isNewCalculation) break;

        displayText += currentNumber + "-";
        equal();
        subtract();
        $('#main-screen').html(result);
        break;
      case 'x':
        if(isNewCalculation) break;
        displayText += currentNumber + "x";
        equal();
        multiply();
        $('#main-screen').html(result);
        break;
      case '/':
        if(isNewCalculation) break;
        displayText += currentNumber + "/";
        equal();
        divide();
        $('#main-screen').html(result);
        break;

      case '=':
        equal();
        isNewCalculation = true;
        $('#main-screen').html(result);
        return;

        // case: number button is pressed
      default:
        if(isNewCalculation){
          clearAll();
          isNewCalculation = false;
        }

        currentNumber += this.id;
                  }



    $('#accumulate-screen').empty();
    $('#accumulate-screen').html("&nbsp;" + displayText + currentNumber);
  };

  //Add click event to button
  var addEvent = function(){
    $(".btn").click(buttonPress);

  };

  addEvent();
});
