gsap.registerPlugin(Flip);

const colorThemes = document.querySelectorAll('[name="theme"]');

// store theme
const storeTheme = function (theme) {
  localStorage.setItem("theme", theme);
};

// set theme when visitor returns
const setTheme = function () {
  const activeTheme = localStorage.getItem("theme");
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
  // fallback for no :has() support
  document.documentElement.className = activeTheme;
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);
    // fallback for no :has() support
    document.documentElement.className = themeOption.id;
  });
});

document.onload = setTheme();



const cards = document.querySelectorAll('.card');

cards.forEach ((card, index) => {
    card.addEventListener('click', () =>{
        const state = Flip.getState(cards)

        const isCardActive = card.classList.contains("active");
        cards.forEach((otherCard, otherIndex) =>{
            otherCard.classList.remove('active');
            otherCard.classList.remove('is-inactive');
            if(!isCardActive && index !== otherIndex) {
                otherCard.classList.add("is-inactive")
            }
        })

        if(!isCardActive) card.classList.add('active')

        Flip.from(state, {
            duration:1,
            ease: "expo.out",
            absolute: true,
            
            
        })
    });
});