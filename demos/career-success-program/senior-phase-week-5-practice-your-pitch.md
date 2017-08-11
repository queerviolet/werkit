Now that you've done your mock interviews (and gotten feedback from the Career Success Team and your instructor) it's time to practice your "pitch"...including that one, monumental question:

```
"So, tell me about yourself."
``` 

This is really important. It will come up in just about every interview, and often times in networking conversations.  

Your Career Success Associate will post office hours on LearnDot this week, and will meet with you one-on-one.  You'll practice giving your pitch, and will receive feedback.  You'll also be able to talk through any other job related questions that you might have. 

So go ahead and schedule office hours, so we can continue getting you "interview ready"!


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