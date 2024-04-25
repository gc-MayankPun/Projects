const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;
function shrinkingCursor() {
    let xScale = 1;
    let yScale = 1;

    let xPrev = 0;
    let yPrev = 0;
    window.addEventListener("mousemove", (pos) => {
        clearTimeout(timeout);

        xScale = gsap.utils.clamp(0.8, 1.2, pos.clientX - xPrev);
        yScale = gsap.utils.clamp(0.8, 1.2, pos.clientY - yPrev);

        xPrev = pos.clientX;
        yPrev = pos.clientY;

        followingCursor(xScale, yScale);

        timeout = setTimeout(() => {
            document.querySelector("#cursor").style.transform = `translate(${pos.clientX}px, ${pos.clientY}px) scale(1, 1)`;
        }, 100)
    });
}

function followingCursor(xScale, yScale) {
    window.addEventListener("mousemove", (pos) => {
        document.querySelector("#cursor").style.transform = `translate(${pos.clientX}px, ${pos.clientY}px) scale(${xScale}, ${yScale})`;
    })
}

function heroAnimate() {
    var tl = gsap.timeline();

    tl.from("nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    });
    tl.to(".boundingElm", {
        y: 0,
        duration: 1,
        // dealy: -1,
        // ease: Expo.easeInOut,
        stagger: 0.2
    });
    tl.from("#hero-footer", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        dealy: -1,
        ease: Expo.easeInOut
    })
}

function followingImage() {
    document.querySelectorAll(".wrapper").forEach((elem) => {
        let rotate = 0;
        let rotateDiff = 0;
        elem.addEventListener("mousemove", (pos) => {
            let diff = pos.clientY - elem.getBoundingClientRect().top;
            rotateDiff = pos.clientX - rotate;
            rotate = pos.clientX;
            gsap.to(elem.querySelector("img"), {
                top: diff,
                left: pos.clientX,
                opacity: 1,
                ease: Power3,
                rotate: gsap.utils.clamp(-20, 20, rotateDiff * 0.5)
            })
        })
        elem.addEventListener("mouseleave", () => {
            gsap.to(elem.querySelector("img"), {
                opacity: 0,
                duration: 0.5,
                ease: Power3,
            })
        })
    })
}

shrinkingCursor();
followingCursor();
heroAnimate();
followingImage();