Earlier this week, you made your list of 40 "dream companies."  

Now we're ready to start creating a networking plan, to help you get an introduction to each one.

This is a pretty big task, and it could take a couple days or more.  That's OK...take your time on this!

Let's take it one step at a time...

----

__STEP 1: Use LinkedIn to try and find a possible contact at each company__ 

For example, let's say one of those companies is Amazon. 
- First, go into LinkedIn and search for Amazon and only look at your first degree connections. Most companies give referral bonuses, which means the person can make some money if you get hired.  Talk about an incentive to speak with you!  
- Then check if there are any Fullstack or Grace Hopper alumni that work there.  To do this, just go to the LinkedIn search box and type in *Amazon* and *Fullstack Academy* (or you could check the Fullstack Academy box under "schools"). 
- Now look at your *second* degree connections.  These are people that you know who can refer you over to someone that works at Amazon. 
- Lastly, if all above fails, look for engineers that are like you.  For example, find someone that you have something in common with. Maybe they went to the same school (high school or college), they graduated from a bootcamp, or maybe it's obvious that they're working their first engineering job. You can also look for similar activities, hobbies, volunteering, or that you speak the same foreign language. 

For each person that you find, add them to your dashboard.  Add their name as a Tag for that company, and add a Comment describing your connection to that person.  

For example, if you find someone named Jenny Smith, who is an engineer at Amazon who went to the same college as you, then you should add her to your dashboard like this:

![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/bd9fd516-8a49-42bc-a429-8e157d2d407c/2016-12-07_14-32-48.png)

Now repeat this process for all your dream companies.  If you can find a possible contact(s) at a given company, then add them to your dashboard, and move that company's Task up to the Leads section. 


__STEP 2: Reach out to those people__

Once you have identified your possible networking contacts, it's time to start reaching out to them.  

Before you reach out to each person though, search their company's job postings and see if you can find one that may be a good fit for you.

- IF THERE IS A RELEVANT JOB POSTING: mention that listing in your email to the person, and include the link
- IF THERE ISN'T: keep your outreach more general in nature, expressing your interest in working there


Here are some sample "reach outs" for different types of people on your list:

Reaching out to a Fullstack or Grace Hopper alum:

`
Dear ( ), My name is ( ), and I recently graduated from (Fullstack/Grace Hopper). I was looking through the Alumni network and noticed that you work at ( ). I have been interested in this company for quite some time, and would love to get your insight on how I can stand out as a candidate.  Also, I would love to hear if you have any advice on what worked for you during the job search! I am available to chat (give time) next week, or even meet for coffee. Look forward to hearing from you! (name)
`

Reaching out to a 2nd degree connection: 

`
Dear (), Hope all is well! I wanted to reach out because I have recently started my job search as a software developer and I noticed that you were connected to (name at company).  I am extremely interested in the work that they are doing over there, and I was wondering if you could make an intro for me to their hiring manager or technical recruiter.  Thanks so much!
`

Reaching to an engineer that you met at a Meetup:

`Dear ( ), We met at the most recent Javascript meetup at (location). I noticed that there is an opening at your company for (title).  I am extremely interested in what (company) is doing right now and really love (something about the company’s mission or product). I would love to chat with you further about your experience at the company, engineering culture and what (company) might be looking for in a candidate before applying online.  Please let me know if you have some time to chat over the phone (give dates).  Thank you so much! 
`


__STEP 3: Follow up with people!__

Don't just reach out to one contact and then give up if you haven't heard back.  Wait about 48 hours and then reach out to the next person on your list for that company. If you get more than one person to reply, that's even better, just make sure that you tell the second person to reply that you're also speaking with the first person!

__STEP 4: Speak with the person, and get their advice for getting hired at their company__

The goal is to get some time with the person, either on the phone or (even better) via video chat or (better still!) to meet up for a cup of coffee.  

When you meet up, here are some good questions that you can ask:

- What are some things that you did in your job search that helped you? For example, job boards, resources, companies to target...
- What do you look for in a (junior) developer?
- What kind of questions do you ask (junior) developers in interviews?
- Where do you see (junior) developers falling short in interviews?
- What can I do to make myself stand out?
- I’m fairly new to the market and industry, what are some technical community programs or Meetups that you think I should join?
- What do you do to keep up with new technologies?
- Do you know any companies or opportunities that I should target?
- After looking at my resume, is there anything that I should update?
- I am very interested in (company), what got you excited to work here?
- What are some challenges that the team is facing?
- What is the ideal engineer candidate for (candidate)?
- What type of methodologies does the team practice? For example, agile? Lean?
- What does the interview process for (role) look like?
- Is there anything you think I should brush up on?

- I am very interested in (role), could you pass my resume along to the hiring manager or the recruiter? 

```Notice how the last one is, well, last. Get to know them before asking for a referral!
```

----

This might all sound a little scary and/or overwhelming, but we promise -- it works!  

Just take it one step at a time, and start reaching out to people.  You might be surprised at how quickly this approach starts to work!

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