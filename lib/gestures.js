// JavaScript Document


var isZooming = false
var tmpFieldSpeedHolder

function checkGestures(frame){
	if(FRAME){
		if(FRAME.gestures[0]){
			if(FRAME.gestures[0].type == 'circle'){
				doCircleGesture()
			}else if(FRAME.gestures[0].type == 'screenTap'){
				doScreenTap()
			}
			
			
		}
	}
	
	//function for fading gestures
	updateGestures()
	
	
}

function doCircleGesture(){
		if(FRAME.gestures[0].normal[2] <=0){
			console.log('clockwise')	
			fieldSpeed += (FRAME.gestures[0].radius/500)
			
		}else{
			console.log('counterClockwise')
			fieldSpeed -= (FRAME.gestures[0].radius/500)
			
		}	
		
	
}


function doScreenTap(){
	if(isZooming == false){
		isZooming = true
		tmpFieldSpeedHolder = fieldSpeed 
		if(fieldSpeed <= fieldDepth/8){
			fieldSpeed += Math.abs(tmpFieldSpeedHolder*5)
		}
	}else{
		if(fieldSpeed <= fieldDepth/8){
			fieldSpeed += Math.abs(tmpFieldSpeedHolder*5)
		}
	}
}


function updateGestures(){
	
	
	if(isZooming == true){
		//console.log(fieldSpeed)
		
		if(fieldSpeed >= tmpFieldSpeedHolder){
			fieldSpeed -= Math.abs(tmpFieldSpeedHolder*.1)	
		}else{
			isZooming = false
		}
		
		
	}
	
}