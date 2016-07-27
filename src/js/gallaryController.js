jm.modules.GallaryController = function() {
	var loader;
	var gallaryObj;

	function init(){
		loader = jm.modules.Loader();
		gallaryObj = jm.modules.Gallary();

		loader.init();

		$(loader).on('dataLoadFinish', function(e, receivedData){
			gallaryObj.init({
	            imgWidth: $('#imgWidth').val(),
	            imgContainer: '.photo_area',
	            imgArea: '.image_area',
	            imgData: receivedData.data
	        });
		});
	}

	return {
		init: function(){
			return init();
		}
	}
};