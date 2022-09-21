import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { ViewUser } from 'src/app/user/view-user.model';
import { Tweet } from '../tweet.model';
import { TweetService } from '../tweet.service';


@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  userId : string | null;
  constructor(private route: ActivatedRoute, private userService: UserService,private tweetService: TweetService) { }
  userDetail: ViewUser;
  userSubscription : Subscription;

  ngOnInit(): void {
    this.userId = localStorage.getItem('user');
    this.route.params.subscribe((param) => {
      this.userService.getUsers(param['id']);
    });

    this.userSubscription =  this.userService.userDetail.subscribe((userDetail) =>{
      this.userDetail = userDetail;
    })
  }

  onSubmit(){
    if(this.userId!=null){
      this.tweetService.postTweet(this.userId, this.form.value.tweetText);
    }
    else{
      return;
    }
    this.form.reset();
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }


}
