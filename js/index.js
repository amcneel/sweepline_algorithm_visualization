//Additional Globals
var controls;
var mouse = new THREE.Vector2();
var clock = new THREE.Clock();

//*******************************************************************************

//renderer
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
renderer.setClearColor(0x141414);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//need camera and a scene
//CAMERA
const zDist = 500;
const aspect = window.innerWidth / window.innerHeight;

var vFOV = 2*Math.atan(window.innerHeight / (2*zDist))*180/Math.PI;
var twoDHeight = 2*Math.tan((vFOV/2))*zDist;



var hFOV = 2*Math.atan(Math.tan(vFOV/2)*aspect)*180/Math.PI;
var twoDWidth = 2*Math.tan((hFOV/2))*zDist;

// console.log(hFOV);
// console.log(vFOV);

var camera = new THREE.PerspectiveCamera(vFOV, window.innerWidth / window.innerHeight, 1, zDist);
camera.position.set(0,0,100);
camera.lookAt(new THREE.Vector3(0,0,0));


//RESIZE STUFF, FULL SCREEN
THREEx.WindowResize(renderer, camera);

//SCENE
var scene = new THREE.Scene();



//*******************************************************************************

//MATERIAL
var material = new THREE.LineBasicMaterial({color: 0x71cff7});

var sweepmaterial = new THREE.LineDashedMaterial({color: 0xff63d5});

//*******************************************************************************
//box
var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10,0,0));
geometry.vertices.push(new THREE.Vector3(0,10,0));
geometry.vertices.push(new THREE.Vector3(10,0,0));

var line = new THREE.Line(geometry, material);

scene.add(line);

//hFOV and vFOV

var sweepgeometry = new THREE.Geometry();
sweepgeometry.vertices.push(new THREE.Vector3(hFOV + 5, vFOV, 0));
sweepgeometry.vertices.push(new THREE.Vector3(hFOV + 5, -vFOV, 0));

var sweepline = new THREE.Line(sweepgeometry, sweepmaterial);
scene.add(sweepline);
//******************************************************************************

var oneLoop = false;
function animSweepLine(){
	if(!oneLoop){
		sweepline.position.x += .5;
	}
	// console.log(sweepline.position.x);
	if(sweepline.position.x >= -2*hFOV){
		oneLoop = true;
		sweepline.position.x = 0;
	}

}

render();
console.log(-2*hFOV);
function render(){
	requestAnimationFrame(render);

	if(!oneLoop) animSweepLine();

	renderer.render(scene, camera);
}

$("#myCanvas").click(getClicked3DPoint);
function getClicked3DPoint(evt) {
	var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );             //z
}