// JavaScript Document

$(document).keypress(function(event){
		var whichKey=String.fromCharCode(event.which)
	
		if(whichKey=='x'){
			console.log(particleSystem)
		}
		
		if(whichKey == 'z'){
			console.log(masterFBD)	
		}
		
		if(whichKey=='1'){
		console.log(frameMarkers[0].position.x)	
		}
		if(whichKey=='2'){
		console.log(hitParticles)	
		}
		
		if(whichKey =='3'){
			console.log(FRAME)
			console.log(OFRAME)	
			
		}
});