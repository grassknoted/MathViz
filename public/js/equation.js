function solve() {
    alert("solver called");
    var a = document.getElementById('a');
    var b = document.getElementById('b');
    var m = document.getElementById('m');

    var c = document.getElementById('c');
    var d = document.getElementById('d');
    var n = document.getElementById('n');

    a = parseFloat(a.value);
    b = parseFloat(b.value);
    m = parseFloat(m.value);

    c = parseFloat(c.value);
    d = parseFloat(d.value);
    n = parseFloat(n.value);

    var x = (n*b - m*d)/(b*c - a*d);
    var y = (m*c - n*a)/(b*c - a*d);    

    var answer = document.getElementById("equation_answer");

    answer.innerHTML = "x="+x+" y="+y;
}