During the Senior Phase, you'll begin each morning by working with another student in your cohort, solving a coding challenge on a whiteboard.  

Think of it like "running drills" to build the skills you'll need to ace technical interviews after you graduate.  

Each 30 minute REACTO session begins with an explanation of the challenge by one of your teaching fellows, then you break out into pairs to solve it.  The class is then pulled back together to see the solution.

You can read more about REACTO problems -- and the philosophy behind this (pretty intense) training method -- in a blog post that David wrote: 

http://www.fullstackacademy.com/blog/the-reacto-pattern-for-acing-technical-interviews


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