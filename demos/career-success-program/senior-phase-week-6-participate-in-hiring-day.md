You will hearing from the Career Success Team shortly, with some final advice for preparing for the big event.


__Here are some ways you can prepare for Hiring Day:__ 

1) Make sure your screencast is done! Send it to your instructor the night before, so that he or she can make a playlist. 

2) Research the companies that are attending! Use the information in the Hiring Day app, and look up companies on:
- Crunchbase 
- Linkedin 
- Glassdoor

3) Come up with a list of the top 5 companies that you want to talk to during the networking hour. These are the companies that you're super excited about, and that you'll make an effort to speak with first. 

4) Prepare questions for your top 5 companies. Research will help with these, but you can also have a couple of set questions that you can ask every company.  Here are some examples:

- What interesting challenges are you/your team/the company facing?
- What is your favorite part about working at the company?
- Can you talk a bit about communication within the team? Across teams?
- What types of support would I receive as a new hire?
- What are some of the challenges that the team is facing today?
- What gets you excited to come to work everyday?

You can find some more here: https://www.themuse.com/advice/any-questions-what-to-ask-in-an-interview

5) Practice your personal pitch! Write it down and read it out loud.  Then practice it in a mirror, and/or on a team member. 

6) Review the Questions Asked at Hiring Day Interviews list below:

Non-technical Questions: 
- Why did you decide to become a programmer? Do you prefer front-end or back-end programming?
- What language do you prefer?
- Would you learn other languages?
- What are your salary requirements? Remember, we talked about how giving a number is never in your best interest. It’s unusual for a company to ask this in a first interview, but your reply can range from, “I’m not sure, would like to learn more about the opportunity before considering”
- Why do you use angular? 
- What are the advantages of using angular? 
- Why did you come to Fullstack? 
- Did you choose us (company) or did you get assigned to us? 
When you are learning something new what do you do first


Technical Questions: 

- Identify a function that takes a number n and returns the nth number in the fibonacci sequence; discuss code that uses nested for loops to print out a multiplication table; discuss a time while working on your project when everything broke
- How do you modularize your CSS files? 
- What’s the hardest issue you had to resolve recently, specifically in code. 

Questions about projects: 
- What challenges did you face?
- What were some of the things you worked on?
- What other features would you like to add?
- What were some bugs you had and how did you fix it?
- Why did you use a certain type of technology for your project? 



__Here are some things you should do the night before Hiring Day: __

- Pick out your outfit ahead of time! 
- Eat a good meal
- Get a good night’s sleep 


After you have completed Hiring Day, go ahead and mark this task as complete.

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