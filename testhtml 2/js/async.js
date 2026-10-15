setTimeout(myBomb, 3000);

function myBomb(){
    document.getElementById('time').innerHTML = "이문서는 3초뒤에 폭.."
}



function myDisplayer(some){
document.getElementById('fs').innerHTML += some +  " ";
}

function myFirst(){myDisplayer("no body")};

function mySecond(){myDisplayer("help me")}

myFirst();
mySecond();
