This weekend, you'll write your "Developer Story" on Stack Overflow, which will be a powerful "career growth hack" for years to come.
 
To see how Developer Stories work, let's return to Pieter DePree from Stack Overflow:

<center>
https://www.youtube.com/embed/ex1VSIO14mU?start=990&end=1255
</center>


<br>
So go ahead and spend some time this weekend creating _your_ Developer Story and timeline.

And remember those blog posts that we've been talking about? Well now it's time to use them...make sure to put each one in your timeline!

SPOILER ALERT: Right after you graduate, we'll circle back to your Developer Story timeline, and add the 4 projects you built during Senior Phase.  It's going to look awesome!


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