const compareImages = require("resemblejs/compareImages");
const fs = require("mz/fs");
 
async function getDiff() {
    const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType: "movement",
            transparency: 0.3,
            largeImageThreshold: 1200,
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: true,
        ignore: "antialiasing"
    };
 
    // Below here is where we have to loop through the images.

    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    const data = await compareImages(
        await fs.readFile("./1/example.png"),
        await fs.readFile("./3/example.png"),
        options
    );

    console.log('DATA: ', data.misMatchPercentage)
 
    const match = data.misMatchPercentage < 1; // need to test and define what is a match

    if (!match) {
        await fs.writeFile("./output.png", data.getBuffer());
    }
    
}
 
getDiff();