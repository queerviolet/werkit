This week, we're going to do some more preparation for your upcoming job interviews.

Let's first summarize how interviews usually go:

__Phone screen__

A recruiter will usually start by telling you a little bit about their company, their culture, and the particular role.  He or she will ask about your background, and why you're interested in this role and their company. [Here's a list](https://docs.google.com/document/d/1KC4weMKRfgvBTaPQxUodqOqSdJ1ZSjqwEuTmA_3ANmQ/edit?usp=sharing) of other questions that are commonly asked during phone screens.

The recruiter will probably ask you some basic technical questions, like "what's your favorite Javascript library, and why"? 

At the end of the conversation, he or she will ask you if you have any questions.  Make sure you have already prepared at least three questions!  [Here's a list](https://docs.google.com/document/d/1jzPhFDTlzuujYuwhZpqcrPH_mXzAiqx9t6K3vLDl9e8/edit?usp=sharing) of possible questions that you could ask.

__Take-home coding challenges__

The next step is often a set of coding challenges. They might be timed (e.g. complete them by the end of the week).  If they are timed, make sure to ask for the company to send them when you've got an open day to work on them.

__On-site interview__

You can have any where from 3-7 hours of interviewing for a particular role.  The interviews could include technical challenges like:

- solving coding challenges on a white board
- solving basic mathematical questions
- solving theoretical questions
- answering technology-related questions

Make sure you are not caught off guard by these questions!  __At this point, you should start carving out at least one hour per day to study for technical challenges.__  Here are some great resources for doing just that:

VIDEOS:

- [Ashi Mysore (instructor at Fullstack) gives some tips on mastering the technical interview](https://youtu.be/qAOkVRGPo9k)
- [Fullstack alum John Gruska talks about the process he went through to get hired at Google](https://www.youtube.com/watch?v=Ke-Hmq74Ryw)
- [How to Get a Job at the Big 4 - Amazon, Facebook, Google & Microsoft](https://www.youtube.com/watch?v=YJZCUhxNCv8)
- [How we hire at Google](https://www.youtube.com/watch?v=k-baHBzWe4k&t=0s)
- [How to: Work at Google — Example Coding/Engineering Interview](https://www.youtube.com/watch?v=XKu_SEDAykw) 
- We also recommend that you brush up on the lectures that the Career Success team did during senior phase, by watching these video replays:
  - [How to negotiate the best salary for developer positions ](https://www.youtube.com/watch?v=DKxtzj-tfo4)
  - [10 easy steps to nail your interview for a developer position ](https://www.youtube.com/watch?v=TK7JwlPCMr4)
  - [GUEST SPEAKER: Peiter DePree, Technical Recruiting Lead at Stack Overflow](https://youtu.be/Sq1PY5BxrPk)
  - [LinkedIn for software engineers](https://www.youtube.com/watch?v=rYONfJruQ5w&feature=youtu.be)

APPS:

- [An app on Hacker Rank that has questions from the book _Cracking the Coding Interview_](https://www.hackerrank.com/domains/tutorials/cracking-the-coding-interview)
- [A free app called Pramp, which you can use to practice for interviews with other developers](https://www.pramp.com/)
![screenshot](https://content.screencast.com/users/markdavisDML/folders/Snagit/media/e8ef4e5a-c10d-435c-b9db-6548826f4980/2017-04-05_14-41-05.png)


ARTICLES:

- [Fullstack's cheat sheet of commonly-asked technical interview questions](https://docs.google.com/spreadsheets/d/1itJeKay-e0AEdL-G_Wz9CmYT8diJzd2jCwxxQvL1wfI/edit?usp=sharing)
- [SKILLED UP: 35 Helpful HTML & HTML5 Interview Questions & Answers](http://www.skilledup.com/articles/html-html5-interview-questions-answers)
- [SKILLED UP: 25 Helpful CSS Interview Questions and Answers](http://www.skilledup.com/articles/25-css-interview-questions-answers)
- [JAVA T POINT: CSS Interview Questions](http://www.javatpoint.com/css-interview-questions)
- [JAVA T POINT: JavaScript Interview Questions](http://www.javatpoint.com/javascript-interview-questions)
- [TOPTAL: 25 Essential JavaScript Interview Questions](https://www.toptal.com/javascript/interview-questions)
- [FROMDEV: 20 Software Scalability Questions & Answers for Architect Interview](http://www.fromdev.com/2013/07/architect-interview-questions-and-answers.html)
- [FAST COMPANY: Here's how we hire engineers at Google](http://www.fastcompany.com/3062713/how-to-be-a-success-at-everything/i-hire-engineers-at-google-heres-what-i-look-for-and-why)
- [GOOGLE: Google Interview University](https://github.com/jwasham/google-interview-university)


For now, add an appointment to your calendar for at least one hour per day of studying.

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
`
You have just completed the first week of Flight! You now have your Job Search Dashboard up and running, and all your job search resources (e.g. Stack Overflow, LinkedIn, project videos) are in place. Next week, we'll start reaching out to people!
`