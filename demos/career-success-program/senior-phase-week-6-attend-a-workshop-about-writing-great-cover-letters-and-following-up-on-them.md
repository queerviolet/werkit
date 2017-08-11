In this workshop, we'll give you  some advice on writing great cover letters, and the best way to follow up on them via email.

Here is some of the material you'll cover:
```
To write a great cover letter, ask yourself these questions:
- Why am I interested in this company?
- What excites me about the product/ mission?
- Why could I see myself working there?
- Why am I a unique fit for this role?
- What excites me about their tech stack?

Here's a nice, simple order for a cover letter:
- Introduce yourself
- Why I'm interested in your company / what excites me about the product
- What makes me a unique fit for the role
- Reiterate why I'm interested (use company name again & the name of the role)
- Close out (tell them how they can find you)
```

We'll also talk about other things related to your job search, including how to manage your time, and some tools you can use to keep organized.

After you have attended the workshop (which will be during class hours), mark this task as complete.


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