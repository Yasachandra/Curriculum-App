let sections = [
  {
    "section":"S1",
    "groups":[
      {
        "group":"G1",
        "questions":["Q1","Q2"],
        "options":2
      },
      {
        "group":"G2",
        "questions":["Q3","Q4"],
        "options":2
      },
      {
        "group": "G3",
        "questions":["Q5","Q6"],
        "options":2
      }
    ],
    "options":2
  },
  {
    "section":"S2",
    "groups":[
      {
        "group":"G4",
        "questions":["Q7","Q8","Q9"],
        "options":3
      },
      {
        "group":"G5",
        "questions":["Q10","Q11","Q12","Q13","Q14"],
        "options":3
      }
    ],
    "options":2
  }
]
// Question Max Marks Scheme
var t_marks = {Q1:5, Q2:5, Q3:4, Q4:6, Q5:7, Q6:3, Q7:10, Q8:10, Q9:10, Q10:10, Q11:10, Q12:10, Q13:10, Q14:10}
// Student Marks Scheme
var a_marks = {Q1:3, Q2:5, Q3:2, Q4:4, Q5:2, Q6:3, Q7:10, Q8:10, Q9:10, Q10:10, Q11:10, Q12:10, Q13:10, Q14:10}
// Store the total marks
let total_marks = 0;
// Repeat the below procedure for each section
for(let i=0;i<sections.length;i++) {
  // Store the list of groups related to a particular section
  let groups = sections[i].groups;
  // Store the list of total marks availed in each group
  let group_totals = [];
  for(let j=0;j<groups.length;j++) {
    // Store the list of questions related to a particular group
    let questions = groups[j].questions;
    // Store the total marks availed in a group
    let total = 0;
    // If the optional questions in a group are same as the total questions in the group then add the marks of each question in the group to the total marks of the group
    if(groups[j].options>=questions.length) {
      for(let k=0;k<questions.length;k++) {
          total = total + a_marks[questions[k]]   
      }
    }
    else {
      // Store the list of % marks (availed marks out of the total marks) in each question
      let q_marks = [];
      // Store the question and it's associalted % marks
      let av_marks = {};
      for(let k=0;k<questions.length;k++) {
        // Calculate the % mark in this particular question
        let q_mark = a_marks[questions[k]]/t_marks[questions[k]];
        q_marks.push(q_mark)
        av_marks[q_mark] = a_marks[questions[k]]
      }
      // Sort the list of % marks of questions in a group in descending order and extract the optional questions with maximum % marks
      q_marks = q_marks.sort((a,b) => a<b).slice(0,groups[j].options);
      // Add the extracted optional questions with maximum % marks to the total number of marks associated with this group
      for(let k=0;k<groups[j].options;k++) {
          total = total + av_marks[q_marks[k]]   
      }
    }
    // Add the total marks availed in this group to the list of total marks availed in each group
    group_totals.push(total);
  }
  // Sort the list of % marks of groups in a section in descending order and extract the optional groups with maximum % marks
  group_totals = group_totals.sort((a,b) => a<b).slice(0,sections[i].options);
  // Add the extracted optional groups with maximum % marks to the total number of marks associated with this section
  for(let j=0;j<sections[i].options;j++) {
      total_marks = total_marks + group_totals[j] 
  }
}

// Log the final total marks to the console
console.log(total_marks);