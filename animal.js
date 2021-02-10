const mongoCollections = require('./mongoCollection');
const animals = mongoCollections.animals;
const ObjectId = require('mongodb').ObjectId




async function getAnimalById(id) {
    if (!id) throw "You must provide an id to search for";
    //if (!id.match("/^[0-9a-fA-f]{24}$")) throw "Please provide proper 12 bytes length of the id";
    if (typeof id !== 'string') throw "Please provide proper id"
    if (id.length == 0) throw "Please provide proper length of the id";
    if (typeof id === 'undefined') throw "Please provide proper type of id"
    const dogCollection = await animals();
    const doggo = await dogCollection.findOne({ _id: ObjectId(id) });
    if (doggo === null) throw "No animal with that id";

    return doggo;
}



async function create(name, animalType) {
    if (!name) throw "You must provide a name for the animal"
    if (typeof name != 'string' || typeof animalType != 'string') throw 'Names are not strings'
    if (!animalType) throw "You must provide an animaltype";
    if (animalType.length === 0) throw "You must provide animal type."
    if (name.length === 0) throw 'You must provide a name to the animal'

    const dogCollection = await animals();

    let newAnimal = {
        name: name,
        animalType: animalType
    };

    const insertInfo = await dogCollection.insertOne(newAnimal);
    if (insertInfo.insertedCount === 0) throw "Could not add animal";

    const newId = insertInfo.insertedId;

    const animal = await getAnimalById(newId.toString());
    return animal;
}


async function getAllAnimals() {
    const dogCollection = await animals();

    const dogs = await dogCollection.find({}).toArray();
    if (dogs == 'null') throw 'Database is empty'
    return dogs;
}


async function removeAnimals(id) {
    if (!id) throw "You must provide an id to search for";
    // if (!id.match("/^[0-9a-fA-f]{24}$")) throw "Please provide proper 12 bytes length of the id";
    if (id.length === 0) throw "Please provide proper legth of the id";
    if (typeof id !== 'string') throw "Please provide proper id"
    if (typeof id === 'undefined') throw "Please provide proper type of id"
    const removecontent = await getAnimalById(id.toString());
    const dogCollection = await animals();

    const deletionInfo = await dogCollection.deleteOne({ _id: ObjectId(id) });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete dog with id of ${id}`;
    }
    return removecontent
}


async function renameAnimals(id, newname) {
    if (!id) throw "You must provide an id to search for";
    //if (!id.match("/^[0-9a-fA-f]{24}$")) throw "Please provide proper 12 bytes length of the id";
    if (id.length === 0) throw "Please provide proper legth of the id";
    //if (typeof id !== 'string') throw "Please provide proper id"
    if (!newname) throw "You must provide a name for animal";
    if (typeof newname !== 'string') throw 'You must provide correct newname'
    if (newname.length === 0) throw 'Yow must provide some newname to the animal'


    const dogCollection = await animals();
    const animalid = await getAnimalById(id.toString());
    const upanimaltype = animalid.animalType;

    const renameAnimals = {
        name: newname,
        animalType: upanimaltype
    };

    const updatedInfo = await dogCollection.replaceOne({ _id: ObjectId(id) }, renameAnimals);
    if (updatedInfo.modifiedCount === 0) {
        throw "could not update dog successfully";
    }

    const upID = updatedInfo.updatedID;
    const animal = await getAnimalById(id.toString());
    return animal;
}




module.exports = { Name: "Dharika kapil", CWID: "10453441", getAnimalById, create, getAllAnimals, removeAnimals, renameAnimals }