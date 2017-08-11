Now that you have successfully made it through an elite coding bootcamp, it's the perfect time to write a technical blog post about your experience.  

If you'd like a reminder on why technical blogging is so important for engineers, [here's that video clip from Pieter DePree again.](https://www.youtube.com/embed/ex1VSIO14mU?start=1393&end=1463)

So go ahead and write this blog post, then post it on the timeline on your Developer Story on Stack Overflow.

This will be a great piece of content that highlights the rigorous program you have just been through, and the advanced coding skills you learned (that differentiate you as a strong developer).

Want some writing inspiration?  Here you go!

http://bethqiang.com/blog/2017/02/23/every-new-beginning-comes-from-some-other-beginnings-end/

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