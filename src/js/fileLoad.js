/**
 * Created by Naver on 2016-05-25.
 */

var currentUrl = document.URL;
var basicUrl = currentUrl.split("html")[0];

var imageFiles; //images폴더 내에 있는 이미지들
var imageListClassName = "photo_list";

$.ajax({
    type:'GET',
    crossOrigin:true,
    url: basicUrl + 'files.json',

    complete:function(data) {
        imageFiles = data.responseJSON;
        makeElImage();
    },

    error:function(data){
}
});

var makeElImage = function(){
    var data =  {site: 'NetTuts'}, template =   'Welcome! You are at <%= site %>';

    var parsedTemplate = _.template(template,  data );

    console.log(names);
    console.log(imageFiles);
    debugger;
};
