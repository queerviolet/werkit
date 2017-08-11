If you're *not* applying for remote developer jobs, then you can skip this task and mark it as complete.

If you *are*, then read on!

One great thing about being a developer (especially one who can work across the full stack, like you) is that __your skills are in demand, and highly portable.__  You can travel the world as a digital nomad and work from just about anywhere.  Or you can stay in your hometown and work for companies around the world.

Before we get started, read this article to get a good overview of the market for remote developer jobs:

- [HACKER NEWS WHO'S HIRING: Remote and Locations](https://blog.whoishiring.io/hacker-news-who-is-hiring-thread-part-2-remote-and-locations/)

Here are some articles that showcase the most popular sites for remote job postings.  Go ahead and check them out, and find 2-3 sites that you like.  

- [GITHUB:Awesome Remote Job Boards](https://github.com/lukasz-madon/awesome-remote-job#job-boards) 
- [PRODUCT HUNT: Find A Remote Job ](https://www.producthunt.com/e/find-a-remote-job)
- [SKILLCRUSH: The 25+ Best Sites For Finding Remote Work](https://skillcrush.com/2014/10/10/sites-finding-remote-work)
- [CREATIVE LIVE: 25 Sites for Finding the Best Remote Job](http://blog.creativelive.com/best-sites-finding-remote-jobs)
- [NODESK: Remote Job Boards](http://nodesk.co/remote-work)

Then start looking for interesting positions, adding the companies to your dashboard as Leads, and reaching out!


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