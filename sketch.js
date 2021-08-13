var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFeed;
var feedTime;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  //create feed the dog button here
  feedTheFood=createButton("feedTheFood");
  feedTheFood.position(800,95);
  feedTheFood.mousePressed(feedFood);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime = database.ref("FeedTime")
  feedTime.on("value", function(data){
  lastFeed = data.val()});
 
  //write code to display text lastFed time here
    if(lastfeed >= 12){
      text("lastFeed : " + lastFeed % 12 + "PM", 350, 30);
    }else if(lastFeed == 0){
      text("lastFeed : 12 AM", 350, 30);
    }else{
      text("lastFeed : " + lastFeed + "AM", 350, 30);
    }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStck();
   if(ood_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val *0);
   }else{
    foodObj.updateFoodStock(food_stock_val -1);
   }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
