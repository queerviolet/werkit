The next thing you should do is make a list of 40 companies that you're interested in working for.  

These could be companies that you have wished to work for in the past. Or you could just start Googling for awesome places to work in your area.  

At this point, don't look for job openings! This is an open search, just to see what companies you are interested in. 

Here are some suggestions on where to find cool companies to work for:

- Built in (city of your choice) - e.g. [www.builtinnyc.com](http://www.builtinnyc.com) - this is a great list to look for local start-ups, ranging from seed to Series D
- [The Muse](https://www.themuse.com) - they feature a lot of great companies in major cities
- [BizJournals](http://www.bizjournals.com) - this is nationwide, and they might have a list of awesome companies around you.

__A note about virtual reality__

As you think about your dream companies, we want to give you some food for thought. 

The fields of AR (augmented reality) and VR (virtual reality) are about to go through a period of explosive growth:  

<center>
![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/c6f95ce3-f34e-42c6-b722-9247a5ffdc9c/2016-12-07_16-40-51.png)

[(Read the article)](https://techcrunch.com/2015/04/06/augmented-and-virtual-reality-to-hit-150-billion-by-2020)
</center>
<br>

Here's a deeper dive into those numbers, showing where the biggest growth areas will be:

<center>
![(Read the article)](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/a2953f0d-4868-46c9-a301-07bf869f989c/2016-12-08_08-57-45.png)
</center>
<br>

Allow us to put this into historical context, with a simple infographic that represents Fullstack's view of the potential of VR/AR:

<center>
![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/764faa5e-9cd3-4bd6-b7af-c7b58906402f/2016-12-08_09-00-20.png)
</center>
<br>
We think that the future for VR and AR is bright and that -- for our graduates -- there will be opportunities in this space for many years ahead.
<br>
<center>
![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/77016963-28b8-487c-8df8-3ea086a7a5b7/2016-12-08_09-07-45.png)
</center>
<br>
If your interest in VR/AR has been piqued at all, then you might want to think about working for a company that's doing work in this field.  Keep this in mind as you think about your dream companies and, if relevant to you, add any VR-related companies to your list.

`
FUN FACT: We have a VR Lab at Fullstack in NYC.  If you want to get some time on a Vive, and check out the latest VR experiences, then Slack the Career Success Team for access and instructions.
`

----

So go ahead and do some thinking, and some research, and come up with a list of 40 companies that look like interesting places to work.  As you work, add the name of each company here:

![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/18e31c0b-2f62-4d0c-a3bd-67912df5f9e5/2016-12-07_12-30-28.png)

Once you have the names of 40 companies listed, drag the ones that look the most interesting to the top of the "Companies I'm interested in" section.  That's all you need to do for now!

Then mark this task as complete, and we can move on to the next step.


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