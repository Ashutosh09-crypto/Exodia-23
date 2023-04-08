
$.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window)
        .scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window)
        .scrollLeft()) + "px");
    return this;
}

$(".gif").click(function () {
    $("#pokemon").fadeIn().center();
    setTimeout(function () {
        $("#pokemon").fadeOut()
    }, 1000);
})

$(".card").click(function(){
    // console.log("hii");
    let id = $(this).attr('id');
    // console.log($(this));
    // console.log(id);
    let slider = "#slider_" + id;
    // console.log(slider);
    $(slider).prop('checked', true);

    $('.map-wrapper').hide();
    $("#pokemon").fadeIn().center();
    setTimeout(function () {
        $("#pokemon").fadeOut()
    }, 1000);
});


jQuery.fn.single_double_click = function (single_click_callback, double_click_callback, timeout) {
    return this.each(function () {
        var clicks = 0, self = this;
        jQuery(this).click(function (event) {
            clicks++;
            if (clicks == 1) {
                setTimeout(function () {
                    if (clicks == 1) {
                        single_click_callback.call(self, event);
                    } else {
                        double_click_callback.call(self, event);
                    }
                    clicks = 0;
                }, timeout || 300);
            }
        });
    });
}

//  code to put hover effect on marker

// function checkPosition() {
//     if (window.matchMedia('(max-width: 1000px)').matches) {

//         $(".map-mark").single_double_click(function () {
//             $('.small-description').show();
//             $('.small-description').text($(this).text());


//             $('.small-description').css({ "top": $(this).position().top + 40 + "px", "left": $(this).position().left + "px" });

//             let des_width = $('.small-description').width();
//             let right_point = $('.small-description').position().left + des_width;

//             let img_right = img_left + img_width;

//             if (img_right < right_point) {
//                 $('.small-description').css('left', 'initial');
//                 $('.small-description').css("right", 0);

//             }
//             // $('.small-description').toggle();
//         }, function () {
//             let id = $(this).attr('id');

//             let slider = "#slider_" + id;
//             console.log(slider);
//             $(slider).prop('checked', true);


//             $('.map-wrapper').hide();
//             $("#pokemon").fadeIn().center();
//             setTimeout(function () {
//                 $("#pokemon").fadeOut()
//             }, 1000);
//         })

//     } else {
//         $(".map-mark").hover(function () {
//             $('.small-description').text($(this).text());
//             $('.small-description').css({ "top": $(this).position().top + 20 + "px", "left": $(this).position().left + 20 + "px" })
//             $('.small-description').toggle();
//         }, function () {
//             $('.small-description').toggle();
//         });




//     }
// }

// checkPosition();

$('#map-btn').click(function () {
    $('.map-wrapper').toggle();
})


// positioning of slidei using js
function positionSlides() {
    let slides = $('.slider');
    let i = 0;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.left = `${i * 100}%`;
    }
}

function boxonhover(){
    $('.grid-list').hover(function () {
        
        let map_marks = this.children;
       // 
        for(let i = 0;i<map_marks.length;i++)
        {
            let span_block = map_marks[i];
            let childs = span_block.children;
            let icon_child = childs[1];
           // 
            icon_child.style.color="red";
            // icon_child.setAttribute('style', 'font-size:30px !important');
            icon_child.style.setProperty('font-size', '30px', 'important');

        }
        
    }, function () {
      
        let map_marks = this.children;
        
        // console.log(map_marks);
        for(let i = 0;i<map_marks.length;i++)
        {
            let span_block = map_marks[i];
            let childs = span_block.children;
            let icon_child = childs[1];
           
            // console.log(icon_child);
            icon_child.style.color="white";
            icon_child.style.setProperty('font-size', '12px', 'important');

        }
    })
}

// boxonhover();
positionSlides();
// slidingEffect();
