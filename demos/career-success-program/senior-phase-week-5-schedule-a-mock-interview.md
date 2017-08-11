It's time to begin practicing for your job interviews!

We'll post Office Hours for both Mock Behavioral and Technical Interviews. Your Career Success Associate will conduct the Behavioral Interviews, and your senior phase instructor will conduct the technical ones. 

For Mock technical interviews, instructors will ask you questions on your core knowledge of Javascript. For these  interviews, also think about how you're going to answer these questions. 

- "How did you get into development?" 
- "What is your Capstone project and what problem does it solve?" 
- "What technical challenges did you face when creating your Capstone project?" 
- "Was there ever a conflict within your group and if so how did you resolve it?" 

Once you've done both interviews, go ahead mark this task as complete.

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