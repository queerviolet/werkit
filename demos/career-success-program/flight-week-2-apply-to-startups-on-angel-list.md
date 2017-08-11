The workload so far in Flight has been pretty intense, that's for sure.  

But if you've completed all the tasks so far, then you have *already* gotten off to a great start in your job search.  

Up next, we're going to start working with some major job boards, and start applying to some larger companies. 

But before we do that, let's talk about the idea of going to work at a startup.

__Is it a good idea to go work at a startup when you leave Fullstack?__

Many of our graduates choose to work as engineers at promising startups.  This gives them an opportunity to work in a fast-paced environment, usually across a broad range of technologies, and have a real impact on building out an early product.

One of the key things about working at a startup is finding one that has a mission or product that you find interesting. The great thing about startups is that they usually target a niche market. 

So think about your hobbies and passions.  Things like music, animals, health, wellness...whatever you're into.  Write a few of them down.  Could you envision working for a startup in that field?

If the answer is yes, then head over to [Angel List](https://angel.co).  Do a keyword search to see if there are any startups working in the field(s) you're most interested in. If you find any that look interesting to you, then add them to your dashboard as a Lead, and reach out to them!  

You might also want to search Angel List for startups in your target geographical area that work in other fields...there are lots of cool startups out there!


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