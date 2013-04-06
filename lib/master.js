// JavaScript Document




/*
	
	The 'TUBE' Particles

*/

// create the particle variables
var particleCount = 30,
    particles = new THREE.Geometry(),
    pMaterial =
      new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
		//map:"img/particleSprites/1.png",
		map: THREE.ImageUtils.loadTexture(
      		"img/particleSprites/1.png"
   		 ),
		transparent:true,
		blending: THREE.AdditiveBlending,
        size: 50
      });

// now create the individual particles
for(var p = 0; p < particleCount; p++) {

	var pos = MATH.toCart(400,2*Math.PI*(p/particleCount),0)
	
    particle =  new THREE.Vector3(pos.x, pos.z, pos.y)
     

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system



var TUBE =	new THREE.Object3D();

var rings = 100
for(var i  = 0; i <rings; i++){
	var toAdd = new THREE.ParticleSystem( particles, pMaterial);
	toAdd.position.z = fieldDepth/3 - (fieldDepth *(i/rings))
	TUBE.add(toAdd)
	
}


// create the particle variables
var pparticleCount = 50,
    pparticles = new THREE.Geometry(),
    ppMaterial =
      new THREE.ParticleBasicMaterial({
        color: 0xaaaaaa,
		//map:"img/particleSprites/1.png",
		map: THREE.ImageUtils.loadTexture(
      		"img/hitables/10.png"
   		 ),
		transparent:true,
		blending: THREE.AdditiveBlending,
        size: 20
      });

// now create the individual particles
for(var p = 0; p < pparticleCount; p++) {
	var rand = Math.random()
	var pos ={}
	if(rand < .5){
		pos.x = Math.random() * -250 -20
	}else{
		pos.x = Math.random() * 250 + 20
	}
	
	pos.y = Math.random() *500 -250
	pos.z = Math.random() *10 -5
	
	
    pparticle =  new THREE.Vector3(pos.x, pos.y, pos.z)
     

  // add it to the geometry
  pparticles.vertices.push(pparticle);
}



var INNERPARTICLES =  new THREE.Object3D();

var rings = 50


for(var i  = 0; i < rings; i++){
	
	var toAdd = new THREE.ParticleSystem( pparticles, ppMaterial);
	toAdd.position.z = fieldDepth/3 - (fieldDepth *(i/rings))
	toAdd.rotation.z = Math.PI*2 *(i/rings)
	INNERPARTICLES.add(toAdd)
	
}




TUBE.updatePosition = function(){
		
		
		for(var i = 0; i< this.children.length;i++){
			
			this.children[i].position.z += fieldSpeed
			
			if (this.children[i].position.z >= fieldDepth/4){
				this.children[i].position.z -= fieldDepth
			}else if(this.children[i].position.z <= -(3*fieldDepth/4)){
				this.children[i].position.z += fieldDepth
			}
			
		}
		
			
}

INNERPARTICLES.updatePosition = function(){
		
		
		for(var i = 0; i< this.children.length;i++){
			
			this.children[i].position.z += fieldSpeed
			
			if (this.children[i].position.z >= fieldDepth/4){
				this.children[i].position.z -= fieldDepth
			}else if(this.children[i].position.z <= -(3*fieldDepth/4)){
				this.children[i].position.z += fieldDepth
			}
			
		}
		
			
}

	

function updateMasterAnalyser(){
	window.masterFBD = new Uint8Array(masterAnalyser.frequencyBinCount)
	masterAnalyser.getByteFrequencyData(masterFBD)
	
	for(var i=0;i<masterAnalyser.frequencyBinCount;i++){
		
		if (TUBE.children[i]){
			
			TUBE.children[i].rotation.z += masterFBD[i]/1000000
			TUBE.children[i].scale.x  = 1+ ( masterFBD[i]/700)
			TUBE.children[i].scale.y  = 1+ ( masterFBD[i]/700)
			TUBE.children[i].scale.z  = 1+ ( masterFBD[i]/700)
		}
		
		if(INNERPARTICLES.children[i]){
			
			INNERPARTICLES.children[i].scale.x  = 1+ ( masterFBD[i]/500)
			INNERPARTICLES.children[i].scale.y  = 1+ ( masterFBD[i]/500)
			INNERPARTICLES.children[i].scale.z  = 1+ ( masterFBD[i]/500)
			
		}	
		
	
		if(frameMarkers[0].children[0].geometry.vertices[i]){
			//var vert = frameMarkers[0].children[0].geometry.vertices[i]
			frameMarkers[0].children[0].geometry.vertices[i].x =  frameMarkers[0].data.vertices[i].x * ( 1+ ( masterFBD[i]/50))
			frameMarkers[0].children[0].geometry.vertices[i].y = frameMarkers[0].data.vertices[i].y * ( 1+ ( masterFBD[i]/50))
			frameMarkers[0].children[0].geometry.vertices[i].z = frameMarkers[0].data.vertices[i].z * ( 1+ ( masterFBD[i]/50))		
		}
		
	}	
	
	//Moves the tube Forward
	TUBE.updatePosition()
	INNERPARTICLES.updatePosition()
	
	
	
	
	
	//updating the frameMarker Scene position
	/*if(frameMarkers[1]){
		var dif = {
			x:frameMarkers[0].position.x - frameMarkers[1].position.x,
			y:frameMarkers[0].position.y - frameMarkers[1].position.y,
			z:frameMarkers[0].position.z - frameMarkers[1].position.z,
		}
		
		var rot ={
			y:Math.tan(dif.z/dif.x)/200	
		}
		frameMarkers[0].rotation.y = rot.y
	
	}*/
	//set all the geometries we need to update
	frameMarkers[0].children[0].geometry.verticesNeedUpdate = true;
	
}