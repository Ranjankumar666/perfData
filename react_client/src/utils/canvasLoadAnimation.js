function drawCircle(canvas,currentLoad, text, dx=0, dy=0){
    if(canvas){
        canvas.width = 250;
        canvas.height = 250;
        let context = canvas.getContext('2d');
        // Draw Inner Circle
        context.clearRect(0,0,500,500)
        context.fillStyle = "rgb(247, 37, 133)";
        context.beginPath();
        context.arc(canvas.width/2,canvas.height/2,90,Math.PI*0,Math.PI*2);
        context.closePath();
        context.fill();
        context.font = "20px Ubuntu";
        context.fillStyle = "#999";
        context.fillText(text, canvas.width/2 + dx, canvas.height/2 + dy);

        // Draw the outter line
        // 10px wide line
        context.lineWidth = 10;
        if(currentLoad < 20){
            context.strokeStyle = '#00ff00';
        }else if(currentLoad < 40){
            context.strokeStyle = '#337ab7';
        }else if(currentLoad < 60){
            context.strokeStyle = '#f0ad4e';
        }else{
            context.strokeStyle = '#d9534f';
        }
        context.beginPath();
        // start from left and increse by .1
        context.arc(canvas.width/2,canvas.height/2,95,Math.PI*1.5,(Math.PI * 2 * currentLoad/100) + Math.PI*1.5);
        context.stroke();
    }
}

export default drawCircle;