It's a good thing career-wise to have people follow and star your GitHub projects.  

It's kind of like LinkedIn endorsements...the more followers and stars you have, the better it looks to potential employers.

So it's time to (once again) harness the power of your cohort, and ask each other to star and follow your respective projects on GitHub.  

We'll let you guys figure out the best way to do this...for example, each of you could slack out a list of links to your GitHub projects (including the projects you've built during Senior Phase!) and ask for stars and follows.  Or maybe you all create a master spreadsheet to manage this process...whatever works best for your cohort.

Once you have completed this task, go ahead and mark it as complete.

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