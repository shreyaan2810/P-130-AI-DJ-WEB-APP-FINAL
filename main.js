song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
songstatus1= "";
songstatus2= "";
scoreRightwrist = 0;



function preload(){
    song1 = loadSound("music2.mp3");
    song2 = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);

}

function draw(){
    image(video,0,0,600,500);
    fill("#873600");
    stroke("#1C2833");
    songstatus1 = song1.isPlaying();
    songstatus2 = song2.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(songstatus1 == false){
            song1.play();
            document.getElementById('song_name').innerHTML = "song name = DARKSIDE ";
        }
    }

    if(scoreRightwrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(songstatus2 == false){
            song2.play();
            document.getElementById('song_name').innerHTML = "song name = Harry potter ";
        }
    }
}

function modelLoaded(){
    console.log("POSE NET IS INITIALISED!!!!!");
}

function gotposes(results){
    if(results.length > 0){
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX"+leftWristX+"leftWristY"+leftWristY);
        document.getElementById("position").innerHTML = "<b>POSITION:</b> \nleftWristX = "+Math.floor(leftWristX)+"\nleftWristY = "+Math.floor(leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX"+rightWristX+"rightWristY"+rightWristY);
    }
}