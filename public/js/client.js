$(function() {
  const getSources = () => {
    $.get( '/ajax/sources', { category: $('select').val() })
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

    if(id) {
      $.ajax({
         url: '/favorites',
         type: 'POST',
         data: {
          favorite: {
            name: name,
            logo: logo,
            id: id,
          },
         },
        success: (result) => {
          button.hide();
          container.find('.label').removeClass('hidden');
       }
      });
    }
  }



  $('#search').on('click', getSources);
  $('.delete').on('click', deleteFavorite);
});
