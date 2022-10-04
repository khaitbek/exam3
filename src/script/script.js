const hamburgerBtn = document.querySelector(".hamburger")
const primaryNav = document.querySelector("#primaryNavigation")
hamburgerBtn.addEventListener("click",()=>{
    hamburgerBtn.classList.toggle("toggle")
    document.body.toggleAttribute("no-scroll")
    if(primaryNav.classList.contains("show")){
      primaryNav.classList.add("closing")
      primaryNav.addEventListener("animationend",()=>{
        primaryNav.classList.remove("show","closing")
      },{once:true})
    }else{
      primaryNav.classList.add("show")
    }
})

$("#carouselItems").slick({
    infinite:true,
    slidesToShow:1,
    slidesToScroll:3,
    centerMode: true,
    variableWidth: true,
    dots:false,
    responsive:[
        {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
        }
    ],
    prevArrow:$("#prevBtn"),
    nextArrow:$("#nextBtn"),
})