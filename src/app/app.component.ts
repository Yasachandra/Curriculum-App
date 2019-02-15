import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedSubject = "";
  searchChapter = "";
  searchTopic = "";
  subjects = ["Mathematics","Physics","Chemistry"]
  showTruncatedSubject = false;
  showTruncatedTopic = false;
  limitTopicsFlag = true;
  topicSubjectDetails = {
      "Mathematics": [
        {
          "chapter":"Fundamental Operations On Integers",
          "topics":
          [
            "Subtracting using the number line",
            "Addition/subtraction with more than 2 integers",
            "Additive Identity",
            "Multiplicative identity",
            "Additive Inverse"
          ]
        },
        {
          "chapter":"Fractions",
          "topics":
          [
            "Understand Proper Fractions",
            "Understand Improper Fractions",
            "Conversion of improper fractions to mixed fractions",
            "Conversion of mixed fractions to improper fractions",
            "Identify whether the given fractions are equivalent fractions",
            "Find equivalent fractions for a given fraction by division",
            "Understand the meaning of the 'simplest form' of a fraction",
            "Reduce a given fraction to its simplest form",
            "Understand Like and Unlike Fractions"
          ]
        },
        {
          "chapter":"Exponents and Powers",
          "topics":
          [
            "Exponential form",
            "Definition of constant term",
            "Definition of coefficient"
          ]
        }
      ],
      "Physics":[
        {
          "chapter":"Kinematics",
          "topics":
          [
            "Motion",
            "Distance",
            "Speed",
            "Position and Displacement"
          ]
        },
        {
          "chapter":"Vectors",
          "topics":
          [
            "Scalar",
            "Vectors"
          ]
        },
        {
          "chapter":"Friction",
          "topics":
          [
            "Methods of Increasing Friction",
            "Types of Forces",
            "More About Friction"
          ]
        }
      ],
      "Chemistry":[
        {
          "chapter":"Chemical Bonding",
          "topics":
          [
            "Ionic Bond",
            "Covalent Bond",
            "Electron Configurations"
          ]
        },
        {
          "chapter":"Periodic Classification",
          "topics":
          [
            "Early History of the Periodic Table",
            "Mendeleev's Periodic Table"
          ]
        },
        {
          "chapter":"Atomic Structure",
          "topics":
          [
            "Atom",
            "Proton",
            "Electron",
            "Neutron"
          ]
        },
        {
          "chapter":"Language Of Chemistry",
          "topics":
          [
            "Chemical Symbols and Formulas",
            "Balancing Chemical Equations"
          ]
        },
        {
          "chapter":"Atomic Structure",
          "topics":
          [
            "Orbital",
            "Valence Electrons"
          ]
        }
      ]
    }
    subjectPanels = [];

  ngOnInit() {
    this.fetchingSubjects();
  }

  fetchingSubjects() {
    let topicSubjectDetails = JSON.parse(JSON.stringify(this.topicSubjectDetails))
    // Apply the filtering based on selected subject
    if(this.selectedSubject!="")
      this.subjectPanels = topicSubjectDetails[this.selectedSubject]
    else {
      this.subjectPanels = [];
      for(let i=0;i<this.subjects.length;i++)
        this.subjectPanels =this.subjectPanels.concat(topicSubjectDetails[this.subjects[i]]);
    }
    // Apply the filtering based on entered text to search in subjects
    if(this.searchChapter!="") {
      let matchingChapters = []
      for (let i = 0; i < this.subjectPanels.length; i++) {
        if(this.subjectPanels[i].chapter.startsWith(this.searchChapter)) {
          matchingChapters.push(this.subjectPanels[i])
        }
      }
      this.subjectPanels = matchingChapters;
    }
    // Apply the filtering based on entered text to search in topics
    if(this.searchTopic!="") {
      let matchingChapters = []
      for (let i = 0; i < this.subjectPanels.length; i++) {
        for (let j = 0; j < this.subjectPanels[i].topics.length; j++) {
          if(this.subjectPanels[i].topics[j].startsWith(this.searchTopic)) {
            matchingChapters.push(this.subjectPanels[i]);
            break;
          }
        }
      }
      this.subjectPanels = matchingChapters;
    }
    if(this.limitTopicsFlag)
      this.limitTopics()
  }

  searchingTopic(evt,index) {
    let searchTopic = evt.target.value;
        // Apply the filtering based on entered text to search in topics
        if(searchTopic!="") {
          let matchingTopics = [];
          for (let i = 0; i < this.subjectPanels[index].topics.length; i++) {
            if(this.subjectPanels[index].topics[i].startsWith(searchTopic))
              matchingTopics.push(this.subjectPanels[index].topics[i]);
          }
          this.subjectPanels[index].topics = matchingTopics;
        }
        else {
          this.fetchingSubjects();
        }
  }

  // Limit the number of topics being displayed
  limitTopics() {
    for (let i = 0; i < this.subjectPanels.length; i++) {
      this.subjectPanels[i].topics.splice(5)
    }
  }

  showTopics() {
    this.showTruncatedTopic = !this.showTruncatedTopic;
    this.limitTopicsFlag = false;
    this.fetchingSubjects()
  }
}
