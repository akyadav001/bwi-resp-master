$(document).ready(function() {
           $('.media-player').click(function() {
             video = $('.media-video');
             if(video.get(0).paused) {
             $(this).removeClass('-overlay');
             video.get(0).play();
             video.prop('controls', true);
             }
             else {
             $(this).addClass('-overlay');  
             video.get(0).pause();
             video.prop('controls', false);
             }           
           });
        });