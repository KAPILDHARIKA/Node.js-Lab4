const animals = require("./animal");
const connection = require("./mongoConnection");


const main = async() => {
    const mortimer = await animals.create("Mortimer", "Giraffe");
    console.log(mortimer);

    const mortimer6 = await animals.create("dhar", "kapil");
    console.log(mortimer6);

    const mortimer1 = await animals.create("Howl", "Worm");
    console.log(mortimer1);

    const mortimer2 = await animals.create("Blub Blub", "Otter");
    console.log(mortimer2);

    const mortimer5 = await animals.create('', '');
    console.log(mortimer5);


    const allMyAnimals = await animals.getAllAnimals();
    console.log(allMyAnimals);

    const blubBlub = await animals.getAnimalById();
    console.log(blubBlub);

    const noMatch = await animals.getAnimalById("BADID");
    console.log(noMatch)

    const removeBlubBlub = await animals.removeAnimals("5d8d9851d23413086a45e7f3");
    console.log(removeBlubBlub);

    const bubba = await animals.renameAnimals(mortimer5._id, "Bub");
    console.log(bubba);

    const bubba = await animals.renameAnimals('5d940b13308a4d0a0a1e77a2', 'justnow');
    console.log(bubba);

}

main().catch(error => {
    console.log(error);
});