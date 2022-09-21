import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tweet } from '../../../src/app/tweet/tweet.model';
import { TweetService } from '../../app/tweet/tweet.service';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit, OnDestroy {
  userId: string | null;
  tweets: Tweet[];
  private allTweets: Subscription;
  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user');
    this.tweetService.getAllTweets();
     this.allTweets = this.tweetService.allTweets.subscribe((value: Tweet[]) => {
      this.tweets = value;
     });
  }

  ngOnDestroy(): void {
      this.allTweets.unsubscribe();
  }
}
