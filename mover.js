class Mover{
	constructor(x,y,m,color){
		this.mass = m;
		this.color = color;
		this.pos = createVector(x,y);
		this.velocity = createVector(0,0);
		this.acceleration = createVector(0,0);
	}

	applyForce = function(force){
		let l_force = p5.Vector.div(force,this.mass);
		this.acceleration.add(l_force);
		this.velocity.limit(l_force);
	}
	
	applyDrag = function(){
		//Drag Formula is
		//F = -1/2 * ρ * v² * A * Cₑ * v
		// ρ = Density of Fluid object is passing through
		// v = velocity
		// A = Surface area, our case is sphere = 4*π*r²
		// Cₑ = Drag Coefficient for a sphere it is 0.47

		let l_velocity = this.velocity.copy();
		let ρ = -0.1;
		let A = 4 * 3.141 * this.mass;
		let Cₑ = 0.47

		l_velocity.mult(ρ);
		l_velocity.mult(A);
		l_velocity.mult(Cₑ);
		l_velocity.normalize();
		console.log(l_velocity);

		this.applyForce(l_velocity);

	}
	update = function(){
		this.velocity.add(this.acceleration)
		this.pos.add(this.velocity);
		this.acceleration.mult(0);
	}

	show = function(){
		
        fill(this.color,100);
		noStroke();
		ellipse(this.pos.x,this.pos.y,this.mass * 5,this.mass * 5);
	}

	checkEdges = function(){
		let newPos = this.pos;

		if(newPos.x >= width || newPos.x <= 0)
		{
			this.velocity.x = -this.velocity.x;
		}

		if(newPos.y >= (height - 1)){
			console.log(newPos.y + "==>" + height + "==>" +  this.velocity.y);
			this.velocity.y  = this.velocity.y * -1;
		}
	}
}