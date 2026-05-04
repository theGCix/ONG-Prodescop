// constants
const body = document.querySelector("body"),
    loader = document.querySelector(".loader-wrap"),
    links = document.querySelectorAll('a[href="#"]'),
    nav = document.querySelector("header nav"),
    navToggle = document.querySelector("header nav .toggle"),
    navSpanMiddle = document.querySelector("header nav .toggle .middle"),
    navNavigationBar = document.querySelector("header nav .navigation-bar"),
    navNavigationBarLi = document.querySelectorAll(
        "header nav .navigation-bar li"
    ),
    headerText = document.querySelector("header .text"),
    headerSection = document.querySelector("header"),
    aboutSection = document.querySelector(".about-us"),
    recipeSection = document.querySelector(".recipes"),
    // recipeSection1 = document.querySelector(".recipes1"),
    menuSection = document.querySelector(".menu"),
    fixedImageSection = document.querySelector(".fixed-image"),
    footerSection = document.querySelector("footer"),
    dotOne = document.querySelector(".dots .one"),
    dotTwo = document.querySelector(".dots .two"),
    dotThree = document.querySelector(".dots .three"),
    dots = document.querySelectorAll(".dots > div"),
    logoImage = document.querySelector("header nav .logo img"),
    svgDown = document.querySelector("header .arrow-down"),
    svgUp = document.querySelector(".copyright .arrow-up"),
    menuImgs = document.querySelectorAll(".menu .menu-image-container img"),
    boxModel = document.querySelector(".menu .box-model"),
    menuImageContainer = document.querySelector(".menu-image-container"),
    boxModelArrow = document.querySelector(".menu .box-model .arrow"),
    boxModelImage = document.querySelector(".menu .box-model img"),
    pageTitle = document.querySelector("title");

// remove loader
function fadeOutEffect() {
    const fadeEffect = setInterval(function() {
        if (!loader.style.opacity) {
            loader.style.opacity = 1;
        }
        if (loader.style.opacity > 0) {
            loader.style.opacity -= 0.4;
        } else {
            body.classList.remove('stop-scroll');
            loader.classList.add('remove');
            clearInterval(fadeEffect);
        }
    }, 100);
}
window.addEventListener("load", fadeOutEffect);

// prevent links click hash
links.forEach(link =>
    link.addEventListener("click", function(e) {
        e.preventDefault();
    })
);

// toggle hamburger menu button
navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navSpanMiddle.classList.toggle("hide");
    navNavigationBar.classList.toggle("show");
});

// show active navigationbar li
navNavigationBarLi.forEach(li =>
    li.addEventListener("click", () => {
        const arr = Array.from(li.parentElement.children);
        arr.forEach(li => li.classList.remove("active"));
        li.classList.add("active");
    })
);

// svg-up smooth scroll
svgUp.addEventListener("click", () => {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
});

window.onscroll = function() {
    // make navbar fixed & change logo color
    if (window.pageYOffset > headerSection.offsetHeight - 75) {
        nav.classList.add("active");
        logoImage.src = "https://res.cloudinary.com/ditldw1rx/image/upload/c_auto,h_150,w_150/Copilot_20260503_165901_f43n8x.png";
    } else {
        nav.classList.remove("active");
        // logoImage.src = "https://res.cloudinary.com/abdel-rahman-ali/image/upload/v1535988515/logo-rosa-white.png";
        logoImage.src = "https://res.cloudinary.com/ditldw1rx/image/upload/c_auto,h_150,w_150/Copilot_20260503_165842_dun16z.png";
    }

    // header welcome fade out and in
    if (window.pageYOffset > 0) {
        headerText.style.opacity = -window.pageYOffset / 300 + 1;
    }
    // home page JS
    if (pageTitle.text === "ROSA- Restaurant") {
        //change dots background color
        if (window.pageYOffset < headerSection.offsetHeight * 0.5) {
            dots.forEach(dot => dot.classList.remove("black"));
            dotTwo.classList.remove("active");
            dotOne.classList.add("active");
        } else if (
            window.pageYOffset > headerSection.offsetHeight * 0.5 &&
            window.pageYOffset < recipeSection.offsetTop * 0.72
        ) {
            dots.forEach(dot => dot.classList.add("black"));
        } else if (
            window.pageYOffset > recipeSection.offsetTop * 0.75 &&
            window.pageYOffset < menuSection.offsetTop * 0.81
        ) {
            dots.forEach(dot => dot.classList.remove("black"));
            dotOne.classList.remove("active");
            dotThree.classList.remove("active");
            dotTwo.classList.add("active");
        } else if (
            window.pageYOffset > menuSection.offsetTop * 0.81 &&
            window.pageYOffset < fixedImageSection.offsetTop * 0.86
        ) {
            dots.forEach(dot => dot.classList.add("black"));
            dotThree.classList.remove("active");
            dotTwo.classList.add("active");
        } else if (
            window.pageYOffset > fixedImageSection.offsetTop * 0.86 &&
            window.pageYOffset < footerSection.offsetTop * 0.72
        ) {
            dots.forEach(dot => dot.classList.remove("black"));
            dotTwo.classList.remove("active");
            dotThree.classList.add("active");
        } else if (
            window.pageYOffset > footerSection.offsetTop * 0.72 &&
            window.pageYOffset < footerSection.offsetTop * 0.901
        ) {
            dots.forEach(dot => dot.classList.add("black"));
        } else if (window.pageYOffset > footerSection.offsetTop * 0.901) {
            dots.forEach(dot => dot.classList.remove("black"));
        }
    }
};

/** ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 * ||||||||||||||||||||||||||||||||||||||EMPIEZA|||CULQI|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 */

// CONFIGURA TU CLAVE
Culqi.publicKey = "pk_test_xxxxx"; // luego cambias a pk_live

const btnDonar = document.getElementById("btnDonar");

btnDonar.addEventListener("click", function () {
    const monto = document.getElementById("monto").value;

    if (!monto || monto <= 0) {
        alert("Ingresa un monto válido");
        return;
    }

    Culqi.settings({
        title: "PRODESCOP",
        currency: "PEN",
        amount: monto * 100 // Culqi trabaja en céntimos
    });

    Culqi.options({
        lang: "auto",
        installments: false
    });

    Culqi.open();
});

// respuesta Culqi
function culqi() {
    if (Culqi.token) {
        const token = Culqi.token.id;
        const monto = document.getElementById("monto").value;

        fetch("procesar_pago.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
                amount: monto
            })
        })
        .then(res => res.json())
        .then(data => {
            alert("Pago exitoso");
        })
        .catch(err => {
            console.error(err);
            alert("Error en el pago");
        });
    } else {
        console.error(Culqi.error);
        alert(Culqi.error.user_message);
    }
}

// 👇 AGREGA ESTO AL FINAL
function setMonto(valor) {
    document.getElementById("monto").value = valor;
}



/** ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 * ||||||||||||||||||||||||||||||||||||||TERMINA|||CULQI|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 */

// home page JS
if (pageTitle.text === "PRODESCOP") {
    // svg-down smooth scroll
    svgDown.addEventListener("click", () => {
        window.scroll({
            top: aboutSection.offsetTop - 30,
            behavior: "smooth"
        });
    });

    // dots smooth scroll
    dots.forEach(dot =>
        dot.addEventListener("click", function() {
            window.scrollTo({
                top: document.querySelector(this.dataset.x).offsetTop - 100,
                behavior: "smooth"
            });
        })
    );

    // show box model
    menuImgs.forEach(img =>
        img.addEventListener("click", function() {
            const arr = Array.from(this.parentElement.parentElement.children);

            arr.forEach(div => div.classList.remove("active"));

            this.parentElement.classList.add("active");
            boxModel.classList.add("active");
            boxModelImage.src = this.src;
            boxModelImage.classList.add("active");
            body.classList.add("hide-scroll");
        })
    );

    // box model functions
    function boxModelFun(e) {
        // close box model
        if (
            e.code === "Escape" ||
            (e.target.tagName === "DIV" && !e.target.classList.contains("arrow")) ||
            e.target.classList.contains("close")
        ) {
            boxModel.classList.remove("active");
            body.classList.remove("hide-scroll");
        }

        if (boxModel.classList.contains("active")) {
            if (
                e.code === "ArrowRight" ||
                e.code === "ArrowLeft" ||
                e.target.classList.contains("arrow-right") ||
                e.target.classList.contains("arrow-left")
            ) {
                const arr = Array.from(menuImageContainer.children);
                const active = arr.find(div => div.classList.contains("active"));

                // change box model image
                if (
                    e.target.classList.contains("arrow-right") ||
                    e.code === "ArrowRight"
                ) {
                    if (active.nextElementSibling === null) {
                        active.parentElement.firstElementChild.classList.add("active");
                        boxModelImage.src =
                            active.parentElement.firstElementChild.firstElementChild.src;
                    } else {
                        active.nextElementSibling.classList.add("active");
                        boxModelImage.src = active.nextElementSibling.firstElementChild.src;
                    }
                }

                // change box model image
                else if (
                    e.target.classList.contains("arrow-left") ||
                    e.code === "ArrowLeft"
                ) {
                    if (active.previousElementSibling === null) {
                        active.parentElement.lastElementChild.classList.add("active");
                        boxModelImage.src =
                            active.parentElement.lastElementChild.lastElementChild.src;
                    } else {
                        active.previousElementSibling.classList.add("active");
                        boxModelImage.src =
                            active.previousElementSibling.firstElementChild.src;
                    }
                }
                active.classList.remove("active");
            }
        }
    }

    window.addEventListener("keydown", boxModelFun);
    window.addEventListener("click", boxModelFun);
    boxModelArrow.addEventListener("click", boxModelFun);
}



window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav-custom");
    nav.classList.toggle("scrolled", window.scrollY > 50);
});