
jm.modules.Gallary = function() {

    // 비공개 프로퍼티
    // var 선언 및 비공개 메소드등의 유효범위 (private 멤버)
    var options;
    var images;
    var currentImages; //이미지 엘리먼트 배열들
    var bucketList;
    var bucketFactoryObj;
    var userImageData;
    var temp = $("<div class='temp'>");

	function init(htOptions){
		options = htOptions;
		userImageData = options.imgData;

		attachEvents();
		update();

		//버킷 생성
		bucketFactoryObj = jm.modules.BucketFactory();
		getImagesInfo();
		arrange();
	};

	function attachEvents(){
		$(document).on('change', $('#imgWidth'), changeWidth);
	};

	function changeWidth(e){
		options.imgWidth = e.data.val();
		update();
	}


	function update(){
		var welContainer = $(options.imgContainer);
		images = welContainer.find(options.imgArea);

		$.each(images, function( index, value ) {
			$(value).css('width', options.imgWidth);
		});
	}


	function getImagesInfo(){
		// currentImages = $(options.imgArea);
		currentImages = temp;

	}

	function arrange(){
		var boxWidth = $(options.imgContainer).width();
		var boxHeight = $(options.imgContainer).height();

		var bucketCount = boxWidth / options.imgWidth;
		var bucketMax = boxHeight;

		//버킷팩토리 만든다
		bucketFactoryObj.setBucketCount(bucketCount);
		bucketList = bucketFactoryObj.getBucketList();

		console.log("너비 " + boxWidth);
		console.log("높이 " + boxHeight);
		console.log("이미지 너비 " + options.imgWidth);
		console.log("버킷 개수 " +  bucketCount);
		console.log(bucketList);

		//버킷에 넣는다
		//버킷팩토리에 들어갈 자리를 찾고 추가
		$.each(userImageData, function(index, img){
			bucketFactoryObj.findBucket(img);
		});

		$.each(bucketList, function(index, img){
			console.log(bucketList[index].getImages());
		});

		addDom();
	}


	function addDom(){
		var count = bucketFactoryObj.getBucketCount();

		var photoArea = $('.photo_area');

		for(var i = 1; i < count + 1; i++){
			var column = $('<div>').addClass('column').attr('id', '_column'+i);
			photoArea.append(column); 
		}
		makeElement()
	}

	function makeElement(){
        $.each(userImageData, function( index, value ) {
            var photoWrapper = $("<div>").attr("class", "image_area");
            var photoLinkArea = $("<a>").attr("href", "#").attr("class","thumb");
            
            $("<img>").attr("src", '../images/' + value).appendTo(photoLinkArea);
            photoLinkArea.appendTo(photoWrapper);
            $(temp).append(photoLinkArea);
        });
        debugger;
        //addEvent();
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
		bucketCount = count;
		bucketList.length = count;

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
	var max = 200;
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

		getMax: function(){
			return max;
		},

		getImages: function(){
			return imageArray;
		}
	}

};