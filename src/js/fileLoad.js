
jm.modules.Loader = function() {
    var currentUrl = document.URL;
    var basicUrl = currentUrl.split("html")[0];

    var imageFiles; //images폴더 내에 있는 이미지들
    var imageListClassName = "photo_list";

    var init = function($this){
        $.ajax({
            type:'GET',
            crossOrigin:true,
            dataType: 'JSON',
            url: basicUrl + 'files.json',

            complete: function(data) {
                imageFiles = data.responseJSON.img;
                // makeElImage();
                // addEvent();

                // $this.trigger('finish');
                $this.trigger('dataLoadFinish', {"data": imageFiles});
            },

            error: function(data){

            }
        });
    }

    return {
        init: function(){
            console.log("loader init 실행");
            return init($(this));
        }
    };
};
