At this point, you will have found possible networking contacts at some of your dream companies.  Go ahead and reach out to those people, and add them to your dashboard as tags.

----

Once you've done that, let's look at the companies where you *can't* find a possible networking contact. For these companies, you'll need to do a cold outreach.  That's what you'll do on the rest of this page.

----

For each company where you couldn't find a networking contact, do some research and see if they have any developer jobs that look interesting to you.  

- If they do, then apply!
- If they don't, then reach out to their HR department, or to someone else like the CTO or an engineering manager.  Express your interest in working there as an engineer, and see if they know of any relevant positions that you might want to apply for.

__A note about your dashboard__

For every company that you're reaching out to, you should keep detailed notes in your dashboard, including:

- who you contacted
- link to job posting (if any)
- date of contact
- message you sent
- date to follow up

If/when you are no longer pursuing a job at a particular company (e.g. you find out that they don't have any openings currently) then move its Task down to the bottom of your dashboard, into the *Archived* section.

Once you have made initial outreach to each company (or ruled it out based on further research) then mark this task as complete and move on to the next one.


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