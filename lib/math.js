// JavaScript Document

MATH = {
		
	toPolar: function(x,y,z){
		var sqrd = (x*x)+(y*y)+(z*z)
		var radius = Math.pow(sqrd,.5)
		var theta = Math.acos(z/radius)
		var phi = Math.atan2(y,x)
		var toReturn={
			r:radius,
			t:theta,
			p:phi
		}
		return toReturn
	},
	
	
	toCart: function(r,t,p){
		var x = r *(Math.sin(t))*(Math.cos(p))
		var y = r *(Math.sin(t))*(Math.sin(p))
		var z = r * (Math.cos(t))
		var toReturn = {
			x:x,
			y:y,
			z:z
		}
		
		return toReturn
		
	}
	
	
	
	
	
}