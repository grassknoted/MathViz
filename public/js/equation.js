function simultaneous_solve() {
    console.log("Solving the Simultaneous Equation!");

    var a_var = document.getElementById('a');
    var b_var = document.getElementById('b');
    var m_var = document.getElementById('m');

    var c_var = document.getElementById('c');
    var d_var = document.getElementById('d');
    var n_var = document.getElementById('n');

    var a_value = parseFloat(a_var.value);
    var b_value = parseFloat(b_var.value);
    var m_value = parseFloat(m_var.value);

    var c_value = parseFloat(c_var.value);
    var d_value = parseFloat(d_var.value);
    var n_value = parseFloat(n_var.value);

    console.log(a_value);
    console.log(b_value);
    console.log(m_value);

    console.log(c_value);
    console.log(d_value);
    console.log(n_value);

    console.log("x = "+((n_value*b_value - m_value*d_value)/(b_value*c_value - a_value*d_value)));
    console.log("y = "+((m_value*c_value - n_value*a_value)/(b_value*c_value - a_value*d_value)));

    var x = ((n_value*b_value - m_value*d_value)/(b_value*c_value - a_value*d_value));
    var y = ((m_value*c_value - n_value*a_value)/(b_value*c_value - a_value*d_value));    

    var answer = document.querySelector(".text");

    // answer.innerHTML = "x="+x+"<br>y="+y;
    const el = document.querySelector('.text')
  const fx = new TextScramble(el)
    fx.setText(" x = "+x+"<br> y = "+y)
}

function quadratic_solve() {
    console.log("Solving the Quadratic Equation!");
    var a_var = document.getElementById('a_quad');
    var b_var = document.getElementById('b_quad');
    var c_var = document.getElementById('c_quad');

    var a_value = parseFloat(a_var.value);
    var b_value = parseFloat(b_var.value);
    var c_value = parseFloat(c_var.value);

    var x1 = (-b_value + Math.sqrt(Math.pow(b_value, 2) - (4*a_value*c_value)))/(2*a_value);
    var x2 = (-b_value - Math.sqrt(Math.pow(b_value, 2) - (4*a_value*c_value)))/(2*a_value);

    if(x1 == x2) {
        console.log(x1);
    }
    else {
        console.log(x1+" "+x2);
    }
    var answer = document.querySelector(".text");
    const el1 = document.querySelector('.text')
  const fx1 = new TextScramble(el)
    
    if(x1 == x2) {
        fx1.setText("x = "+x1);

    }
    else {
        fx1.setText("x1 = "+x1+"<br> y2 = "+x2);
    }
    
}

particlesJS.load('particles-js', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/130527/particles.json', function() {
  console.log('callback - particles.js config loaded');
});    

$('input[type=text]').blur(function(){
    $('.placeholder').removeClass("placeholder--animate");
    $('.border').removeClass("border--animate");
    $('.lb').removeClass("lb--animate");
    checkInput();
  })
  .focus(function() {		
    $('.placeholder').addClass("placeholder--animate");
    $('.border').addClass("border--animate");
    $('.lb').addClass("lb--animate");
    checkInput();
  });
 
  function checkInput() {
    if ( $('input[type=text]').val()) {
        $('.placeholder').css('display', 'none');
     } else {
       $('.placeholder').css('display', 'visible');
     }
  }
 
   

// http.createServer(function (req, res) {
//   if (req.url == '/fileupload') {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       var oldpath = files.filetoupload.path;
//       var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.write('File uploaded and moved!');
//         res.end();
//       });
//  });
//   } else {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
//     res.write('<input type="file" name="filetoupload"><br>');
//     res.write('<input type="submit">');
//     res.write('</form>');
//     return res.end();
//   }
// }).listen(8080);

class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  
//   const phrases = [
//     'Neo,',
//     'sooner or later',
//     'you\'re going to realize',
//     'just as I did',
//     'that there\'s a difference',
//     'between knowing the path',
//     'and walking the path'
//   ]
  
  const el = document.querySelector('.text')
  const fx = new TextScramble(el)
  
// //   let counter = 0
// //   const next = () => {
// //     fx.setText(phrases[counter]).then(() => {
// //       setTimeout(next, 800)
// //     })
// //     counter = (counter + 1) % phrases.length
// //   }
  
// //   next()