const background_music = document.querySelector('#background-music');
background_music.volume = 0.5;
//background_music.loop = true;
// background_music.autoplay = true;
background_music.play();

const attack_sound = document.querySelector('#attack-sound');
attack_sound.volume = 0.4;

const tie_sound = document.querySelector('#tie-sound');
tie_sound.volume = 0.1;

const game_over = document.querySelector('#game-over');
game_over.volume = 0.1;


const emotional_damage_meme = document.querySelector('#emotional-damage-sound')
emotional_damage_meme.volume = 0.2;