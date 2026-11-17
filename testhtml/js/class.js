class Car{

    constructor(name, year){//생성자
        this.carName = name;
        //생성자속성 = 인수
        this.carYear = year;
    }
    age(){
        const date = new Date();
        return date.getFullYear() - this.carYear;
    }
}

const myCar1 = new Car("Meced",2019);
const myCar2 = new Car("kia",2024);

document.getElementById('cls').innerHTML =
myCar1.carName +  " " + myCar2.carName + "<br/>" +
" 내 자동차는 각 각 " + myCar1.age()+"년 " + myCar2.age() +"년"+
" years old";
;



class Char{ //부모클래스 cip bip
    constructor(brand){
        this.charName = brand;
    }
    present(){
        return 'I have a ' + this.charName;
    }
}

class Bike extends Char{
    constructor(brand, mod){
        super(brand);
        this.model = mod;
    }
    show(){
        return this.present() + ', it is a ' + this.model;
    }
}

let ohMyCar = new Bike('meced','cls450')
document.getElementById('inherit').innerHTML = ohMyCar.show();