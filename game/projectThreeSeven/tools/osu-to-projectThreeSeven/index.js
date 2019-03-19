var parser = require('osu-parser');
var fs = require('fs');
var left = [];
var right = [];

parser.parseFile('chart.osu', function (err, beatmap){
    console.log(beatmap.Title);
    console.log(beatmap.Artist);
    console.log(beatmap.hitObjects[0].position[0]);
    for ( var i = 0 ; i < beatmap.hitObjects.length ; i++){
        if (beatmap.hitObjects[i].position[0] == 128){
            left.push(beatmap.hitObjects[i].startTime);
        } else if (beatmap.hitObjects[i].position[0] == 384){
            right.push(beatmap.hitObjects[i].startTime);
        }
    }
    let output = {"chart" : {"left" : left, "right" : right}};
    fs.writeFile("output.json",JSON.stringify(output));
});