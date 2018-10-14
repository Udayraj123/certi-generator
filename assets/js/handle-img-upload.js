window.URL    = window.URL || window.webkitURL;
var elBrowse  = document.getElementById("browse"),
elPreview = document.getElementById("field"),
    useBlob   = false && window.URL; // Set to `true` to use Blob instead of Data-URL

// 2.
function readImage (file) {

  // Create a new FileReader instance
  // https://developer.mozilla.org/en/docs/Web/API/FileReader
  var reader = new FileReader();

  // Once a file is successfully readed:
  reader.addEventListener("load", function () {

    // At this point `reader.result` contains already the Base64 Data-URL
    // and we've could immediately show an bg_image using
    // `elPreview.insertAdjacentHTML("beforeend", "<img src='"+ reader.result +"'>");`
    // But we want to get that bg_image's width and height px values!
    // Since the File Object does not hold the size of an bg_image
    // we need to create a new bg_image and assign it's src, so when
    // the bg_image is loaded we can calculate it's width and height:
    var bg_image  = new Image();
    bg_image.addEventListener("load", function () {

      // Concatenate our HTML bg_image info 
      var imageInfo = file.name    +' '+ // get the value of `name` from the `file` Obj
          bg_image.width  +'×'+ // But get the width from our `bg_image`
          bg_image.height +' '+
          file.type    +' '+
          Math.round(file.size/1024) +'KB';
          console.log(imageInfo);
      //width distorts portrait mode certis
      
      // bg_image.width=globalScreenWidth;
      bg_image.height=globalScreenHeight;
      // dummy.width=globalScreenWidth;
      dummy.height=globalScreenHeight;
      // Finally append our created bg_image and the HTML info string to our `#preview` 
      // elPreview.style.width = bg_image.width+"px"; 
      // elPreview.style.height = bg_image.height+"px"; 
      // elPreview.appendChild( this );
      // elPreview.insertAdjacentHTML("beforeend", imageInfo +'<br>');

      // If we set the variable `useBlob` to true:
      // (Data-URLs can end up being really large
      // `src="data:bg_image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAA...........etc`
      // Blobs are usually faster and the bg_image src will hold a shorter blob name
      // src="blob:http%3A//example.com/2a303acf-c34c-4d0a-85d4-2136eef7d723"
      if (useBlob) {
        // Free some memory for optimal performance
        window.URL.revokeObjectURL(bg_image.src);
      }
    });

    // for file dimensions
    bg_image.src = useBlob ? window.URL.createObjectURL(file) : reader.result;
    // for actual visuals
    dummy.src = useBlob ? window.URL.createObjectURL(file) : reader.result;

  });

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  reader.readAsDataURL(file);  
}

// 1.
// Once the user selects all the files to upload
// that will trigger a `change` event on the `#browse` input
elBrowse.addEventListener("change", function() {

  // Let's store the FileList Array into a variable:
  // https://developer.mozilla.org/en-US/docs/Web/API/FileList
  var files  = this.files;
  // Let's create an empty `errors` String to collect eventual errors into:
  var errors = "";

  if (!files) {
    errors += "File upload not supported by your browser.";
  }

  // Check for `files` (FileList) support and if contains at least one file:
  if (files && files[0]) {

    // Iterate over every File object in the FileList array
    for(var i=0; i<files.length; i++) {

      // Let's refer to the current File as a `file` variable
      // https://developer.mozilla.org/en-US/docs/Web/API/File
      var file = files[i];

      // Test the `file.name` for a valid bg_image extension:
      // (pipe `|` delimit more bg_image extensions)
      // The regex can also be expressed like: /\.(png|jpe?g|gif)$/i
      if ( (/\.(png|jpeg|jpg|gif)$/i).test(file.name) ) {
        // SUCCESS! It's an bg_image!
        // Send our bg_image `file` to our `readImage` function!
        readImage( file ); 
      } else {
        errors += file.name +" Unsupported Image extension\n";  
      }
    }
  }

  // Notify the user for any errors (i.e: try uploading a .txt file)
  if (errors) {
    alert(errors); 
  }

});