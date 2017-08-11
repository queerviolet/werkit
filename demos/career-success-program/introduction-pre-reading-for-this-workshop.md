This workshop is a little different than previous workshops you've worked on.  

Rather than open it up bits at a time, we are opening the whole workshop to you now.

The reason? We want you to spend some time (about an hour) reading through the workshop over the next few days.  The goal is to let you know the "lay of the land" during the upcoming Senior Phase, and to see how your job search efforts will fit into the mix.  

You'll see that the workshop is written in the sequence that you'll work through it… week by week through when you graduate.

So please carve out some time over the next few days to read through all the pages. __Don't sweat any of the details at this point__ — we'll work through each page in the weeks ahead.  The only goal for now is to get an overview of how the Career Success Program works, and the things you'll be working on during Senior Phase.

So let's get started, and take a look at the things you'll be doing during Review Week!

<br>

`
NOTE: During the Senior Phase, as you work through each page in this workshop, you'll click the check box (shown below) to mark it as complete.  So you can think of this workshop as your "career prep checklist".  Note that all pages need to be completed before you can begin the post-graduation part of the program -- "Flight" -- which you'll learn about shortly.  
`

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
`