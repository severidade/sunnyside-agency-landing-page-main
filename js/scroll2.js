const myLink = document.querySelector('.arrow-down');

function getDistanceFromTheTop (element){
  const targetId = element.getAttribute("href");
  return document.querySelector(targetId).offsetTop;
}

// function nativeScroll(distanceFromTheTop) {
//   window.scroll({
//     top: distanceFromTheTop,
//     behavior: "smooth",
//   });
// }

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 61);
}

function scrollToId(event){
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 60;
  // nativeScroll(distanceFromTheTop);
  smoothScrollTo(0, distanceFromTheTop, 1000);
}

myLink.addEventListener('click', scrollToId);

// inspirado no código de Tiger Codes em  https://github.com/tigercodes-io/scroll-suave
// https://www.youtube.com/watch?v=Mutjus8WI2w