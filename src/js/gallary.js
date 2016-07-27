
jm.modules.Gallary = function() {

    // 비공개 프로퍼티
    // var 선언 및 비공개 메소드등의 유효범위 (private 멤버)
    var options;
    var images;
    var currentImages; //이미지 엘리먼트 배열들
    var bucketList;
    var bucketFactoryObj;
    var userImageData;
    var elTemp = $("<div class='temp'>");
	var elUserImageData;

	var welContainer;

	function init(htOptions){
		options = htOptions;
		userImageData = options.imgData;
		welContainer = $(options.imgContainer);

		welContainer.css('display', 'none');

		attachEvents();
		viewUpdate();
	}

	//이미지 너비 인풋창 이벤트
	function attachEvents(){
		$(document).on('change', $('#imgWidth'), changeWidth);
	}

	function changeWidth(e){
		options.imgWidth = e.data.val();
		update();
	}

	function update(){
		images = welContainer.find('.column');

		$.each(images, function( index, value ) {
			$(value).css('width', options.imgWidth);
		});


		$(options.imgContainer).css('width', $(window).width());
		$(options.imgContainer).css('height', $(window).height());

		viewUpdate();
	}

	function viewUpdate(){
		welContainer.children().remove();
		elTemp.children().remove();

		makeTempElement(); //temp에 데이터 넣기
		elUserImageData = elTemp.children();

		//버킷 생성
		bucketFactoryObj = jm.modules.BucketFactory();
		arrange();
	}

	function arrange(){
		var boxWidth = $(options.imgContainer).width();

		var bucketCount = boxWidth / options.imgWidth;

		//버킷팩토리 만든다
		bucketFactoryObj.setBucketCount(bucketCount);
		bucketList = bucketFactoryObj.getBucketList();

		//버킷에 넣는다
		//버킷팩토리에 들어갈 자리를 찾고 추가
		$.each(elUserImageData, function(index, img){
			bucketFactoryObj.findBucket(img);
		});

		addDom(bucketList);
	}


	function addDom() {
		var bucketList = bucketFactoryObj.getBucketList();

		var photoArea = $('.photo_area');

		$.each(bucketList, function(index, bucket){
			var column = $('<div>').addClass('column').css('width', options.imgWidth).attr('id', '_column' + (index + 1));

			var imagesInBucket = bucket.getImages();

			for(var i = 0; i < imagesInBucket.length; i++){
				var photoWrapper = $("<div>").attr("class", "image_area");
				var photoLinkArea = $("<a>").attr("href", "#").attr("class","thumb");

				$(imagesInBucket[i]).appendTo(photoLinkArea);
				photoLinkArea.appendTo(photoWrapper);

				column.append(photoLinkArea);
			}

			photoArea.append(column);
		});

		welContainer.css('display', 'block');
	}

	function makeTempElement(){
        $.each(userImageData, function( index, value ) {
			var welImageDump = $("<img>").attr("src", '../images/' + value).css('width', options.imgWidth);
			welImageDump.appendTo(elTemp);
        });
		$('body').append(elTemp);
    }


    function addEvent(){
        $('.'+imageListClassName).on('click', 'li', function(e){
            e.preventDefault();
            $(this).addClass('big');
            $('.show_area').toggle();
        });
    }

	Array.prototype.insert = function (index, item) {
		this.splice(index, 0, item);
	};

    // 공개 API  (public, previlege 멤버)
    return {
		init: function(htOptions){
			return init(htOptions);
		}
    };
};


jm.modules.BucketFactory = function(){
	var bucketList = $.makeArray();
	var bucketCount = 0;

	function findBucket(element){
		var nElementHeight = $(element).height();
		$.each(bucketList, function(index,value){
			if(value.canAddImage(nElementHeight)){
				value.addImage(element, nElementHeight);
				return false;
			}
		});
	}

	function getBucketList(){
		return bucketList;
	}

	function getBucketCount(){
		return bucketCount;
	}

	function setBucketCount(count){
		bucketCount = parseInt(count);
		bucketList.length = bucketCount;

		$.each(bucketList, function( index, value ) {
			var bucket = jm.modules.Bucket();
			bucketList[index] = bucket;
		});
	}

	return {
		init: function(){
			console.log("버킷 팩토리 init 실행");
			return init();
		},

		getBucketList: function(){
			return getBucketList();
		},

		getBucketCount: function(){
			return getBucketCount();
		},

		setBucketCount: function(count){
			return setBucketCount(count);
		},

		findBucket: function(element){
			return findBucket(element);
		}
	};
};

jm.modules.Bucket = function(){
	var max = 1000;
	var remain = max;
	var imageArray = $.makeArray();

	function canAddImage(height){
		return remain >= height;
	}

	function addImage(element, height){
		imageArray.push(element);
		remain = remain - height;
		console.log("버킷에 넣음" + element + "," + height);
		console.log("남았음: " + remain);
	}

	return {
		init: function(){
			return init();
		},

		canAddImage: function(height){
			return canAddImage(height);
		},

		addImage: function(element, height){
			return addImage(element, height);
		},

		getImages: function(){
			return imageArray;
		}
	}

};