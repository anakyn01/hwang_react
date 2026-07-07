//1) 객체 만들기
const person = {
    firstName:"영일",
    lastName:"황",
    age:49,
    job:"T",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}
document.getElementById('one').innerHTML =
person.firstName + " is " + person.age + " years old" +
"<br/>" + person.fullName()
;

const human = new Object({
        firstName:"영일",
    lastName:"황",
    age:49,
    job:"T",
    fullName: () =>{
        return human.firstName + " " + human.lastName;
    }
})
document.getElementById('two').innerHTML =
human.firstName + " is " + human.age + " years old" +
human.fullName()
;

//생성자 은 금형이다
function Ip(display, spec, ea){//(파라미터)
   this.dp = display;
   this.sp = spec;
   this.ea = ea;
}

const myFather = new Ip("lg",17, 2)
const myMother = new Ip("lg", "ipse", 2)

