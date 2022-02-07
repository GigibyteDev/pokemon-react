export function resetAnimation(sprite: HTMLElement | null){
  if (sprite){
    sprite.style.animation = 'none';
    let reflow = sprite.offsetHeight; // eslint-disable-line @typescript-eslint/no-unused-vars
    sprite.style.animation = '';
  }
}