var isec,mySec,iMin;
isec = 0;
iMin = 0;
function timer(){
 	this.mySec = setInterval(secc,1000)
}
function secc(){
	isec++;
	if(isec<10){
	document.getElementById("sec").innerHTML = "0"+isec;	
	}
	else if(isec<60){
	document.getElementById("sec").innerHTML = isec;
	}
	else{
	iMin++;
	if (iMin<10) {
	document.getElementById("min").innerHTML = "0"+iMin;}
	else{
	document.getElementById("min").innerHTML = iMin;
	}
	isec=0;
	document.getElementById("sec").innerHTML = "0"+isec;	
	}
	}
timer();
