Over the next few weeks, we're going to work through a series of steps that will help you land your dream job.  

To make things easier, we have created a simple app called the "Job Search Dashboard", which you'll use to organize your work, and your thoughts.

The app runs on the Asana platform, which you may be familiar with.  If not, it's a productivity app that is very popular these days.  Along with Trello, it's one of the two fastest-growing productivity apps (millions of users each) and there's a pretty good chance that the next company you work for will use Asana (for example, we use it pretty heavily at Fullstack).

![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/aeb84be4-dbf8-4033-9e8c-d58441486121/2016-12-07_11-33-52.png)

This week, the Career Success team will invite you to the app, and will create a Job Search Dashboard for you.  At this stage, your dashboard will look like this:

![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/39587369-9751-49a6-b252-e11670966368/2016-12-07_11-49-00.png)

Now let's watch another (very short) video from Mark, where he gives you a tour of the app and shows you how it works:

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/mdZQ0DtDTFw" frameborder="0" allowfullscreen></iframe>
</center>
<br>
Not only will the Job Search Dashboard help you organize your work, but it will also make it easier to get support from the Career Success team whenever you need it...and fast!  You can submit questions to the Career Success Team by @ mentioning them in the relevant task, and they will get back to you as quickly as possible.

So that's how the Job Search Dashboard works.  Pretty simple, eh?  

Now let's start working on it...


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