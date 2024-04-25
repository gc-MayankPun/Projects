function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

function playVideo(element, videoName, cursor) {
    let video = document.querySelector(videoName);

    document.querySelector(element).addEventListener("mousemove", (pos) => {
        gsap.to(cursor, {
            x: pos.x - document.querySelector(element).getBoundingClientRect().x - 50,
            y: pos.y - document.querySelector(element).getBoundingClientRect().y - 50
        })
    })

    document.querySelector(element).addEventListener("mouseenter", () => {
        video.play();
        gsap.to(cursor, {
            opacity: 1,
            scale: 1
        })
        gsap.to(video, {
            opacity: 1
        })
    })
    document.querySelector(element).addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
        gsap.to(cursor, {
            opacity: 0,
            scale: 0.2
        })
        gsap.to(video, {
            opacity: 0
        })
    })
}

function navAnimate() {
    let nav = document.querySelector("nav")
    nav.addEventListener("mouseenter", () => {
        let tl = gsap.timeline();

        tl.to("#nav-bottom", {
            height: "26vh"
        })
        tl.to("#nav-links h5", {
            display: "block"
        })
        tl.to("#nav-links h5 span", {
            y: 0,
            stagger: {
                amount: 0.6
            }
        })
    })
    nav.addEventListener("mouseleave", () => {
        let tl = gsap.timeline();
        tl.to("#nav-links h5 span", {
            y: 25,
            stagger: {
                amount: 0.2
            }
        })
        tl.to("#nav-links h5", {
            display: "none",
            duration: 0.1
        })
        tl.to("#nav-bottom", {
            height: 0,
            duration: 0.2
        })
    })
}

function page2Animation() {
    let rightElem = document.querySelectorAll(".right-elem")

    rightElem.forEach((e) => {
        e.addEventListener("mouseenter", () => {
            gsap.to(e.childNodes[3], {
                opacity: 1,
                scale: 1
            })
        })
        e.addEventListener("mouseleave", () => {
            gsap.to(e.childNodes[3], {
                opacity: 0,
                scale: 0
            })
        })
        e.addEventListener("mousemove", (pos) => {
            gsap.to(e.childNodes[3], {
                x: pos.x - e.getBoundingClientRect().x,
                y: pos.y - e.getBoundingClientRect().y - 70,
                transform: `translate(-50%, -50%)`
            })
        })
    })
}

function page3Animation() {
    let button = document.querySelector("#page3 svg")
    let tl = gsap.timeline();
    button.addEventListener("mouseenter", () => {
        tl.to("#page3 p", {
            opacity: 1,
            y: 0
        })
    })
    button.addEventListener("mouseleave", () => {
        tl.to("#page3 p", {
            opacity: 0,
            y: 20
        })
    })

    let page3Center = document.querySelector("#center-btn")
    let video = document.querySelector("#page3 video")

    page3Center.addEventListener("click", () => {
        video.play();
        gsap.to(video, {
            transform: `scaleX(1) scaleY(1)`,
            opacity: 1,
            borderRadius: 0
        })
    })

    video.addEventListener("click", () => {
        video.pause();
        gsap.to(video, {
            transform: `scaleX(0.7) scaleY(0)`,
            opacity: 0,
            borderRadius: `30px`,
        })
    })
}

loco();
navAnimate();
page2Animation();
page3Animation();
playVideo("#page6-right", "#page6-right video", "#page6-cursor");
playVideo("#page7-right", "#page7-right video", "#page7-cursor");

let tl = gsap.timeline();
tl.from("#page1", {
    opacity: 0,
    duration: 0.3,
    delay: 0.2,
    ease: "power.in"
})
tl.from("#page1", {
    transform: `scaleX(0.7) scaleY(0.2)`,
    borderRadius: `50px`,
    duration: 1,
    ease: "power.in"
})
tl.to("nav", {
    opacity: 1
})
tl.from("#page1 h1, #page1 p, #page1 div", {
    opacity: 0,
    duration: 0.5,
    stagger: 0.2
})