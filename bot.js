//Tells our console that the bot is starting
console.log("The Bot is starting!")

//Require the twit package
var Twit = require('twit');

//We need to authenticate our twitter
var T = new Twit({
    consumer_key: 'HTDONJIURZfOObJ2KBo9mJSAZ',
    consumer_secret: '9LJYJjNhtzl5Vvq36FlN3Cf01In9NNTJXduLxNpUAPXKmlnJbP',
    access_token: '847898793257295872-zBLDh3kqCGo73RsiWOW5K4HuSFD02eP',
    access_token_secret: 'xSmbTngIPDVO97uv4MimUHqBJctC0CRslMSDuo0d8Hhag',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
})


//GET -> search by hashtag, location, user, etc.
//POST -> Post tweets
//STREAM -> follows, you can @ them, mentions, you can @ them
//
//T.get('search/tweets', { q: 'banana since:2011-07-11', count: 2 }, function(err, data, response) {
//  console.log(data)
//})

var parameters = {
    q: 'banana since:2011-07-11',
    count: 2,
    lang: 'en'

}



T.get('search/tweets', parameters, gotData);

function gotData(err, data, response) {

    var tweets = data.statuses;

    for (var i = 0; i < tweets.length; i++) {

        console.log(tweets[i].text);
    }


}



//var tweet = { status: 'hello world!' }
//
//T.post('statuses/update', tweet, gotData);
//})

//POST TWEET
tweetIt();
//
//setInterval(tweetIt, 1000*45);

function tweetIt() {
    var r = Math.floor(Math.random() * 100);
    var tweet = {
        status: 'Here is the current random number ' + r 
    }

    T.post('statuses/update', tweet, gotData);

    function gotData(err, data, response) {
        if (err) {

            console.log("Something went wrong!");
            console.log("It posted!")
        }
    }
}

//STREAM FUNCTION

//followTweet();
//
//function followTweet() {
//
//    var stream = T.stream('user');
//    //Anything someone follows me
//    stream.on('follow', followed);
//
//    function followed(eventMsg) {
//        var name = eventMsg.source.name;
//        var screenName = eventMsg.source.screen_name;
//        tweetIt2('@' + screenName + 'how do you do?');
//        
//        
//        
//        var fs = require('fs');
//    console.log('finished image');
//    var json = JSON.stringify(eventMsg, null, 2);
//    fs.writeFile("tweet.json", json);
//}
//
//    }
//
//
//function tweetIt2(txt){
//    var tweet = {
//        status: txt
//        
//        
//    }
//    
//    T.post('statuses/update', tweet, tweeted);
//    function tweeted(err, data, response){
//        if(err){
//            console.log("Something went wrong!");
//        }else{
//            console.log("You were followed");
//        }
//    }
//}
////var cmd = '"C:\Users\18greene.montgomery\Desktop\P5ECS\p5-ecs\P5ECS\Lesson20> C:\Users\18greene.montgomery\Downloads\processing-3.3\processing-java.exe"--sketch= "C:\Users\18greene.montgomery\Desktop\P5ECS\p5-ecs\P5ECS\Lesson20\sketch_170407a" --run'
//
//
//var exec = require('child_process').exec;
var fs = require('fs');
//processing();
setInterval(processing, 1000*60*60);

function processing(){
 console.log("uploaded image");   
    var r = Math.floor(Math.random() * 10); //choose a random number 1-6
    if (r = 10) {
      r = Math.floor(Math.random() * 10);
        } //choose a random number 1-10
    if (r = 9) {
        r = r + 1;
    }
    var filename ='Pictures/Image' + r + '.jpg';
    console.log(filename);
     var parameters = {
        encoding: 'base64'
    }
    
    var b64 = fs.readFileSync(filename, parameters);
    
    //i have to upload before i can tweet it
    T.post('media/upload', {media_data: b64}, uploaded);
    
    function uploaded(err, data, response){
        //This is where I will tweet! 
        //My picture has a unique ID
        var id = data.media_id_string;
        var tweet = {
            
            status: 'This final is lit!',
            media_ids: [id]
        }
        
        
        T.post('statuses/update', tweet, tweeted);
        
        function tweeted(err, data, response){
            
            if (err){
                console.log("Something went wrong!");
            }else{
                console.log("It posted!");
            }
            
            
        }
        
    }

}


