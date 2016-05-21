angular.module('app').controller('ItemNewController', function () {
  var vm = this;
  new ss.SimpleUpload({
    button: 'picture_url', // Button id
    url: 'https://xcsoft.hfut.edu.cn/upload?app=queue',
    name: 'imgFile',
    responseType: 'json',
    allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'], encodeCustomHeaders: true,
    maxSize: 2048, // KB
    onComplete: function (filename, response) {
      if (!response.success) {
        alert(' 上传失败! ' + response.msg);
        return false;
      }
      alert(' 上传成功,URL:' + response.url);
    }
  });
});
