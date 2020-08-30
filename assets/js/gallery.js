function loadGallery(pageNo){

  var a1 = '<div class="portfolio-wrap" data-src="';
  var a2 = '"><img src="';
  var a3 = '" class="img-fluid"><div class="portfolio-info"><i class="fa fa-search fa-3x"></i></div></div>';

  firebase.database().ref('/gallery' ).once('value').then(function(snapshot) {
      var gallery = snapshot.val();
      var lastId = gallery["lastId"];

      for(var id=1; id<21; id++){
          if(id>lastId){
            console.log("All images loaded");
            enableLightGallery();
            return
          }

          var div = document.createElement('div');
          div.classList.add("col-lg-3");
          div.classList.add("col-md-4");
          div.classList.add("portfolio-item");
          div.id = id;

          document.getElementById("gallery").appendChild(div);
          var abc = a1 + gallery[id]["mainUrl"] + a2 + gallery[id]["thumbUrl"] + a3;
          document.getElementById(div.id).innerHTML=abc;
      }
      console.log("All images loaded");
      enableLightGallery();
  });
}
