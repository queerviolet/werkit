You will give your Stackathon demo on Monday or Tuesday of this week.

Votes will be cast (by your fellow students, and your instructors and fellows) about who built the coolest project.  After all demos are done, three winners will be crowned, with all the commensurate glory and bragging rights that entails ;)

Remember that you'll need to [submit your metadata](http://www.fullstackacademy.com/guest-entry/hackathon-presentations) before you can demo your project! This will be used for the video that we record.

Once you've given your demo and received the link to the video, go ahead and mark this task as complete.


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