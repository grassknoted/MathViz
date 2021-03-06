math_sign = document.getElementById('math_sign');

math_sign_alt = 0;
setInterval(
    function() { 
        if(math_sign_alt == 0) {
            math_sign.innerHTML = "÷";
            math_sign_alt = 1;
        }
        else if(math_sign_alt == 1) {
            math_sign.innerHTML = "×";
            math_sign_alt = 2;
        }
        else if(math_sign_alt == 2) {
            math_sign.innerHTML = "+";
            math_sign_alt = 3;
        }
        else if(math_sign_alt == 3) {
            math_sign.innerHTML = "−";
            math_sign_alt = 0;
        }
    }, 1000);

var elem = document.querySelector('input[type="range"]');

var rangeValue = function(){
    var newValue = elem.value;
    var target = document.querySelector('.value');
    target.innerHTML = newValue;
}

elem.addEventListener("input", rangeValue);