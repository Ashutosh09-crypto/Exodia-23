$('.logo').click(function () {
    $('.slider').toggle();
})

$('.menu-link__inner').click(function () {
    let id = $(this).attr('id');

    let div_id = "#" + id + "_heads";

    $('.vis').toggleClass('hidden');
    $('.vis').toggleClass('vis');

    console.log("New div " + div_id);

    $(div_id).toggleClass('hidden');
    $(div_id).addClass('vis')

})