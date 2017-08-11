If you want to get hired as a developer in New York City or Chicago, then we'd love to have you participate in Hiring Day in that city! 

Here's everything you need to know: 


__When is Hiring Day?__

It's during the last week of Senior Phase. 

__What is Hiring Day?__

It's an event where our hiring partner companies come to our campus in New York City and Chicago, to do "speed dating" job interviews with our graduating Seniors.

There is also an opportunity for Seniors and hiring partner companies to network in a job fair-type setting.  

__Who can participate in Hiring Day?__

If you are 100% committed to living in either New York City or Chicago after you graduate, and getting hired as a developer, then you're eligible to participate.  

__How does it work?__

If you're participating in Hiring Day, then you will be given access to our "Hiring Day app". Here's a video from Mark, where he shows how the app works:
<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/l9mUHv3-0-Y" frameborder="0" allowfullscreen></iframe>
</center>

*NOTE: In the video above, you'll see what the Hiring Day student profiles look like.  We have made a major upgrade since the video was recorded, and now each student's project videos appear in their profile as well.  Here's what the updated profiles look like:*

![screenshot](https://content.screencast.com/users/markdavisDML/folders/Snagit/media/bb5fb5d1-168d-4df6-bcff-7bb5458ab0e2/2017-04-05_12-53-52.png)

Now that you know how Hiring Day works, go ahead and mark this task as complete.

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