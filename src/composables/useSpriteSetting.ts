const hideAnimatedSprites = ref(localStorage.getItem('hide-animated-sprites') === 'true');

watch(hideAnimatedSprites, (val) => {
  localStorage.setItem('hide-animated-sprites', String(val));
});

export function useSpriteSetting() {
  return { hideAnimatedSprites };
}
