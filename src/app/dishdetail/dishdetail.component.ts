import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service'; 
import { switchMap } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  comment: Comment;
  commentForm: FormGroup;
  dish;
  dishcopy;
  prev: string;
  next: string;
  dishIDs: string[];
  commentErrors = {
    'author':'',
    'comment':''
  }
  validationmessage = {
    'author':{
      'required':'Required',
      'minlength':'Maximum of 3 characters required',
      'maxlength':'Maximum of 15 characters allowed'
    },
    'comment':{
      'required':'Required'
    }
  }
  errmsg: string;

  @ViewChild('cform')
  commentFormDirective;

  constructor(private dishservice: DishService, private location: Location, private route: ActivatedRoute, private fb:FormBuilder, @Inject('BaseUrl') public BaseUrl) { 
    this.createform();
  }

  ngOnInit(): void {
    this.dishservice.getdishIDs()
      .subscribe((dishids) => this.dishIDs = dishids);

    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe((dish) => {this.dish = dish; this.dishcopy = dish; this.nextprev(dish.id);},
        errmsg => this.errmsg = <any>errmsg); 
  }

  createform(){
    this.commentForm = this.fb.group({
      rating:5,
      comment:['', Validators.required],
      author:['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      date:''
    });

    this.commentForm.valueChanges
      .subscribe(data => this.valuechanges(data));

    this.valuechanges();
  }

  goBack(){
    this.location.back();
  }

  nextprev(dishid){
    const index = this.dishIDs.indexOf(dishid);
    this.prev = this.dishIDs[(this.dishIDs.length + index -1)%this.dishIDs.length];
    this.next = this.dishIDs[(this.dishIDs.length + index +1)%this.dishIDs.length];
  }

  onsubmit(){
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; },
        errmsg => { this.dish = null; this.dishcopy = null; this.errmsg = <any>errmsg; });
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating:5,
      comment:'',
      author:''
    })
  }

  valuechanges(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.commentErrors) {
      if (this.commentErrors.hasOwnProperty(field)) {
        this.commentErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationmessage[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.commentErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
