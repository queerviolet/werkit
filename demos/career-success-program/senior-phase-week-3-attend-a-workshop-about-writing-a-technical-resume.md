It's time for another career prep workshop!

This time, we'll show you how to write a great technical resume from scratch.

After the workshop (which will be during class hours), we will post office hours for one-on-one meetings, where we'll review the first draft of your resume with you (and offer suggestions for any edits). 

<hint title= "Check out a tool called Cake Resume">
**During the workshop, you'll write the content for your resume.  When it comes to _formatting_ it, you might want to check out an app called Cake Resume (www.cakeresume.com), which is popular with our students.**
</hint>

<br>
Once you've created your resume and it has been approved by your Career Success Associate, then go ahead and drop your final draft into your individual resume folder on the Google Drive, and mark this task as complete.


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