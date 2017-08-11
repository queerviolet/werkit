When the lead technical recruiter at Stack Overflow came to speak at Fullstack recently, one of his key takeaways was that new developers should keep a technical blog. This can be a _great_ differentiator when it comes to your job search.  You can listen to his comments here:


<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Sq1PY5BxrPk" frameborder="0" allowfullscreen></iframe>

<br>
(the audio sync is a little messed up, but you'll still get the idea)
</center>

<br>
If you haven't already, then Review Week is the perfect time to start blogging about your experience learning full stack coding.  You don't need to write *War & Peace*...just start carving out some time (about an hour a week) to write down some thoughts in a blog post, and publish the posts on either Medium or your current blog.  When it comes time for your job search stuff, you'll be glad you did!

Not sure what to write about?  Here are a couple examples of great blog posts written by one of our former students:

- http://bethqiang.com/blog/2017/01/12/what-ive-been-up-to-for-4-weeks/
- http://bethqiang.com/blog/2016/12/14/fullstack-academy-junior-phase-in-review/


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