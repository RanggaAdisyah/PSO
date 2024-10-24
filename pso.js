import {Particle} from "./particle.js";
import {Rosenbrock} from "./rosenbrock.js";

class PSO {
    constructor(n_particles, n_dimention, obj_function) {
        this.n_particles = n_particles;
        this.particles = [];
        this.n_dimention = n_dimention;
        this.init_particles();
        this.obj_function = obj_function;
    }

    init_particles(){
        for (let i = 0; i < this.n_particles; i++){
            const particle = new Particle(this.n_dimention, Rosenbrock);
            particle.inisialisasi(5, -5);
            this.particles.push(particle);
        }
    }

    evaluateFitness(){
        this.particles.forEach((particle, index) => {
            particle.calculateFitness();
        });
    }

    updatePbest() {
        this.particles.forEach((particle) => {
            if (particle.fitness < particle.pbestFitness) {
                particle.pbest = [...particle.position];
                particle.pbestFitness = particle.fitness;
            }
        });
    }

    updateGbest() {
        const bestParticle = this.particles.reduce((best, particle) => {
            return particle.fitness < best.fitness ? particle : best;
        });
        this.gbestPosition = [...bestParticle.position];
        this.gbestFitness = bestParticle.fitness;
    }    

    updateVelocity(c1 = 1, c2 = 1, w = 0.5) {
        this.particles.forEach((particle) => {
            for (let i = 0; i < this.n_dimention; i++) {
                const r1 = Math.random();
                const r2 = Math.random();
    
                particle.velocity[i] =
                    w * particle.velocity[i] +
                    c1 * r1 * (particle.pbest[i] - particle.position[i]) +
                    c2 * r2 * (this.gbestPosition[i] - particle.position[i]);
            }
        });
    }
    
    updatePosition(){
        this.particles.forEach((particle) => {
            for(let i=0; i<this.n_dimention; i++){
                particle.position[i] += particle.velocity[i];
            }
            console.log(`position update ${particle.position[0]},${particle.position[1]}`)
        });
    }

    mainPSO(){
        this.evaluateFitness();
        this.updatePbest();
        this.updateGbest();
        this.updateVelocity();
        this.updatePosition();
    }

}
export {PSO};