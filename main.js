img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('dog_cat.jpg');
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  //objectDetector es una función predefinida de ml5.js que se utiliza para
  //activar la función de detección de objetos
  //el cual necesita 2 parametros:  el nombre del modelo y el nombre de la función
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Estado: detectando objetos";
}





function modelLoaded() {
  console.log("¡Modelo cargado!")
  //utilizaremos la variable ‘status’ para contener el estado de si el modelo CocoSsd está cargado o no
  status = true;
 
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);

      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);  
         //Es una función predefinida de ml5.js utilizada para la detección de objetos y devuelve el resultado de la detección.  
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Estado: objeto detectado";
          document.getElementById("number_of_objects").innerHTML = "Número de objetos detectados: "+ objects.length;
    
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}


