var openButton, closeButton;
var modal, menu;
var menuIsOpen = false;
var firstFocusableElement, lastFocusableElement;
var getInTouchBtns;
var submenuBtns;
var targetId;
var submenuId;
var subTriggerId;
var navMenu;

document.addEventListener('DOMContentLoaded', function(e) {
	openButton = document.querySelector('.menuToggle');
	closeButton = document.querySelector('.menuClose');
	modal = document.querySelector('.mainNavContainer');
	menu = modal.querySelector('.mainNav');
	firstFocusableElement = modal.querySelector('.first-focusable-element');
	lastFocusableElement = modal.querySelector('.last-focusable-element');
	
	var navMenu = document.getElementById("mainNav");
	if(window.innerWidth < 1032.01){
		navMenu.classList.add("mainNavSmall");
		navMenu.style.display = "none";
	} else {
		
		navMenu.classList.remove("mainNavSmall");
		navMenu.style.display = "initial";
	}
	
  
  
	window.addEventListener("resize", function(e){
		if(window.innerWidth < 1032.01){
			closeSubmenu();
			navMenu.classList.add("mainNavSmall");
			navMenu.style.display = "none";
		} else {
			closeSubmenu();
			document.getElementById("menuClose").click();
			navMenu.classList.remove("mainNavSmall");
			navMenu.style.display = "initial";
		}
		
	});
  
	//get in touch buttons
	let getInTouchBtns = document.querySelectorAll(".quoteBtn");

	getInTouchBtns.forEach(function(elem) {
		elem.addEventListener("click", function(e) {
			document.getElementById("contactFormHome").scrollIntoView();
			document.getElementById("fname").focus();
		});
		
		elem.addEventListener("keyup", function(e) {
			if(e.keyCode === 13 || e.keyCode === 32) {
				document.getElementById("contactFormHome").scrollIntoView();
				document.getElementById("fname").focus();
			}
			
		});
	});
	
	//submenus
	let submenuBtns = document.querySelectorAll(".custom_toggle-button");

	submenuBtns.forEach(function(elem) {
		elem.addEventListener("click", function(e) {
			if(document.querySelectorAll(".openSubmenu").length != 0 && subTriggerId === elem.id) {
				closeSubmenu();
			} else if(document.querySelectorAll(".openSubmenu").length != 0 && subTriggerId != elem.id) {
				closeSubmenu();
				submenuId = elem.getAttribute("aria-controls");
				subTriggerId = elem.id;
				elem.setAttribute("aria-expanded", "true");
				activateSubmenu();
			} else {
				submenuId = elem.getAttribute("aria-controls");
				subTriggerId = elem.id;
				elem.setAttribute("aria-expanded", "true");
				activateSubmenu();	
			}
		});
		
		elem.addEventListener("keyup", function(e) {
			if(document.querySelectorAll(".openSubmenu").length != 0) {
				closeSubmenu();
			} else {
				if(e.keyCode === 13 || e.keyCode === 32) {
					if(elem.classList.contains("openSubmenu")) {
						closeSubmenu();
					} else {
						submenuId = elem.getAttribute("aria-controls");
						subTriggerId = elem.id;
						elem.setAttribute("aria-expanded", "true");
						activateSubmenu();	
					}
				}
			}
		});
	});

	
		
		
	
  
  
  
  // Show and move focus into the mobile menu when the hamburger icon button is activated
  openButton.addEventListener('click', function(e) {
    e.stopPropagation();
		$(closeButton).css({'display':'initial', 'border':'0'});
      $(closeButton).find('.fa-xmark').css('transform', 'rotate(360deg)');
	  $(openButton).css('display','none');
	  if($(menu).hasClass("mainNavSmall")) {
		$(menu).slideDown(50, function() {
			$(menu).addClass('mobileOpen');
		});  
	  }
      if($(menu).hasClass("mainNavSmall")) {
		  $(menu).addClass('mobileOpen');
	  }
	  
      closeButton.focus();
      
      
      menuIsOpen = true;
    });
 
  
  // Hide the mobile menu and move focus back to the hamburger icon butter when the close button is activated
  closeButton.addEventListener('click', function(e) {    
    closeMenu();
  });
  
  
  
  
  
  // Close the mobile menu when the user clicks/taps outside of it. Not necessary for WCAG compliance, so more UX focused
  document.body.addEventListener('click', function(e) {
    if(menuIsOpen === true && !modal.contains(e.target)) {
      closeMenu();
    }
	
	if(document.querySelectorAll(".mobileOpen").length === 0 && 
		document.querySelectorAll(".openSubmenu").length != 0 &&
		!document.getElementById(subTriggerId).contains(e.target)) {
			closeSubmenu();
		}
  });
  
  // Trap keyboard focus inside the mobile menu
  modal.addEventListener('keydown', function(e) {
    if(menuIsOpen) {
      if(e.key == 'Tab') {
        if(!e.shiftKey) {        
          if(document.activeElement == lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if(document.activeElement == firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
      
      if(e.key == 'Escape') {
       closeMenu();
      }
    }
  });
});

function closeMenu() {
	closeSubmenu();
  $(closeButton).find('.fas').css('transform', 'rotate(0deg)');
    $(closeButton).css('display', 'none');
	if($(menu).hasClass("mainNavSmall")) {
		$(menu).slideUp(400, function() {
			$(menu).removeClass('mobileOpen');
		});
	}
  
  $(openButton).css('display', '');

  openButton.focus();

 
  menuIsOpen = false;
}

function activateSubmenu() {
		document.getElementById(submenuId).classList.add("openSubmenu");
		
		var submenu = document.getElementById(subTriggerId);
		
		var subMenuItems = document.getElementById(submenuId).querySelectorAll("li");
		
		subMenuItems[subMenuItems.length - 1].setAttribute("id","lastSub");
		
		subMenuItems.forEach(function(elem) {
		
			elem.addEventListener("keyup", function(e) {
				if(e.keyCode === 9 && document.activeElement.id === "lastSub") {
					closeSubmenu();
				} else if(e.keyCode === 27) {
					closeSubmenu();
				}
			});
		});
		
		document.getElementById(subTriggerId).addEventListener("keyup", function(e) {
			if(e.keyCode === 9 && e.keyCode === 16) {
				closeSubmenu();
			} else if(e.keyCode === 27) {
				closeSubmenu();
			}
		});
	}

	function closeSubmenu() {
		if(document.querySelectorAll(".openSubmenu").length != 0) {
			document.getElementById(subTriggerId).setAttribute("aria-expanded", "false");
			document.querySelectorAll(".openSubmenu")[0].classList.remove("openSubmenu");
			document.getElementById("lastSub").removeAttribute("id","lastSub");
		}
			
		
		
		//remove event listeners from submenu
		
		submenuId = "";
		subTriggerId = "";
	}