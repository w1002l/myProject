

var bannerImg=getByClass(document, 'banner-img')[0];
var aImg=bannerImg.getElementsByTagName('img');  //图片列表
var bannerPoint=getByClass(document,'banner-point')[0];
var aPoint=bannerPoint.getElementsByTagName('span');  //按钮列表
var prev=getByClass(document,'Prev')[0];   //前一张
var next=getByClass(document,'Next')[0];   //后一张
var index=0;

var clearActive=function()
 {
  for(var i=0; i<aImg.length; i++)
  {
   aImg[i].className='';
  }
  for(var i=0; i<aPoint.length; i++)
  {
   aPoint[i].className='';

  }
 };

 next.onclick=function () {
  clearActive();
  if(index<aImg.length-1)
  {
    index++;
  }else{
   index=0;
  }
  aImg[index].className='active';
  aPoint[index].className='active';
 };
 prev.onclick=function () {
  clearActive();
  if(index==0)
  {
   index=aImg.length-1;
  }else{
   index--;
  }
  aImg[index].className='active';
  aPoint[index].className='active';
 };

 for(var i=0; i<aPoint.length; i++)
 {
  aPoint[i].onclick=function ()
  {
   var myPoint=this.getAttribute('data-index');
   clearActive();
   index=myPoint;
   aImg[index].className='active';
   this.className='active';
  }
 };
 startMove();

 function startMove()
 {
    timer= setInterval(function () {
    clearActive();
    if(index<aImg.length-1)
    {
     index++;
    }else{
     index=0;
    }

    aImg[index].className='active';
    aPoint[index].className='active';

   },3000)
 }
  bannerImg.onmouseover=function () {
   clearInterval(timer);
  };
  bannerImg.onmouseout=function () {
   startMove();
  };

   

//根据类名选择元素
function getByClass(oParent,sClass)
{
 var aEl=oParent.getElementsByTagName('*');
 var aTmp=[];
 for(var i=0; i<aEl.length; i++)
 {
  if(aEl[i].className==sClass)
  {
   aTmp.push(aEl[i]);
  }
 }
 return aTmp;
}