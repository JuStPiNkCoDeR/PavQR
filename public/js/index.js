jQuery(document).ready(function(){
    $('#infoSign li').click(function () {
        const el= this;
        $(el).addClass('clicked');
        $(this).mouseleave(function () {
            $(el).removeClass('clicked');
        })
    });

    $('h1').click(function () {
        let aj = new XMLHttpRequest();
        aj.open('POST', '/mail', true);
        aj.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        aj.setRequestHeader("Content-type", "application/json; charset=utf-8");
        aj.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            let ans = JSON.parse(this.responseText);
            console.log(ans);
        };
        let data = {
            email: "sasha.los.0148@gmail.com"
        };
        aj.send(JSON.stringify(data));
    })
});