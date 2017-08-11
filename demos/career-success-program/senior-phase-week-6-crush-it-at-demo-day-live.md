On Monday morning, all of your hard work over the last 17 weeks will come to fruition.  

This is when you and your team mates present your Capstone projects at Demo Day Live!

To refresh your memory about how Demo Day Live works, go ahead and read [this page](https://learn.fullstackacademy.com/workshop/5827753d444aff0004b5147c/content/58e55d90a7037c0004f44f16/text) again.

After you have presented at Demo Day Live, mark this task as complete.  Woo hoo!

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