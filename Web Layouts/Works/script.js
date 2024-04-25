function loader() {
  let tl = gsap.timeline();

  tl.to("#yellow", {
    top: "-100%",
    delay: 0.5,
    duration: 0.5,
    ease: "expo.out",
  });
  tl.from("#black", {
    top: "100%",
    delay: 0.5,
    duration: 0.5,
    ease: "expo.out",
  });
  tl.to("#loader", {
    top: "-100%",
    delay: -0.5,
    duration: 0.8,
    ease: "expo.out",
    display: "none",
  });
}

function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  // To go back to Home Page
  backToTop(locoScroll);
}

function navLinkDisplay() {
  let open = true;
  document.querySelector("#close").addEventListener("click", () => {
    let tl = gsap.timeline();

    tl.to(
      "#close",
      {
        transform: open ? "rotate(135deg)" : "rotate(0)",
        duration: 1,
      },
      "navAnim"
    );
    tl.to(
      "#anchor-links h3:nth-child(1)",
      {
        x: open ? 220 : 0,
        duration: 1,
        ease: "power4.out",
      },
      "navAnim"
    );
    tl.to(
      "#anchor-links h3:nth-child(2)",
      {
        opacity: open ? 0 : 1,
        duration: 1,
        x: open ? 180 : 0,
        ease: "power4.out",
      },
      "navAnim"
    );
    tl.to(
      "#anchor-links h3:nth-child(3)",
      {
        opacity: open ? 0 : 1,
        duration: 1,
        x: open ? 80 : 0,
        ease: "power4.out",
      },
      "navAnim"
    );
    open = !open;
  });
}

function navAnimation() {
  const commonScrollTriggerSettings = {
    scroller: "#main",
    trigger: "nav",
    start: "top -1%",
    end: "top -20%",
    duration: 8,
    scrub: true,
  };

  let tl = gsap.timeline();

  tl.to("nav", { scrollTrigger: commonScrollTriggerSettings, padding: "1vw 4.5vw" });
  tl.to("#close", { scrollTrigger: commonScrollTriggerSettings, rotate: "135deg" });
  tl.to("#anchor-links h3:nth-child(1)", { scrollTrigger: commonScrollTriggerSettings, x: 220 });
  tl.to("#anchor-links h3:nth-child(2)", { scrollTrigger: commonScrollTriggerSettings, x: 180, opacity: 0 });
  tl.to("#anchor-links h3:nth-child(3)", { scrollTrigger: commonScrollTriggerSettings, x: 80, opacity: 0 });
}

function navOnPagesAnim(){
  const commonScrollTriggerSettingsOnPage2 = {
    scroller: "#main",
    trigger: "#page2",
    start: "top 15%",
    end: "bottom 50%",
    scrub: true,
  };
  const commonScrollTriggerSettingsOnPage3 = {
    scroller: "#main",
    trigger: "#page3",
    start: "top 10%",
    end: "top 8%",
    scrub: true,
  };

  const tlPage2 = gsap.timeline({
    scrollTrigger: commonScrollTriggerSettingsOnPage2,
  });
  const tlPage3 = gsap.timeline({
    scrollTrigger: commonScrollTriggerSettingsOnPage3,
  });

  tlPage2.to(["nav svg path", "#anchor-links h3 a", "#anchors h3 i"], { color: "white", fill: "#fff" });
  tlPage3.to(["nav svg path", "#anchor-links h3 a", "#anchors h3 i"], { color: "black", fill: "#000" });
}

function showImageOnHover() {
  let elems = document.querySelectorAll(".elem");
  let page2 = document.querySelector("#page2");
  elems.forEach((ele) => {
    ele.addEventListener("mouseenter", () => {
      let bgImg = ele.getAttribute("data-img");
      page2.style.backgroundImage = `url(${bgImg})`;
    });
  });
}

function setCardHeight() {
  const cards = document.querySelectorAll(".image-card");

  cards.forEach((card) => {
    const img = card.querySelector("img");
    if (img) {
      img.onload = () => {
        card.style.height = img.offsetHeight + "px";
      };
    }
  });
}

function backToTop(scroll) {
  document
    .querySelector("#footer #top-footer")
    .addEventListener("click", () => {
      scroll.scrollTo(0);
    });
}

loader();

window.addEventListener("load", () => {
  setCardHeight();
  loco();
  navLinkDisplay();
  navAnimation();
  navOnPagesAnim();
  showImageOnHover();
});

window.addEventListener("resize", setCardHeight);
