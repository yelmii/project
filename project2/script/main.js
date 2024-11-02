$(function () {
    /* tab*/
    var topDiv = $('.menu-container'),
        anchors = topDiv.find('.tab-menu-wrap ul.tabs a'),
        panelUls = topDiv.find('.slide-view ul.slide-wrap'),
        lastAnchor, lastPanel;

    panelUls.hide();
    lastAnchor = anchors.filter('on');
    lastPanel = $(lastAnchor.attr('href'));
    lastPanel.show();
    anchors.click(function (e) {
        e.preventDefault();
        var currentAnchor = $(this);
        var currentPanel = $(currentAnchor.attr('href'));
        lastAnchor.removeClass('on');
        currentAnchor.addClass('on');
        lastPanel.hide();
        currentPanel.show();
        lastAnchor = currentAnchor;
        lastPanel = currentPanel;
    })



    /* lnb_menu */
    var dep1 = $('ul.dep1 li');
    var header = $('#header');
    var headerHeight = header.outerHeight();
    var dep2Height = 0;
    var dep2 = dep1.find('ul');

    dep2.each(function () {
        $(this).outerHeight()
        if ($(this).outerHeight() > dep2Height) {
            dep2Height = $(this).outerHeight()
        }
    });
    var totalHeight = dep2Height + headerHeight;
    dep1.mouseenter(function () {
        header.stop().animate({
            height: totalHeight + 'px'
        }, 300)
    })
    dep1.mouseleave(function () {
        header.stop().animate({
            height: headerHeight + 'px'
        })
    });

    /* banner */
    var visual = $('.slide>ul.slideUl>li');
    var current = 0;
    var setIntervalId;
    var button = $('.buttonList>li');

    function timer() {
        setIntervalId = setInterval(function () {
            var prev = visual.eq(current);
            var prevBtn = button.eq(current);
            move(prev, 0, '-100%');
            prevBtn.removeClass('on');
            current++;
            if (current == visual.length) {
                current = 0
            };
            var next = visual.eq(current);
            var nextBtn = button.eq(current);
            move(next, '100%', 0);
            nextBtn.addClass('on');
        }, 3000);
    };
    timer();

    function move(target, start, end) {
        target.css('left', start).stop().animate({
            left: end
        }, 500)
    };

    button.click(function () {
        var tg = $(this);
        var i = tg.index();
        button.removeClass('on');
        tg.addClass('on');
        move1(i);
    });

    function move1(i) {
        if (current == i) return;
        var currentEl = visual.eq(current);
        var nextEl = visual.eq(i);
        currentEl.css('left', 0).stop().animate({
            left: '-100%'
        }, 500);
        nextEl.css('left', '100%').stop().animate({
            left: '0%'
        }, 500);
        current = i;
    };
    $('.banner_wrap').on({
        mouseover: function () {
            clearInterval(setIntervalId)
        },
        mouseout: function () {
            timer();
        }
    });
});