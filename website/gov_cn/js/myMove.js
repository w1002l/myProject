
 var aImg=$('#header').find('img');
 var aImg1=$('#ad').find('img');
 var aImg2=$('#ad1').find('img');
 var aSpan1=$('#ad').find('span');
 var aSpan2=$('#ad1').find('span');
 var index=0;
 var index1=0;
 fMove(aImg);
 fMove1(aImg1,aSpan1);
 fMove1(aImg2,aSpan2);
 function clearActive(obj)
 {
  for(var i=0; i<obj.length; i++)
  {
   obj[i].className='';
  }
 }
 function clearActive1(obj,obj1)
 {
  for(var i=0; i<obj.length; i++)
  {
   obj[i].className='';
  }
  for (var i=0; i<obj1.length; i++)
  {
   obj1[i].className='';
  }
 }
 function fMove(obj) {
  setInterval(function () {
   clearActive(obj);
   if(index==obj.length-1)
   {
    index=0;
   }
   else {
    index++;
   }
   obj[index].className='active';
  },5000)
 }


 function fMove1(obj,obj1) {
  setInterval(function () {
   clearActive1(obj, obj1);


   obj[index1].className='active';
   obj1[index1].className='active';
   if(index1<2)
   {
    index1++;
   }else {
    index1=0;
   }
  },4000)
 }

