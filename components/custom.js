
  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = function(e) {
      // alert(e.target.result);
        document.getElementById('signupImg').src = e.target.result;
        return;
      }

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
var el = document.getElementById('accountPic');
if(el){
  el.addEventListener('change', handleFileSelect, false);
}
 // document.getElementById('accountPic').addEventListener('change', handleFileSelect, false);