function Rosenbrock(x,y){
    const a = 1;
    const b = 100;
    return (a-x) **2 + b * (x-y**2)**2;
}

export {Rosenbrock};