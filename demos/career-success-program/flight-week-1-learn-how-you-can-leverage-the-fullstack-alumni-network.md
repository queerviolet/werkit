As we've mentioned before, now that you're an alumni of Fullstack, you can network with other members of the Fullstack alumni network.  

Our alumni are spread all over the world (as you can see [here](https://www.linkedin.com/school/15098574/alumni)) and *often* help each other land engineering jobs at great companies.

Here are the ways that you can keep in touch with Alumni: 

- Contact them on the Slack Alumni channel (that you were just connected to)
- Contact them through the Fullstack Alumni Network on LinkedIn (which you were just invited to)

You can also reach out to all the alumni at once by email, by posting to the Fullstack Alumni Google Group (which you were just invited to).  For example, this is how David and Nimit usually reach out to alumni.  

Here are some ways that you can use these channels to your advantage:

__Alumni Slack channel__

- Reach out to alumni on Slack to pick their brains about a company you are interested in 
- Stay on top of the jobs channel to hear about new openings (alumni and the Career Success team post openings on here!) 
- Keep an eye on your cohort's channel
 - Ask people about interview questions they have had 
 - Ask people to review your code in exchange for reviewing theirs  
 - Keep an eye out for posts from the Career Success Team as well

__Linkedin Alumni Network__

- See who's working where 
- Send LinkedIn messages 
- Connect! 

__Get an intro from Career Success__

Want to be connected to another alumni via email? 

Simply ask the Career Success team for that person's email, or for an introduction!

__TOP TIP: Participate in hackathons!__

At this point, you have a good understanding of how hackathons work, and how fun they can be...especially when you're a full stack developer!  

We *strongly* encourage you to keep participating in hackathons, e.g. 3-4 times a year.  They are an incredible way to network with (and have fun with) your fellow alumni.  

So keep your eye out for cool hackathons in your area.  Post about them in the alumni slack channel, and join other alums who are asking for team members for particular hackathons.  Whether the hackathons are in your home town or online, find a way to participate!  

PS...here's a secret that you might not know:  

*Lots* of companies send their technical recruiters to hackathons, and try to hire there very aggressively.  What better place to scout out developer talent, and see what they can do?  __Use this to your advantage.__ When you're doing your job search, do as many hackathons as possible!

At this point, find one upcoming hackathon in your area, and add it to your calendar.  Here are some good sites for finding hackathons:

- [Major League Hacking](https://mlh.io/) 
- [Hackathon.io](http://www.hackathon.io/events) 
- [HackEvents](http://hackevents.co/hackathons) 

If you're looking for hackathons in New York City, then you can checkout

- [Eventbrite](https://www.eventbrite.com/d/ny--new-york/hackathon/) (you can find similar pages on Eventbrite for hackathons in other cities as well)

Also add the upcoming hackathon to your dashboard (including the date), like this:

![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/4415a3f2-07be-4311-944a-da3f3bbaab91/2016-12-07_14-16-00.png)

After you have done the hackathon, move its Task to Archived, and replace it with another upcoming hackathon!  You should always have (at least) one upcoming hackathon in your dashboard.


----

So now you know the various ways to leverage the Fullstack alumni network.  We'll start using these methods in the next couple pages, and you'll continue using them in the months and years ahead!

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