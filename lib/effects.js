// JavaScript Document


// create the particle variables
var particleCount = 180,
    particles = new THREE.Geometry(),
    pMaterial =
      new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
		map: THREE.ImageUtils.loadTexture(
      		"img/particleSprites/3.png"
   		 ),
		transparent:true,
		blending: THREE.AdditiveBlending,
		opacity:.9,
        size: 40
      });

// now create the individual particles
for(var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 10 - 5,
      pY = Math.random() * 10 - 5,
      pZ = Math.random() * 10 - 5,
      particle =  new THREE.Vector3(pX, pY, pZ)
     

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var hitParticles = new THREE.ParticleSystem( particles, pMaterial);

hitParticles.expand = function(){
	this.scale.x += 10
	this.scale.y += 10
	this.scale.z += 10
	//this.material.opacity -= .01
	
}

hitParticles.position.x = -9999


//Checks the Particles every frame, to see if it is inUse (called when a hitable gets hit)
//If it is inUse, place it, and expand it until it fades, then place it out of site again
hitParticles.update = function(){
	
	if(this.inUse == true){

		//if(this.position.x == -9999){
			this.position.x = frameMarkers[0].position.x
			this.position.y = frameMarkers[0].position.y
			this.position.z = frameMarkers[0].position.z
		//}
		this.expand()
		
		if(this.scale.x >= 300){
			this.position.x = -9999
			
			this.scale.x = 1
			this.scale.y = 1
			this.scale.z = 1
			
			//this.material.opacity = 1
			
			this.inUse = false
		}
	}
	
}
