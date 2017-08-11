You're almost ready to begin the job search process.  But before you get started, we want to provide some general advice to keep in mind.  

Some of this is material we've already covered, but this is a good time to review it and make sure it's fresh in your memory!

__Motivation__

Motivation is said to have three components:

- ACTIVATION: The decision to do something (e.g. deciding to change your career and applying to Fullstack)
- INTENSITY: The amount of effort that goes into doing it (e.g. getting into Fullstack, and making it through the immersive program!)
- PERSEVERANCE: How long you can keep up the effort

You are at the *perseverance* stage right now...so keep that in mind over the next few weeks!

__Don’t get stuck!__ 
- Don’t apply to too many companies...you’ll get swept up in a time warp
- Make attainable goals for yourself (e.g. apply to 3-5 companies per day)
- Over applying? Take a break.
- If you're getting stressed about a particular cover letter or an application, just walk away for a little while and take a 20 minute break, or maybe work on something else

__Don’t hold yourself back__
- You never *really* know if you're going to like a company until you speak with them
- So don't limit yourself by not speaking to a company because they don't seem interesting
 - Use it as practice, and an opportunity to meet new people
 - Once you get an offer, *then* you can be picky — but for now take every opportunity that comes at you!

__If you start feeling burnt out with your job search, then take a break and work on something else for a little bit__
- Work on a side project to add to your resume
- Build a new feature on your Capstone (more commits!)
- Practice some more coding challenges! (more on this on a later page)
- Go to Meetups to network and learn about new technology (more on this on a later page)

__Remember to follow up with people!__
- Haven’t heard from a company you have been in contact with in three days or more? Follow up!
- Try some other avenues (e.g. connect with an engineer there on LinkedIn, tweet something interesting to them, or add their recruiter on LinkedIn)
- Haven’t heard from an alumni or engineer that you reached out to? Then follow up! 
- In general, get more comfortable with being "aggressive" (well, not literally) and following up


__Create a weekly and daily schedule__

Set a schedule for yourself each week, and achieve it!
- First step: Set your primary goals for the week (e.g. apply to 15 companies + email 5 alumni + email 5 engineers I don't know)
- Second step: Set the related tasks for each day

__Example of a daily schedule:__

9:30 AM<br>
Wake up, eat breakfast, exercise 

10:30 AM<br> 
Check email, follow up with companies 

11:30 AM<br>
Reach out to 3 people (e.g. engineers, alumni, tech recruiters, second connections or people that you know) that work at companies you are interested in. Email or send Linkedin messages. If they're a Fullstack alum, then slack or email them! 

12:00 PM<br>
Apply to 3-5 jobs. Try to reach out to someone that works at the company before sending your resume in through a normal application. 

(lunch break)

Now it's time to do some interview prep! For example:

2:30 PM<br>
Practice coding problems 


__Prioritize your schedule!__ 

For example, if you have an interview in the afternoon, then you should spend the morning gearing up for it.

Generally speaking, we recommend that you prioritize in this order: 

- Onsite interviews
- Technical phone screens 
- Phone screens
- Coffee chats/Meetups
- Coding challenges
- Applying
- Projects

__Great article to read__

As the last task on this page, go ahead and read the following article, which reinforces some of the concepts we've already covered, and provides a nice primer for the things you'll work through in the next few weeks:

- [Begin Your Search: Getting Your 1st Job out of a Coding Bootcamp](https://clutchtalent.github.io/beginning-job-search)


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