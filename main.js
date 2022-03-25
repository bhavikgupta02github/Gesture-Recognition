Webcam.set({
    width:350,height:300,image_format:'png'
});
cam=document.getElementById("camera");
Webcam.attach(cam);
function cphoto(){
    Webcam.snap( function(data_uri){
        document.getElementById("display").innerHTML=' <img id="myimg" src="'+data_uri+'"/> ';
    }
    );
}
console.log('ml5 version: ',ml5.version);
mymodel=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PY8sh2pC6/model.json',modelLoaded);
function modelLoaded(){
    console.log("The Model is Loaded")
}
function speak(){
    keepapi=window.speechSynthesis;
    speak1="I guess you are showing "+emotionname1
    speak2="or I guess you are showing "+emotionname2
    say=new SpeechSynthesisUtterance(speak1+speak2);
    keepapi.speak(say);
}
function identifyphoto(){
    i1=document.getElementById("myimg");
    mymodel.classify(i1,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else {
        console.log(results);
        document.getElementById("em1").innerHTML=results[0].label;
        document.getElementById("em2").innerHTML=results[1].label;
        emotionname1=results[0].label;
        emotionname2=results[1].label;
        speak();
        if(results[0].label=="Thumbs Up"){
            document.getElementById("emo1").innerHTML="&#x1F44D;";
        }
        if(results[0].label=="Thumbs Down"){
            document.getElementById("emo1").innerHTML="&#x1F44E;";
        }
        if(results[0].label=="High Fi"){
            document.getElementById("emo1").innerHTML="&#x1F91A;";
        }
        if(results[1].label=="Thumbs Up"){
            document.getElementById("emo2").innerHTML="&#x1F44D;";
        }
        if(results[1].label=="Thumbs Down"){
            document.getElementById("emo2").innerHTML="&#x1F44E;";
        }
        if(results[1].label=="High Fi"){
            document.getElementById("emo2").innerHTML="&#x1F91A;";
        }
    }
}