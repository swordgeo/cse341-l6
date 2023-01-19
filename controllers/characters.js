const Character = require('../models/character')

//using try/catch for troubleshooting
const getCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};


const getCharacter = async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id);
    res.json(character);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};


const addCharacter = async (req, res, next) => {
  //I notice it'll let me have some of these values blank but we'll deal with that in time
  const character = new Character({
    characterName: req.body.characterName,
    playerName: req.body.playerName,
    race: req.body.race,
    class: req.body.class,
    level: req.body.level,
    alignment: req.body.alignment,
    stats: {
      str: req.body.stats.str,
      dex: req.body.stats.dex,
      con: req.body.stats.con,
      int: req.body.stats.int,
      wis: req.body.stats.wis,
      cha: req.body.stats.cha
    }
  });
  try {
    const newCharacter = await character.save();
    //201 means new thing created as opposed to general 200 "everything worked"
    res.status(201).json(newCharacter);
  } catch (err) {
    //400 means user error - didn't use all values for instance
    res.status(400).json({message: err.message});
  }
}


const delCharacter = async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      // 404 means does not exist
      res.status(404).json({message: "Can't find this character."});
      return;
    }
    const result = character.remove();
    res.status(200).json({message: "Successfully deleted character."});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};


const editCharacter = async (req, res, next) => {
  try {
    const character = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true })
    //const character = Character.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!character) return res.status(404).send("No Char found.")
    res.status(200).send(character)
  } catch(err) {
    res.status(500).send(err)
  }

}


module.exports = { getCharacters, getCharacter, addCharacter, delCharacter, editCharacter};