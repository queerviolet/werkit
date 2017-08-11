Now that you have graduated from Fullstack, it's time to make some decisions about what you want to do next career-wise.

To begin that process, go ahead and re-visit the page you read during review week, [Think about what you want to do after Fullstack](https://learn.fullstackacademy.com/workshop/585179c6a2b61e00044d8627/content/58517ae373818000048c86e3/text)

----

OK, now that those options are fresh in your mind again, let's look at each one in more detail

__If you are becoming a fellow__

If you're becoming a fellow, then by this point you would have already applied, interviewed and been accepted to the fellowship program.  Congratulations!  You'll be starting next week as a junior fellow, then the following semester you will become a senior fellow.  In week 4 of your senior fellowship you will begin Flight...so there's nothing to do on the job search front right now.  We'll see you again on this page in about 10 weeks!

__If you're applying to Fullstack Fund__

If you want to launch a startup and apply to Fullstack Fund, then now is the time!  

Go ahead and submit the [application on this page](http://www.fullstackacademy.com/fullstack-fund)...and good luck!

__If you want to get hired as a software engineer__

If you fall into this category (which most of our graduates do), then take some time to think about the following options, and decide which one is your *primary* goal:
```
1) Get hired as a developer in New York City or Chicago
2) Get hired as a developer in another location
3) Get hired as a remote developer
4) Get hired as a remote developer, traveling the world as a "digital nomad"
```

Now let's add the first entry onto your dashboard.  

Add the primary goal of your job search (from the list above, or something else if applicable) here:

![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/326a5958-9db8-4cc0-a7ba-ac8af65c449f/2016-12-07_12-17-20.png)

So for example, if you want to get hired as a developer in Austin, then your dashboard should look like this:

![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/0c00450f-6692-4b4a-9445-c012cb6b9998/2016-12-07_15-51-18.png)

OK, now that we have confirmed the primary goal for your job search, let's start working through the Flight program!


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