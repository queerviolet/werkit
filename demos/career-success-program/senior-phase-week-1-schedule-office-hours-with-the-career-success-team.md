Now that you're in the Senior Phase, it's time to meet with the Career Success team! 

To prepare for these office hours start thinking about the answer to the following questions: 

- What kind of role do I see myself in? (e.g. back end or front end) 
- What kind of industries am I interested in? 
- Am I planning to stay in NYC/Chicago for the job hunt? If not, where do I want to go? 

Your dedicated Career Success Associate will post office hours on LearnDot, so you can schedule your first one-on-one meeting.

During the meeting, we'll ask you a few questions, to get an understanding of what you want to do after you graduate. Then we'll  start providing advice and guidance that is relevant to your situation. 

So go ahead and schedule office hours, so we can get started on your Career Success Program!

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