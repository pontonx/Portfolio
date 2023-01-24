function Portfolio() {
    document.getElementById("portfolio").scrollIntoView({
        behavior: 'smooth'
    });
}

function Contact() {
    document.getElementById("contact").scrollIntoView({
        behavior: 'smooth'
    });
}

function About() {
    document.getElementById("about").scrollIntoView({
        behavior: 'smooth'
    });
}

function Home() {
    document.getElementById("banner").scrollIntoView({
        behavior: 'smooth'
    });
}

$("#hamburger").click(function () {
    $(".dropdownlist").toggleClass("on");
    $("#hamburger").toggleClass("fixed");
})
