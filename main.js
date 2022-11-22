video="";
Status="";
object=[];
function preload(){
video= createVideo("video.mp4");
video.hide();
}
function setup(){
    Canvas=createCanvas(480,380);
    Canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if(Status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of object detected are :- "+object.length;

            fill(blue);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            nofill();
            stroke(blue);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);


        }
    }
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
}
function start(){
    objectDetector=ml5.objectDetector("cocossd" ,ModelLoaded );
    document.getElementById("status").innerHTML="Status : Detecting Object";
}
function ModelLoaded(){
    console.log("Model Loaded");
    Status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
