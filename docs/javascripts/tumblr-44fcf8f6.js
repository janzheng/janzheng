



// 
//  Get Tumblr
//    getTubmlr({offset: 10, limit: 20})
// 

// Get tumblr post
function getTumblr(opt, success) {

  // http://stackoverflow.com/questions/8264446/jquery-ajax-tumblr-api-v2
  var params = "";
  if(("offset" in opt) && ("limit" in opt)){params = "limit=" + opt.limit + "&offset=" + opt.offset;}

  $.ajax({
    type: 'GET',
    url: "http://api.tumblr.com/v2/blog/ja-nz.tumblr.com/posts?" + params + "&api_key=inC0HuM2X45UqdQ6RhPJvRXoWEYJiH4JEcrsVD281MSdZUoLao",
    contentType: "application/json",
    dataType: 'jsonp',
    success: success,
    error: function(e) {
      console.log('error: ' , e.message);
    }
  });
}






  // 
  // FILTER SYSTEM
  // 

  // dashes won't work w/ list.js, have to use camel
  // sorting for blog posts / uses List.js
  var options = {
      valueNames: [ 'tagCategory' ]
  };

  var tumblrList = {};

  function filterBy(cat) {
    // console.log('filter calling: ' + cat)
    try {
      tumblrList.filter(function(post) {
        // console.log('matching filter: ' + post.values().tagCategory)
        return post.values().tagCategory.includes(cat) ? true : false;
      }); 
    } catch(e) {
      // do nothing
    }
  }

  function filterReset() {
    tumblrList.filter();
    $('.sidebar').removeClass('tag-active');
    $(".tag-filter").removeClass('tag-filter--active');
  }

  var titleDefault = $(".page__title").text();
  // not MVC but whatever

  // initialize all the tag bindings when data is loaded
  function filterInit() {
    // console.log('Iniitializing Filters')
    tumblrList = new List('tumblrList', options);

    // if(window.location.hash.length > 0) {
    //   var hash = window.location.hash.substring(1);
    //   filterBy(hash);
    //   $(".tag-filter[data-tag='"+hash+"']").addClass('tag-filter--active');
    //   sticky.refresh();
    // }

    // remove filters
    $(".filter-clear").bind('mouseup',function(e) {
      window.location.hash = '';
      filterReset();
      $(".page__title").text(titleDefault);
      $(".tag-filter").removeClass('tag-filter--active');
      $('.sidebar').removeClass('tag-active');
    });

    // click a filter
    $(".tag-filter").bind('mouseup',function(e) {
      if ($(this).hasClass('tag-filter--active')) {
        // window.location.hash = '';
        filterReset();
        sticky.refresh();
        $(".page__title").text(titleDefault);
        $('.sidebar').removeClass('tag-active');
        $(".tag-filter").removeClass('tag-filter--active');
      } else {
        // window.location.hash = $(this).data('tag');
        $(".tag-filter").removeClass('tag-filter--active');
        console.log('filtering by: ' + $(this).html())
        filterBy($(this).html());
        sticky.refresh();
        $(this).addClass('tag-filter--active');
        $('.sidebar').addClass('tag-active');
        $(".page__title").text($(this).data('tag') + 's')
      }
    });

    // tumblrList.filter();
  }







  function populate(postList, container) {
    postList.forEach(function(post, i) {
      // console.log('post #'+i, post)
      var source = post.source_url ? post.source_url : '#';
      var excerpt = post.excerpt ? post.excerpt : '';

      function getDescription(str) {
        return  ( `<div class="_tumblr-description-container">
                    <div class="_tumblr-description">${str}</div>
                   </div>`
                )
      }
      var description = post.description ? getDescription(post.description) : '';

              
      var tags = post.tags ? post.tags.map( function( tag ) {
                __tags.push(tag); 
                return (
                  " <span class='_tumblr-tag'>" + tag + "</span>"
                )}) : '';

      // var publisher = post.publisher ? `<div class="_tumblr-publisher"><span class="_tumblr-date">${moment(post.date).format('L')}</span> | ${post.publisher}</div>` : '';
      var publisher = post.publisher ? `${post.publisher}` : '';
      var date = post.date ? `<div class="_tumblr-date"><span class="_tumblr-date">${moment(post.date, "YYYY-MM-DD").format('L')}</span></div>` : '';
      var title = post.title ? `<div class="_tumblr-title">${i}. ${post.title}</div>` : '';
          if (title == '' && post.text) title = "“" + post.text + "”"; // quotes won't have title
          if (title == '' && post.caption) description = getDescription(post.caption); // caption display
          if (title == '' && description == '' && post.summary) description = getDescription(post.summary); // fallback – not formatted but almost always visible; can be long, so coerced into the description area


      var photos = post.photos ?  (
                                    '<div class="_tumblr-photos">' +
                                    post.photos.map( function( photo ) {
                                              if (photo.alt_sizes.length > 0) {
                                                return (
                                                  // returns a reasonably middle-sized image for thumb
                                                  `<div class='_tumblr-photo'><img src='${photo.alt_sizes[Math.floor(photo.alt_sizes.length/2)].url}'/></div>`
                                                )
                                              } else {
                                                return (
                                                  `<div class='_tumblr-photo'><img src='${photo.original_size.url}'/></div>`
                                                )
                                              }

                                    })
                                    + '</div>'
                                  )

                    : '';
      if(post.type == 'video') {
        photos = `<div class="_tumblr-photos">${post.player[post.player.length-1].embed_code}</div>`
      }

      // console.log(description);

      container.append(`
        <div class="tagCategory _tumblr-item --full --${post.type} " target="_blank">
          <a href="${source}" class="_tumblr-info">
            <div class="_tumblr-front">
              <div class="_tumblr-publisher">${publisher}</div>
              ${date}
            </div>
            ${title}
            ${photos}
            <div class="_tumblr-source-description">
              <div class="_tumblr-excerpt">${excerpt}</div>
            </div>
          </a>
          <div class="_tumblr-description">
            ${description}
          </div>
          <div class="_tumblr-tags">
            <div class="_tumblr-tags-list">${tags}</div>
          </div>
        </div>
      `)
    // NOTES

    // Summary seems like the title repeated...? Excluding
    // <div class="post-summary">${post.summary}</div>

    //   $("#blog-more").append("<li><a href='"+ el.post_url +"'>"+ el.title +"</li>");
    });

  }

  function populateTags() {

    // rebuild all tags on every reload, since we might have duplicates, etc.
    // sort tags
    __tags = _.sortBy(__tags, function (i) { return i.toLowerCase(); });

    // dedup and sort tags
    __tags = _.uniq(__tags, true); 

    // load next # posts and append to posts object
    // console.log(__tags)

    var container = $('.tag__list');
    container.html(`<li class="filter-clear">clear</li>`);

    __tags.forEach(function(tag, i) {
      container.append(`<li><span class="tag-filter" data-tag="${tag}">#${tag}</span></li>`)
    });

    // re-initialize sort for all the new contents
    sticky.refresh() // refresh the sidebar since content's changed
    
  }




// simpler population script

  function populateShort(postList, container) {
    postList.forEach(function(post, i) {
      var source = post.source_url ? post.source_url : '#';
      var excerpt = post.excerpt ? `: <div class="_tumblr-excerpt _inline">${post.excerpt}</div>` : '';

      function getDescription(str) {
        return  ( `<div class="_tumblr-description-container">
                    ${str}
                   </div>`
                )
      }
      var description = post.description ? `<div class="_tumblr-description">${getDescription(post.description)}</div>` : '';

          
              
      var tags = post.tags ? post.tags.map( function( tag ) {
                __tags.push(tag); 
                return (
                  " <span class='_tumblr-tag'>" + tag + "</span>"
                )}) : '';
      // var publisher = post.publisher ? `<div class="_tumblr-publisher"><span class="_tumblr-date">${moment(post.date).format('L')}</span> | ${post.publisher}</div>` : '';
      var publisher = post.publisher ? `<div class="_tumblr-publisher">${post.publisher}</div>` : '';
      var date = post.date ? `<div class="_tumblr-date"><span class="_tumblr-date">${moment(post.date, "YYYY-MM-DD").format('L')}</span></div>` : '';
      var title = post.title ? `<div class="_tumblr-title _inline">${post.title}</div>` : '';
          if (title == '' && post.text) title = "“" + post.text + "”"; // quotes won't have title
          // if (title == '' && post.caption) description = getDescription(post.caption); // caption display
          if (title == '' && description == '' && post.summary) description = getDescription(post.summary); // fallback – not formatted but almost always visible; can be long, so coerced into the description area


      var photos = post.photos ?  (
                                    '<div class="_tumblr-photos">' +
                                    post.photos.map( function( photo ) {
                                              if (photo.alt_sizes.length > 0) {
                                                return (
                                                  `<div class='_tumblr-photo'><img src='${photo.alt_sizes[1].url}'/></div>`
                                                )
                                              } else {
                                                return (
                                                  `<div class='_tumblr-photo'><img src='${photo.original_size.url}'/></div>`
                                                )
                                              }

                                    })
                                    + '</div>'
                                  )

                    : '';
      if(post.type == 'video') {
        photos = `<div class="_tumblr-photos">${post.player[post.player.length-1].embed_code}</div>`
      }

      container.append(`
        <a class="tagCategory _tumblr-item --${post.type} " href="${source}" target="_blank">
          <div class="_tumblr-info">
            ${title}${excerpt}
          </div>
          ${description}
        </a>
      `)
    // NOTES

    // Summary seems like the title repeated...? Excluding
    // <div class="post-summary">${post.summary}</div>

    //   $("#blog-more").append("<li><a href='"+ el.post_url +"'>"+ el.title +"</li>");
    });

  }
