import { Component, OnInit } from '@angular/core';
import data from './questions.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  //questions from https://opentdb.com/api_config.php
  constructor() { }
  questions: any;
  questionNum: any;
  questionsAns: any;
  rightAns: any;
  correctAns: any;
  incorrectAns: any;
  form = new FormGroup({

    option: new FormControl('', Validators.required)

  });

  ngOnInit(): void {
    this.questions = data;
    this.questionNum = this.questions.length
    this.questionsAns = 0;
    this.rightAns = 0;
    this.correctAns = []
    this.incorrectAns = []

  }

  submit() {

    var selectedOptions = this.form.value.option.split(',')
    var answered = selectedOptions[1]
    let question = this.questions.find((x: any) => x.id.toString() === selectedOptions[0]);
    this.questions.find((x: any) => x.id.toString() === selectedOptions[0]).selected = true;
    this.questionsAns += 1
    if (answered == question.answer) {
      console.log("correct")
      this.correctAns.push(question)
      this.rightAns += 1
    } else {
      console.log("wrong")
      this.incorrectAns.push(question)

    }

  }

  reload(){
    window.location.reload();
  }

}
