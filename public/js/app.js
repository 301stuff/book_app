'use strict';

$('.viewDetailsButton').on('click', function(){
  $(this).next().slideToggle({
    duration: 500,
  });
  
});
