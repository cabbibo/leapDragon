// JavaScript Document
//Tells us if the snake is alive
alive = true


//The speed of the field we are flying through
var fieldSpeed = 5
var fieldDepth = 2000
	
	
//Creates a clock, mostly for use with controls
clock = new THREE.Clock();

//creates the scene for this galaxy
scene=new THREE.Scene();
scene.fog = new THREE.FogExp2( 0x000000, 0.0005 );

//scene.fog = new THREE.FogExp2( 0x000000, 0.35 );

//camera for the scene, VERY large distance!
camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,8000)

camera.position.z = 500
camera.lookAt(scene.position)
	
	
	
/*controls = new THREE.TrackballControls( camera );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 5;
controls.panSpeed = 0.8;
controls.noZoom = true;
controls.noPan = false;
controls.staticMoving = false;
controls.dynamicDampingFactor = 0.2;*/

// add subtle ambient lighting
var ambientLight = new THREE.AmbientLight(0xbbbbbb);
scene.add(ambientLight);
 


//creates renderer for this galaxy
window.renderer=new THREE.WebGLRenderer( { clearColor: 0x000000, clearAlpha: 1 } )
renderer.setSize( window.innerWidth, window.innerHeight );	


//Creates Stats
/*TAKE OUT FOR PRODUCTION*/
window.stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.bottom = '0px';
stats.domElement.style.right='0px'
//stats.domElement.style.visibility= 'hidden';


//adds stats to document
window.container=document.getElementById( 'container' )
container.appendChild(renderer.domElement )
container.appendChild(stats.domElement )

window.addEventListener( 'resize', onWindowResize, false );

//Resets aspect ratio of camera to new height and width of window
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}



var score = 0


//using normal material, because it takes the least set up
var normalMaterial = new THREE.MeshNormalMaterial()
normalMaterial.side=THREE.DoubleSide
normalMaterial.transparent = true
normalMaterial.opacity = .7


material = new THREE.MeshLambertMaterial(
				{map: THREE.ImageUtils.loadTexture(
					"img/journey1bw.png", 
					{}, 
					function() {
						//console.log('texture loadede')
					}
							
				)})
				
material.side=THREE.DoubleSide
material.transparent = true
material.opacity = 1