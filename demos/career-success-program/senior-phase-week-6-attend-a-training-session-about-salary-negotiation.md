During your job interviews, you will almost certainly be asked this question:

```
"So, what kind of salary are you looking for?"
```

You want to do your homework in advance, and make sure you're ready to give a strong answer to this question.  

To get started, here's a blog post we wrote recently about salary ranges for full-stack developers:

- [Full-Stack Developer Salary: What can you expect to make?](https://www.fullstackacademy.com/blog/full-stack-developer-salary-what-can-you-expect-to-make?)

You should do some research on your own, and figure out what's a "decent" salary for a developer in your area. So spend some time on the sites below to get a better understanding of what people are getting paid for the roles that you're interested in.  

- [Comparably](https://www.comparably.com)
- [Salary.com](http://www.salary.com)
- [Glass Door](https://www.glassdoor.com)
- [Payscale](https://www.payscale.com)

Here's an article about developer salaries, with respect to the city you live in:

- [San Francisco is actually one of the worst-paying places in the US for software engineers](https://flipboard.com/@flipboard/flip.it%2FpZpfpz-san-francisco-is-actually-one-of-the-wo/f-d66548cbac%2Fqz.com)

Here's a video describing how stock options work:

- [UNCUBED: How Stock Options Work: 4 Concepts You Need to Know](https://uncubed.com/learn/class/how-stock-options-work)

Based on what you read (and watch), determine a target salary range that you think makes sense.

Later this week, the Career Success Team will give you some tips and tricks about negotiating the best salary.  

After that workshop, mark this task as complete!


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