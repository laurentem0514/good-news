$(function() {
  const getSources = () => {
    $.get( '/sources/ajax', { category: $('select').val() })
       .done( data => {
         $('.sources').html(data);
         $('.source button').on('click', saveFavorite);
       })
       .fail(function() {
         console.log('error');
       });
  };

  const deleteFavorite = function(){
    const button = $(this);
    const id = button.data('id');
    const url = '/favorites/' + id;

    if(id) {
      $.ajax({
         url: url,
        type: 'DELETE',
        success: (result) => {
          button.parent().remove();
       }
      });
    }
  }

  const saveFavorite = function(){
    const button = $(this);
    const container = button.parent();
    const id = container.find('input[name=favorite\\[id\\]]').val();
    const name = container.find('input[name=favorite\\[name\\]]').val();
    const logo = container.find('input[name=favorite\\[logo\\]]').val();
    const userId = container.find('input[name=favorite\\[userId\\]]').val();

    if(id) {
      $.ajax({
         url: '/favorites',
         type: 'POST',
         data: {
          favorite: {
            name: name,
            logo: logo,
            id: id,
            userId: userId,
          },
         },
        success: (result) => {
          button.hide();
          container.find('.label').removeClass('hidden');
       }
      });
    }
  }

  const loadArticles = () => {
     $('.favorite').each((index, favorite) => {
        const url = $(favorite).find("input[name='articlesApiUrl']").val();

        $.getJSON(url, (json) => {

          if (json.articles){
            // get top 3 articles
            let articles = json.articles.splice(0,3);
            for (let i = 0; i < articles.length;i++){
              let article = articles[i];
              let div = $('<div class="article"></div>');
              div.append($('<h3>'+  article.title + '<h3>'));
              div.append($('<img src="'+  article.urlToImage + '" alt="'+  article.title + '">'))
              $(favorite).find('.articles').append(div);
            }

         }
        });
     });
  };



  $('#search').on('click', getSources);
  $('.delete').on('click', deleteFavorite);

  loadArticles();
});
