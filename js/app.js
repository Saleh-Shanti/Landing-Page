/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navList= document.getElementById('navbar__list');
const section = document.querySelectorAll('section');
const header=document.querySelector('.page__header');
const toTop=document.querySelector('.top');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


// function to add the navbar list 

let addListElement = Label => 
    {
                
        let navListItem =document.createElement('li');
        let navLink=document.createElement('a');
        navLink.classList.add('menu__link');
        let navLinkText=document.createTextNode(Label);
        navLink.appendChild(navLinkText);
        // To navigate to the specific section when its clicked
        navLink.href=`#${Label}`;
        navListItem.appendChild(navLink);
        navList.appendChild(navListItem);
    }


// function to Check if the section is in the viewport 

let isInViewport = function (elem) 
    {
        let bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

// Adding the navbar list Items 

addListElement("Home");
addListElement("Projects");
addListElement("About");
addListElement('Contact');


// To show the To Top span in the screen

window.onscroll =()=>
    {
        this.scrollY>=240 ? toTop.classList.add('show') : toTop.classList.remove('show');
    }


// To select the added navbar elements to add event to them later
const navLink=document.querySelectorAll('.menu__link');


/**
 * End Main Functions
 * Begin Events
 * 
*/

// scroll to top span event listener
toTop.addEventListener('click',
    ()=>{
            window.scrollTo({
                top:0,
                behavior:"smooth",
            });
        }
    );

// Scroll to anchor ID using scrollTO event
// Scroll to section on link click

for (const link of navLink) 
    {
    
        link.addEventListener('click',(evt)=>
        {
            evt.preventDefault();
            const href = link.getAttribute("href");
            const position = document.querySelector(href).offsetTop;
          
            scroll({
              top: position-10,
              behavior: "smooth"
            });
          }
        );
    }






// Set sections as active
// Add class 'active' to section when near top of viewport

document.addEventListener('scroll', 
    ()=> 
        {

            // To remove class (active) if it exist " We dont need more than one section with class active "

            for(const active of section)
            {active.classList.remove('active');}

            // To Check if the current section is in the viewport and add class (active) if it in the viewport
            for(const active of section){
            if(isInViewport(active) )
        
            active.classList.add('active');
            
        }

});

 
// To hide the navbar when the user is not scrolling

let isScrolling;

window.addEventListener('scroll',  ()=> {
    header.classList.remove('hide_nav');
	window.clearTimeout( isScrolling );

	
	isScrolling = setTimeout(function() {
      
        (window.pageYOffset<=300)?header.classList.remove('hide_nav') :header.classList.add('hide_nav');
        ;

	}, 2000);

});
