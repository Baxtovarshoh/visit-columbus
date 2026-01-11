const containerSwipe = document.querySelectorAll(".inside-popup > div");
const insideContainer = document.querySelector(".inside-popup");
const swipeHeight = 605;
const videos = document.querySelectorAll("video");
const linkActive = document.querySelectorAll(".w");
const link = document.querySelectorAll(".link-sub");
const cont1 = document.querySelector(".contents1");
const cont2 = document.querySelector(".contents2");
const cont3 = document.querySelector(".contents3");
const clickIcon = document.querySelectorAll(".icon-vol");
const twoSlider = document.querySelector(".story-content");
const twoSlider1 = document.querySelector(".story-content2");
const twoSlider2 = document.querySelector(".story-content3");
const img = document.querySelectorAll(".first");
img.forEach((img, i) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = img.src;
  document.head.appendChild(link);
});
videos.forEach((video, i) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "video";
  link.type = "video/mp4";
  link.href = video.src;
});

let indexContainer = 0;
let index_cont1 = 0;
let index_cont2 = 0;
let index_cont3 = 0;
let index_twoSlider = 0;
let index_twoSlider2 = 0;
let index_twoSlider3 = 0;
let currentTab = 0;
let currentSub = 0;
let currentVideoTab = null;
setActiveTab(0);
setActiveSub(0);

function getTabIndex(subIndex) {
  return Math.floor(subIndex / 3) * 3;
}

function handleVideo(subIndex) {
  const tabIndex = getTabIndex(subIndex);
  const isVideoSubTab = subIndex === tabIndex;

  if (tabIndex !== currentTab) {
    videos.forEach((v) => v.pause());
    currentVideoTab = null;
    currentTab = tabIndex;
    changeVolume;
  }

  if (isVideoSubTab) {
    const videoIndex = tabIndex / 3;

    if (currentVideoTab === tabIndex) return;

    videos.forEach((v) => v.pause());
    videos[videoIndex].play();
    currentVideoTab = tabIndex;
    videos[videoIndex].muted = true
  } else {
    if (currentVideoTab === tabIndex) {
      videos[tabIndex / 3].pause();
      currentVideoTab = null;
    }
  }
}

function ld() {
  clickIcon.forEach((value, i) => {
    value.addEventListener("click", () => {
      changeVolume(i);
    });
  });
}
ld()
function changeContainer() {
  insideContainer.style.transform = `translateY(${
    -indexContainer * swipeHeight
  }px)`;
  link.forEach((item) => {
    item.addEventListener("click", () => {
      const subIndex = Number(item.dataset.subIndex);

      if (subIndex === currentSub) return;

      const tabIndex = Math.floor(subIndex / 3) * 3;

      if (tabIndex !== currentTab) {
        currentTab = tabIndex;
        setActiveTab(tabIndex);
      }

      currentSub = subIndex;
      setActiveSub(subIndex);
      handleVideo(subIndex);
    });
  });
}

function setActiveTab(tabIndex) {
  document
    .querySelectorAll(".link-sub.w")
    .forEach((tab) => tab.classList.remove("actives"));

  document
    .querySelector(`.link-sub.w[data-sub-index="${tabIndex}"]`)
    ?.classList.add("actives");
}

function setActiveSub(subIndex) {
  document
    .querySelectorAll(".link-sub.qw")
    .forEach((sub) => sub.classList.remove("actives"));

  document
    .querySelector(`.link-sub.qw[data-sub-index="${subIndex}"]`)
    ?.classList.add("actives");
}

link.forEach((item) => {
  item.addEventListener("click", () => {
    indexContainer = parseInt(item.getAttribute("data-sub-index"));
    changeContainer();
  });
});
changeContainer();
function createSlider(contents, i) {
  const imageSlider = contents.querySelector(".swiper");
  const images = imageSlider.querySelectorAll(".swipe");

  const textSlider = contents.querySelector(".text-swiper");
  const texts = textSlider.querySelectorAll(".text-swipe");

  const dotsContainer = contents.querySelector(".dots");
  const prevBtn = contents.querySelector(".prev");
  const nextBtn = contents.querySelector(".next");

  let index = i;
  let swipeWidth = images[0].clientWidth;

  for (let i = 0; i < images.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll("div");
  dots[0].classList.add("active");

  function update() {
    images.forEach((slide) => {
      slide.style.transform = `translateX(-${swipeWidth * index}px)`;
    });
    console.log(swipeWidth);

    texts.forEach((text) => {
      text.style.transform = `translateX(-${swipeWidth * index}px)`;
    });

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function next() {
    index = (index + 1) % images.length;
    update();
  }

  function prev() {
    index = (index - 1 + images.length) % images.length;
    update();
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  let startX = 0;

  imageSlider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  imageSlider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) next();
    if (endX - startX > 50) prev();
  });
}

createSlider(cont1, index_cont1);
createSlider(cont2, index_cont2);
createSlider(cont3, index_cont3);

function createTwoSlider(contents, i) {
  const imageSlider = contents.querySelector(".swipers");
  const images = imageSlider.querySelectorAll(".r");

  const dotsContainer = contents.querySelector(".dots");
  const prevBtn = contents.querySelector(".prev");
  const nextBtn = contents.querySelector(".next");

  let index = i;
  let swipeWidth = images[0].clientWidth;

  for (let i = 0; i < images.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll("div");
  dots[0].classList.add("active");

  function update() {
    images.forEach((slide) => {
      slide.style.transform = `translateX(-${swipeWidth * index}px)`;
    });

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function next() {
    index = (index + 1) % images.length;
    update();
  }

  function prev() {
    index = (index - 1 + images.length) % images.length;
    update();
  }

  function prev() {
    index = (index - 1 + images.length) % images.length;
    update();
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // swipe mobile
  let startX = 0;

  imageSlider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  imageSlider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) next();
    if (endX - startX > 50) prev();
  });
}

function changeVolume(activeIndex) {
  videos.forEach((video, i) => {
    if (i === activeIndex) {
      video.muted = !video.muted;
    } else {
      video.muted = true;
    }
  });
}

createTwoSlider(twoSlider, index_twoSlider);
createTwoSlider(twoSlider1, index_twoSlider2);
createTwoSlider(twoSlider2, index_twoSlider3);
