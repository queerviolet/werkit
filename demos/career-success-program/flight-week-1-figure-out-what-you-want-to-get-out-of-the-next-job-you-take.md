At this point, you should spend a few minutes thinking about the things that are most important to you in life -- and what kind of company you want to go work for.

For example, maybe you're looking for a company that is a place where you can see yourself __really__ making an impact, in a way that's important to you.  

Maybe you're looking for a company that:

- has a great culture
- has smart people 
- has a collaborative environment 
- uses new technologies 
- is growing quickly
- is a good commute away from you
- has great benefits 
- has a good work/life balance
- is solving challenging problem(s) that interest you
- has a product you believe in
- is making a social impact
- has a mentorship or training program
- is dog friendly!

Take a few minutes to think about __the three things that are most important to you__, and select them in this part of the dashboard:

![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/871be5e8-2977-4b41-aaab-ab8c7bdc4b21/2016-12-07_12-24-45.png)

Now drag your 3 choices to the top of the list, with the most important one at the top.  When you're done, your top 3 choices should look like this:

![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/978b5530-3f4c-4187-a87c-a14f0cd55810/2016-12-07_12-26-27.png)

Doing this now will help you in the long run, and will ensure you're at the right company 3-6 months from now. 

When you've selected your top 3 priorities, mark this task as complete.


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