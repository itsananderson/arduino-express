var five = require("johnny-five"),
    express = require('express'),
    app = express(),
    board, myPotentiometer;

var port = 'COM3';
if (process.argv.length > 2) {
    port = process.argv[2];
}

board = new five.Board({port:port});

board.on("ready", function() {

  myPotentiometer = new five.Sensor({
    pin: "A0",
    freq: 100 
  });

  myLed = new five.Led(9);
  myServo = new five.Servo(8);

  /*myPotentiometer.on("data", function() {
    var rawValue = this.raw;
    console.log(rawValue);
    myLed.brightness(Math.floor(rawValue / 4));
    myServo.to(five.Fn.map(rawValue, 0, 1023, 0, 179));
  });*/

  var html = '<form method="get" action="/to"><input type="text" name="loc" tabindex="0" /><input type="submit" value="move" /><script>document.querySelector("input[name=loc]").focus()</script></form>';

  app.get('/', function(req, res) {
    res.send(html);
  });

  app.get('/to', function(req, res) {
    myServo.to(parseInt(req.query.loc));
    res.send(html);
  });

  app.listen(1337);
});
