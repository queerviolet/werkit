You've probably heard this before, but just in case let us repeat it here:

Going to technical Meetups in your area is a *great* way to land a job as a developer.  Here's a [post on Quora](https://www.quora.com/Is-networking-at-startup-meetups-a-good-way-to-get-a-developer-job) that explains why.

Find Meetups in your area that interest you...maybe about Node, or JS, or React, or VR...whatever sounds cool. 

Then start going and actively participating with other developers there.  

You were waaaaay too busy to go to many Meetups during the Junior and Senior Phases, but now is the time to get started!

Find meetups, networking events and hackathons in your area using these sites: 

- [Meetup.com](https://www.meetup.com)
- [Eventbrite](https://www.eventbrite.com)
- [Gary's Guide](http://garysguide.com/events) 

Once you have found some Meetups you'll go to in your area, put some dates in your calendar, and add them into your dashboard here:

![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/7cd41095-911a-404c-a48c-6fa6ff561a50/2016-12-07_12-43-13.png)

For each Meetup, add the date and a link to the event.  Once you've added three of them, it should look something like this:

![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/a4ba6093-6367-45ed-be12-d12e87973f9d/2016-12-07_12-50-13.png)

We suggest that you arrange the meetups by date, as shown above.

After you attend each meetup, drag the related task down to the Archived section, and add another one to replace it.  You should always have (at least) 3 upcoming meetups in your dashboard!


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