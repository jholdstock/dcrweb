$(function(){
    // default variables
    var tail = $('.tail'),
      filterCard = $('.filter-card'),
      filters = $('.ex-filter').children(),
      filter = $('.filter-button'),
      all = $('.all'),
      currentFilter = '';

    if (location.hash && location.hash.length) {
        currentFilter = decodeURIComponent(location.hash.substr(1));
    }

    var $grid = $('.filter-cards-wrap');

    // Sort the exchange list alphabetically.
    // TODO: Do this sorting server-side rather than using JS - use contributor
    // list sorting as reference.
    $grid.shuffle({
        itemSelector: '.filter-card',
        initialSort: {
            by: function($el) {
                return $el.find('.filter-card-title').text().toLowerCase();
            }
        }
    });

    // The tooltip for exchange category buttons
    filter.not(all).on('mouseenter', function() {
        var that = $(this);

        tail.text(that.data('tail'));
        that.mousemove(function(e) {
            tail.css({'left': e.pageX-(tail.width()/2), 'top': e.pageY+20});
        });
        tail.addClass('active');

        if(filters.is(that)) {
            that.addClass('is-hover');
        }

    }).on('mouseleave', function() {
        tail.removeClass('active');
        $(this).removeClass('is-hover');
    });

    function setCurrentFilter(group){
        filters.removeClass('is-checked is-hover');
        filters.siblings('[data-group="'+group+'"]').addClass('is-checked');

        $grid.shuffle('shuffle', group);
        window.location.hash = group;
    }

    // header filter buttons 
    filters.on('click', function() {
        var group = $(this).attr('data-group');
        setCurrentFilter(group);
    });

    if(currentFilter) {
        setCurrentFilter(currentFilter);
    }

    // shuffle js .filter-card hover fix
    // TODO: This should be trivial to implement in css rather than js.
    $grid.on('layout.shuffle', function() {
        setTimeout(function() {  
            filterCard.each(function() {
                var style = $(this).attr('style');
                $(this).attr('style', style+' -webkit-transition: all 200ms ease !important; transition: all 200ms ease !important;');
            });
        }, 50);
    });
    filterCard.on('mouseenter', function() {
        $(this).css('margin-top', '-5px');       
    }).on('mouseleave', function() {
        $(this).css('margin-top', '0px');
    });

});