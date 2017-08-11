Now let's take a deeper look at the projects you'll be working on during the Senior Phase.

__1) Grace Shopper__

For this project, you'll spend 7 days building an e-commerce site for a product that you and your team dream up.  You'll pull together the concepts you learned in the Junior Phase, and will build all components...including the back end, front end and database.  Your instructors will provide more details on this project when you get to it.

__2) Stackathon__ 

This is a 4-day personal hackathon project where you'll really be able to show your creativity.  If you want to get inspired, check out some previous Stackathon projects: http://www.fullstackacademy.com/hackathon-presentations  Keep in mind...you must present your stackathon project even if you didn’t get it to work!

__3) Tech Talks__

For this project, you'll create a 10 minute presentation on a topic that you're interested in, and will present it to your fellow students.  We'll look at Tech Talks on the next page.

__4) Capstone__ 

This is the "big one", that your entire time in the immersive program is leading up to.  You will work with your team mates for 21 days building this project.  Don't worry about it for now, but feel free to check out some previous Capstone projects if you want to get a sense for what other students have built:  http://www.fullstackacademy.com/student-gallery

Please note...completion of all the projects is a requirement for graduation!

__The videos you'll create__

We will create a video recording of you presenting your Stackathon, Tech Talk and Capstone project.  These videos will be *incredibly* valuable for you career-wise, for many years to come, as you'll learn later in this workshop.

In the following video, our product manager Mark gives an overview of how the video workflow will work during your Senior Phase:

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/YwCbwjshl8Q" frameborder="0" allowfullscreen></iframe>
</center>

<br>
Here's the link to the spreadsheet that Mark showed in the video: 
<br>
https://docs.google.com/spreadsheets/d/1LTSFK3TaK4TU1tqFCZiFPx3DZ_yEDPZCmYFU7elKoDg/edit?usp=sharing

<br><br>

<script>
$(document).ready(function () {
  var actionId = angular.element('#checks').scope().action._id;
  function _getCheck (n) {
    var stored = localStorage.getItem(actionId + '_checkmark_' + n);
    if (!stored) return false;
    return stored == 'complete' ? true : false;
  }
  function _setCheck (n, bool) {
    var toStore;
    if (bool) toStore = 'complete';
    else toStore = 'incomplete';
    localStorage.setItem(actionId + '_checkmark_' + n, toStore);
  }
  $('[type="checkbox"]')
  .each(function (idx, elem) {
    var $elem = $(elem);
    $elem.prop('checked', _getCheck(idx));
    $elem.on('change', function () {
      _setCheck(idx, $elem.prop('checked'));
    });
  });
});
</script>

<p id="checks" class="list-reset career-success-checkbox">
  <div>
    <input type="checkbox">
    <span>Mark this page as complete</span>
  </div>
</p>