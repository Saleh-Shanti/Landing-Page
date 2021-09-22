

/**
 * Define Global Variables
 
*/
const navList= document.getElementById('navbar__list');
const section = document.querySelectorAll('section');
const header=document.querySelector('.page__header');
const toTop=document.querySelector('.top');
let isScrolling;

/**
 * End Global Variables
 * 
 * Start Helper Functions
 * 
*/

// function to add navbar Dynamically

let dynamicAddNavbar=()=>
    {

        for(sec of section)
            {
                let navListItem =document.createElement('li');
                let navLink=document.createElement('a');
                navLink.classList.add('menu__link');
                let navLinkText=sec.id;
                navLink.innerHTML=navLinkText;
                
                navLink.href=`#${sec.id}`;
                navListItem.append(navLink);
                navList.appendChild(navListItem);
                
            }

    }





// function to Check if the section is in the viewport 

let isInViewport = function (elem) 
    {
        let bounding = elem.getBoundingClientRect();
        return (        
            ( bounding.top <= 90 && bounding.top >= 0 ) ||
            (bounding.bottom >=200 && bounding.bottom <=900)

            
        );
    };
    
    
/**
 * End Helper Functions
 * Begin Main Functions        bounding.top >= 0 &&
            bounding.top <= (window.innerHeight || document.documentElement.clientHeight)
 * 
*/

// Adding the navbar list Items 

dynamicAddNavbar();


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
                {   
                   // loop over the navbar links to remove active class

                  
                    for (const item of navLink) 
                        {
                            item.classList.remove('highlight');
                        }

                    active.classList.remove('active');
                }

            // To Check if the current section is in the viewport and add class (active) to section and navbar if it in the viewport

            for(const active of section)
                {
                    if(isInViewport(active) )
                        { 
                            for (const item of navLink) 
                            {
                                if(item.innerText==active.id)
                                {item.classList.add('highlight');}
                            }
                            active.classList.add('active');
                        }
                }

});

 
// To hide the navbar when the user is not scrolling



window.addEventListener('scroll',  ()=> {
    header.classList.remove('hide_nav');
	window.clearTimeout( isScrolling );

	
	isScrolling = setTimeout(function() {
      
        (window.pageYOffset<=300)?header.classList.remove('hide_nav') :header.classList.add('hide_nav');
        ;

	}, 2000);

});
