$(function(){
    // default variables
    var tail = $('.tail'),
      filters = $('.ex-filter').children(),
      filter = $('.filter-button'),
      all = $('.all'),
      currentFilter = '';

    if (location.hash && location.hash.length) {
        currentFilter = decodeURIComponent(location.hash.substr(1));
    }

    var $grid = $('.filter-cards-wrap');

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

    //
    // Code below here is implementing the nav menu for /brief
    //
    
    $('#hide-all').click(function(){
        $('#x-menu').toggle(500);
        $('#hide-all').hide();
        $('#show-all').show();
        $('#up-down').show(200);
    });

    $('#show-all').click(function(){
        $('#x-menu').toggle(500);
        $('#show-all').hide();
        $('#up-down').hide();
        $('#hide-all').show(200)
    });

    $('.basic-sticky').waypoint(function(direction) {
        $(this[0,'element']).addClass("stuck");
    });

    $('.subpage-content-section').waypoint(function(direction) {
      if (direction === 'down') {
        $('.basic-sticky').addClass('stuck');
      } else {
        $('.basic-sticky').removeClass('stuck');
      }
    },{offset:'10'});

    var sections = $('.panelSection');

    $('a.section-target').click(function(){
        $('html,body').animate({ 
            scrollTop: $('.panelSection#' + $(this).data('section')).offset().top - 10
        }, "slow")
    });

    sections.each(function () {
       new Waypoint.Inview({
          element: this,
          entered: function(direction) {
            $('#x-menu li').removeClass('active');
            $('#x-menu li a[data-section="' + this.element.id +'"]').parent().addClass('active');
            console.log(this.element.id + ' entered');
            var index = $( '.panelSection' ).index( $('#' + this.element.id) );
            var total = $( '.panelSection' ).length;
            if(index < total - 1) {
                var next = index + 1;
                var prev = index - 1;
                $('.next-section').attr('data-section', $('.panelSection').eq(next).attr('id'));
                $('.prev-section').attr('data-section', $('.panelSection').eq(prev).attr('id'));
                $('.prev-section').show();
                $('.next-section').show();
            } else if (index = 0) {
                $('.prev-section').hide();
            } else if(index > total - 1) {
                $('.next-section').hide();
            }

          }
       })
    })
});