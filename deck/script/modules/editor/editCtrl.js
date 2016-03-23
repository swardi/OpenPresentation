

(function(){ //IFFY

angular.module('myApp').controller('editCtrl', function ($scope,$rootScope,$routeParams,$compile,$http,saveData) { 

var title = $routeParams.title;

$scope.title = title;

//$rootScope.directions=
var pid;
var elements;
var check=undefined;
var select=false;




  
//  $('div[resizable]').click(function(){
   // $('.ui-resizable-handle').toggle();
    
 //   $(this).toggleClass('select');
    
     

 



$rootScope.sidebar = true;

/*$scope.resize = function(evt,ui) {
    
      //console.log (evt,ui);
     var w = ui.size.width;
     var h = ui.size.height;
      $scope.w = w;
      $scope.h = h;
      w=Math.sqrt(w*h)/2;
    
    /// $('document').ready(function(){
        $('.ui-resizable-resizing').css("font-size", w+"%");
      
     // });
    
    };*/
//CKEDITOR.replace( 'editor' );
//var editor = CKEDITOR.inline( 'editor' );

// This property tells CKEditor to not activate every element with contenteditable=true element.
// CKEDITOR.disableAutoInline = true;

// //var editor = CKEDITOR.inline( document.getElementById( 'editor' ) );
// CKEDITOR.inline( 'editor' );
// $compile($scope);
//CKEDITOR.editable(this);

Reveal.initialize({ controls:true, transition:'slide' });


// now start to save slide
var saveSlide = function(){
var title = 'new';
    elements = $( "div.reveal > div.slides" ).html();
var  userid   = $routeParams.uid;

   saveData.saveSlide(title,userid,elements).then(function(response){ pid=response.saveSlide; });
//elements = $( "div.reveal > div.slides" ).html();
};

var updateSlide = function(){

    elements = $( "div.reveal > div.slides" ).html();

var preid   = pid;
console.log(preid);
   saveData.updateSlide(preid,elements).then(function(res){ console.log(res); });
//elements = $( "div.reveal > div.slides" ).html();
};


$rootScope.addVertSlide = function(){



//alert(htmls);

hSlideNo = Reveal.getIndices().h;
vSlideNo = Reveal.getIndices().v;

//alert("H:"+hSlideNo+" v:"+vSlideNo);
if(vSlideNo==0){
	//alert(slideNo);
//vSlideNo+=1;// :nth-child("+hSlideNo+1+"

$(".slides > section.present").wrapAll('<section />');
var ele = $(".slides> section > section.present").after($compile("<section> <div  draggable contenteditable='true'> <h1>Now Added</h1> </div> </section>  ")($scope));

//ele.attr('ng-draggable');

//$(".slides > section:nth-child(1)").andSelf().siblings().wrapAll('<section />');
//var v = $(".slides > section:nth-of-type(1)").after("<section><h1>Now Added</h1></section>");
//		$(".slides > section:nth-of-type(1)").wrapAll('<section></section>');




}else{//.slides section > section.ng-scope.present
    //alert(vSlideNo);
    $(".slides> section > section.present").after($compile("<section> <div  draggable contenteditable='true'> <h1>Now Added</h1> </div> </section>  ")($scope));
//$(".slides > section:nth-of-type("+slideNo+")").after("<section><h1>Now Added</h1></section>");
}

Reveal.initialize({ controls:true, transition:'slide' });
Reveal.configure({  controls:true, transition:'slide' });
Reveal.down();
//alert(Reveal.getIndices().h);

};//.slides> section > section.present

$rootScope.keyHori=function(code){
console.log(code);
if(code==72){
    
     $rootScope.addHoriSlide();
}else if(code==86){
 
    $rootScope.addVertSlide();
}else if(code==83){
    saveSlide();

}else if(code==85){
    updateSlide();
}  
};

$rootScope.addHoriSlide = function(){//.slides section > section.ng-scope.present

///alert("working");body > div.reveal.center.slide > div.slides.ng-scope > section.ng-scope.present

slideNo = Reveal.getIndices().h;
slideNo+=1;

//$(".slides > section.present").after("<section><h1 ng-draggable >Now Added</h1></section>");
$(".slides > section.present").after($compile("<section> <div  draggable contenteditable='true'> <h1>Now Added</h1> </div> </section>  ")($scope));
Reveal.right();
//alert(Reveal.getIndices().h);

};

$scope.alerts = function(){
alert('ok');
};

$(document).ready(function(){
  
 $('div').click(function(evt){
   
var deSel = $(this).is('div[resizable]');


    if(deSel==false && select==true){

    deSelect();

     }else{
  
   if(select) deSelect();

    if(deSel==true && select==false){
   $(this).addClass('select');
   $('.select > span.n-handle').show();
     select=true;
   }


}

evt.stopImmediatePropagation();
  });
//$('').click(function(){deSelect();});
  

});

function deSelect(){
  $('.select > span.n-handle').hide();
  $('div[resizable]').removeClass('select');
      select=false;
  }

	 });




}());
