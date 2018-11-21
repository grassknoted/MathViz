math_sign = document.getElementById('math_sign');

math_sign_alt = 0;
setInterval(
    function() { 
        if(math_sign_alt) {
            math_sign.innerHTML = "÷";
            math_sign_alt = 0;
        }
        else {
            math_sign.innerHTML = "+";
            math_sign_alt = 1;
        }
    }, 1000);