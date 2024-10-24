class Particle{
    constructor(nDimensi, objFunction){
        this.objFunction = objFunction;
        this.nDimensi = nDimensi;
        this.position = Array(nDimensi).fill(0);
        this.velocity = Array(nDimensi).fill(0);
        this.pbest = Array(nDimensi).fill(0);
        this.pbestFitness = Infinity;
        this.fitness = Infinity;
    }

    inisialisasi(min, max){
        for (let i = 0; i < this.nDimensi; i++){
            this.position[i] = Math.random() * (max - min) + min;
            this.velocity[i] = Math.random() * (max - min) + min;
            this.pbest[i] = this.position[i];
        }
    }

    calculateFitness(){
        this.fitness = this.objFunction(...this.position);
    }

    updatePbest(){
        if(this.fitness < this.pbestFitness){
            this.pbestFitness = this.fitness;
            this.pbest = [...this.position];
        }
    }

    updatePosition(){
        for (let i = 0; i < this.nDimensi; i++){
            this.position[i] = this.position[i] + this.velocity[i];
        }
    }
}

export {Particle};