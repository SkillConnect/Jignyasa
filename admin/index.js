function ImageUploader(file, path, updateAt){
   var storageRef = firebase.storage().ref();
   var uploadTask = storageRef.child(path).put(file);
   console.log("Uploading Started...")
   // Listen for state changes, errors, and completion of the upload.
   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
     function() {},
     function(error) { alert("An Error Occured. Please try again later!"); },
     function() {
       // Success
       uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
         console.log('File available at', downloadURL);
         id = path.split("/").pop().split(".")[0];
         firebase.database().ref("/gallery/"+id).update({[updateAt] : downloadURL});
       });
     }
   );
}

https://firebasestorage.googleapis.com/v0/b/my-website-c50c2.appspot.com/o/Gallery_Thumbnails%2F1png?alt=media&token=d0dde97b-a212-4271-9a27-80f58e46d402

function uploadGallery(){
  console.log("Request Received");

  firebase.database().ref('/gallery' ).once('value').then(function(snapshot) {
      var gallery = snapshot.val();
      var newId = gallery["lastId"] + 1;

      var file = document.getElementById('galleryMain').files[0];
      var path = "Gallery/" + newId.toString(10) +"."+ file.name.split(".").pop();
      ImageUploader(file, path, "mainUrl");

      var file = document.getElementById('galleryThumb').files[0];
      var path = "Gallery_Thumbnails/" + newId.toString(10) +"."+ file.name.split(".").pop();
      ImageUploader(file, path, "thumbUrl");

      firebase.database().ref('/gallery/').update({ "lastId": newId});
  });
}


function IOTDUploader(file, path, updateAt){
   var storageRef = firebase.storage().ref();
   var uploadTask = storageRef.child(path).put(file);
   console.log("Uploading Started...")
   // Listen for state changes, errors, and completion of the upload.
   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
     function() {},
     function(error) { alert("An Error Occured. Please try again later!"); },
     function() {} // Success
   );
}

function uploadIOTD(){
  var file1 = document.getElementById('IOTDMain').files[0];
  IOTDUploader(file1, "IOTDMain.png");

  var file2 = document.getElementById('IOTDThumb').files[0];
  IOTDUploader(file2, "IOTDThumb.png");
}
