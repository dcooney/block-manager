var gbm = gbm || {};

/*
 *  gbm.attachSticky
*/
gbm.attachSticky  = (el, anchor, top = 0) => {
	let h = el.offsetHeight + top, // height of sticky el
	    anchorOffset = anchor.getBoundingClientRect(),
	    anchor_top = anchorOffset.top,
		 w_height = window.innerHeight, // Window height
		 el_height = el.offsetHeight; // element height
      
	if(w_height > (el_height + top)){ 
		// If container height > than sticky height
		if(anchor_top <= top) {
		   el.classList.add('attached');
		} else {
			if(anchor_top > top) {
				el.classList.remove('attached');
			}
		}
	} 		
};
 


/*
 *  gbm.resizeSticky
*/   
gbm.resizeSticky = () => {
   let sticky = document.getElementById('gbm-sticky');
   let el = document.getElementById('gbm-sticky-wrapper');
   let atts = window.getComputedStyle(el);
   sticky.style.width = atts.width;
} 



/*
 *  initSticky
*/ 
 const initSticky = () => {
	if(document.getElementById("gbm-sticky-wrapper")){		
	   const sticky_el = document.getElementById('gbm-sticky');
	   const sticky_anchor = document.getElementById('gbm-sticky-wrapper');
	   const sticky_top = 70; // The position the sticky should stick 
	         
	   // Scroll    
	   window.addEventListener('scroll', function(e) { 	   
		   gbm.attachSticky(sticky_el, sticky_anchor, sticky_top);
	   }); 
	   // Resize
	   window.addEventListener('resize', function(e) { 
	      gbm.resizeSticky();
	   });
	   // Init
	   gbm.resizeSticky();
	   gbm.attachSticky(sticky_el, sticky_anchor, sticky_top);
	   
	} 
}

window.onload = function(){
	initSticky();
}
