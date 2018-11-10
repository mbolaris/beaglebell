

var sounds=["sounds/halloween/Dark_Laugh-HopeinAwe-1491150192.wav",
            "sounds/halloween/Demon_Girls_Mockingbir-Hello-1365708396.wav",
            "sounds/halloween/Elk Bellowing In Forest-SoundBible.com-681308174.wav",
            "sounds/halloween/Monster_Gigante-Doberman-1334685792.wav",
            "sounds/halloween/Mummy Zombie-SoundBible.com-1966938763.wav",
            "sounds/halloween/ooow.wav",
		    "sounds/halloween/ghostly1.wav", 
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
