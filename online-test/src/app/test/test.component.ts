import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Test } from '../test.model';
import { TestService } from '../test.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  questions: Array<Test> = [];
  questionNum: any;
  questionsAns: any;
  rightAns: any;
  correctAns: any;
  incorrectAns: any;
  currentQuestion: any;
  form = new FormGroup({

    option: new FormControl('', Validators.required)

  });

  //questions from https://opentdb.com/api_config.php
  constructor(public testService: TestService) { }

  ngOnInit(): void {
    this.testService.loadQuestions().subscribe(result => {
      this.questions = result
      this.questionNum = this.questions.length
      this.currentQuestion = this.questions[this.questionsAns]
    },
      error => console.log(error))
    this.questionsAns = 0;
    this.rightAns = 0;
    this.correctAns = [];
    this.incorrectAns = [];
  }

  submit() {
    var answered = this.form.value.option;
    let question = this.currentQuestion;
    if (answered == question!.answer) {
      console.log("correct");
      this.correctAns.push(question);
    } else {
      console.log("wrong");
      this.incorrectAns.push(question);

    }
    this.rightAns = this.correctAns.length;
    this.questionsAns += 1;
    this.currentQuestion = this.questions[this.questionsAns];

  }

 

  reload() {
    window.location.reload();
  }

}
