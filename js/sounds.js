const bg_music_list = [
    "bw_unova_gymbattle_theme-8bit",
    "kickback_8bit-remix"
]

const randomly_selected_bg_music = bg_music_list[Math.floor(Math.random() * bg_music_list.length)];
console.log(randomly_selected_bg_music)

const background_music = new Audio(`../assets/sounds/${randomly_selected_bg_music}.mp3`);
background_music.volume = 0.5;
background_music.loop = true;
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