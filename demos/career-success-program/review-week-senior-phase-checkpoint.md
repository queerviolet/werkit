The first thing you'll do is take the Senior Phase Checkpoint, which is scheduled on (or around) the Monday of Review Week.

The checkpoint will be cumulative, covering everything you've learned so far at Fullstack.

The checkpoint is used as a guideline for entrance into the Senior Phase of the program. 

`If a student underperforms on the Senior Phase checkpoint, the Academic Team will give him/her a set of recommended options to move forward in the program based on the student's academic career at Fullstack. These options may include delaying entry into the Senior Phase by taking additional time to study and/or replaying the Junior Phase.`

After you've taken the checkpoint, we recommend you take a well-deserved break for a day or two.  

Get some sleep, hang out with friends and family that you haven’t seen in 6 weeks...or really get crazy and spend some time outdoors!

When you have recharged your batteries, we'll move on to the next tasks for Review Week...

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