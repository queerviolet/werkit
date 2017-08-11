OK now it's time to begin week 3 of Flight.

By this point, you've made contact with a pretty large number of companies, and soon you should start getting some irons in the fire.  Let's keep our foot on the gas (hey, another metaphor!), and start getting even more opportunities in your pipeline.

We'll do that by expanding our search to the major boards. We'll look for jobs that are relevant to us, in our area, and start applying.

Go ahead and start your search on these job boards, which we think are among the best:

- [WhoIsHiring.io](https://whoishiring.io/) *<--we love this app...it aggregates job postings from sources like Hacker News' monthly Who Is Hiring posts, like [this one](https://news.ycombinator.com/item?id=12846216), and puts them on a map*
- [Stack Overflow Jobs](https://stackoverflow.com/jobs)
- [LinkedIn Software Developer Jobs](https://www.linkedin.com/jobs/software-developer-jobs)
- [Dice](http://www.dice.com)
- [Indeed.com](http://www.indeed.com)
- [Crunchboard](https://www.crunchboard.com)

Then you might want to check out these job boards:

- [ZipRecruiter](https://www.ziprecruiter.com)
- [Mashable Job Board](http://jobs.mashable.com)
- [Slack Job Board](https://slackatwork.com/)
- [Simplyhired](http://www.simplyhired.com)
- [The Muse](https://www.themuse.com/jobs)

If you're looking for a job as a front-end developer, then check out:

- [Behance ](https://www.behance.net/joblist)
- [Dribble](https://dribbble.com/jobs)

If you're in the New York City area, then you should check these ones out:

- [Made in NYC Jobs](http://www.digital.nyc/jobs)
- [Built in NYC Jobs](https://www.builtinnyc.com/jobs)
- [Crain's Top Places to work in NYC](https://www.crainsnewyork.com/features/best-places-to-work)
- [Gary’s Guide Jobs](http://www.garysguide.com/jobs)

Once you've reviewed the boards, and figured out the ones you're going to work with (e.g. 3-4 of them), then set up an account with each one.  You should prioritize boards where you can subscribe to get daily email alerts about jobs that fit your search criteria, so you can apply to them quickly.

Once you are set up with 3-4 boards, go ahead and mark this task as complete.

```
Start getting those applications in...you should be submitting 3-5 applications per day at this point!
```

And of course remember to track progress for each lead on your dashboard.


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