This page is just a quick reminder about the norms here at Fullstack, and then a summary of class policies to observe during Senior Phase.

__Reminder of our Community Norms__

- No "subtle-isms" (e.g. sexism, racism, ageism --  use the Incident report Form to report any issues)
- Professionalism and the “No Asshole Policy” is required!
- Ask questions (even “dumb” ones)
- Be patient...with yourself and others.
- Trust the process.
- Be on time.
- Help others. Teach others. 


__Class policies during the Senior Phase__

- Log into LearnDot each day for attendance
- Be on time -- remember that REACTO (more on that in the next section) starts each day at exactly 9:30 AM
- If you're late four times then that counts as one "absence"

__Career Success requirements__

- Completing all 4 projects (Grace Shopper, Stackathon, Tech Talk and Capstone) is required for graduation
- To participate in Flight after graduation, all pages in this workshop must be marked as complete
- Do not start applying for jobs until after you graduate!  You should be completely focused on your studies until then.

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