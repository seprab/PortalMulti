function Animacion_Menu()
{
//http://wibblystuff.blogspot.com/2014/04/in-page-smooth-scroll-using-css3.html, crédito de la primera implementación con JQuery

    var target, scroll, current; //Declaraciones

    $("a[href*=#]:not([href=#])").on("click", function(e) {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            target = $(this.hash);
            target = target.length ? target : $("[id=" + this.hash.slice(1) + "]");

            if (target.length) {
                if (typeof document.body.style.transitionProperty === 'string') {
                    e.preventDefault();
                  
                    var avail = $(document).height() - $(window).height();

                    scroll = target.offset().top;
                  
                    if (scroll > avail) {
                        scroll = avail;
                    }
			
		$("html, body").animate({ //Estaba implementado en CSS3, cambiado a JQuery para evitar errores.
                        scrollTop: scroll
                    }, 750, function(){
				current = scroll;
			});
	
                } else {
                    $("html, body").animate({
                        scrollTop: scroll
                    }, 750, function(){
				current = scroll;
			});
                    return;
                }
            }
        }
    });



    $("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function (e) {
        if (e.target == e.currentTarget && $(this).data("transitioning") === true) {
            $(this).removeAttr("style").data("transitioning", false);
            $("html, body").scrollTop(scroll);
            return;
        }
    });
	
}





function remover_comportamiento_normal() //Para que las flechas no hagan ningun scroll que produzca Tearing.
{
	window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

}

function detectar_teclas()
{
	var ubicaciones = [$("#pagina1").offset().top, $("#pagina2").offset().top, $("#pagina3").offset().top, $("#pagina4").offset().top];
	$(window).keydown(function(event){
		if(event.keyCode == 38)
		{
			mover_arriba(ubicaciones);	
		}
		else
		{
			if (event.keyCode == 40)
			{
				mover_abajo(ubicaciones);	
			}
		}
	});	
}

function deteccion_scroll()
{
	var ubicaciones = [$("#pagina1").offset().top, $("#pagina2").offset().top, $("#pagina3").offset().top, $("#pagina4").offset().top];

	$(window).bind('mousewheel DOMMouseScroll', function(event){
	    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
	        mover_arriba(ubicaciones);
	    }
	    else {
	        // scroll down
		mover_abajo(ubicaciones);
	    }
	});
}

function mover_abajo(ubicaciones)
{
	for (var i=0; i<4; i++)
	{
		if ($(window).scrollTop() >= ubicaciones[i]-9 && $(window).scrollTop() < ubicaciones[i+1])
		{
			mover_pagina(ubicaciones[i+1]);
			break;
		}
	}
}

function mover_arriba(ubicaciones)
{
	for (var i=0; i<4; i++)
	{
		if ($(window).scrollTop() > ubicaciones[i]-9 && $(window).scrollTop() <= ubicaciones[i+1])
		{
			mover_pagina(ubicaciones[i]);
			break;
		}
	}
}

function mover_pagina(scroll)
{
	$("html, body").animate({ //Estaba implementado en CSS3, cambiado a JQuery para evitar errores.
                        scrollTop: scroll
                    }, 750, function(){
				current = scroll;
			});
}




$(document).ready(function(){

	remover_comportamiento_normal();
	Animacion_Menu();
	//deteccion_scroll();
	detectar_teclas();
	
});



