Here's a "bird's eye view" of what you'll work on during the Senior Phase:

![screenshot1](https://content.screencast.com/users/markdavisDML/folders/Snagit/media/31120c49-6feb-4888-a186-f1c1238c85d4/2017-05-08_14-21-19.png)<br>


__There are a few other things that you'll experience as part of Senior Phase as well, including:__

CTO Lectures: 
- Scalability
- UI/UX
- Lean Startup
- Agile Development

Guest speakers 

Fellowship applications process

<hr>

The rest of this workshop goes into the details for each item, and describes how they fit into the overall Career Success Program.


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