In this video, our lead instructor Joe gives some advice on how to give a great Tech Talk:
<br>

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/TGzGkmlJdb4" frameborder="0" allowfullscreen></iframe>
</center>

<br>

So now it's time to start brainstorming about different topics, and decide what you'll discuss in *your* Tech Talk.

If you'd like some inspiration, check out these videos of previous Tech Talks: http://www.fullstackacademy.com/tech-talks

__Here's a top tip!__

If you want to hit the ground running in Senior Phase, then we suggest you not only come up with the *topic* for your Tech Talk during review week, but also start working on it.  

In fact, some students like to *finish* writing their Tech Talks during review week...which is a great idea!

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