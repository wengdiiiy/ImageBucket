// 1. 네임스페이스를 설정하고 모듈을 정의
var jm = {}; // 전역 객체
jm.modules = {};

/*
 2. 공개범위(특권메소드 등..)와 비공개 유효범위를 만든다
 ==> 즉시 실행함수로 모듈이 될 객체를 반환하고 
 모듈 사용자에게 제공할 공개 인터페이스가 담기게 된다.
 */
jm.modules.Gallary = function() {

    // 비공개 프로퍼티
    // var 선언 및 비공개 메소드등의 유효범위 (private 멤버)
    var options;
    var images;

	var defaultOptions = {
		imgWidth: 100,
		imgContainer: 'ul',
		imgArea: 'a'
	};

	function init(htOptions){
		options = htOptions || defaultOptions;
		attachEvents();
		arrange();
	};


	function attachEvents(){
		$(document).on('change', $('#imgWidth'), changeWidth);
	};

	function changeWidth(e){
		options.imgWidth = e.data.val();
		update();
	}


	function arrange(){
		var welContainer = $(options.imgContainer);
		images = welContainer.find(options.imgArea);
		update();
	};


	function update(){
		$.each(images, function( index, value ) {
			$(value).css('width', options.imgWidth);
		});
	}

    // 공개 API  (public, previlege 멤버)
    return {
		init: function(htOptions){
			return init(htOptions);
		}
    };
}();