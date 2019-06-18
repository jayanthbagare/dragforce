let o = [];
function setup(){
	createCanvas(windowWidth,windowHeight - 10);
	for (i =0; i<=4; i++){
		let y = 0;
		let mass = random(3,7);
		let randomColor = color(random(255),random(255),random(255));
		o.push(new Mover(random(width),y,mass,randomColor));
	}
	colorMode(HSB);
}

function draw(){
	background(172);
	fill((255,255,0),100);
	rect(0, height/2, width, height);
	noFill();
	o.forEach(function(m, index, object){
		gravity = 3;
		wind = 0.03;
		gravity_vector = createVector(0,gravity);
		wind_vector = createVector(wind,0);

		let c = 1;
		let normal = 1;
		let frictionMag = c * normal;

		friction_vector = m.velocity.copy();
		friction_vector.mult(-1);
		friction_vector.normalize();
		friction_vector.mult(frictionMag);

		//Drag Formula is
		//F = -1/2 * ρ * v² * A * Cₑ * v
		// ρ = Density of Fluid object is passing through
		// v = velocity
		// A = Surface area, our case is sphere = 4*π*r²
		// Cₑ = Drag Coefficient for a sphere it is 0.47

		let l_drag = m.velocity.copy();
		let v = l_drag.magSq();
		let ρ = -0.0009;
		let A = 4 * 3.141 * m.mass * 5 ;
		let Cₑ = 0.47;

		l_drag.normalize();
		l_drag.mult(ρ);
		l_drag.mult(A);
		l_drag.mult(Cₑ);
		l_drag.mult(v);

		//m.applyForce(l_drag);

		//m.applyForce(friction_vector);

		if(m.pos.y >= (height/2)){
			m.applyForce(l_drag);
		}
		m.applyForce(gravity_vector);
		m.applyForce(wind_vector);
		
		m.update();
		m.show();
		m.checkEdges();

		if(m.pos.y > (height + 30) ){
			object.splice(index,1);
			if(o.length == 0){
				noLoop();
			}
		}
	});
}

