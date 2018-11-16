

var sounds=["sounds/halloween/ghostly1.wav", 
            "sounds/halloween/ghostly2.wav", 
            "sounds/halloween/happyhw.wav", 
            "sounds/halloween/hauntmanwelcome.wav", 
            "sounds/halloween/laugh.wav", 
            "sounds/halloween/laugh2.wav", 
            "sounds/halloween/spooky2.wav", 
            "sounds/halloween/welcome.wav", 
            "sounds/halloween/wolf.wav"];

var nextSoundIndex = 0;

function getNextSound() {
	
	return sounds[nextSoundIndex];
}

function soundPlayed() {
	nextSoundIndex = ((nextSoundIndex + 1) % sounds.length);
}

exports.getNextSound = getNextSound;
exports.soundPlayed = soundPlayed;
