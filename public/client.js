$(function() {
  const getSources = function() {
    $.get( "/ajax/sources", { category: $('select').val() })
       .done( data => {
         $(".partial").html(data);
       })
       .fail(function() {
         console.log("error");
       });
  };

  $('button').on('click', getSources);
});
