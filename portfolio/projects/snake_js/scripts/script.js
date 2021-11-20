window.onload = function()
{

	var canvas;
	var canvasWidth = 900;
	var canvasHeigth = 600;
	var blockSize = 30;
	var ctx;
	var delay = 100;
	var snakee;
	var applee;
	var widthInBlocks = canvasWidth/blockSize;
	var heightInBlocks = canvasHeigth/blockSize;
	var score;
	var timeout;

	init();

	function init()
	{
		canvas = document.createElement('canvas');
		canvas.width = canvasWidth;
		canvas.height = canvasHeigth;
		canvas.style.border = "30px solid green";
		canvas.style.margin = "50px auto";
		canvas.style.display = "block";
		canvas.style.backgroundColor = "#7cfc00";
		document.body.appendChild(canvas);
		ctx = canvas.getContext('2d');
		snakee = new Snake([[6,4], [5,4], [4,4],[4,4],[4,4]], "right"); // initial size and position of snakee
		applee = new Apple([10,10]);
		score = 0;
		refreshCanvas();
	}

	function refreshCanvas()
	{
		snakee.advance();
		if(snakee.checkCollision())
		{
			gameOver();
		}
		else
		{
			if(snakee.IsEatingApple(applee))
			{
				score ++;
				snakee.ateApple = true;
				do
				{
					applee.setNewPosition();
				}
				while(applee.isOnSnake(snakee)) // if true give a new position for applee
			}
			ctx.clearRect(0,0,canvas.width,canvas.height); // color window in white
 			drawScore();
 			snakee.draw();
 			applee.draw();
 			timeout = setTimeout(refreshCanvas,delay); // exec. refreshCanvas all 1 sec.	
		}
	}

	function gameOver()
	{
		ctx.save();
		ctx.font = "bold 70px sans-serif";
		ctx.fillStyle = "#FF6347";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.strokeStyle = "green";
		ctx.lineWidth = 5;
		var centreX = canvasWidth / 2;
		var centreY = canvasHeigth / 2;
		ctx.strokeText("Game over", centreX, centreY-180);
		ctx.fillText("Game over", centreX, centreY-180);
		ctx.font = "bold 30px sans serif";
		ctx.strokeText("Press space bar to play again", centreX, centreY-120);
		ctx.fillText("Press space bar to play again",centreX, centreY-120);
		ctx.restore();
	}

	function restart()
	{
		snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], "right"); 
		applee = new Apple([10,10]);
		score = 0;
		clearTimeout(timeout);
		refreshCanvas();
	}

	function drawScore()
	{
		ctx.save();
		ctx.font = "bold 200px sans-serif";
		ctx.fillStyle = "green";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		var centreX = canvasWidth / 2;
		var centreY = canvasHeigth / 2;
		ctx.fillText(score.toString(), centreX, centreY);
		ctx.restore();
	}

	function drawBlock(ctx, position)
	{
		var x = position[0]*blockSize;
		var y = position[1]*blockSize;
		ctx.fillRect(x,y,blockSize,blockSize);
	}

	function Snake(body, direction)	// constructor func.
	{	

		this.body = body;
		this.direction = direction;
		this.ateApple = false;
		this.draw = function()
		{
			ctx.save(); // save default param. 
			for(var i=0; i<this.body.length; i++)
			{
				if(i%2 == 0)
				{
					ctx.fillStyle = "#FFC300";
				} else {
					ctx.fillStyle = "#000";
				}
				drawBlock(ctx,this.body[i]); // for i=0 we have body[0][0]=6 & body[0][1]=4
			}
			ctx.restore(); // restore default param.
		};
		this.advance = function()
		{
			var nextPosition = this.body[0].slice(); // copy body[0] in nextPosition
			//nextPosition[0] += 1; // body[0][0]+1 move of 1 unit horizontally.
			switch(this.direction)
			{
				case "left":
					nextPosition[0] -= 1;
					break;
				case "right":
					nextPosition[0] += 1;
					break;
				case "down":
					nextPosition[1] += 1;
					break;
				case "up":
					nextPosition[1] -= 1;
					break;
				default:
					throw("Invalid Direction");
			}
			this.body.unshift(nextPosition); // add arg. at beginning of tab.
			if(!this.ateApple) // si ateApple = false
			{
				this.body.pop(); // rmv last elmt of tab.
	    // in snakee : body[0] become nextPostion, body[1] become the previous body[0],
	    // body[2] become the previous body[1], etc... and pop rmv previous body[max]
	    	}
	    	else
	    	{
	    		this.ateApple = false;
	    	} // we don't pull the last block of snakee if applee have been eaten + put it back
	    	// put back ateApple to False to avoid it increasing out of applee conso. 
		};
		this.setDirection = function(newDirection)
		{
			var allowedDirections;
			switch(this.direction)
			{
				case "left":
				case "right":
					allowedDirections = ["up","down"];
					break;
				case "down":
				case "up":
					allowedDirections = ["left","right"];
					break;
				default:
					throw("Invalid Direction");
			}
			if(allowedDirections.indexOf(newDirection) > -1 ) // if index is in allowDirections
			{					// so his val. eq 0 or 1 so is > -1
				this.direction = newDirection;
			}
		};
		this.checkCollision = function()
		{
			var wallCollision = false;
			var snakeCollision = false;
			var head = this.body[0]; // 1st elmt of body
			var rest = this.body.slice(1); // copy in rest all the elmts of body
										   // except the 1st, here head
			var snakeX = head[0]; // body[0][0]
			var snakeY = head[1]; // body[0][1]
			var minX = 0;
			var minY =0;
			var maxX = widthInBlocks-1;
			var maxY = heightInBlocks-1;
			var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
			var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

			if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
			{
				wallCollision = true;
			}

			for(var i=0; i < rest.length; i++)
			{
				if(snakeX === rest[i][0] && snakeY === rest[i][1])
				{
					snakeCollision = true;
				}
			}

			return wallCollision || snakeCollision;

		};
		this.IsEatingApple = function(appleToEat)
		{
			var head = this.body[0];
			if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
			{
				return true;
			}
			else
			{
				return false;
			}
		};
	}

	function Apple(position)
	{
		this.position = position
		this.draw = function()
		{
			ctx.save();
			ctx.fillStyle = "#FF6347";
			ctx.beginPath();
			var radius = blockSize/2;
			var x = this.position[0]*blockSize + radius;
			var y = this.position[1]*blockSize + radius;
			ctx.arc(x,y,radius,0,Math.PI*2,true);
			ctx.fill();
			ctx.restore();
		};
		this.setNewPosition = function()
		{
			var newX = Math.round(Math.random()*(widthInBlocks-1));
			var newY = Math.round(Math.random()*(heightInBlocks-1));
			this.position = [newX, newY];
		};
		this.isOnSnake = function(snakeToCheck)
		{
			var isOnSnake = false;
			for(i=0; i<snakeToCheck.body.length; i++)
			{
				if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1])
				{
					isOnSnake = true;
				} 
			}
		return isOnSnake;
		};
	}
	
	document.onkeydown = function handleKeyDown(e)
	{
		var key = e.keyCode;
		var newDirection;
		switch(key)
		{
			case 37:
				newDirection = "left";
				break;
			case 38:
				newDirection = "up";
				break;
			case 39:
				newDirection = "right";
				break;
			case 40:
				newDirection = "down";
				break;
			case 32:
				restart();
				return;
			default:
				return;
		}
		snakee.setDirection(newDirection);
	}

 }

