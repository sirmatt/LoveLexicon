var App = (function () {
  DIM_X = 600;
  DIM_Y = 600;

  var App = {};

  var Blub = function () {
    this.x = DIM_X / 2;
    this.y = DIM_Y / 2;

    this.id = 100 * Math.random();

    this.color = "red";

    this.randomDir = {
      dx: (Math.random() > .5) ? -1 : 1,
      dy: (Math.random() > .5) ? -1 : 1
    };

    this.move = function () {
      var that = this;

      that.x += that.randomDir.dx;
      that.y += that.randomDir.dy;
    }
  }

  App.myBlub = new Blub();
  App.otherBlubs = [];


  App.BlubView = function (canvasElement) {
    this.ctx = canvasElement.getContext('2d');

    this.render = function () {
      var that = this;

      that.ctx.clearRect(0, 0, DIM_X, DIM_Y);

      that.drawBlub(App.myBlub);
      App.otherBlubs.forEach(that.drawBlub.bind(that));
    }

    this.drawBlub = function (blub) {
      var that = this;

      that.ctx.beginPath();
      that.ctx.fillStyle = blub.color;
      that.ctx.arc(blub.x, blub.y, 15, 0, 2 * Math.PI, true);
      that.ctx.fill();
    }
  };

  App.BlubServerConnection = function () {
    SERVER = "173.255.243.230"
    this.exampleSocket = new WebSocket("ws://" + SERVER + ":8080");

    this.exampleSocket.onopen = function () {
      console.log("connected");
    };

    this.exampleSocket.onclose = function () {
      console.log("closed");
    };
    
    this.exampleSocket.onmessage = function (event) {
      console.log(event.data);
      App.otherBlubs = JSON.parse(event.data);
    };

    this.sendBlub = function (blub) {
      this.exampleSocket.send(JSON.stringify(blub));
    }
  }

  App.runLoop = function () {
    var blubView = new App.BlubView($("canvas")[0]);
    var blubConn =
      new App.BlubServerConnection();

    setInterval(function () {
      App.myBlub.move();
      blubView.render();

      blubConn.sendBlub(App.myBlub);
    }, 1000 / 60.0);
  };

  return App;
})();
